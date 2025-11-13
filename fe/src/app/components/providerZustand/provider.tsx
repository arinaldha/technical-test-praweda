"use client";

import React from "react";
import { useCompanyStore } from "@/zustand/store/companies/store";

export function ZustandProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    useCompanyStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}
