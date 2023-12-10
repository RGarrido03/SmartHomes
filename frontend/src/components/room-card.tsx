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
  );
}
