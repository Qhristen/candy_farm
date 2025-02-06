"use client"
import React from "react";
import { ArrowUpDown, TrendingUp, Shield, Zap } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import AIIconButton from "./ai-icon";

const HeroSection = () => {
  return (
    <div className=" text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Main Hero Content */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 font-PPNeueMachina dark:to-blue-400 font-bold mb-6">
            Maximize Your DeFi Returns
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 font-PPNeueMachina">
            Smart yield optimization and token swapping, <br /> all in one powerful
            platform
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/yield`}>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-full font-semibold transition-colors font-PPNeueMachina">
              Start Earning
            </Button>
            </Link>
            <Link href={`/swap`}>
            <Button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-6 rounded-full font-semibold transition-all font-PPNeueMachina">
              Swap Tokens
            </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2  lg:grid-cols-4 gap-8 text-center mb-16">
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-lg">
            <p className="text-3xl font-bold font-PPNeueMachina mb-2">$1.2B+</p>
            <p className="text-gray-300 font-PPNeueMachina">
              Total Value Locked
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-lg">
            <p className="text-3xl font-bold font-PPNeueMachina mb-2">15+</p>
            <p className="text-gray-300 font-PPNeueMachina">
              Supported Protocols
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-lg">
            <p className="text-3xl font-bold font-PPNeueMachina mb-2">12.5%</p>
            <p className="text-gray-300 font-PPNeueMachina">Average APY</p>
          </div>
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-lg">
            <p className="text-3xl font-bold font-PPNeueMachina mb-2">50K+</p>
            <p className="text-gray-300 font-PPNeueMachina">Active Users</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-lg">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold font-PPNeueMachina">
                Yield Optimization
              </h3>
            </div>
            <p className="text-gray-300 font-PPNeueMachina">
              Automatically find and allocate your assets to the
              highest-yielding opportunities across multiple protocols
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-lg">
            <div className="flex items-center mb-4">
              <ArrowUpDown className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold font-PPNeueMachina">
                Best Swap Rates
              </h3>
            </div>
            <p className="text-gray-300 font-PPNeueMachina">
              Get the most competitive rates by aggregating liquidity from
              multiple DEXes and automated market makers
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-lg">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold font-PPNeueMachina">
                Security First
              </h3>
            </div>
            <p className="text-gray-300 font-PPNeueMachina">
              Built with industry-leading security practices and regularly
              audited smart contracts
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-lg">
            <div className="flex items-center mb-4">
              <Zap className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold font-PPNeueMachina">
                Lightning Fast
              </h3>
            </div>
            <p className="text-gray-300 font-PPNeueMachina">
              Execute trades and yield farming strategies with minimal latency
              on Solana's high-performance network
            </p>
          </div>
        </div>
      </div>
      <AIIconButton />
    </div>
  );
};

export default HeroSection;
