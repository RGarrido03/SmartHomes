import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MaterialSymbol } from "react-material-symbols";

export function DeviceCard({}: { text: string }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader icon="scene">
        <CardTitle>Room Name</CardTitle>
        <CardDescription>
          Using 0 W
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
  );
}
