/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import prismadb from '@/lib/prismadb';

type Props = {
  email:any;
  code:any;
}

 const updateUserCode = async ({email,code}:Props) => {
  try {
  
  await prismadb.user.update({
    where:{
      email
    },
    data:{
      code
    }
  })
  return "OK"
  } catch (error:any) {
    return error
  }
}
export default updateUserCode