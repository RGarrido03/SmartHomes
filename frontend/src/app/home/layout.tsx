import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#1F1F1F" },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
