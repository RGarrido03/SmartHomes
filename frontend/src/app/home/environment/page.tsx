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
import { useCookies } from "next-client-cookies";
import { User } from "@/app/login/user";

//websocket
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { toast } from "@/components/ui/use-toast";

type EnvironmentDataProps = {
  time: string;
  self_sufficiency: number;
  renewable: number;
  emissions: number;
  renewable_forecast_day: number[];
  renewable_forecast_hour: number[];
}[];

type NotificationDataProps = {
  message: string;
  notification_type: string;
  notification_severity: string;
};

export default function Environment() {
  const [data, setData] = useState<EnvironmentDataProps>([]);
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
        client.subscribe("/houses/1/environment", function (new_data) {
          console.log("New notification: ", JSON.parse(new_data.body));
          setData((old) => [...old, JSON.parse(new_data.body)]);
        });
        // notifications
        client.subscribe("/houses/1/notification/power", function (new_data) {
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
        )}/environment`,
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
            className="fill-emerald-300 dark:fill-emerald-600"
            unitOfMeasurement="W"
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader icon="bolt">
          <CardTitle>
            {data.length !== 0 ? data[data.length - 1].self_sufficiency : "0"}%
            energy used
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
            {data.length !== 0 ? data[data.length - 1].emissions : "0"}{" "}
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
              <p>
                {data.length !== 0
                  ? data[data.length - 1].renewable_forecast_day[0]
                  : "0"}
                %
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-semibold">Tomorrow</p>
              <p>
                {data.length !== 0
                  ? data[data.length - 1].renewable_forecast_day[1]
                  : "0"}
                %
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-semibold">Wednesday</p>
              <p>
                {data.length !== 0
                  ? data[data.length - 1].renewable_forecast_day[2]
                  : "0"}
                %
              </p>
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
              <p>
                {data.length !== 0
                  ? data[data.length - 1].renewable_forecast_hour[0]
                  : "0"}
                %
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-semibold">10:00</p>
              <p>
                {data.length !== 0
                  ? data[data.length - 1].renewable_forecast_hour[1]
                  : "0"}
                %
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-semibold">11:00</p>
              <p>
                {data.length !== 0
                  ? data[data.length - 1].renewable_forecast_hour[2]
                  : "0"}
                %
              </p>
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
