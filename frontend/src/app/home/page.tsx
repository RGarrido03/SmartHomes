"use client";

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
import Wave from "react-wavify";
import { useState, useEffect } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { Button } from "@/components/ui/button";
import { useCookies } from "next-client-cookies";
import { User } from "@/app/login/user";
import { deviceTypes } from "../home/devices/types";
//websocket
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Device } from "./devices/page";

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
};

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
  const [costData, setCostData] = useState<CostDataProps>();
  const [waterData, setWaterData] = useState<WaterValues>([]);
  const [environmentData, setEnvironmentData] = useState<EnvironmentData>([]);
  const [deviceData, setDeviceData] = useState<Device[]>([]);

  const cookies = useCookies();
  const user: User = JSON.parse(cookies.get("currentUser") ?? "");

  useEffect(() => {
    const ws = new SockJS(`http://${process.env.NEXT_PUBLIC_HOST_URL}/api/ws`);
    const client = Stomp.over(ws);

    client.connect(
      {},
      () => {
        // electricity
        client.subscribe(`/houses/${cookies.get("house")}/electricity`, function (new_data) {
          const parsedData = JSON.parse(new_data.body);
          setCostData(parsedData);
        });
        // costs
        client.subscribe(`/houses/${cookies.get("house")}/costs`, function (new_data) {
          const parsedData = JSON.parse(new_data.body);
          setCostData(parsedData);
        });
        // water
        client.subscribe(`/houses/${cookies.get("house")}/water`, function (new_data) {
          setWaterData((old) => [...old, JSON.parse(new_data.body)]);
        });
        // environment
        client.subscribe(`/houses/${cookies.get("house")}/environment`, function (new_data) {
          setEnvironmentData((old) => [...old, JSON.parse(new_data.body)]);
        });
        // devices
        client.subscribe(`/houses/${cookies.get("house")}/devices`, function (new_data) {
          console.log("New notification: ", JSON.parse(new_data.body));
          const parsedData = JSON.parse(new_data.body);
          setDeviceData(parsedData);
        });
      },
      () => {
        console.error("ERROR: WEBSOCKET NOT WORKING");
      },
    );
    async function fetchData() {
      try {
        const electricityResponse = await fetch(
          `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/houses/${cookies.get(
            "house",
          )}/electricity`,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          },
        );
        const electricityData = await electricityResponse.json();
        setData(electricityData);

        const costsResponse = await fetch(
          `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/houses/${cookies.get(
            "house",
          )}/costs`,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          },
        );
        const costsData = await costsResponse.json();
        setCostData(costsData);

        const waterResponse = await fetch(
          `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/houses/${cookies.get(
            "house",
          )}/water`,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          },
        );
        const waterData = await waterResponse.json();
        setWaterData(waterData);

        const environmentResponse = await fetch(
          `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/houses/${cookies.get(
            "house",
          )}/environment`,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          },
        );
        const environmentData = await environmentResponse.json();
        setEnvironmentData(environmentData);

        const devicesResponse = await fetch(
          `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/houses/${cookies.get(
            "house",
          )}/devices`,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          },
        );
        const devicesData = await devicesResponse.json();
        devicesData(devicesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData().catch(console.error);
  }, [user.token, cookies]);

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
        {
          environmentData.length !== 0
            ? environmentData[environmentData.length - 1].emissions
            : "0";
        }
        {
          (" ");
        }
        {
          displayText;
        }
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
        <Link href={"/home/water"}>
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
                    amplitude: 8,
                    speed: 0.35,
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

        <Link href={"/home/devices"}>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Devices</CardTitle>
              <CardDescription className="pb-4">
                The more power consuming devices
              </CardDescription>
            </CardHeader>
            <CardContent className="h-36 overflow-y-auto">
              <div className="space-y-4">
                {(data === null || data.length === 0) && (
                  <div className="flex flex-1 flex-col justify-center text-center">
                    <MaterialSymbol
                      icon="error"
                      size={48}
                      className="text-center"
                    />
                    <p className="text-center text-lg font-bold">
                      Oops! It looks like you don&apos;t have any device yet.
                    </p>
                    <p>Start by creating one.</p>
                  </div>
                )}
                {deviceData.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center gap-4 rounded-card bg-secondary p-4"
                  >
                    <MaterialSymbol
                      icon={deviceTypes[device.type].icon}
                      size={24}
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{device.name}</p>
                      <p className="text-sm">{deviceTypes[device.type].name}</p>
                    </div>
                    <Button
                      variant="destructive"
                      className="h-fit p-2"
                    >
                      <MaterialSymbol icon="close" size={20} />
                    </Button>
                  </div>
                ))}
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

        <Link href={"/home/environment"}>
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

        <Link href={"/home/costs"}>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Costs summary</CardTitle>
              <CardDescription>In Euros (€)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid space-y-3 pb-6 pt-4">
                <p className="inline-block fill-primary pl-2 text-xl font-normal dark:fill-sky-600">
                  Electricity cost:{" "}
                  <span className="font-bold">
                    {costData?.electricity.toFixed(2) || " 0"} €
                  </span>
                </p>
                <p className="inline-block fill-primary pl-2 text-xl font-normal dark:fill-sky-600">
                  Water cost:{" "}
                  <span className="font-bold">
                    {costData?.water.toFixed(2) || " 0"} €
                  </span>
                </p>
                <p className="inline-block fill-primary pl-2 text-xl font-normal dark:fill-sky-600">
                  Total cost today:{" "}
                  <span className="font-bold">
                    {costData?.today.toFixed(2) || " 0"} €
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
