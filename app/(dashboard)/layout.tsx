import type { Metadata } from "next";
import "@/app/ui/globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import DashboardNavbar from "./_components/DashboardNavbar";
import NavTitle from "./_components/NavTitle";
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
  const session = await auth()

  if(isEmpty(session)){
    return redirect('/')
  }else{
  return (
  <div className="flex items-center w-full">
    <Sidebar/>
    <div className="flex-col items-center w-full pr-5 h-[calc(100vh-75px)] max-md:p-3 max-md:h-fit">
      <section className="flex-col flex items-center rounded-4xl border dark:border-white/20 border-black/30 overflow-x-hidden min-h-[calc(100vh-75px)] max-md:h-screen h-auto">
      <DashboardNavbar/>
      <NavTitle/>
      {children}
      </section>
    </div>
  </div>
  );
}

}