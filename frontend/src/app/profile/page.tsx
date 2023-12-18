"use client";

import Cover from "@/../public/cover.png";
import Image from "next/image";
import { ProfileForm } from "./form";

export default function Profile() {
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
          <p className="text-4xl font-extrabold">Edit your profile</p>
          <p className="text-lg font-medium text-secondary-foreground">
            Change any data.
          </p>
        </div>

        <ProfileForm />
      </div>
    </div>
  );
}
