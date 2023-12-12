"use client";

import { TitleCard } from "@/components/title-card";
import { useCallback, useEffect, useState } from "react";
import { RoomCard } from "@/components/room-card";
import { useCookies } from "next-client-cookies";
import { User } from "@/app/login/user";
import { MaterialSymbol } from "react-material-symbols";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewDeviceForm } from "./form";
//websocket
import SockJS from "sockjs-client";
import Stomp from "stompjs";

type Device = {
  id: number;
  name: string;
  type:
    | "TV"
    | "SOLARPV"
    | "WINDTURBINE"
    | "PLUG"
    | "GRIDMETER"
    | "AC"
    | "LIGHT"
    | "SMARTASSISTANT"
    | "CARCARGER"
    | "VACUUM"
    | "DESUMIDIFIER"
    | "OVEN";
  houseArea: string;
  on: boolean;
  power: number;
};

export type Room = {
  name: string;
  power: number;
  devices: Device[];
};

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

  // A useCallback is used to keep function after re-render.
  const organizeDataByRoom = useCallback(() => {
    //In the case that the array is empty (0 devices)
    if (!Array.isArray(data)) {
      return [];
    }

    const temp = data.reduce((accumulator: Room[], currentValue: Device) => {
      let houseArea = accumulator.find(
        (area) => area.name === currentValue.houseArea,
      );

      if (!houseArea) {
        houseArea = {
          name: currentValue.houseArea,
          power: 0,
          devices: [],
        };
        accumulator.push(houseArea);
      }

      houseArea.devices.push(currentValue);

      if (currentValue.on) {
        houseArea.power += currentValue.power;
      }

      return accumulator;
    }, []);

    return temp;
  }, [data]);

  // Organize devices by room
  const [dataByRoom, setDataByRoom] = useState<Room[]>(organizeDataByRoom());
  useEffect(() => {
    setDataByRoom(organizeDataByRoom());
  }, [data, organizeDataByRoom]);

  return (
    <>
      <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TitleCard text="Control your devices to improve your house's energy efficiency." />

        {dataByRoom.map((room) => (
          <RoomCard key={room.name} room={room} token={user.token} />
        ))}
      </div>
      {(dataByRoom === null || dataByRoom.length === 0) && (
        <div className="mt-8 flex flex-1 flex-col justify-center text-center">
          <MaterialSymbol icon="error" size={48} className="text-center" />
          <p className="text-center text-lg font-bold">
            Oops! It looks like you don&apos;t have any device yet.
          </p>
          <p>Start by creating one.</p>
        </div>
      )}
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4 flex gap-2 font-bold">
              <MaterialSymbol icon="add" size={24} />
              Add device
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a new device</DialogTitle>
              <DialogDescription>
                Input your device&apos;s data. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <NewDeviceForm />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
