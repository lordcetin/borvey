/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

import AboutClient from '@/components/AboutClient/AboutClient';
import PreLoading from '@/components/PreLoading/PreLoading';
import { Metadata } from 'next';
import Head from 'next/head';
import React, { Suspense } from 'react'
type Props = {}

export const metadata: Metadata = {
  title: 'Hakkımızda | Borvey - Nakliye Platformu',
  description: "borvey, nakliyeciler ile müşterileri bir araya getiren güvenilir bir platformdur.",
  openGraph: {
    title: 'Hakkımızda | Borvey',
    description: 'Borvey ile hesabınıza giriş yaparak nakliye hizmetlerine kolayca erişin.',
    url: 'https://borvey.com/hakkimizda',
    siteName: 'Borvey',
    images: [
      {
        url: 'https://borvey.com/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Borvey Hakkımızda Sayfası',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hakkımızda | Borvey',
    description: 'borvey, nakliyeciler ile müşterileri bir araya getiren güvenilir bir platformdur.',
    images: ['https://borvey.com/og-image.webp'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Hakkımızda',
  url: 'https://borvey.com/hakkimizda',
  description: 'borvey, nakliyeciler ile müşterileri bir araya getiren güvenilir bir platformdur.',
};

const About = (props: Props) => {

  return (
    <>
    <Head>
      <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
    <Suspense fallback={<PreLoading/>}>
      <AboutClient/>
    </Suspense>
    </>
  )
}

export default About