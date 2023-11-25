import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home management",
  description: "Get all insights.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex flex-row gap-4">
        <Sidebar active="home" />
        <div className="mr-4 flex-1">{children}</div>
      </div>
    </>
  );
}
