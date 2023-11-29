"use client";

import { useRouter } from "next/navigation";

export default function Index() {
  const router = useRouter();
  router.replace("/login");
}
