"use client";

import { TitleCard } from "@/components/title-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DevicesCard,
} from "@/components/ui/card";

import { useState, useEffect } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { Button } from "@/components/ui/button";

//websocket
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useCookies } from "next-client-cookies";
import { User } from "@/app/login/user";

type CostsProps = {
  electricity: number;
  water: number;
  today: number;
};

export default function Costs() {
  const [data, setData] = useState<CostsProps>();
  const cookies = useCookies();
  const user: User = JSON.parse(cookies.get("currentUser") ?? "");

  useEffect(() => {
    const ws = new SockJS(`http://${process.env.NEXT_PUBLIC_HOST_URL}/api/ws`);
    const client = Stomp.over(ws);

    client.connect(
      {},
      () => {
        client.subscribe("/houses/1/costs", function (new_data) {
          console.log("New notification: ", JSON.parse(new_data.body));
          const parsedData = JSON.parse(new_data.body);
          setData(parsedData);
        });
      },
      () => {
        console.error("Sorry, I cannot connect to the server right now.");
      },
    );

    async function fetchData() {
      const temp = await fetch(
        `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/houses/${cookies.get(
          "house",
        )}/costs`,
        {
          next: { revalidate: 60 }, // Revalidate every 60 seconds
          headers: {
            Authorization: "Bearer " + user.token,
          },
        },
      );
      setData(await temp.json());
    }

    fetchData().catch(console.error);
  }, [user.token, cookies]);

  return (
    <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <TitleCard text="Here's your expenses summary" />

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Net Expenses</CardTitle>
          <CardDescription>
            Your net expenses after considering earnings from the grid
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-10">
            <div>
              <p>Today</p>
              <p className="text-3xl font-semibold">
                {data?.today.toFixed(2) || " 0"} €
              </p>
            </div>
            <div>
              <p>Yesterday</p>
              <p className="text-3xl">356,48 €</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
          <CardDescription>Water and eletricity expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-10">
            <div>
              <MaterialSymbol
                icon="water_drop"
                size={35}
                className="text-blue-300"
              ></MaterialSymbol>
              <p>Water</p>
              <p className="text-3xl text-blue-400">
                {" "}
                {data?.water.toFixed(1) || " 0"} €
              </p>
            </div>
            <div>
              <MaterialSymbol
                icon="bolt"
                size={35}
                className="text-amber-300"
              ></MaterialSymbol>
              <p>Electricity</p>
              <p className="text-3xl text-amber-300">
                {data?.electricity.toFixed(1) || " 0"} €
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>
            Oh snap! These devices are having a power party.
          </CardTitle>
          <CardDescription>Consider adjusting them if needed.</CardDescription>
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
              <Button className="bg-orange-400 px-2">
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
              <Button className="bg-orange-400 px-2">
                <MaterialSymbol
                  icon="close"
                  size={24}
                  color="black"
                ></MaterialSymbol>
              </Button>
            </DevicesCard>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden bg-gradient-to-r from-transparent to-primary md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Expenses by month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-10 ">
            <div className="font-semibold">
              <p>November</p>
              <p className="text-3xl">{data?.today.toFixed(2) || " 0"} €</p>
            </div>
            <div>
              <p>Outubro</p>
              <p className="text-3xl">{data?.water.toFixed(2) || " 0"} €</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
