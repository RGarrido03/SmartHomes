"use client";

import { MaterialSymbol, MaterialSymbolProps } from "react-material-symbols";
import { Button } from "@/components/ui/button";
import { useCookies } from "next-client-cookies";
import { User } from "@/app/login/user";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewHouseForm } from "./form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChangeHouseForm } from "./change-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

type SummaryProps = {
  name: string;
  icon: MaterialSymbolProps["icon"];
  value: number;
  unit_of_measurement: string;
  cost: number;
}[];

type HousesProps = {
  houseId: number;
  name: string;
  location: string;
}[];

export default function Home() {
  const router = useRouter();
  const cookies = useCookies();
  const user: User =
    cookies.get("currentUser") === undefined
      ? null
      : JSON.parse(cookies.get("currentUser") ?? "");

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

  const [houses, setHouses] = useState<HousesProps>([]);

  async function fetchData() {
    const temp = await fetch(
      `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/clients/${
        user != null ? user.id : 0
      }/houses`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
        headers: {
          Authorization: user != null ? "Bearer " + user.token : "",
        },
      },
    );
    setHouses(await temp.json());
  }

  useEffect(() => {
    cookies.remove("house");
    cookies.remove("houseName");
    fetchData().catch(console.error);
  }, []);

  const goToHouse = useCallback(
    (id: number, name: string) => {
      cookies.set("house", id.toString());
      cookies.set("houseName", name);
      router.push("/home");
    },
    [cookies, router],
  );

  const logout = useCallback(() => {
    cookies.remove("currentUser");
    router.push("/login");
  }, [cookies, router]);

  const [openChangeModal, setOpenChangeModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [changeData, setChangeData] = useState<HousesProps[number]>({
    houseId: 0,
    name: "",
    location: "",
  });
  const [deleteId, setDeleteId] = useState<number>(0);
  const { toast } = useToast();

  return (
    <div className="grid flex-1 grid-cols-1 lg:grid-cols-2 ">
      <div className="grid h-full content-center rounded-b-card bg-background lg:rounded-none lg:rounded-tr-card">
        <div className="row-auto grid content-center space-y-4 p-8 md:space-y-8 md:p-24">
          <p className="text-4xl font-extrabold md:text-5xl">
            Welcome back, {user == null ? "" : user.name.split(" ")[0]}!
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
            key={house.houseId}
            className="flex items-center justify-between rounded-card bg-background p-4"
          >
            <div>
              <p className="text-xl font-bold">{house.name}</p>
              <div className="flex items-center gap-1">
                <MaterialSymbol icon="location_pin" size={20}></MaterialSymbol>
                <p>{house.location}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="p-2" variant="secondary">
                    <MaterialSymbol icon="more_horiz" size={24} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>More options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      setChangeData({
                        houseId: house.houseId,
                        name: house.name,
                        location: house.location,
                      });
                      setOpenChangeModal(true);
                    }}
                  >
                    <MaterialSymbol icon="edit" className="mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
                    onClick={() => {
                      setDeleteId(house.houseId);
                      setOpenDeleteModal(true);
                    }}
                  >
                    <MaterialSymbol icon="delete" className="mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                className="p-2"
                onClick={() => goToHouse(house.houseId, house.name)}
              >
                <MaterialSymbol icon="arrow_right_alt" size={24} />
              </Button>
            </div>
          </div>
        ))}
        {(houses.length === 0 || !houses) && (
          <div className="text-center">
            <MaterialSymbol icon="error" size={48} />
            <p className="text-lg font-bold">
              Oops! It looks like you don&apos;t have any house yet.
            </p>
            <p>Start by creating one.</p>
          </div>
        )}

        <div className="flex items-center justify-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex gap-2 font-bold">
                <MaterialSymbol icon="add" size={24} />
                Add house
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a new house</DialogTitle>
                <DialogDescription>
                  Input your house&apos;s data. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <NewHouseForm />
            </DialogContent>
          </Dialog>
          <Button
            variant={"secondary"}
            onClick={logout}
            className="flex gap-2 font-bold"
          >
            <MaterialSymbol icon="logout" size={24} />
            Logout
          </Button>
        </div>
      </div>

      <Dialog open={openChangeModal} onOpenChange={setOpenChangeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit this house</DialogTitle>
            <DialogDescription>
              Input new information for this house. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <ChangeHouseForm
            id={changeData.houseId}
            currentName={changeData.name}
            currentLocation={changeData.location}
            setOpenChangeModal={setOpenChangeModal}
            fetchData={fetchData}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              house and its respective data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                const result = await fetch(
                  `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/houses/${deleteId}`,
                  {
                    method: "DELETE",
                    headers: {
                      Authorization: "Bearer " + user.token,
                    },
                  },
                );
                if (result.status === 200) {
                  fetchData();
                  setOpenChangeModal(false);
                } else {
                  toast({
                    title: "Error deleting house.",
                    description: "Internal server error.",
                    variant: "destructive",
                  });
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
