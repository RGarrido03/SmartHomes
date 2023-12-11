import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MaterialSymbol, MaterialSymbolProps } from "react-material-symbols";
import { Room } from "@/app/home/devices/page";
import { cn } from "@/lib/utils";

type RoomCardProps = {
  room: Room;

type DeviceIcon = {
  [key in Room["devices"][number]["type"]]: MaterialSymbolProps["icon"];
};

const icons: DeviceIcon = {
  AC: "mode_fan",
  CARCARGER: "directions_car",
  DESUMIDIFIER: "humidity_mid",
  GRIDMETER: "electric_meter",
  LIGHT: "lightbulb",
  OVEN: "oven",
  PLUG: "outlet",
  SMARTASSISTANT: "nest_audio",
  SOLARPV: "solar_power",
  TV: "tv_with_assistant",
  VACUUM: "vacuum",
  WINDTURBINE: "wind_power",
};

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader icon="scene">
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>Using {room.power} W</CardDescription>
      </CardHeader>
      <CardContent
        className={cn(
          "grid flex-1 grid-cols-3 gap-2",
          room.devices.length == 1 && "grid-cols-1",
          room.devices.length == 2 && "grid-cols-2",
        )}
      >
        {room.devices.map((device) => (
          <Button
            variant={device.on ? "default" : "secondary"}
            key={device.id}
            className="h-fit flex-col gap-1"
          >
            <MaterialSymbol icon={icons[device.type]} size={24} />
            <p className="font-bold text-foreground">{device.name}</p>
            <p className="text-secondary-foreground">{device.power} W</p>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
