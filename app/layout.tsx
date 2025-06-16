import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "@/app/ui/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"
import SessionWrapper from "@/components/SessionWrapper/page";
import { AppContextProvider } from "@/context/AppContext";
import { QueryProvider } from "./providers";
// import Sidebar from "@/components/Sidebar/page";
// import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";
import { AuthProvider } from '@/hook/useAuthSMS';

const geistSans = Quicksand({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Quicksand({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Borvey - Hızlı ve Ekonomik Taşıma Hizmetleri',
    template: '%s | Borvey', // Dinamik başlıklar için şablon
  },
  description:
    "Borvey.com, nakliyeciler ile müşterileri bir araya getiren güvenilir bir platformdur. Hızlı, kolay ve güvenli taşımacılık çözümleri sunar. En uygun fiyatlarla ekonomik taşıma mı arıyorsunuz? borvey'in hızlı ve bütçe dostu nakliye seçeneklerini keşfedin. Taşınmak hiç bu kadar kolay olmamıştı!",
  keywords: ['nakliye', 'taşımacılık', 'nakliyeci bul', 'borvey', 'lojistik', 'kargo'],
  openGraph: {
    title: 'Borvey - Hızlı ve Ekonomik Taşıma Hizmetleri',
    description:
      'Borvey ile nakliyeciler ve müşteriler kolayca buluşuyor. Güvenilir ve hızlı taşımacılık çözümleri için hemen katılın!',
    url: 'https://borvey.com',
    siteName: 'Borvey',
    images: [
      {
        url: 'https://borvey.com/og-image.webp', // OG resmi URL'si
        width: 1200,
        height: 630,
        alt: 'Borvey - Hızlı ve Ekonomik Taşıma Hizmetleri',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Borvey - Hızlı ve Ekonomik Taşıma Hizmetleri',
    description:
      'Borvey ile nakliyeciler ve müşteriler kolayca buluşuyor. Güvenilir ve hızlı taşımacılık çözümleri için hemen katılın!',
    images: ['https://borvey.com/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://borvey.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased dark:bg-[#0a0d11] bg-white h-full w-full overflow-x-hidden dark:text-white text-black selection:bg-yellow-400 selection:text-black font-medium max-md:p-0`}
      >
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
          <SessionWrapper>
            <AppContextProvider>
              <QueryProvider>

                <div className="flex">
                  {/* <Sidebar/> */}
                    <div className="flex-col items-center w-full">

                        <section className=" flex-col flex items-center">
                        {children}
                        </section>
                      <Footer/>
                    </div>
                </div>

              </QueryProvider>
            </AppContextProvider>
          </SessionWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
