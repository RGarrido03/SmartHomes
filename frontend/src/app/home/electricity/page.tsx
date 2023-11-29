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

const data = [
  {
    name: "Page A",
    solar: 2500,
  },
  {
    name: "Page A",
    solar: 4000,
  },
  {
    name: "Page B",
    solar: 3000,
  },
  {
    name: "Page C",
    solar: 2000,
  },
  {
    name: "Page D",
    solar: 2780,
  },
  {
    name: "Page E",
    solar: 1890,
  },
  {
    name: "Page F",
    solar: 2390,
  },
  {
    name: "Page G",
    solar: 3490,
  },
];

export default function Electricity() {
  return (
    <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <TitleCard text="Check your electricity sources." />

      <Card className="overflow-hidden">
        <CardHeader icon="solar_power">
          <CardTitle>2500 W</CardTitle>
          <CardDescription>Solar PV generation</CardDescription>
        </CardHeader>
        <CardContent noPadding>
          <CustomAreaChart
            data={data}
            dataKey="solar"
            className="fill-yellow-300 dark:fill-yellow-600"
            unitOfMeasurement="W"
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader icon="wind_power">
          <CardTitle>1300 W</CardTitle>
          <CardDescription>Wind generation</CardDescription>
        </CardHeader>
        <CardContent noPadding>
          <CustomAreaChart
            data={data}
            dataKey="solar"
            className="fill-sky-300 dark:fill-sky-600"
            unitOfMeasurement="W"
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader icon="compare_arrows">
          <CardTitle>-400 W</CardTitle>
          <CardDescription>Grid exchange</CardDescription>
        </CardHeader>
        <CardContent noPadding>
          <CustomAreaChart
            data={data}
            dataKey="solar"
            className="fill-emerald-300 dark:fill-emerald-600"
            unitOfMeasurement="W"
          />
        </CardContent>
      </Card>
    </div>
  );
}
