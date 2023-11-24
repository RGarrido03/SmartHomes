import { MaterialSymbol, MaterialSymbolProps } from "react-material-symbols";

type SidebarTabsProps = {
  id: string;
  name: string;
  icon: MaterialSymbolProps["icon"];
}[];

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

export default function Sidebar() {
  return (
    <div className="flex w-fit flex-col gap-4 rounded-tr-2xl border p-4">
      {tabs.map((tab) => (
        <div key={tab.id} className="rounded-lg p-2">
          <MaterialSymbol size={24} icon={tab.icon} />
        </div>
      ))}
    </div>
  );
}
