import { MaterialSymbol } from "react-material-symbols";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { tabs } from "@/app/home/tabs";

type SidebarProps = {
  activeUrl: string;
  className?: string;
};

export default function Sidebar({ activeUrl, className }: SidebarProps) {
  return (
    <div
      className={cn(
        "flex w-full snap-x flex-row justify-start gap-2 overflow-x-scroll rounded-full p-0",
        "md:w-fit md:flex-col md:gap-4 md:rounded-none md:rounded-tr-card md:bg-card md:p-4",
        className,
      )}
    >
      {tabs.map((tab) => (
        <Link href={tab.href} key={tab.id} className="snap-start">
          {/* Desktop version button */}
          <Button
            variant={activeUrl === tab.href ? "default" : "ghost"}
            className="hidden rounded-lg p-2 md:block"
          >
            <MaterialSymbol
              size={24}
              icon={tab.icon}
              fill={activeUrl === tab.href}
            />
            <p className="ml-2 md:hidden">{tab.name}</p>
          </Button>

          {/* Mobile version pile-like button */}
          <Button
            variant={activeUrl === tab.href ? "default" : "background"}
            className="rounded-full px-4 py-2 md:hidden"
          >
            <MaterialSymbol
              size={24}
              icon={tab.icon}
              fill={activeUrl === tab.href}
            />
            <p className="ml-2 md:hidden">{tab.name}</p>
          </Button>
        </Link>
      ))}
    </div>
  );
}
