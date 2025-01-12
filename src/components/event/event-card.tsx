"use client";

import Image from "next/image";
import { Card } from "../ui/card";
import NFTImage from "@/assets/images/nft.png";
import Link from "next/link";

export default function EventCard() {
  return (
    <Card className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 overflow-clip p-0.5 rounded-none cursor-pointer">
      <Link href="/event/113efef24">
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
      </Link>
    </Card>
  );
}
