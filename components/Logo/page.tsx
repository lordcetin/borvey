/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  const { resolvedTheme } = useTheme()
  return (
  <div className="flex items-center relative outline-none">
    <Link title="Anasayfa" href={'/'} className="outline-none"><Image src={resolvedTheme === 'light' ? '/borvey.png' : resolvedTheme === 'dark' ? '/assets/logo-white.png' : '/borvey.png'} width={800} height={800} alt="borvey logo" className="w-48 object-cover cursor-pointer max-md:w-24 outline-none"/></Link>
  </div>
  );
};

export default Logo;
