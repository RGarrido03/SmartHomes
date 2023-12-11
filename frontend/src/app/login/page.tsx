"use client";

import Cover from "@/../public/cover.png";
import { GitHubIcon, GoogleIcon, MetaIcon } from "@/components/brand-icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MaterialSymbol } from "react-material-symbols";
import { LoginForm } from "./form";
import { useToast } from "@/components/ui/use-toast";

type AuthProvidersProps = {
  name: string;
  icon: JSX.Element;
}[];

export default function Home() {
  const { toast } = useToast();

  const providers: AuthProvidersProps = [
    {
      name: "Passkey",
      icon: <MaterialSymbol icon="encrypted" size={20} />,
    },
    {
      name: "GitHub",
      icon: <GitHubIcon />,
    },
    {
      name: "Meta",
      icon: <MetaIcon />,
    },
    {
      name: "Google",
      icon: <GoogleIcon />,
    },
  ];

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

        <Image
          alt="Title cover"
          src={Cover}
          fill
          className="pointer-events-none absolute top-0 z-40 h-full w-full"
          objectFit="cover"
        />
      </div>

      <div className="row-auto grid content-center space-y-8 p-8">
        <div className="space-y-4">
          <p className="text-4xl font-extrabold">Hi!</p>
          <p className="text-lg font-medium text-secondary-foreground">
            Please login to get started.
          </p>
        </div>

        <div className="flex snap-x flex-row gap-3 overflow-x-scroll">
          {providers.map((provider) => (
            <Button
              variant={"background"}
              key={provider.name}
              className="flex snap-start flex-row items-center gap-2 rounded-full"
              onClick={() => {
                toast({
                  title: "Oops, not implemented yet!",
                  description:
                    "It looks like you found an Iteration 4 feature :)",
                });
              }}
            >
              {provider.icon}
              {provider.name}
            </Button>
          ))}
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
