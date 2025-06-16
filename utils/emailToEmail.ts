/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import prismadb from '@/lib/prismadb'

export const findEmail = async (email:string) => {

  const emailData:any = await prismadb.user.findUnique({
    where:{
      email,
    }
  })
  const isEmail = {
    email: emailData?.email,
    isAdmin: emailData?.adminStatus,
    fullName: emailData?.fullName,
    code: emailData?.code
  }

  return isEmail

}