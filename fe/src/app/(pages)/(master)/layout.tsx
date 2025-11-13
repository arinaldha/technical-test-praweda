import DashboardLayout from "@/app/layouts/dashboard";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      <section>{children}</section>
    </DashboardLayout>
  );
}
