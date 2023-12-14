"use client";

import Link from "next/link";
import { MaterialSymbol } from "react-material-symbols";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, DevicesCard } from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col space-y-4 px-4 pb-4 lg:space-y-8">
        <div className="flex items-center justify-between rounded-card bg-background p-4">
          <div>
            <p className="text-xl font-bold">Edit your profile</p>
            <div className="flex items-center gap-1">
              <p>Set your name, profile picture, address and more.</p>
            </div>
          </div>
          <Link href="/home/settings/profile-edit">
            <Button className="p-2 ">
              <MaterialSymbol icon="arrow_right_alt" size={24} />
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-3 lg:grid-cols-3">
        <CardContent>
          <div className="space-y-4">
            <DevicesCard>
              <div className="flex items-center justify-between">
                <MaterialSymbol
                  icon="vacuum"
                  size={24}
                  className="pl-3"
                ></MaterialSymbol>
                <CardHeader>Aspirador</CardHeader>
              </div>
              <Button className="bg-orange-400 px-2">
                <MaterialSymbol
                  icon="close"
                  size={24}
                  color="black"
                ></MaterialSymbol>
              </Button>
            </DevicesCard>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
