import { MaterialSymbolProps } from "react-material-symbols";

export type TabIds =
  | "home"
  | "environment"
  | "electricity"
  | "water"
  | "devices"
  | "costs"
  | "settings";

export type TabNames =
  | "Home"
  | "Environment"
  | "Electricity"
  | "Water"
  | "Devices"
  | "Costs"
  | "Settings";

export type TabRoutes =
  | "/home"
  | "/home/environment"
  | "/home/electricity"
  | "/home/water"
  | "/home/devices"
  | "/home/costs"
  | "/home/settings";

export const urlMapping: Record<TabRoutes, TabNames> = {
  "/home": "Home",
  "/home/environment": "Environment",
  "/home/electricity": "Electricity",
  "/home/water": "Water",
  "/home/devices": "Devices",
  "/home/costs": "Costs",
  "/home/settings": "Settings",
};

export type TabsProps = {
  id: TabIds;
  name: TabNames;
  icon: MaterialSymbolProps["icon"];
  href: TabRoutes;
}[];

export const tabs: TabsProps = [
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
