"use client";

import Link from "next/link";
import { MaterialSymbol, MaterialSymbolProps } from "react-material-symbols";
import { Button } from "@/components/ui/button";
import { useCookies } from "next-client-cookies";
import { User } from "@/app/login/user";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
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

type Option = {
  title: string;
  description: string;
  href: string;
  icon?: MaterialSymbolProps["icon"];
};

export default function Home() {
  const { toast } = useToast();
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

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const deleteUser = async () => {
    const result = await fetch(
      `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/clients/${user.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + user.token,
        },
      },
    );
    if (result.status === 200) {
      logout();
    } else {
      toast({
        title: "Error deleting user.",
        description: "Check the console for more logs.",
        variant: "destructive",
      });
    }
  };

  const options: Option[] = [
    {
      title: "Edit your profile",
      description: "Set your name, profile picture, address and more.",
      href: "/profile",
    },
    {
      title: "Manage this house's devices",
      description: "Ready to add one more IoT device?",
      href: "/home/settings/devices",
    },
    {
      title: "Get help",
      description: "We're here to support you.",
      href: "/not-implemented",
    },
    {
      title: "Donate",
      description: "We need to buy sleeping pills.",
      href: "/not-implemented",
      icon: "favorite",
    },
  ];

  return (
    <div className="grid flex-1 gap-4">
      {options.map((option) => (
        <div
          className="flex items-center justify-between rounded-card bg-background p-4"
          key={option.title}
        >
          <div>
            <p className="mb-0.5 text-lg font-bold">{option.title}</p>
            <p>{option.description}</p>
          </div>
          <Link href={option.href}>
            <Button className="p-2">
              <MaterialSymbol icon={option.icon ?? "arrow_forward"} size={24} />
            </Button>
          </Link>
        </div>
      ))}
      <div className="flex items-center justify-between rounded-card bg-background p-4">
        <div>
          <p className="mb-0.5 text-lg font-bold">
            Delete your account and all data
          </p>
          <p>This app is proudly made in the EU. So are the rules.</p>
        </div>
        <Button
          className="p-2"
          variant="destructive"
          onClick={() => setOpenDeleteModal(true)}
        >
          <MaterialSymbol icon="delete" size={24} />
        </Button>
      </div>

      <AlertDialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all
              your data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteUser}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
