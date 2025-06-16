/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { findEmail } from '@/utils/emailToEmail';
import { signIn } from 'next-auth/react';
import React from 'react'

type Props = {}

const AdminClient = (props: Props) => {


  const handleLogin = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    await signIn('credentials',{
      redirectTo: `/adminpanel`,
      email,
      password,
    });
  };
  
  return (
    <>
    <div className='flex justify-center items-center w-full h-[calc(100vh-150px)] relative py-20'>
      <div className='flex justify-center items-center w-[500px] rounded-full absolute h-[500px] bg-radial to-transparent from-teal-500 blur-3xl z-0'></div>
      <div className='flex-col flex p-7 z-999 justify-center items-center dark:bg-neutral-900 bg-neutral-200 w-[500px] rounded-3xl border dark:border-white/20 border-black/20'>
      <h1 className='text-3xl font-bold'>Admin Panel</h1>
      <form onSubmit={handleLogin} className='flex-col flex justify-between items-center space-y-6 w-[400px] max-md:w-full mt-10'>
        <input type='text' name='email' placeholder='E-mail' className='px-3 py-1 rounded-lg w-72 border dark:border-white/30 border-black/30' autoComplete='new-password'/>
        <input type='password' name='password' placeholder='Şifre' className='px-3 py-1 rounded-lg w-72 border dark:border-white/30 border-black/30' autoComplete='new-password'/>
        <div className='flex justify-center items-center w-full'>
          <button type='submit' className='px-8 py-2 whitespace-nowrap bg-amber-500 hover:bg-amber-600 transition-all block my-5 rounded-xl text-xl font-bold cursor-pointer'>Giriş Yap</button>
        </div>
      </form>
      </div>
    </div>
    </>
  )
}

export default AdminClient