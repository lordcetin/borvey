/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import React from "react";
import { ThemeToggle } from "../ToggleTheme";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
type Props = {};

const Footer = (props: Props) => {
  const { resolvedTheme } = useTheme()
  const year = new Date().getFullYear()
  const pathname = usePathname()
  return (
    <>
    {pathname?.startsWith('/panel') ? null :
   <div className="flex items-center w-full p-7 max-md:p-3 border-t dark:border-white/20 border-black/20 z-[999]">
      <div className="flex max-md:flex-col justify-between max-md:justify-normal items-center w-full container mx-auto px-44 max-md:px-0">
      <div className="flex items-center max-md:justify-normal w-full">
        <div className="flex-col items-center space-y-2 max-md:w-34 max-md:self-start">
          <Link title="Anasayfa" href={'/'} className="block"><Image src={resolvedTheme === 'light' ? '/borvey.png' : resolvedTheme === 'dark' ? '/assets/logo-white.png' : '/borvey.png'} alt="" width={800} height={800} className="object-cover w-28"/></Link>
          <h1 className="text-xs w-50 dark:text-white/30 text-black/70">&copy; 2011 - {year} <br/><strong>borvey</strong> Teknoloji AŞ, <br/> Tüm Hakları Saklıdır</h1>
        </div>
        <div className="flex items-center w-full">
          <div className="grid grid-cols-4 max-md:gap-y-2 gap-x-12 w-full max-md:w-full max-md:text-xs max-md:hidden dark:text-white/30 text-black/70">
            <div className="flex-col items-center w-60 space-y-2">
              <Link title="Anasayfa" href={'/'} className="font-semibold block hover:underline dark:hover:text-white hover:text-black transition-all max-md:text-xs">Anasayfa</Link>
              <Link title="Gizlilik Sözleşmesi" href={'/cerezler'} className="block text-sm hover:underline dark:hover:text-white hover:text-black transition-all max-md:text-xs">Gizlilik Sözleşmesi</Link>
            </div>
            <div className="flex-col items-center w-60 space-y-2">
              <Link title="Hakkımızda" href={'/hakkimizda'} className="font-semibold block hover:underline dark:hover:text-white hover:text-black transition-all max-md:text-xs">Hakkımızda</Link>
              <Link title="KVKK" href={'/cerezler'} className="block text-sm hover:underline dark:hover:text-white hover:text-black transition-all max-md:text-xs">KVKK</Link>
            </div>
            <div className="flex-col items-center w-60 space-y-2">
              <Link title="Yardım" href={'/yardim'} className="font-semibold block hover:underline dark:hover:text-white hover:text-black transition-all max-md:text-xs">Yardım</Link>
              <Link title="Kullanıcı Sözleşmesi" href={'/cerezler'} className="block text-sm hover:underline dark:hover:text-white hover:text-black transition-all max-md:text-xs">Kullanıcı Sözleşmesi</Link>
            </div>
            <div className="flex-col items-center w-60 space-y-2">
              <Link title="İletişim" href={'/iletisim'} className="font-semibold block hover:underline dark:hover:text-white hover:text-black transition-all max-md:text-xs">İletişim</Link>
              <Link title="Çerezler" href={'/cerezler'} className="block text-sm hover:underline dark:hover:text-white hover:text-black transition-all max-md:text-xs">Aydınlatma Metni</Link>
            </div>
          </div>
          <div className="hidden max-md:block absolute bottom-0 -left-32">
            <ThemeToggle/>
          </div>
          <div className="hidden max-md:block flex-col items-center gap-x-2 mt-2">
            <h1 className="flex justify-center items-center text-sm dark:text-white/40 text-black/70">Sosyal Medya</h1>
            <div className="flex flex-wrap justify-center items-center gap-x-4 mt-2">
              <Link title="Youtube" href={'https://www.youtube.com/@borveycom'}><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube-icon lucide-youtube dark:text-white/30 text-black/70 dark:hover:text-white hover:text-black transition-all"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg></Link>
              <Link title="Instagram" href={'https://www.instagram.com/borveycom/'}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram-icon lucide-instagram dark:text-white/30 text-black/70 dark:hover:text-white hover:text-black transition-all"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></Link>
              <Link title="Facebook" href={'https://www.facebook.com/people/borvey/100093522541664/'}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook-icon lucide-facebook dark:text-white/30 text-black/70 dark:hover:text-white hover:text-black transition-all"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></Link>
              <Link title="Twitter" href={'https://x.com/borveyborvey'}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter-icon lucide-twitter dark:text-white/30 text-black/70 dark:hover:text-white hover:text-black transition-all"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></Link>
              <Link title="Linkedin" href={'https://www.linkedin.com/in/borvey-com-441345287/'}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin-icon lucide-linkedin dark:text-white/30 text-black/70 dark:hover:text-white hover:text-black transition-all"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></Link>
            </div>
            <div className="h-16"></div>
          </div>
        </div>
      </div>
      <div className="flex-wrap justify-center max-md:w-full max-md:text-xs space-y-1 gap-x-1 hidden max-md:flex">
          <Link title="Anasayfa" href={'/'} className="font-semibold block hover:underline transition-all max-md:text-xs px-2 py-1 rounded-full border">Anasayfa</Link>
          <Link title="Hakkımızda" href={'/hakkimizda'} className="font-semibold block hover:underline transition-all max-md:text-xs px-2 py-1 rounded-full border">Hakkımızda</Link>
          <Link title="Yardım" href={'/yardim'} className="font-semibold block hover:underline transition-all max-md:text-xs px-2 py-1 rounded-full border">Yardım</Link>
          <Link title="İletişim" href={'/iletisim'} className="font-semibold block hover:underline transition-all max-md:text-xs px-2 py-1 rounded-full border">İletişim</Link>
          <div className="w-full h-[1px] my-2 bg-gradient-to-l to-transparent dark:via-white/20 via-black/20 from-transparent rounded-full"/>
          <Link title="Gizlilik Sözleşmesi" href={'/cerezler'} className="block text-sm hover:underline dark:hover:text-white hover:text-black transition-all max-md:text-xs px-2 py-1 rounded-full border">Gizlilik Sözleşmesi</Link>
          <Link title="KVKK" href={'/cerezler'} className="block text-sm hover:underline dark:hover:text-white hover:text-black transition-all max-md:text-xs px-2 py-1 rounded-full border">KVKK</Link>
          <Link title="Kullanıcı Sözleşmesi" href={'/cerezler'} className="block text-sm hover:underline dark:hover:text-white hover:text-black transition-all max-md:text-xs px-2 py-1 rounded-full border">Kullanıcı Sözleşmesi</Link>
          <Link title="Aydınlatma Metni" href={'/cerezler'} className="block text-sm hover:underline dark:hover:text-white hover:text-black transition-all max-md:text-xs px-2 py-1 rounded-full border">Aydınlatma Metni</Link>
      </div>

      <div className="flex-col items-center gap-x-2 max-md:hidden">
        <div className="flex justify-center items-center w-full dark:text-white/30 text-black/70">Sosyal Medya</div>
        <div className="flex items-center gap-x-4 mt-2">
          <Link title="Youtube" href={'https://www.youtube.com/@borveycom'}><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube-icon lucide-youtube dark:text-white/30 text-black/70 dark:hover:text-white hover:text-black transition-all"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg></Link>
          <Link title="Instagram" href={'https://www.instagram.com/borveycom/'}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram-icon lucide-instagram dark:text-white/30 text-black/70 dark:hover:text-white hover:text-black transition-all"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></Link>
          <Link title="Facebook" href={'https://www.facebook.com/people/borvey/100093522541664/'}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook-icon lucide-facebook dark:text-white/30 text-black/70 dark:hover:text-white hover:text-black transition-all"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></Link>
          <Link title="Twitter" href={'https://x.com/borveyborvey'}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter-icon lucide-twitter dark:text-white/30 text-black/70 dark:hover:text-white hover:text-black transition-all"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></Link>
          <Link title="Linkedin" href={'https://www.linkedin.com/in/borvey-com-441345287/'}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin-icon lucide-linkedin dark:text-white/30 text-black/70 dark:hover:text-white hover:text-black transition-all"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></Link>
        </div>
      </div>
      <div className="max-md:hidden block absolute right-5">
        <ThemeToggle/>
      </div>
     </div>
   </div>
    }
  </>
  );
};

export default Footer;
