"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MaterialSymbol } from "react-material-symbols";

export default function NotImplemented() {
  const router = useRouter();
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-4xl font-extrabold">Oops! Not implemented.</p>
        <p>And will likely never be.</p>
      </div>
      <Button onClick={router.back}>
        <MaterialSymbol icon="arrow_back" size={20} className="mr-2" />
        Go back
      </Button>
    </div>
  );
}
