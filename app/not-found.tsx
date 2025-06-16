'use client'
import Link from 'next/link'
import Lottie from "lottie-react";
import Error from '@/public/assets/gifs/Error.json'

export default function NotFound() {

  return (
    <div className="flex-col flex justify-center items-center w-full h-[calc(100vh-160px)] dark:bg-brandDark bg-white">
    {/* <h1 className="text-[20vw] max-lg:text-[40vw] font-black dark:text-white">404</h1> */}
    <Lottie animationData={Error} style={{height:400}} autoPlay={true} loop={true}/>
    <div className="">
      <div className="">
        <div className=""></div>
      </div>
    </div>
    <div className="container text-center flex-col flex justify-center items-center">
      <h2 className="font-bold">Bu sayfayı bulamıyoruz</h2>
      <p className="max-w-96">Bu sayfanın daha önce burada olduğundan oldukça eminiz, ancak kaybolmuş gibi görünüyor. Onun adına özür dileriz.</p>
      <Link title='Home' className='cursor-pointer mt-7 px-12 py-2 bg-black text-white hover:bg-black/20 hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white rounded-full transition-all' href="/">Home</Link>
    </div>
    </div>
  )
}