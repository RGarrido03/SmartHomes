"use client";

import { CustomAreaChart } from "@/components/area-chart";
import {
  CardHome,
  CardHomeHeader,
  CardTitle,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { MaterialSymbol } from "react-material-symbols";

export default function Home() {
  return (
    <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CardHome className="col-span-3 flex overflow-hidden">
        <div>
          <CardHomeHeader>
            <CardTitle>
              Your house is currently 
              <p className="text-green-700">carbon neutral.</p>
            </CardTitle>
          </CardHomeHeader>
          <CardContent>
            <div className="flex flex-row items-center ">
              <p>Take a look at what’s happening.</p>
            </div>
          </CardContent>
        </div>
        <div className="self-center p-6">
          <Link
            href="/insight"
            className="rounded-lg bg-accent px-5 py-3 text-base font-bold"
          >
            0 gCO₂eq/kWh
          </Link>
        </div>
      </CardHome>

      <Link href={"/home"}>
        <Card className="overflow-hidden">
          <CardContent>
            <div className="grid items-center justify-center self-center p-10">
              <MaterialSymbol
                icon="water_drop"
                className="animate-pulse"
                size={128}
              ></MaterialSymbol>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center space-x-1">
              <p>Check out the</p>
              <MaterialSymbol icon="water_drop" size={18}></MaterialSymbol>
              <p>tab.</p>
            </div>
            <MaterialSymbol icon="arrow_forward" size={24}></MaterialSymbol>
          </CardFooter>
        </Card>
      </Link>

      <Link href={"/home"}>
        <Card className="overflow-hidden">
          <CardContent>
            <div className="grid items-center justify-center self-center p-10">
              <MaterialSymbol
                icon="scene"
                className="animate-pulse"
                size={128}
              ></MaterialSymbol>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center space-x-1">
              <p>Check out the</p>
              <MaterialSymbol icon="scene" size={18}></MaterialSymbol>
              <p>tab.</p>
            </div>
            <MaterialSymbol icon="arrow_forward" size={24}></MaterialSymbol>
          </CardFooter>
        </Card>
      </Link>

      <Link href={"/home"}>
        <Card className="overflow-hidden">
          <CardContent>
            <div className="grid items-center justify-center self-center p-10">
              <MaterialSymbol
                icon="bolt"
                className="animate-pulse"
                size={128}
              ></MaterialSymbol>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center space-x-1">
              <p>Check out the</p>
              <MaterialSymbol icon="bolt" size={18}></MaterialSymbol>
              <p>tab.</p>
            </div>
            <MaterialSymbol icon="arrow_forward" size={24}></MaterialSymbol>
          </CardFooter>
        </Card>
      </Link>

      <Link href={"/home"}>
        <Card className="overflow-hidden">
          <CardContent>
            <div className="grid items-center justify-center self-center p-10">
              <MaterialSymbol
                icon="eco"
                className="animate-pulse"
                size={128}
              ></MaterialSymbol>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center space-x-1">
              <p>Check out the</p>
              <MaterialSymbol icon="eco" size={18}></MaterialSymbol>
              <p>tab.</p>
            </div>
            <MaterialSymbol icon="arrow_forward" size={24}></MaterialSymbol>
          </CardFooter>
        </Card>
      </Link>

      <Link href={"/home"}>
        <Card className="overflow-hidden">
          <CardContent>
            <div className="grid items-center justify-center self-center p-10">
              <MaterialSymbol
                icon="euro"
                className="animate-pulse"
                size={128}
              ></MaterialSymbol>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center space-x-1">
              <p>Check out the</p>
              <MaterialSymbol icon="euro" size={18}></MaterialSymbol>
              <p>tab.</p>
            </div>
            <MaterialSymbol icon="arrow_forward" size={24}></MaterialSymbol>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
