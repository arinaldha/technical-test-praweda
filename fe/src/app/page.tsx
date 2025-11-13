"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import DashboardLayout from "./layouts/dashboard";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/login");
  }, [router]);

  return (
    <>
      <DashboardLayout>
        <> Hello World </>
      </DashboardLayout>
    </>
  );
}
