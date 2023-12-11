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
  DevicesCard,
} from "@/components/ui/card";
import Link from "next/link";
import Wave from "react-wavify";
import { useState, useEffect } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { Button } from "@/components/ui/button";

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

type CostDataProps = {
  electricity: number;
  water: number;
  today: number;
}[];

type WaterValues = {
  time: string;
  kitchen: number;
  bath: number;
  garden: number;
  other: number;
  total: number;
  forecast_today: number;
}[];

type EnvironmentData = {
  time: string;
  self_suficiency: number;
  renewable: number;
  emissions: number;
  renewable_forecast_day: [];
  renewable_forecast_hour: [];
}[];

export default function Home() {
  const [data, setData] = useState<ElectricityDataProps>([]);
  const [costData, costSetData] = useState<CostDataProps>([]);
  const [waterData, waterSetData] = useState<WaterValues>([]);
  const [environmentData, environmentSetData] = useState<EnvironmentData>([]);

  useEffect(() => {
    async function fetchData() {
      const temp = await fetch(
        `http://${process.env.NEXT_PUBLIC_HOST_URL}/service/houses/1/electricity`,
        {
          next: { revalidate: 60 }, // Revalidate every 60 seconds
        },
      );
      setData(await temp.json());
      const costs = await fetch(
        `http://${process.env.NEXT_PUBLIC_HOST_URL}/service/houses/1/costs`,
        {
          next: { revalidate: 60 }, // Revalidate every 60 seconds
        },
      );
      costSetData(await costs.json());
      const waterCosts = await fetch(
        `http://${process.env.NEXT_PUBLIC_HOST_URL}/service/houses/1/water`,
        {
          next: { revalidate: 60 }, // Revalidate every 60 seconds
        },
      );
      waterSetData(await waterCosts.json());
      const environmentData = await fetch(
        `http://${process.env.NEXT_PUBLIC_HOST_URL}/service/houses/1/environment`,
        {
          next: { revalidate: 60 }, // Revalidate every 60 seconds
        },
      );
      environmentSetData(await environmentData.json());
    }

    fetchData().catch(console.error);
    const interval = setInterval(() => {
      fetchData().catch(console.error);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [displayText, setDisplayText] = useState("gCO₂eq/kWh");
  const selfSufficiency =
    data.length !== 0 ? data[data.length - 1].house_self_sufficiency : 0;

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 700) {
        setDisplayText("");
      } else {
        setDisplayText("gCO₂eq/kWh");
      }
    };

    handleResize(); // Call initially to set the text based on window size

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="space-y-4">
      <CardHome className="col-span-3 flex overflow-hidden">
        <div>
          <CardHomeHeader>
            <CardTitle className="flex">
              {selfSufficiency === 100 ? (
                <p>
                  Your house is currently{" "}
                  <span className="text-green-700">carbon neutral.</span>
                </p>
              ) : (
                <p>
                  Your house is currently{" "}
                  <span className="text-red-400">not carbon neutral.</span>
                </p>
              )}
              {/* <p>
                Your house is currently{" "}
                <span className="text-green-700">carbon neutral.</span>
              </p> */}
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
            href="/home"
            className="rounded-lg bg-accent px-5 py-3 text-base font-bold"
          >
            {environmentData.length !== 0
              ? environmentData[environmentData.length - 1].emissions
              : "0"}{" "}
            {displayText}
          </Link>
        </div>
      </CardHome>

      <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href={"/home"}>
          <Card className="overflow-hidden">
            <CardHeader className="pb-6">
              <CardTitle>Water output now</CardTitle>
              <CardDescription>In Litters (L)</CardDescription>
            </CardHeader>
            <CardContent noPadding>
              <div className="grid">
                <p className="absolute inline-block justify-self-center fill-primary pt-5 text-3xl font-bold text-blue-400">
                  {waterData.length !== 0
                    ? waterData[waterData.length - 1].total.toFixed(1)
                    : "0"}{" "}
                  L
                </p>
                <Wave
                  fill="#60A5FA"
                  options={{
                    height: 80,
                    amplitude: 5,
                    speed: 0.25,
                    points: 4,
                  }}
                />
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
              <CardTitle>Devices</CardTitle>
              <CardDescription className="pb-4">
                The more power consuming devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <DevicesCard>
                  <div className="flex items-center justify-between">
                    <MaterialSymbol
                      icon="vacuum"
                      size={24}
                      className="pl-3"
                    ></MaterialSymbol>
                    <CardHeader>Aspirador</CardHeader>
                  </div>
                  <Button className="bg-orange-300 pl-2 pr-2">
                    <MaterialSymbol
                      icon="close"
                      size={24}
                      color="black"
                    ></MaterialSymbol>
                  </Button>
                </DevicesCard>
                <DevicesCard>
                  <div className="flex items-center justify-between">
                    <MaterialSymbol
                      icon="electric_car"
                      size={24}
                      className="pl-3"
                    ></MaterialSymbol>
                    <CardHeader>Tesla Charger</CardHeader>
                  </div>
                  <Button className="bg-orange-300 pl-2 pr-2">
                    <MaterialSymbol
                      icon="close"
                      size={24}
                      color="black"
                    ></MaterialSymbol>
                  </Button>
                </DevicesCard>
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

        <Link href={"/home/electricity"}>
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
                    {data.length !== 0
                      ? data[data.length - 1].house_solar
                      : "0"}
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
              <CardTitle>Self suficiency</CardTitle>
              <CardDescription>Green source percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid p-14">
                <p className="inline-block justify-self-center fill-primary text-3xl font-bold text-green-700">
                  {data.length !== 0
                    ? data[data.length - 1].house_self_sufficiency
                    : "0"}{" "}
                  % green
                </p>
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
              <CardTitle>Costs summary</CardTitle>
              <CardDescription>In Euros (€)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid space-y-3 pb-6 pt-4">
                <p className="pl-2 inline-block fill-primary text-xl font-normal dark:fill-sky-600">
                  Electricity cost:
                  <span className="font-bold">
                    {costData[costData.length - 1]?.electricity || " 0"} €
                  </span>
                </p>
                <p className="pl-2 inline-block fill-primary text-xl font-normal dark:fill-sky-600">
                  Water cost:
                  <span className="font-bold">
                    {costData[costData.length - 1]?.water || " 0"} €
                  </span>
                </p>
                <p className="pl-2 inline-block fill-primary text-xl font-normal dark:fill-sky-600">
                  Total cost today:
                  <span className="font-bold">
                    {costData[costData.length - 1]?.today || " 0"} €
                  </span>
                </p>
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
    </div>
  );
}
