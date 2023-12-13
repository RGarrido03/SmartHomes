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
import { useState, useEffect } from "react";
import {useCookies} from "next-client-cookies";
import {User} from "@/app/login/user";

type EnvironmentDataProps = {
  time: string;
  self_sufficiency: number;
  renewable: number;
  emissions: number;
  renewable_forecast_day: [];
  renewable_forecast_hour: [];
}[];

export default function Environment() {
  const cookies = useCookies();
  const user: User = JSON.parse(cookies.get("currentUser") ?? "");
  const [data,setData] = useState<EnvironmentDataProps>([]);

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      const temp = await fetch(
          `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/houses/1/environment`,
          {
            next: {revalidate: 60}, // Revalidate every 60 seconds
            headers: {
              Authorization: "Bearer " + user.token,
            },
          },
      );
      setData(await temp.json());
    }

    fetchData().catch(console.error);
    const interval = setInterval(() => {
      fetchData().catch(console.error);
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <TitleCard text="Take a look at your environmental impact." />

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>
            {data.length !== 0 ? data[data.length - 1].renewable : "0"}%
            renewable energy
          </CardTitle>
          <CardDescription>in the past 12 hours</CardDescription>
        </CardHeader>
        <CardContent noPadding>
          <CustomAreaChart
            data={data}
            dataKey="renewable"
            className="fill-yellow-300 dark:fill-yellow-600"
            unitOfMeasurement="%"
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader icon="bolt">
          <CardTitle>
            {data.length !== 0 ? data[data.length - 1].self_sufficiency : "0"}% energy
            used
          </CardTitle>
          <CardDescription>from self production</CardDescription>
        </CardHeader>
        <CardContent noPadding>
          <CustomAreaChart
            data={data}
            dataKey="self_sufficiency"
            className="fill-sky-300 dark:fill-sky-600"
            unitOfMeasurement="%"
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>
            {data.length !== 0
              ? data[data.length - 1].emissions
              : "0"}{" "}
            gCO₂eq/hour
          </CardTitle>
          <CardDescription>Home carbon emissions</CardDescription>
        </CardHeader>
        <CardContent noPadding>
          <CustomAreaChart
            data={data}
            dataKey="emissions"
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
              <p>{data.length !== 0 ? data[data.length - 1].renewable_forecast_day.at(0) : "0"}%</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-semibold">Tomorrow</p>
              <p>{data.length !== 0 ? data[data.length - 1].renewable_forecast_day.at(1) : "0"}%</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-semibold">Wednesday</p>
              <p>{data.length !== 0 ? data[data.length - 1].renewable_forecast_day.at(2) : "0"}%</p>
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
              <p>{data.length !== 0 ? data[data.length - 1].renewable_forecast_hour.at(0) : "0"}%</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-semibold">10:00</p>
              <p>{data.length !== 0 ? data[data.length - 1].renewable_forecast_hour.at(1): "0"}%</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-semibold">11:00</p>
              <p>{data.length !== 0 ? data[data.length - 1].renewable_forecast_hour.at(2) : "0"}%</p>
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
