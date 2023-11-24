import { MaterialSymbol, MaterialSymbolProps } from "react-material-symbols";
import { Button } from "./ui/button";
import Link from "next/link";

export type TabIds =
  | "home"
  | "environment"
  | "electricity"
  | "water"
  | "devices"
  | "costs"
  | "settings";

type SidebarTabsProps = {
  id: TabIds;
  name: string;
  icon: MaterialSymbolProps["icon"];
  href: string;
}[];

type SidebarProps = {
  active: TabIds;
};

const tabs: SidebarTabsProps = [
  {
    id: "home",
    name: "Home",
    icon: "home",
    href: "/home",
  },
  {
    id: "environment",
    name: "Environment",
    icon: "nest_eco_leaf",
    href: "/home/environment",
  },
  {
    id: "electricity",
    name: "Electricity",
    icon: "bolt",
    href: "/home/electricity",
  },
  {
    id: "water",
    name: "Water",
    icon: "water_drop",
    href: "/home/water",
  },
  {
    id: "devices",
    name: "Devices",
    icon: "scene",
    href: "/home/devices",
  },
  {
    id: "costs",
    name: "Costs",
    icon: "euro_symbol",
    href: "/home/costs",
  },
  {
    id: "settings",
    name: "Settings",
    icon: "settings",
    href: "/home/settings",
  },
];

export default function Sidebar({ active }: SidebarProps) {
  return (
    <div className="flex w-fit flex-col gap-4 rounded-tr-2xl bg-background p-4">
      {tabs.map((tab) => (
        <Link href={tab.href} key={tab.id}>
          <Button
            variant={active === tab.id ? "default" : "ghost"}
            className="p-2"
          >
            <MaterialSymbol
              size={24}
              icon={tab.icon}
              fill={active === tab.id}
            />
          </Button>
        </Link>
      ))}
    </div>
  );
}
