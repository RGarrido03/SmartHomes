import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MaterialSymbol } from "react-material-symbols";
import { Room } from "@/app/home/devices/page";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { deviceTypes } from "../app/home/devices/types";

type RoomCardProps = {
  room: Room;
  token: string;
};

export function RoomCard({ room, token }: RoomCardProps) {
  const toggleStatus = useCallback(
    async (id: number, currentOn: boolean) => {
      await fetch(
        `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/devices/${id}/${
          currentOn ? "off" : "on"
        }`,
        {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
    },
    [token],
  );

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
            onClick={() => toggleStatus(device.id, device.on)}
            className="h-fit flex-col gap-1"
          >
            <MaterialSymbol icon={deviceTypes[device.type].icon} size={24} />
            <p className="font-bold text-foreground">{device.name}</p>
            <p className="text-secondary-foreground">{device.power} W</p>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
