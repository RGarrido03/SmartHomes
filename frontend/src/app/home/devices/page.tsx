"use client";

import { TitleCard } from "@/components/title-card";
import { useCallback, useEffect, useState } from "react";
import { RoomCard } from "@/components/room-card";
import { useCookies } from "next-client-cookies";
import { User } from "@/app/login/user";
import { MaterialSymbol } from "react-material-symbols";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    async function fetchData() {
      const temp = await fetch(
        `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/houses/1/devices`,
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
    const interval = setInterval(() => {
      fetchData().catch(console.error);
    }, 5000);
    return () => clearInterval(interval);
  }, [user.token]);

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
          <RoomCard key={room.name} room={room} />
        ))}
      </div>
      {(dataByRoom === null || dataByRoom.length === 0) && (
        <div className="mt-8 flex flex-1 flex-col justify-center text-center">
          <MaterialSymbol icon="error" size={48} className="text-center" />
          <p className="text-center text-lg font-bold">
            Oops! It looks like you don&apos;t have any device yet.
          </p>
          <p>Start by creating one.</p>
          <Link href="/home/settings/devices" className="mt-4 self-center">
            <Button className="flex gap-2 font-bold">
              <MaterialSymbol icon="north_east" size={24} />
              Add device
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
