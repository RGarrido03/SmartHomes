"use client";

import { TitleCard } from "@/components/title-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

const data = [
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

function CustomTooltip({
  payload,
  label,
  active,
}: TooltipProps<number, number>) {
  if (active) {
    return (
      <div className="rounded-lg bg-popover px-4 py-3 shadow dark:shadow-lg">
        <p className="font-semibold">{payload ? payload[0].value : 0} W</p>
        <p className="text-sm">{label}</p>
      </div>
    );
  }

  return null;
}

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
          <ResponsiveContainer width={"100%"} height={160}>
            <AreaChart
              data={data}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="solar"
                stroke="#8884d8"
                fill="#8884d8"
                strokeWidth={0}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader icon="wind_power">
          <CardTitle>1300 W</CardTitle>
          <CardDescription>Wind generation</CardDescription>
        </CardHeader>
        <CardContent noPadding>
          <svg
            viewBox="0 0 343 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rounded-b-card"
          >
            <path
              className="fill-sky-300 dark:fill-sky-600"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 31.6484L3.05044 28.4835C7.1177 25.3187 13.2186 17.9341 20.3363 25.3187C26.4372 31.6484 33.5549 53.8022 40.6726 65.4066C46.7735 78.0659 53.8912 82.2857 61.0089 70.6813C67.1098 60.1319 74.2275 35.8681 80.3284 36.9231C87.4461 39.033 94.5638 67.5165 100.665 67.5165C107.782 67.5165 113.883 39.033 121.001 36.9231C128.119 35.8681 134.22 60.1319 141.337 64.3517C148.455 67.5165 154.556 49.5824 161.674 49.5824C167.774 49.5824 174.892 67.5165 182.01 67.5165C188.111 67.5165 195.228 49.5824 201.329 35.8681C208.447 21.0989 215.565 10.5495 221.666 20.044C228.783 28.4835 235.901 56.967 242.002 59.0769C249.12 60.1319 255.221 35.8681 262.338 23.2088C269.456 10.5495 275.557 10.5495 282.675 14.7692C288.775 17.9341 295.893 25.3187 303.011 25.3187C309.112 25.3187 316.229 17.9341 322.33 12.6593C329.448 7.38462 336.566 3.16484 339.616 2.10989L342.667 0V96H339.616C336.566 96 329.448 96 322.33 96C316.229 96 309.112 96 303.011 96C295.893 96 288.775 96 282.675 96C275.557 96 269.456 96 262.338 96C255.221 96 249.12 96 242.002 96C235.901 96 228.783 96 221.666 96C215.565 96 208.447 96 201.329 96C195.228 96 188.111 96 182.01 96C174.892 96 167.774 96 161.674 96C154.556 96 148.455 96 141.337 96C134.22 96 128.119 96 121.001 96C113.883 96 107.782 96 100.665 96C94.5638 96 87.4461 96 80.3284 96C74.2275 96 67.1098 96 61.0089 96C53.8912 96 46.7735 96 40.6726 96C33.5549 96 26.4372 96 20.3363 96C13.2186 96 7.1177 96 3.05044 96H0V31.6484Z"
              fill="#1F7EAD"
            />
          </svg>
        </CardContent>
      </Card>

      <Card>
        <CardHeader icon="compare_arrows">
          <CardTitle>-400 W</CardTitle>
          <CardDescription>Grid exchange</CardDescription>
        </CardHeader>
        <CardContent noPadding>
          <svg
            viewBox="0 0 343 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rounded-b-card"
          >
            <path
              className="fill-emerald-300 dark:fill-emerald-600"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 31.6484L3.05044 28.4835C7.1177 25.3187 13.2186 17.9341 20.3363 25.3187C26.4372 31.6484 33.5549 53.8022 40.6726 65.4066C46.7735 78.0659 53.8912 82.2857 61.0089 70.6813C67.1098 60.1319 74.2275 35.8681 80.3284 36.9231C87.4461 39.033 94.5638 67.5165 100.665 67.5165C107.782 67.5165 113.883 39.033 121.001 36.9231C128.119 35.8681 134.22 60.1319 141.337 64.3517C148.455 67.5165 154.556 49.5824 161.674 49.5824C167.774 49.5824 174.892 67.5165 182.01 67.5165C188.111 67.5165 195.228 49.5824 201.329 35.8681C208.447 21.0989 215.565 10.5495 221.666 20.044C228.783 28.4835 235.901 56.967 242.002 59.0769C249.12 60.1319 255.221 35.8681 262.338 23.2088C269.456 10.5495 275.557 10.5495 282.675 14.7692C288.775 17.9341 295.893 25.3187 303.011 25.3187C309.112 25.3187 316.229 17.9341 322.33 12.6593C329.448 7.38462 336.566 3.16484 339.616 2.10989L342.667 0V96H339.616C336.566 96 329.448 96 322.33 96C316.229 96 309.112 96 303.011 96C295.893 96 288.775 96 282.675 96C275.557 96 269.456 96 262.338 96C255.221 96 249.12 96 242.002 96C235.901 96 228.783 96 221.666 96C215.565 96 208.447 96 201.329 96C195.228 96 188.111 96 182.01 96C174.892 96 167.774 96 161.674 96C154.556 96 148.455 96 141.337 96C134.22 96 128.119 96 121.001 96C113.883 96 107.782 96 100.665 96C94.5638 96 87.4461 96 80.3284 96C74.2275 96 67.1098 96 61.0089 96C53.8912 96 46.7735 96 40.6726 96C33.5549 96 26.4372 96 20.3363 96C13.2186 96 7.1177 96 3.05044 96H0V31.6484Z"
            />
          </svg>
        </CardContent>
      </Card>
    </div>
  );
}
