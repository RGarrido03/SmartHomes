"use client";

import Link from "next/link";
import { MaterialSymbol, MaterialSymbolProps } from "react-material-symbols";
import { Button } from "@/components/ui/button";
import { useCookies } from "next-client-cookies";
import { User } from "@/app/login/user";
import { useRouter } from "next/navigation";
import { useCallback } from "react";


export default function Home() {
  const router = useRouter();
  const cookies = useCookies();
  const user: User =
    cookies.get("currentUser") === undefined
      ? null
      : JSON.parse(cookies.get("currentUser") ?? "");


  const logout = useCallback(() => {
    cookies.remove("currentUser");
    router.push("/login");
  }, [cookies, router]);

  function deleteUser(userId: number) {
    fetch(`localhost/api/clients/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: "Bearer " + user.token
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  async function handleDelete() {
    if (user) {
      await deleteUser(user.id);
      logout();
    } else {
      console.log("No user is currently logged in.");
    }
}

  return (
    <div className="grid flex-1 grid-cols-1 lg:grid-cols-1">
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
      <div className="flex flex-col space-y-4 p-4 lg:space-y-8">
          <div className="flex items-center justify-between rounded-card bg-background p-4">
            <div>
              <p className="text-xl font-bold">Manage your automations</p>
              <div className="flex items-center gap-1">
                <p>Make the planet greener by turning off devices when you don’t really need them.</p>
              </div>
            </div>
            <Link href="/home/settings/automation-manage">
              <Button className="p-2">
                <MaterialSymbol icon="arrow_right_alt" size={24} />
              </Button>
            </Link>
          </div>
      </div>
      <div className="flex flex-col space-y-4 p-4 lg:space-y-8">
          <div className="flex items-center justify-between rounded-card bg-background p-4">
            <div>
              <p className="text-xl font-bold">Manage this house’s devices</p>
              <div className="flex items-center gap-1">
                <p>Ready to add one more IoT device?</p>
              </div>
            </div>
            <Link href="/home/settings/device-manage">
              <Button className="p-2">
                <MaterialSymbol icon="arrow_right_alt" size={24} />
              </Button>
            </Link>
          </div>
      </div>
      <div className="flex flex-col space-y-4 p-4 lg:space-y-8">
          <div className="flex items-center justify-between rounded-card bg-background p-4">
            <div>
              <p className="text-xl font-bold">Manage your houses</p>
              <div className="flex items-center gap-1">
                <p>Add, edit or delete one.</p>
              </div>
            </div>
            <Link href="/home/settings/house-manage">
              <Button className="p-2">
                <MaterialSymbol icon="arrow_right_alt" size={24} />
              </Button>
            </Link>
          </div>
      </div>
      <div className="flex flex-col space-y-4 p-4 lg:space-y-8">
          <div className="flex items-center justify-between rounded-card bg-background p-4">
            <div>
              <p className="text-xl font-bold">Delete your account</p>
              <div className="flex items-center gap-1">
                <p>We are fully GDPR-compliant</p>
              </div>
            </div>
              <Button className="p-2" variant="destructive" onClick={handleDelete}>
                <MaterialSymbol icon="delete_forever" size={24} />
              </Button>
          </div>
      </div>
    </div>
  );
}
