import Image from "next/image";
import { Button } from "../ui/button";
import NFTImage from "@/assets/images/nft.png";
import { UserNav } from "../user-nav";
import EventCard from "./event-card";
import { ScrollArea } from "../ui/scroll-area";
import TicketCard from "./ticket-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function SingleEvent() {
  return (
    <div className="grid md:grid-cols-2 w-full h-full pt-16">
      <section className="w-full h-screen items-center justify-center flex-col bg-black hidden md:block lg:flex">
        <Image
          src={NFTImage}
          width={400}
          height={50}
          alt="banner"
          className="w-fit h-auto object-contain"
        />
      </section>
      <section className="h-screen bg-black px-10 py-5">
        <ScrollArea className="h-full">
          <div className="flex items-center justify-start gap-2 pb-5">
            <Avatar className="h-14 w-14 ">
              <AvatarImage src={""} alt={"avatar"} />
              <AvatarFallback>b</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <div className="font-bold font-PPNeueMachina text-white">
                blaqrio
              </div>
              <div className="font-PPNeueMachina font-light">
                kfjhe...qfefeq
              </div>
            </div>
          </div>
          <h1 className="text-white text-4xl font-bold font-PPNeueMachina py-4">
            December Jazz Night 2024
          </h1>
          <p className="font-PPMori">
            An evening of live jazz music featuring top performers.
          </p>
          <p className="font-PPNeueMachina">
            Start:{" "}
            <span className="font-bold text-white">26th December 2024 </span>-
            End: <span className="font-bold text-white">26th August 2025</span>{" "}
          </p>

          <div className="flex w-full items-center justify-start flex-wrap py-6 gap-2">
            <div className="border-1 text-white bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-0.5">
              <div className="bg-black font-PPNeueMachina p-2">
                <div className="font-bold">Venue:</div>
                <p>Downtown Concert Hall</p>
              </div>
            </div>
            <div className="border-1 text-white bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-0.5">
              <div className="bg-black font-PPNeueMachina p-2">
                <div className="font-bold">Location:</div>
                <p>Abuja, Nigeria</p>
              </div>
            </div>
            <div className="border-1 text-white bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-0.5">
              <div className="bg-black font-PPNeueMachina p-2">
                <div className="font-bold">Time:</div>
                <p>1.OO PM WAT</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 font-PPNeueMachina">
            <h3 className="font-bold  text-white text-xl">Tickets</h3>
            <Button>Add ticket</Button>
          </div>
          <div className="grid gap-2 grid-cols-2 md:grid-cols-3">
            <TicketCard />
            <TicketCard />
            <TicketCard />
          </div>
        </ScrollArea>
      </section>
    </div>
  );
}
