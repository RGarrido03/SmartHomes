import { GitHubIcon, GoogleIcon, MetaIcon } from "@/components/brand-icons";
import { Button } from "@/components/ui/button";
import { MaterialSymbol } from "react-material-symbols";
import { LoginForm } from "./form";

export default function Home() {
  return (
    <div className="grid flex-1 grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden select-none rounded-tr-2xl bg-background lg:block">
        <div className="max-h-[100dvh] space-y-8 overflow-hidden py-8 text-center">
          <p className="text-[6.5vw] font-extrabold">SmartHomes.</p>
          <p className="text-[6.5vw] font-extrabold">SmartHomes.</p>
          <p className="text-[6.5vw] font-extrabold">SmartHomes.</p>
          <p className="text-[6.5vw] font-extrabold">SmartHomes.</p>
          <p className="text-[6.5vw] font-extrabold">SmartHomes.</p>
        </div>

        <div className="absolute top-0 z-40 h-full w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 549"
            className="h-full w-full fill-secondary"
          >
            <g style={{ mixBlendMode: "color" }}>
              <path d="M314.314 -120.5C258.783 10.5325 150.079 112.851 0 154.287V-120.5H314.314Z" />
              <path d="M576 367.283C377.83 234.069 217.588 191.906 0 208.444V695.5H576V367.283Z" />
            </g>
          </svg>
        </div>
      </div>

      <div className="row-auto grid content-center space-y-8 p-8">
        <div className="space-y-4">
          <p className="text-4xl font-extrabold">Hi!</p>
          <p className="text-lg font-medium text-secondary-foreground">
            Please login to get started.
          </p>
        </div>

        <div className="flex flex-row gap-3 overflow-hidden">
          <Button
            variant={"background"}
            className="flex flex-row items-center gap-1 rounded-full"
          >
            <MaterialSymbol icon="encrypted" size={20} />
            Passkey
          </Button>
          <Button
            variant={"background"}
            className="flex flex-row items-center gap-2 rounded-full"
          >
            <GoogleIcon />
            Google
          </Button>
          <Button
            variant={"background"}
            className="flex flex-row items-center gap-2 rounded-full"
          >
            <MetaIcon />
            Facebook
          </Button>
          <Button
            variant={"background"}
            className="flex flex-row items-center gap-2 rounded-full"
          >
            <GitHubIcon />
            GitHub
          </Button>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
