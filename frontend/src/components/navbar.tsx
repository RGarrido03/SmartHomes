"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { MaterialSymbol } from "react-material-symbols";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCookies } from "next-client-cookies";
import { User } from "@/app/login/user";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function Navbar() {
  const cookies = useCookies();
  const user: User =
    cookies.get("currentUser") === undefined
      ? null
      : JSON.parse(cookies.get("currentUser") ?? "");
  const router = useRouter();

  const logout = useCallback(() => {
    cookies.remove("currentUser");
    router.push("/login");
  }, [cookies, router]);

  return (
    <div className="flex flex-row items-center justify-between gap-4 p-4">
      <Link href="/insight">
        <Button variant="background" className="h-fit p-1">
          <MaterialSymbol size={24} icon="arrow_back" />
        </Button>
      </Link>
      <p className="w-full text-lg font-semibold">Main house</p>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="h-fit rounded-full p-1">
            <MaterialSymbol size={24} icon="account_circle" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            Hi, {user == null ? "" : user.name.split(" ")[0]}!
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <MaterialSymbol icon="logout" className="mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
