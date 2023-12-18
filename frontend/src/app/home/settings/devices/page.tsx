"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MaterialSymbol } from "react-material-symbols";
import { Device } from "../../devices/page";
import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useCookies } from "next-client-cookies";
import { User } from "@/app/login/user";

export default function Devices() {
  const cookies = useCookies();
  const user: User = JSON.parse(cookies.get("currentUser") ?? "");
  const [data, setData] = useState<Device[]>([]);

  // Fetch data from API
  useEffect(() => {
    const ws = new SockJS(`http://${process.env.NEXT_PUBLIC_HOST_URL}/api/ws`);
    const client = Stomp.over(ws);

    client.connect(
      {},
      () => {
        client.subscribe("/houses/1/devices", function (new_data) {
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
        )}/devices`,
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="flex items-center gap-4 rounded-card bg-background p-4 md:col-span-2 lg:col-span-3">
        <Link href="/home/settings">
          <Button className="h-fit p-1">
            <MaterialSymbol icon="arrow_back" size={24} />
          </Button>
        </Link>
        <div>
          <p className="text-lg font-bold">Manage this house&apos;s devices</p>
          <p>Ready to add one more IoT device?</p>
        </div>
      </div>
      {data.map((device) => (
        <div key={device.id} className="rounded-card bg-background p-4">
          <p>{device.name}</p>
        </div>
      ))}
    </div>
  );
}
