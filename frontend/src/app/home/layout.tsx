import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { TabRoutes, urlMapping } from "./tabs";

export const metadata: Metadata = {
  title: urlMapping[headers().get("x-url") as TabRoutes],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F6FB" },
    { media: "(prefers-color-scheme: dark)", color: "#2D2F31" },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const headersList = headers();

  return (
    <>
      <Navbar />
      <div className="flex flex-1 flex-col gap-4 px-4 md:flex-row md:px-0">
        <Sidebar
          activeUrl={headersList.get("x-url") ?? "/home"}
          className="md:self-stretch"
        />
        <div className="mr-4 flex-1">{children}</div>
      </div>
    </>
  );
}
