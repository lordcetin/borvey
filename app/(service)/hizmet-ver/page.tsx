/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import ServiceClient from './_components/ServiceClient'
import { Metadata } from 'next';
import Head from 'next/head';

type Props = {}

export const metadata: Metadata = {
  title: 'Hizmet Ver | Borvey - Nakliye Platformu',
  description: "borvey, nakliyeciler ile müşterileri bir araya getiren güvenilir bir platformdur.",
  openGraph: {
    title: 'Hizmet Ver | Borvey',
    description: 'Borvey ile hesabınıza giriş yaparak nakliye hizmetlerine kolayca erişin.',
    url: 'https://borvey.com/hizmet-ver',
    siteName: 'Borvey',
    images: [
      {
        url: 'https://borvey.com/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Borvey Hizmet Ver Sayfası',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hizmet Ver | Borvey',
    description: 'borvey, nakliyeciler ile müşterileri bir araya getiren güvenilir bir platformdur.',
    images: ['https://borvey.com/og-image.webp'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Hizmet Ver',
  url: 'https://borvey.com/hizmet-ver',
  description: 'borvey, nakliyeciler ile müşterileri bir araya getiren güvenilir bir platformdur.',
};

const Transport = (props: Props) => {

  return (
    <>
    <Head>
      <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
    <ServiceClient/>
    </>
  )
}

export default Transport