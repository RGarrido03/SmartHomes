import Link from "next/link";
import { MaterialSymbol } from "react-material-symbols";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid h-full flex-1 grid-cols-2">
      <div className="grid h-full content-center rounded-tr-2xl bg-background">
        <div className="row-auto grid content-center space-y-12 p-24">
          <p className="text-5xl font-extrabold">
            Welcome back, <br></br>John!
          </p>
          <p className="text-3xl font-medium text-secondary-foreground">
            Here’s your summary.
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

      <div className="row-auto grid p-12 pr-8">
        <div className="space-y-7 pt-2">
          <button className="flex w-full justify-between rounded-2xl bg-background p-6">
            <div className="space-y-2">
              <div className="text-2xl font-bold">Main House</div>
              <div className="center p flex gap-1 text-lg font-medium">
                <MaterialSymbol icon="location_pin" size={24}></MaterialSymbol>
                <p>Azores Island</p>
              </div>
            </div>
            <div className="place-items-end self-center">
              <Link href={"/home"}>
                <Button className="rounded-xl py-8">
                  <MaterialSymbol
                    icon="arrow_right_alt"
                    size={32}
                  ></MaterialSymbol>
                </Button>
              </Link>
            </div>
          </button>
          <button className="flex w-full justify-between gap-1 rounded-2xl bg-background p-6">
            <div className="space-y-2">
              <div className="text-2xl font-bold">Main House</div>
              <div className="center flex gap-1 text-lg font-medium">
                <MaterialSymbol icon="location_pin" size={24}></MaterialSymbol>
                <p>Azores Island</p>
              </div>
            </div>
            <div className="place-items-end self-center">
              <Link href={"/home"}>
                <Button className="rounded-xl py-8">
                  <MaterialSymbol
                    icon="arrow_right_alt"
                    size={32}
                  ></MaterialSymbol>
                </Button>
              </Link>
            </div>
          </button>
          <button className="flex w-full justify-between gap-1 rounded-2xl bg-background p-6">
            <div className="space-y-2">
              <div className="text-2xl font-bold">Main House</div>
              <div className="center flex gap-1 text-lg font-medium">
                <MaterialSymbol icon="location_pin" size={24}></MaterialSymbol>
                <p>Azores Island</p>
              </div>
            </div>
            <div className="place-items-end self-center">
              <Link href={"/home"}>
                <Button className="rounded-xl py-8">
                  <MaterialSymbol
                    icon="arrow_right_alt"
                    size={32}
                  ></MaterialSymbol>
                </Button>
              </Link>
            </div>
          </button>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/home"
              className="flex rounded-lg bg-accent p-4 py-2 text-base font-bold"
            >
              <MaterialSymbol icon="add" size={24}></MaterialSymbol>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
