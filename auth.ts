/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import NextAuth, { CredentialsSignin } from "next-auth"
import credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from "@auth/prisma-adapter";
import { saltAndHashPassword } from "@/lib/solvePass";
import prismadb from '@/lib/prismadb'
import { signInSchema } from "./lib/zod";
import { getAuth, OAuthCredential, signInWithCredential } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./utils/firebase";
import { verifyPassword } from "./lib/solveScrypt";

export const runtime = 'nodejs';

const app = initializeApp(firebaseConfig)
const autho = getAuth(app)

//@ts-ignore
export const { handlers, signIn, signOut, auth, update } = NextAuth({

  providers: [
    credentials({
      id: 'firebase',
      name: 'Firebase',
      type: 'credentials',
      credentials: {
        idToken: { label: 'ID Token', type: 'text' },
        phone: { label: 'Phone', type: 'text' }
      },
      async authorize(credentials: any) {
        if (!credentials?.idToken || !credentials?.phoneNumber) {
          throw new Error('ID token and phone number required')
        }

        try {

          // Normalize phone number (remove '+' and spaces)
          const normalizedPhone = credentials.phone

          // Check if user exists in Prisma by phone number
          let prismaUser:any = await prismadb.user.findFirst({
            where: { phone: normalizedPhone }
          })

          return prismaUser
        } catch (error: any) {
          throw new Error(`Firebase authentication failed: ${error.message}`)
        }
      }
    }),
    credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
          email:{
              label: 'Email',
              type: 'text',
          },
          password: {
              label: 'Password',
              type: 'password'
          }
      },
      //@ts-ignore
      async authorize(credentials:any){

          if(!credentials?.email || !credentials?.password){
            throw new Error('Email and password required');
          }

          const { email, password } = await signInSchema.parseAsync(credentials)

          const user = await prismadb.user.findUnique({
            where:{
              email: email,
            }
          });

          if(!user || !user.hashedPassword) {
            throw new Error('Email does not exist');
          }

          const isCorrectPassword = await saltAndHashPassword(password,user.hashedPassword)
          // const isCorrectPassword = await verifyPassword(user.hash, user.salt, credentials.password);
          
          if(!isCorrectPassword){
            throw new Error('Incorrect password')
          }

          return user;
      }
  }),
    GoogleProvider({
      clientId:process.env.GOOGLE_ID as string,
      clientSecret:process.env.GOOGLE_SECRET as string
    }),
  ],
  pages: {
    signIn: `/giris-yap`,
    error: '/auth/error',
  },
  callbacks: {
    async redirect({ url, baseUrl }:{url:any,baseUrl:any}) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    jwt({ token ,user, trigger, session }:{token:any,user:any, trigger?:string, session?:any}) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.fullName = user.fullName
        token.memberId = user.memberId
        token.image = user.image
        token.firmName = user.firmName
        token.firmStatus = user.firmStatus
        token.adminStatus = user.adminStatus
        token.conversationId = user.conversationId
      }

      if (trigger === "update" && session) {
        token.fullName = session.fullName ?? token.fullName
        token.username = session.username ?? token.username
        token.image = session.image ?? token.image
        token.firmName = session.firmName ?? token.firmName
        token.firmStatus = session.firmStatus ?? token.firmStatus
        token.adminStatus = session.adminStatus ?? token.adminStatus

      }

      return token
    },
    session({ session, token }:{session:any,token:any}) {
      session.user.id = token.id
      session.user.username = token.username
      session.user.fullName = token.fullName
      session.user.image = token.image
      session.user.memberId = token.memberId
      session.user.firmName = token.firmName
      session.user.firmStatus = token.firmStatus
      session.user.adminStatus = token.adminStatus
      session.user.conversationId = token.conversationId
      return session
    },
  },
  debug: process.env.NODE_ENV == 'production',
  trustHost: true,
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: 'jwt',
  },
  jwt:{
    secret: process.env.NEXTAUTH_JWT_SECRET || "UL^BUxub$o#cs9t3340%ru8XH8gh9%BxATgWFwfSK!fOLFki#n",
  }as any,
  secret: process.env.AUTH_SECRET || "rN2aq01t14IyNn/zE0gXO/uf70l+jYCfcVy2+Wtv47c=",
})
