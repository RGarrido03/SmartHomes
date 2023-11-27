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
  return <>{children}</>;
}
