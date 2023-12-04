import Link from "next/link";

export default function Home() {
  return (
    <div className="grid h-full flex-1 grid-cols-2 justify-center">
      <div className="relative hidden h-full rounded-tr-2xl bg-background lg:block">
        <div className="relative max-h-full space-y-7 pt-12 text-center">
          <p className="w-full text-[6.5vw] font-extrabold">SmartHomes.</p>
          <p className="w-full text-[6.5vw] font-extrabold">SmartHomes.</p>
          <p className="w-full text-[6.5vw] font-extrabold">SmartHomes.</p>
          <p className="w-full text-[6.5vw] font-extrabold">SmartHomes.</p>
          <p className="w-full text-[6.5vw] font-extrabold">SmartHomes.</p>
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
          <p className="text-200 text-200 text-2xl font-medium">
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

        <div className="p4 space-y-4">
          <form className="row-auto grid">
            <label className="pb-1 text-lg font-medium">E-mail</label>
            <input
              className="mt-1 rounded-md bg-background px-3 py-2 sm:text-sm"
              type="email"
              name="email"
            />
            <label className="pb-2 pt-2 text-lg font-medium">Password</label>
            <input
              className="mt-1 rounded-md bg-background px-3 py-2 sm:text-sm"
              type="password"
              name="password"
            />
          </form>
          <div className="flex items-center gap-4">
            <Link href="/insight" className="rounded-lg bg-accent px-4 py-2 text-base font-bold">
              Login
            </Link>
            <Link href="/register" className="rounded-lg bg-secondary px-4 py-2 text-base font-medium">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
