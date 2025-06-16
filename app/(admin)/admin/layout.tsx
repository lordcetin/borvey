/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import "@/app/ui/globals.css";
import NavTitle from "@/app/(dashboard)/_components/NavTitle";
import SidebarAdmin from "@/components/Sidebar/SidebarAdmin";
import AdminNavbar from "../_components/AdminNavbar";
import { auth } from "@/auth";
import { isEmpty } from "lodash";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export async function headers() {
  return [
    {
      name: 'X-Robots-Tag',
      value: 'noindex, nofollow',
    },
  ];
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session:any = await auth()

  if(isEmpty(session) || session?.user?.adminStatus !== 'admin'){
    return redirect('/')
  }else{
  return (
  <div className="flex items-center w-full">
    <SidebarAdmin/>
    <div className="flex-col items-center w-full pr-5 h-[calc(100vh-75px)]">
      <section className="flex-col flex items-center rounded-4xl border dark:border-white/20 border-black/30 overflow-x-hidden min-h-[calc(100vh-75px)] h-auto">
      <AdminNavbar/>
      <NavTitle/>
      {children}
      </section>
    </div>
  </div>
  );
}
}