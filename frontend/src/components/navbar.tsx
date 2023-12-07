import Link from "next/link";
import { Button } from "./ui/button";
import { MaterialSymbol } from "react-material-symbols";

export default function Navbar() {
  return (
    <div className="flex flex-row items-center justify-between gap-4 p-4">
      <Link href="/insight">
        <Button variant="background" className="h-fit p-1">
          <MaterialSymbol size={24} icon="arrow_back" />
        </Button>
      </Link>
      <p className="w-full text-lg font-semibold">Main house</p>
      <Link href="/profile">
        <Button variant="default" className="h-fit rounded-full p-1">
          <MaterialSymbol size={24} icon="account_circle" />
        </Button>
      </Link>
    </div>
  );
}
