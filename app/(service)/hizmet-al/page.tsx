/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react'
import CustomerClient from './_components/CustomerClient'
import { Metadata } from 'next';
import Head from 'next/head';

type Props = {}

export const metadata: Metadata = {
  title: 'Hizmet Al | Borvey - Nakliye Platformu',
  description: "borvey, nakliyeciler ile müşterileri bir araya getiren güvenilir bir platformdur.",
  openGraph: {
    title: 'Hizmet Al | Borvey',
    description: 'Borvey ile hesabınıza giriş yaparak nakliye hizmetlerine kolayca erişin.',
    url: 'https://borvey.com/hizmet-al',
    siteName: 'Borvey',
    images: [
      {
        url: 'https://borvey.com/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Borvey Hizmet Al Sayfası',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hizmet Al | Borvey',
    description: 'borvey, nakliyeciler ile müşterileri bir araya getiren güvenilir bir platformdur.',
    images: ['https://borvey.com/og-image.webp'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Hizmet Al',
  url: 'https://borvey.com/hizmet-al',
  description: 'borvey, nakliyeciler ile müşterileri bir araya getiren güvenilir bir platformdur.',
};

const Customer = (props: Props) => {

  return (
    <>
    <Head>
      <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
    <CustomerClient/>
    </>
  )
}

export default Customer