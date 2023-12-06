import Link from "next/link";
import { MaterialSymbol } from "react-material-symbols";
import { Button } from "@/components/ui/button";

type HousesProps = {
  id: number;
  name: string;
  location: string;
}[];

export default function Home() {

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
    <div className="grid h-full flex-1 grid-cols-2">
      <div className="grid h-full content-center rounded-tr-2xl bg-background">
        <div className="row-auto grid content-center space-y-12 p-24">
          <p className="text-5xl font-extrabold">
            Welcome back, <br></br>John!
          </p>
          <p className="text-3xl font-medium text-secondary-foreground">
            Here&apos;s your summary.
          </p>

          <div className="relative rounded-xl p-4">
            <div className="absolute inset-0 animate-pulse rounded-xl border-4 border-secondary delay-100"></div>
            <div className="flex">
              <div className="relative z-10 flex flex-1 gap-x-2">
                <MaterialSymbol icon="bolt" size={24}></MaterialSymbol>
                <p className="text-xl font-medium">Electricity</p>
              </div>
              <p className="flex-1 text-xl font-medium">838,80 W</p>
              <p className="text-xl font-medium">34034,93€</p>
            </div>
          </div>

          <div className="relative rounded-xl p-4">
            <div className="absolute inset-0 animate-pulse rounded-xl border-4 border-secondary delay-100"></div>
            <div className="flex">
              <div className="relative z-10 flex flex-1 gap-x-2">
                <MaterialSymbol icon="water_drop" size={24}></MaterialSymbol>
                <p className="text-xl font-medium">Water</p>
              </div>
              <p className="flex-1 text-xl font-medium">23.2 L</p>
              <p className="text-xl font-medium">23.11€</p>
            </div>
          </div>
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
            <Button className="p-2">
              <MaterialSymbol icon="arrow_right_alt" size={24} />
                </Button>
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
