"use client";

import { TitleCard } from "@/components/title-card";
import { useCallback, useEffect, useState } from "react";
import { RoomCard } from "@/components/room-card";

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
  /*
    README: Fetch data
    You should use a useEffect to fetch data from the API.
    Also, the "data" useState initial state will be [] instead of the dummy data.
    API link: /service/houses/1/electricity
    Will be changed in the future to accommodate a non-hardcoded house ID.
    Refer to the electricity page on how to implement it.
  */

  const [data, setData] = useState<Device[]>([
    /*{
      id: 1,
      type: "LIGHT",
      name: "Light",
      houseArea: "Living Room",
      on: true,
      power: 1114,
    },
    {
      id: 2,
      type: "AC",
      name: "Air conditioner",
      houseArea: "Living Room",
      on: true,
      power: 182,
    },
    {
      id: 3,
      type: "TV",
      name: "TV",
      houseArea: "Kitchen",
      on: true,
      power: 45,
    },
    {
      id: 4,
      type: "DESUMIDIFIER",
      name: "Dehumidifier",
      houseArea: "Kitchen",
      on: false,
      power: 0,
    },*/
  ]);

  //fetch data from API
  useEffect(() => {
    async function fetchData(){
      const temp = await fetch(
          `http://${process.env.NEXT_PUBLIC_HOST_URL}/service/house/0/devices`,
          {
            next: {revalidate: 60}, //every 60 seconds revalidate
          },
      );
      setData(await temp.json())

      //Certificates that is an array coming from the API
      if (Array.isArray(temp)){
          setData(temp);
      }
    }

    fetchData().catch(console.error);
    const interval = setInterval(() =>{
      fetchData().catch(console.error);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // A useCallback is used to keep function after re-render.
  const organizeDataByRoom = useCallback(() => {
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
    <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <TitleCard text="Control your devices to improve your house's energy efficiency." />

      {dataByRoom.map((room) => (
        <RoomCard key={room.name} room={room} />
      ))}
    </div>
  );
}
