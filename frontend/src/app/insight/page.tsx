import Link from "next/link";
import { MaterialSymbol, MaterialSymbolProps } from "react-material-symbols";
import { Button } from "@/components/ui/button";

type SummaryProps = {
  name: string;
  icon: MaterialSymbolProps["icon"];
  value: number;
  unit_of_measurement: string;
  cost: number;
}[];

type HousesProps = {
  id: number;
  name: string;
  location: string;
}[];

export default function Home() {
  const summary: SummaryProps = [
    {
      name: "Electricity",
      icon: "bolt",
      value: 838.8,
      unit_of_measurement: "W",
      cost: 34.93,
    },
    {
      name: "Water",
      icon: "water_drop",
      value: 23.2,
      unit_of_measurement: "L",
      cost: 23.11,
    },
  ];

  const houses: HousesProps = [
    {
      id: 0,
      name: "Main House",
      location: "Azores Island",
    },
    {
      id: 0,
      name: "Main House",
      location: "Azores Island",
    },
    {
      id: 0,
      name: "Main House",
      location: "Azores Island",
    },
  ];

  return (
    <div className="grid flex-1 grid-cols-1 lg:grid-cols-2">
      <div className="grid h-full content-center rounded-b-card bg-background lg:rounded-none lg:rounded-tr-card">
        <div className="row-auto grid content-center space-y-4 p-8 md:space-y-8 md:p-24">
          <p className="text-4xl font-extrabold md:text-5xl">
            Welcome back, John!
          </p>
          <p className="text-lg font-medium text-secondary-foreground">
            Here&apos;s your summary.
          </p>

          {summary.map((item) => (
            <div key={item.name} className="relative rounded-xl p-4">
              <div className="absolute inset-0 animate-pulse rounded-xl border-4 border-secondary delay-100"></div>
              <div className="flex items-center">
                <div className="relative flex flex-1 items-center gap-x-2">
                  <MaterialSymbol icon={item.icon} size={24} />
                  <p className="font-bold">{item.name}</p>
                </div>
                <p className="flex-1 text-center font-semibold">
                  {item.value} {item.unit_of_measurement}
                </p>
                <p className="flex-1 text-end">{item.cost} €</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-4 p-4 lg:space-y-8 lg:p-12">
        {houses.map((house) => (
          <div
            key={house.id}
            className="flex items-center justify-between rounded-card bg-background p-4"
          >
            <div>
              <p className="text-xl font-bold">{house.name}</p>
              <div className="flex items-center gap-1">
                <MaterialSymbol icon="location_pin" size={20}></MaterialSymbol>
                <p>{house.location}</p>
              </div>
            </div>
            <Link href="/home">
              <Button className="p-2">
                <MaterialSymbol icon="arrow_right_alt" size={24} />
              </Button>
            </Link>
          </div>
        ))}

        <div className="flex items-center justify-center gap-4">
          <Link href="/home">
            <Button className="flex gap-2 font-bold">
              <MaterialSymbol icon="add" size={24} />
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
