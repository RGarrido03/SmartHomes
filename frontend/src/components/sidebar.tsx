import { cn } from "@/lib/utils";
import { MaterialSymbol, MaterialSymbolProps } from "react-material-symbols";
import { Button } from "./ui/button";

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
}[];

type SidebarProps = {
  active: TabIds;
};

const tabs: SidebarTabsProps = [
  {
    id: "home",
    name: "Home",
    icon: "home",
  },
  {
    id: "environment",
    name: "Environment",
    icon: "nest_eco_leaf",
  },
  {
    id: "electricity",
    name: "Electricity",
    icon: "bolt",
  },
  {
    id: "water",
    name: "Water",
    icon: "water_drop",
  },
  {
    id: "devices",
    name: "Devices",
    icon: "scene",
  },
  {
    id: "costs",
    name: "Costs",
    icon: "euro_symbol",
  },
  {
    id: "settings",
    name: "Settings",
    icon: "settings",
  },
];

export default function Sidebar({ active }: SidebarProps) {
  return (
    <div className="flex w-fit flex-col gap-4 rounded-tr-2xl bg-background p-4">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={active === tab.id ? "default" : "ghost"}
          className="p-2"
        >
          <MaterialSymbol size={24} icon={tab.icon} fill={active === tab.id} />
        </Button>
      ))}
    </div>
  );
}
