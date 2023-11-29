"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { MaterialSymbol } from "react-material-symbols";

export default function Home() {
  return (
    <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-3 overflow-hidden">
        <CardHeader>
          <CardTitle>Oops! You found a placeholder page.</CardTitle>
          <CardDescription>
            It looks like this isn&apos;t complete yet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center">
            <p>Check what&apos;s done for this iteration by going to the</p>
            <MaterialSymbol icon="bolt" size={20} />
            <p>Electricity tab.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
