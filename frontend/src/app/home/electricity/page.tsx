"use client";

import { CustomAreaChart } from "@/components/area-chart";
import { CustomLineChart } from "@/components/line-chart";
import { TitleCard } from "@/components/title-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export default function Electricity() {
  const [data, setData] = useState<ElectricityDataProps>([]);

  useEffect(() => {
    async function fetchData() {
      const temp = await fetch("http://localhost/api/house/0/electricity", {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      });
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
      <TitleCard text="Check your electricity sources." />

      <Card className="overflow-hidden">
        <CardHeader icon="solar_power">
          <CardTitle>
            {data.length !== 0 ? data[data.length - 1].house_solar : "0"} W
          </CardTitle>
          <CardDescription>Solar PV generation</CardDescription>
        </CardHeader>
        <CardContent noPadding>
          <CustomAreaChart
            data={data}
            dataKey="house_solar"
            className="fill-yellow-300 dark:fill-yellow-600"
            unitOfMeasurement="W"
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader icon="wind_power">
          <CardTitle>
            {data.length !== 0 ? data[data.length - 1].house_wind : "0"} W
          </CardTitle>
          <CardDescription>Wind generation</CardDescription>
        </CardHeader>
        <CardContent noPadding>
          <CustomAreaChart
            data={data}
            dataKey="house_wind"
            className="fill-sky-300 dark:fill-sky-600"
            unitOfMeasurement="W"
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader icon="compare_arrows">
          <CardTitle>
            {data.length !== 0
              ? data[data.length - 1].house_grid_exchange
              : "0"}{" "}
            W
          </CardTitle>
          <CardDescription>Grid exchange</CardDescription>
        </CardHeader>
        <CardContent noPadding>
          <CustomAreaChart
            data={data}
            dataKey="house_grid_exchange"
            className="fill-emerald-300 dark:fill-emerald-600"
            unitOfMeasurement="W"
          />
        </CardContent>
      </Card>

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
              className="w-full flex-1 -scale-y-100"
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
                className="stroke-secondary"
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
      </Card>

      <Card className="overflow-hidden">
        <CardHeader icon="electric_meter">
          <CardTitle>Self production stats</CardTitle>
          <CardDescription>For today</CardDescription>
        </CardHeader>
        <CardContent noPadding>
          <CustomLineChart
            data={data}
            dataKey="house_solar"
            className="fill-emerald-300 stroke-emerald-300 dark:fill-emerald-600 dark:stroke-emerald-600"
            unitOfMeasurement="W"
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Most power-intensive appliances</CardTitle>
          <CardDescription>Right now</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <p className="font-semibold">Air conditioner</p>
              <p>2600 W</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-semibold">Dehumidifier</p>
              <p>350 W</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-semibold">Oven</p>
              <p>100 W</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
