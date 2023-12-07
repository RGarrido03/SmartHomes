"use client";

import { CustomAreaChart } from "@/components/area-chart";
import { TitleCard } from "@/components/title-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

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

export default function Environment() {
  const [data] = useState<ElectricityDataProps>([]);

  return (
    <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <TitleCard text="Take a look at your environmental impact." />

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>
            {data.length !== 0 ? data[data.length - 1].house_solar : "0"}%
            renewable energy
          </CardTitle>
          <CardDescription>in the past 12 hours</CardDescription>
        </CardHeader>
        <CardContent noPadding>
          <CustomAreaChart
            data={data}
            dataKey="house_solar"
            className="fill-yellow-300 dark:fill-yellow-600"
            unitOfMeasurement="%"
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader icon="bolt">
          <CardTitle>
            {data.length !== 0 ? data[data.length - 1].house_wind : "0"}% energy
            used
          </CardTitle>
          <CardDescription>from self production</CardDescription>
        </CardHeader>
        <CardContent noPadding>
          <CustomAreaChart
            data={data}
            dataKey="house_wind"
            className="fill-sky-300 dark:fill-sky-600"
            unitOfMeasurement="%"
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>
            {data.length !== 0
              ? data[data.length - 1].house_grid_exchange
              : "0"}{" "}
            gCO₂eq/hour
          </CardTitle>
          <CardDescription>Home carbon emissions</CardDescription>
        </CardHeader>
        <CardContent noPadding>
          <CustomAreaChart
            data={data}
            dataKey="house_grid_exchange"
            className="fill-emerald-300 dark:fill-emerald-600"
            unitOfMeasurement="%"
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Renewable energy forecast</CardTitle>
          <CardDescription>per day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <p className="font-semibold">Today</p>
              <p>85%</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-semibold">Tomorrow</p>
              <p>90%</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-semibold">Wednesday</p>
              <p>78%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Renewable energy forecast</CardTitle>
          <CardDescription>per hour</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <p className="font-semibold">9:00</p>
              <p>70%</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-semibold">10:00</p>
              <p>92%</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-semibold">11:00</p>
              <p>85%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Fossil fuel energy consumption</CardTitle>
          <CardDescription>per home appliance today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <p className="font-semibold">Air conditioner</p>
              <p>350 g</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-semibold">Dehumidifier</p>
              <p>148 g</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-semibold">Oven</p>
              <p>50 g</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
