"use client";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Navbar />
      <div className="flex flex-1 flex-col gap-4 px-4 md:flex-row md:px-0">
        <Sidebar activeUrl={pathname} className="md:self-stretch" />
        <div className="mr-4 flex-1">{children}</div>
      </div>
    </>
  );
}
