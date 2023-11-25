import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home management",
  description: "Get all insights.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
