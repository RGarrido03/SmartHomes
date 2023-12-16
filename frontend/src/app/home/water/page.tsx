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
import { MaterialSymbol } from "react-material-symbols";
import { useCookies } from "next-client-cookies";
import { User } from "@/app/login/user";

//websocket
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { toast } from "@/components/ui/use-toast";

type WaterDataProps = {
  time: string;
  kitchen: number;
  bath: number;
  garden: number;
  other: number;
  total: number;
  forecast_today: number;
}[];

type NotificationDataProps = {
  message: string;
  notification_type: string;
  notification_severity: string;
};

export default function Water() {
  const [data, setData] = useState<WaterDataProps>([]);
  const [notificationData, setNotificationData] =
    useState<NotificationDataProps>();
  const cookies = useCookies();
  const user: User = JSON.parse(cookies.get("currentUser") ?? "");

  function showNotification(notificationData: NotificationDataProps) {
    if (notificationData && Object.keys(notificationData).length > 0) {
      toast({
        variant: "destructive",
        title: notificationData.notification_type,
        description: notificationData.message,
      });
    }
  }

  useEffect(() => {
    if (notificationData) {
      showNotification(notificationData);
    }
  }, [notificationData]);

  useEffect(() => {
    const ws = new SockJS(`http://${process.env.NEXT_PUBLIC_HOST_URL}/api/ws`);
    const client = Stomp.over(ws);

    client.connect(
      {},
      () => {
        client.subscribe("/houses/1/water", function (new_data) {
          console.log("New notification: ", JSON.parse(new_data.body));
          setData((old) => [...old, JSON.parse(new_data.body)]);
        });
        // notifications
        client.subscribe("/houses/1/notification/water", function (new_data) {
          const parsedData = JSON.parse(new_data.body);
          setNotificationData(parsedData);
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
        )}/water`,
        {
          next: { revalidate: 60 }, // Revalidate every 60 seconds
          headers: {
            Authorization: "Bearer " + user.token,
          },
        },
      );
      setData(await temp.json());

      const notificationResponse = await fetch(
        `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/houses/${cookies.get(
          "house",
        )}/notification`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        },
      );
      const notificationData = await notificationResponse.json();
      setNotificationData(notificationData);
    }

    fetchData().catch(console.error);
  }, [user.token, cookies]);
  //   async function fetchData() {
  //     const temp = await fetch(
  //       `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/houses/1/water`,
  //       {
  //         next: { revalidate: 60 }, // Revalidate every 60 seconds
  //         headers: {
  //           Authorization: "Bearer " + user.token,
  //         },
  //       },
  //     );
  //     setData(await temp.json());
  //   }

  //   fetchData().catch(console.error);
  //   const interval = setInterval(() => {
  //     fetchData().catch(console.error);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [user.token]);

  return (
    <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <TitleCard text="Keep track of water consumptions." />

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Water flow</CardTitle>
          <CardDescription>Be aware of water wasted in baths.</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 flex-row items-center">
          <div className="flex flex-col gap-16">
            <div className="flex aspect-square w-16 flex-col items-center justify-center gap-1 rounded-full border-2 border-secondary p-2">
              <MaterialSymbol icon="soap" size={24} />
              <p className="text-xs text-secondary-foreground">
                {data.length !== 0 ? data[data.length - 1].bath : 0}
              </p>
            </div>
            <div className="flex aspect-square w-16 flex-col items-center justify-center gap-1 rounded-full border-2 border-secondary p-2">
              <MaterialSymbol icon="oven_gen" size={24} />
              <p className="text-xs text-secondary-foreground">
                {data.length !== 0 ? data[data.length - 1].kitchen : 0}
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
              {data.length !== 0 ? data[data.length - 1].total : 0}
            </p>
          </div>

          <div className="flex-1">
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
          </div>

          <div className="flex flex-col gap-16">
            <div className="flex aspect-square w-16 flex-col items-center justify-center gap-1 rounded-full border-2 border-secondary p-2">
              <MaterialSymbol icon="hot_tub" size={24} />
              <p className="text-xs text-secondary-foreground">
                {data.length !== 0 ? data[data.length - 1].bath : 0}
              </p>
            </div>
            <div className="flex aspect-square w-16 flex-col items-center justify-center gap-1 rounded-full border-2 border-secondary p-2">
              <MaterialSymbol icon="deceased" size={24} />
              <p className="text-xs text-secondary-foreground">
                {data.length !== 0 ? data[data.length - 1].garden : 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>
            {data.length !== 0 ? data[data.length - 1].total : 0} L
          </CardTitle>
          <CardDescription>Water consumption until now</CardDescription>
        </CardHeader>
        <CardContent className="text-center" noPadding>
          <div className=" text-2xl">
            <br />
            <p className="font-semibold">
              {" "}
              {data.length !== 0 ? data[data.length - 1].bath : 0} L
            </p>
            <p>Forecast for today</p>
            <br />
            <p className="font-semibold">
              {data.length !== 0 ? data[data.length - 1].other : 0} L
            </p>
            <p>Yesterday</p>
          </div>

          <CustomAreaChart
            data={data}
            dataKey="total"
            className="fill-sky-300 dark:fill-sky-600"
            unitOfMeasurement="L"
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>You are wasting less water</CardTitle>
          <CardDescription>comparing to last week</CardDescription>
        </CardHeader>
        <CardContent className="text-center" noPadding>
          <div className=" text-2xl">
            <br />
            <p className="font-semibold">
              {data.length !== 0 ? data[data.length - 1].forecast_today : 0} L
            </p>
            <p>Last week</p>
            <br />
            <p className="font-semibold">
              {data.length !== 0 ? data[data.length - 1].total : 0} L
            </p>
            <p>This week</p>
          </div>

          <CustomAreaChart
            data={data}
            dataKey="total"
            className="fill-sky-300 dark:fill-sky-600"
            unitOfMeasurement="L"
          />
        </CardContent>
      </Card>
    </div>
  );
}

