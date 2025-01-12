"use client";

import NFTImage from "@/assets/images/nft.png";
import Image from "next/image";
import { Card } from "../ui/card";

export default function TicketCard() {
  return (
    <Card className="overflow-clip rounded-none border-none cursor-pointer">
      <div className="border bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-0.5">
        <div className="">
          <Image
            alt={"image"}
            width={400}
            height={200}
            priority
            src={NFTImage}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="pt-2">
        <span className="font-PPNeueMachina pr-2">Regular</span>-
        <span className="font-bold font-PPNeueMachina pl-2">0.03SOL</span>
      </div>
    </Card>
  );
}
