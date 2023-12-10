"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const checkUserAuthentication = async (): Promise<boolean> => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    const result = await fetch(
      `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/authentication/test`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );

    if (result.status === 200) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const handleRouteChange = ({ url }: { url: string }) => {
      // Add your own logic here to check if the user is authenticated
      const userIsAuthenticated = checkUserAuthentication();

      if (!userIsAuthenticated && url === "/protected-page") {
        router.replace("/login");
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);
  return <>{children}</>;
}
