import "@/app/ui/globals.css";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Giriş Yap | Borvey - Nakliye Platformu',
  description: "Borvey.com, nakliyeciler ile müşterileri bir araya getiren güvenilir bir platformdur. Hızlı, kolay ve güvenli taşımacılık çözümleri sunar. En uygun fiyatlarla ekonomik taşıma mı arıyorsunuz? borvey'in hızlı ve bütçe dostu nakliye seçeneklerini keşfedin. Taşınmak hiç bu kadar kolay olmamıştı!",
  openGraph: {
    title: 'Giriş Yap | Borvey',
    description: 'Borvey ile hesabınıza giriş yaparak nakliye hizmetlerine kolayca erişin.',
    url: 'https://borvey.com/login',
    siteName: 'Borvey',
    images: [
      {
        url: 'https://borvey.com/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Borvey Giriş Sayfası',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giriş Yap | Borvey',
    description: 'Borvey ile hesabınıza giriş yaparak nakliye hizmetlerine kolayca erişin.',
    images: ['https://borvey.com/og-image.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
    {children}
    </>
  );
}
