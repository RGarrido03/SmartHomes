"use client";

import { TitleCard } from "@/components/title-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { Button } from "@/components/ui/button";

type Device = {
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
  on: boolean;
};

type Room = {
  //variaveis criadas para demonstrar o pretendido mesmo dando erro
  name: string;
  watts: number;
  [key: string]: Device[];
}[];

export default function Devices() {
  const [data, setData] = useState<Room>([]);

  //Objetive create a component (card -content) with this content
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

      <Card className="overflow-hidden">
        <CardHeader icon="scene">
          <CardTitle>Room Name</CardTitle>
          <CardDescription>
            Using {data.length !== 0 ? data[data.length - 1].watts : "0"} W
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-row items-center">
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
          <Button variant="outline">
            <br />
            <MaterialSymbol icon="mode_fan" size={40} />
            <p className="text-primary-foreground">AC</p>
            <p className="text-primary-foreground">420 W</p>
          </Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader icon="scene">
          <CardTitle>Room Name</CardTitle>
          <CardDescription>
            Using {data.length !== 0 ? data[data.length - 1].watts : "0"} W
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-row items-center">
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
          <Button variant="outline">
            <br />
            <MaterialSymbol icon="mode_fan" size={40} />
            <p className="text-primary-foreground">AC</p>
            <p className="text-primary-foreground">420 W</p>
          </Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader icon="scene">
          <CardTitle>Room Name</CardTitle>
          <CardDescription>
            Using {data.length !== 0 ? data[data.length - 1].watts : "0"} W
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-row items-center">
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
          <Button variant="outline">
            <br />
            <MaterialSymbol icon="mode_fan" size={40} />
            <p className="text-primary-foreground">AC</p>
            <p className="text-primary-foreground">420 W</p>
          </Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader icon="scene">
          <CardTitle>Room Name</CardTitle>
          <CardDescription>
            Using {data.length !== 0 ? data[data.length - 1].watts : "0"} W
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-row items-center">
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
          <Button variant="outline">
            <br />
            <MaterialSymbol icon="mode_fan" size={40} />
            <p className="text-primary-foreground">AC</p>
            <p className="text-primary-foreground">420 W</p>
          </Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader icon="scene">
          <CardTitle>Room Name</CardTitle>
          <CardDescription>
            Using {data.length !== 0 ? data[data.length - 1].watts : "0"} W
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-row items-center">
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
