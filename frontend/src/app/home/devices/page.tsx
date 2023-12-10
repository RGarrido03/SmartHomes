"use client";

import { TitleCard } from "@/components/title-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { Button } from "@/components/ui/button";

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

type Room = {
  name: string;
  power: number;
  devices: Device[];
};

export default function Devices() {
  const [data, setData] = useState<Device[]>([
    {
      id: 1,
      type: "LIGHT",
      name: "Light",
      houseArea: "Living Room",
      on: false,
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
      id: 2,
      type: "TV",
      name: "TV",
      houseArea: "Kitchen",
      on: true,
      power: 45,
    },
  ]);

  const [dataByRoom, setDataByRoom] = useState<Room[]>([]);

  // Organize devices by room
  useEffect(() => {
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

    setDataByRoom(temp);
  }, [data]);

  return (
    <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <TitleCard text="Control your devices to improve your house's energy efficency." />

      <Card className="overflow-hidden">
        <CardHeader icon="scene">
          <CardTitle>Room Name</CardTitle>
          <CardDescription>
            Using {data.length !== 0 ? data[data.length - 1].watts : "0"} W
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-row items-center">
          <Button variant="outline">
            <MaterialSymbol icon="mode_fan" size={40} />
            <p className="text-primary-foreground">AC</p>
            <p className="text-primary-foreground">420 W</p>
          </Button>
          <Button variant="outline">
            <br />
            <MaterialSymbol icon="mode_fan" size={40} />
            <p className="text-primary-foreground">AC</p>
            <p className="text-primary-foreground">420 W</p>
          </Button>
          <Button variant="outline">
            <br />
            <MaterialSymbol icon="mode_fan" size={40} />
            <p className="text-primary-foreground">AC</p>
            <p className="text-primary-foreground">420 W</p>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
