"use client";

import { CustomAreaChart } from "@/components/area-chart";
import {
  CardHome,
  CardHomeHeader,
  CardTitle,
  CardContent,
  Card,
  CardFooter,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MaterialSymbol } from "react-material-symbols";

type ElectricityDataProps = {
  time: string;
  grid_renewable: number;
  house_solar: number;
  house_wind: number;
  house_grid_exchange: number;
  house_total: number;
  house_self_sufficiency: number;
  house_renewable: number;
}[];

export default function Home() {
  const [data, setData] = useState<ElectricityDataProps>([]);

  useEffect(() => {
    async function fetchData() {
      const temp = await fetch(
        `http://${process.env.NEXT_PUBLIC_HOST_URL}/service/house/0/electricity`,
        {
          next: { revalidate: 60 }, // Revalidate every 60 seconds
        },
      );
      setData(await temp.json());
    }

    fetchData().catch(console.error);
    const interval = setInterval(() => {
      fetchData().catch(console.error);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
          <CardHeader>
            <CardTitle>Power flow</CardTitle>
            <CardDescription>In Watts (W)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid items-center justify-center self-center p-6">
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
          <CardHeader>
            <CardTitle>Power flow</CardTitle>
            <CardDescription>In Watts (W)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid items-center justify-center self-center p-6">
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
          <CardHeader>
            <CardTitle>Power flow</CardTitle>
            <CardDescription>In Watts (W)</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-row items-center">
            <div className="flex flex-col gap-4">
              <div className="flex aspect-square w-16 flex-col items-center justify-center gap-1 rounded-full border-2 border-secondary p-2">
                <MaterialSymbol icon="solar_power" size={24} />
                <p className="text-xs text-secondary-foreground">
                  {data.length !== 0 ? data[data.length - 1].house_solar : "0"}
                </p>
              </div>
              <div className="flex aspect-square w-16 flex-col items-center justify-center gap-1 rounded-full border-2 border-secondary p-2">
                <MaterialSymbol icon="wind_power" size={24} />
                <p className="text-xs text-secondary-foreground">
                  {data.length !== 0 ? data[data.length - 1].house_wind : "0"}
                </p>
              </div>
            </div>

            <div className="flex-1">
              <svg
                viewBox="0 0 56 26"
                fill="none"
                className="w-full flex-1 -scale-y-100 animate-pulse"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 25H20.4167C24.8349 25 28.4167 21.4183 28.4167 17V9.5C28.4167 5.08172 31.9984 1.5 36.4167 1.5H55.8333"
                  className="stroke-secondary"
                  strokeWidth="1.5"
                />
              </svg>
              <svg
                viewBox="0 0 55 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M1 25H20.4167C24.8349 25 28.4167 21.4183 28.4167 17V9.5C28.4167 5.08172 31.9984 1.5 36.4167 1.5H55.8333"
                  className="animate-pulse stroke-secondary"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <div className="flex aspect-square w-16 flex-col items-center justify-center gap-1 rounded-full bg-primary p-2">
              <MaterialSymbol icon="home" size={24} fill />
              <p className="text-xs text-secondary-foreground">
                {data.length !== 0 ? data[data.length - 1].house_total : "0"}
              </p>
            </div>

            <div className="flex-1 border border-secondary"></div>

            <div className="flex aspect-square w-16 flex-col items-center justify-center gap-1 rounded-full border-2 border-secondary p-2">
              <MaterialSymbol icon="electric_meter" size={24} />
              <p className="text-xs text-secondary-foreground">
                {data.length !== 0
                  ? data[data.length - 1].house_grid_exchange
                  : "0"}
              </p>
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
          <CardHeader>
            <CardTitle>Power flow</CardTitle>
            <CardDescription>In Watts (W)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid items-center justify-center self-center p-6">
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
          <CardHeader>
            <CardTitle>Power flow</CardTitle>
            <CardDescription>In Watts (W)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid items-center justify-center self-center p-6">
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
