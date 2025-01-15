"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDownCircle,
  RefreshCcw,
  ArrowRight,
  Wallet,
  Settings,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "../ui/scroll-area";
import { useAppKitAccount } from "@reown/appkit/react";
import toast from "react-hot-toast";

interface Token {
  symbol: string;
  name: string;
  balance: string;
  price: number;
}

interface SwapStep {
  type: "direct" | "split" | "hop";
  from: string;
  to: string;
  dex: string;
  percentage?: number;
}

interface SwapRoute {
  dexName: string;
  totalOutputAmount: number;
  totalPriceImpact: number;
  steps: SwapStep[];
  estimatedTime: string;
  fee: number;
  splitPercentage?: number;
  outputPrice: number;
}

// Mock token data
const tokens: Token[] = [
  { symbol: "SOL", name: "Solana", balance: "12.5", price: 110.25 },
  { symbol: "USDC", name: "USD Coin", balance: "1250.00", price: 1 },
  { symbol: "RAY", name: "Raydium", balance: "100.00", price: 0.75 },
  { symbol: "ORCA", name: "Orca", balance: "50.00", price: 1.25 },
  { symbol: "BONK", name: "Bonk", balance: "1000000.00", price: 0.00001 },
];

// Enhanced mock route generation
const mockRoutes = (
  inputAmount: number,
  inputToken: string,
  outputToken: string
): SwapRoute[] => {
  const routes: SwapRoute[] = [
    {
      dexName: "Direct Route",
      totalOutputAmount: inputAmount * 1.02,
      totalPriceImpact: 0.01,
      steps: [
        { type: "direct", from: inputToken, to: outputToken, dex: "Raydium" },
      ],
      estimatedTime: "< 30 seconds",
      fee: 0.003,
      outputPrice: 0,
    },
    {
      dexName: "Split Route",
      totalOutputAmount: inputAmount * 1.025,
      totalPriceImpact: 0.015,
      steps: [
        {
          type: "split",
          from: inputToken,
          to: outputToken,
          dex: "Raydium",
          percentage: 60,
        },
        {
          type: "split",
          from: inputToken,
          to: outputToken,
          dex: "Orca",
          percentage: 40,
        },
      ],
      splitPercentage: 60,
      estimatedTime: "< 45 seconds",
      fee: 0.004,
      outputPrice: 0,
    },
    {
      dexName: "Multi-Hop",
      totalOutputAmount: inputAmount * 1.018,
      totalPriceImpact: 0.02,
      steps: [
        { type: "hop", from: inputToken, to: "USDC", dex: "Raydium" },
        { type: "hop", from: "USDC", to: outputToken, dex: "Orca" },
      ],
      estimatedTime: "< 1 minute",
      fee: 0.005,
      outputPrice: 0,
    },
  ];

  return routes.map((route) => ({
    ...route,
    outputPrice:
      route.totalOutputAmount *
      (tokens.find((t) => t.symbol === outputToken)?.price || 0),
  }));
};

interface RouteVisualizerProps {
  route: SwapRoute;
}

const RouteVisualizer: React.FC<RouteVisualizerProps> = ({ route }) => {
  return (
    <div className="p-3 bg-gray-950 rounded-lg">
      <div className="flex items-center gap-2 overflow-x-auto">
        {route.steps.map((step, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
            <div className="flex-shrink-0 bg-black rounded-lg p-2 text-sm">
              {step.type === "split" ? (
                <div className="text-xs">
                  <div className="font-medium">{step.dex}</div>
                  <div className="text-gray-500">{step.percentage}%</div>
                </div>
              ) : (
                <div className="text-xs">
                  <div className="font-medium">{step.dex}</div>
                  <div className="text-gray-500">
                    {step.from} → {step.to}
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

interface TokenSelectorProps {
  value: string;
  onChange: (value: string) => void;
  tokens: Token[];
  side: "input" | "output";
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  value,
  onChange,
  tokens,
  side,
}) => {
  const selectedToken = tokens.find((t) => t.symbol === value);

  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full text-white">
          <SelectValue placeholder={`Select ${side} token`} className="text-white">
            {selectedToken && (
              <div className="flex items-center jus gap-2">
                <div className="font-medium">{selectedToken.symbol}</div>
                <div className="text-sm text-gray-500">
                  Balance: {selectedToken.balance}
                </div>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-black">
          {tokens.map((token) => (
            <SelectItem key={token.symbol} value={token.symbol}>
              <div className="flex justify-between items-center gap-10">
                <div>
                  <div className="font-medium text-white">{token.symbol}</div>
                  <div className="text-sm text-gray-500">{token.name}</div>
                </div>
                <div className="text-sm text-gray-500">
                  ${token.price.toFixed(2)}
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedToken && (
        <div className="text-sm text-gray-500">
          ≈ $
          {(
            selectedToken.price *
            (value === selectedToken.symbol
              ? parseFloat(selectedToken.balance) || 0
              : 0)
          ).toFixed(2)}
        </div>
      )}
    </div>
  );
};

const SwapInterface: React.FC = () => {
  const [inputAmount, setInputAmount] = useState<string>("");
  const [inputToken, setInputToken] = useState<string>("");
  const [outputToken, setOutputToken] = useState<string>("");
  const [routes, setRoutes] = useState<SwapRoute[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { isConnected, address } = useAppKitAccount();
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [slippage, setSlippage] = useState<string>("0.5");

  const findRoutes = async (): Promise<void> => {
    if (!inputToken || !outputToken || !inputAmount) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRoutes(mockRoutes(parseFloat(inputAmount), inputToken, outputToken));
    setLoading(false);
  };

  const executeSwap = async (route: SwapRoute): Promise<void> => {
    if (!isConnected) return;
   
    const message = `Swap Summary:
    Route: ${route.dexName}
    Input: ${inputAmount} ${inputToken}
    Expected Output: ${route.totalOutputAmount.toFixed(6)} ${outputToken}
    Dollar Value: $${route.outputPrice.toFixed(2)}
    Estimated Time: ${route.estimatedTime}
    Fee: ${(route.fee * 100).toFixed(2)}%
    Slippage Tolerance: ${slippage}%`;

    // alert(message);
    toast.success(message)

  };

  const handleMaxClick = (): void => {
    const token = tokens.find((t) => t.symbol === inputToken);
    if (token) {
      setInputAmount(token.balance);
    }
  };

  return (
    <div className="pt-36">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-6 space-y-4 border-none bg-gray-950/85">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Swap Tokens</h2>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(!showSettings)}
                className=" text-white"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <Card className="p-4 bg-black  text-white">
              <div className="space-y-2">
                <div className="text-sm font-medium">Slippage Tolerance</div>
                <div className="flex gap-2">
                  {["0.1", "0.5", "1.0"].map((value) => (
                    <Button
                      key={value}
                      variant={slippage === value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSlippage(value)}
                      className=" text-white"
                    >
                      {value}%
                    </Button>
                  ))}
                  <Input
                    type="number"
                     pattern="^[0-9]+(\.[0-9]+)?$"
                     min="0"
                    value={slippage}
                    onChange={(e) => setSlippage(e.target.value)}
                    className="w-20 text-white"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Swap Interface */}
          <div className="space-y-4">
            <div className="space-y-2">
              <TokenSelector
                value={inputToken}
                onChange={setInputToken}
                tokens={tokens}
                side="input"
              />
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Amount"
                  pattern="^[0-9]+(\.[0-9]+)?$"
                  min="0" 
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  className="w-full pr-16  text-white"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2  text-white"
                  onClick={handleMaxClick}
                >
                  MAX
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const temp = inputToken;
                  setInputToken(outputToken);
                  setOutputToken(temp);
                }}
                className=" text-white"
              >
                <ArrowDownCircle className="w-6 h-6" />
              </Button>
            </div>

            <TokenSelector
              value={outputToken}
              onChange={setOutputToken}
              tokens={tokens}
              side="output"
            />

            <Button
              onClick={findRoutes}
              disabled={loading || !inputToken || !outputToken || !inputAmount || !isConnected}
              className="w-full py-6 rounded-full bg-[#4E67E6]  text-white"
            >
              {loading ? (
                <RefreshCcw className="w-4 h-4 animate-spin mr-2 " />
              ) : isConnected ?  (
                "Find Best Route"
              ):  (
                "Connect wallet"
              )}
            </Button>
          </div>
        </Card>

          {routes.length > 0 && (
        <Card className="p-6 border-none bg-gray-950/85">
          <ScrollArea className="h-96">
            <div className="space-y-4 mt-4  text-white">
              <h3 className="text-lg font-semibold">Available Routes</h3>
              {routes.map((route, index) => (
                <Card key={index} className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{route.dexName}</span>
                    <span className="text-sm text-gray-500">
                      Est. Time: {route.estimatedTime}
                    </span>
                  </div>

                  <RouteVisualizer route={route} />

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      Output: {route.totalOutputAmount.toFixed(6)} {outputToken}
                    </div>
                    <div className="text-right">
                      ${route.outputPrice.toFixed(2)}
                    </div>
                    <div>
                      Price Impact: {(route.totalPriceImpact * 100).toFixed(2)}%
                    </div>
                    <div className="text-right">
                      Fee: {(route.fee * 100).toFixed(2)}%
                    </div>
                  </div>

                  <Button
                    onClick={() => executeSwap(route)}
                    disabled={!isConnected}
                    variant={index === 0 ? "default" : "secondary"}
                    className="w-full bg-[#4E67E6] rounded-full"
                  >
                    {isConnected ? "Swap" : "Connect Wallet to Swap"}
                  </Button>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Card>
          )}
      </div>
    </div>
  );
};

export default SwapInterface;
