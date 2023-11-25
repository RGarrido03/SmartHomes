"use client";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import type { Viewport } from "next";
import { usePathname } from "next/navigation";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F6FB" },
    { media: "(prefers-color-scheme: dark)", color: "#2D2F31" },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <Navbar />
      <div className="flex flex-1 flex-row gap-4">
        <Sidebar activeUrl={pathname} className="self-stretch" />
        <div className="mr-4 flex-1">{children}</div>
      </div>
    </>
  );
}
