"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MaterialSymbol } from "react-material-symbols";
import { Device } from "../../devices/page";
import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useCookies } from "next-client-cookies";
import { User } from "@/app/login/user";
import { deviceTypes } from "../../devices/types";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChangeDeviceForm } from "./change-form";

export default function Devices() {
  const cookies = useCookies();
  const user: User = JSON.parse(cookies.get("currentUser") ?? "");
  const [data, setData] = useState<Device[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openChangeModal, setOpenChangeModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const { toast } = useToast();
  const [changeData, setChangeData] = useState<Device>({
    id: 0,
    name: "",
    type: "TV",
    houseArea: "",
    on: true,
    power: 0,
  });

  // Fetch data from API
  useEffect(() => {
    const ws = new SockJS(`http://${process.env.NEXT_PUBLIC_HOST_URL}/api/ws`);
    const client = Stomp.over(ws);

    client.connect(
      {},
      () => {
        client.subscribe(
          `/houses/${cookies.get("house")}/devices`,
          function (new_data) {
            console.log("New notification: ", JSON.parse(new_data.body));
            const parsedData = JSON.parse(new_data.body);
            setData(parsedData);
          },
        );
      },
      () => {
        console.error("Sorry, I cannot connect to the server right now.");
      },
    );

    async function fetchData() {
      const temp = await fetch(
        `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/houses/${cookies.get(
          "house",
        )}/devices`,
        {
          next: { revalidate: 60 }, // Revalidate every 60 seconds
          headers: {
            Authorization: "Bearer " + user.token,
          },
        },
      );
      setData(await temp.json());
    }

    fetchData().catch(console.error);
  }, [user.token, cookies]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="flex items-center gap-4 rounded-card bg-background p-4 md:col-span-2 lg:col-span-3">
        <Link href="/home/settings">
          <Button className="h-fit p-1">
            <MaterialSymbol icon="arrow_back" size={24} />
          </Button>
        </Link>
        <div>
          <p className="text-lg font-bold">Manage this house&apos;s devices</p>
          <p>Ready to add one more IoT device?</p>
        </div>
      </div>
      {data.map((device) => (
        <div
          key={device.id}
          className="flex items-center gap-4 rounded-card bg-background p-4"
        >
          <MaterialSymbol icon={deviceTypes[device.type].icon} size={24} />
          <div className="flex-1">
            <p className="font-semibold">{device.name}</p>
            <p className="text-sm">{deviceTypes[device.type].name}</p>
          </div>
          <Button
            className="h-fit p-2"
            onClick={() => {
              setChangeData({
                id: device.id,
                name: device.name,
                houseArea: device.houseArea,
                type: device.type,
                on: device.on,
                power: device.power,
              });
              setOpenChangeModal(true);
            }}
          >
            <MaterialSymbol icon="edit" size={20} />
          </Button>
          <Button
            variant="destructive"
            className="h-fit p-2"
            onClick={() => {
              setDeleteId(device.id);
              setOpenDeleteModal(true);
            }}
          >
            <MaterialSymbol icon="delete" size={20} />
          </Button>
        </div>
      ))}

      <Dialog open={openChangeModal} onOpenChange={setOpenChangeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit this device</DialogTitle>
            <DialogDescription>
              Input new information for this device. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <ChangeDeviceForm
            currentData={changeData}
            setOpenChangeModal={setOpenChangeModal}
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
                  `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/devices/${deleteId}`,
                  {
                    method: "DELETE",
                    headers: {
                      Authorization: "Bearer " + user.token,
                    },
                  },
                );
                if (result.status !== 200) {
                  toast({
                    title: "Error deleting device.",
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
