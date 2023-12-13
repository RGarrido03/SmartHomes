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

  return (
    <div className="grid flex-1 grid-cols-1 lg:grid-cols-1">
    </div>
  );
}
