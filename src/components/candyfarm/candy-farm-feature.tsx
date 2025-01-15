"use client";

import { useAppKitAccount } from "@reown/appkit/react";
import { Shield, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { formatCurrency } from "@/lib/format-currency";
import toast from "react-hot-toast";

// Type definitions
interface YieldDataPoint {
  date: string;
  value: number;
}

interface Protocol {
  protocol: string;
  apy: number;
  tvl: number;
  risk: "Low" | "Medium" | "High";
}

type RiskLevel = Protocol["risk"];

export default function CandyfarmFeature() {
  const { isConnected, address } = useAppKitAccount();

  const [depositAmount, setDepositAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Mock historical yield data
  const yields: YieldDataPoint[] = [
    { date: "2024-01-01", value: 5.2 },
    { date: "2024-01-02", value: 5.4 },
    { date: "2024-01-03", value: 5.1 },
    { date: "2024-01-04", value: 5.6 },
    { date: "2024-01-05", value: 5.8 },
    { date: "2024-01-06", value: 5.5 },
    { date: "2024-01-07", value: 5.9 },
  ];

  // Mock yield opportunities data
  const yieldData: Protocol[] = [
    { protocol: "Protocol A", apy: 4.5, tvl: 1000000, risk: "Low" },
    { protocol: "Protocol B", apy: 3.8, tvl: 800000, risk: "Low" },
    { protocol: "Protocol C", apy: 8.2, tvl: 1200000, risk: "Medium" },
    { protocol: "Protocol D", apy: 12.5, tvl: 500000, risk: "High" },
  ];

  const handleDeposit = async (): Promise<void> => {
    if (!isConnected) {
      setError("Please connect your wallet first");
      return;
    }

    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      // Simulate transaction delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Comming soon.");
      setError("");
      setDepositAmount("");
    } catch (err) {
      setError("Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk: RiskLevel): string => {
    switch (risk.toLowerCase()) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "high":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <>
      <div className="space-y-6 pt-24 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  text-white">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white font-PPNeueMachina">
                <TrendingUp className="w-5 h-5 text-white" />
                Yield Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={yields}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    labelStyle={{ color: "white" }}
                    contentStyle={{
                      borderRadius: "10%",
                      border: "1px",
                      backgroundColor: "transparent",
                      borderColor: "white",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    name="APY %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-PPNeueMachina">
                Quick Deposit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder="Enter amount"
                  className="border-gray-800"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
                <Button
                  onClick={handleDeposit}
                  disabled={loading || !isConnected}
                  className="w-full bg-[#4E67E6] rounded-full py-6"
                >
                  {loading ? "Processing..." : "Deposit"}
                </Button>
                {/* {error && (
                <Alert variant="destructive">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )} */}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-white font-PPNeueMachina">
              Available Yield Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr>
                    <th className="text-left p-4">Protocol</th>
                    <th className="text-left p-4">APY</th>
                    <th className="text-left p-4">TVL</th>
                    <th className="text-left p-4">Risk Level</th>
                    <th className="text-left p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {yieldData.map((pool) => (
                    <tr
                      key={pool.protocol}
                      className="border-t border-t-gray-800"
                    >
                      <td className="p-4">{pool.protocol}</td>
                      <td className="p-4">{pool.apy}%</td>
                      <td className="p-4">{formatCurrency(pool.tvl)}</td>
                      <td className={`p-4 ${getRiskColor(pool.risk)}`}>
                        {pool.risk}
                      </td>
                      <td className="p-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast.success("Comming soon.");
                          }}
                          className="rounded-full"
                          disabled={!isConnected}
                        >
                          Invest
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
