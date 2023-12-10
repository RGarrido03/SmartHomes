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

type RoomCardProps = {
  room: Room;
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
            <MaterialSymbol icon="mode_fan" size={24} />
            <p className="font-bold text-foreground">AC</p>
            <p className="text-secondary-foreground">420 W</p>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
