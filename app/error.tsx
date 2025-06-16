'use client' // Error boundaries must be Client Components
import { useEffect } from 'react'
import Lottie from "lottie-react";
import Wrong from '@/public/assets/gifs/Wrong.json'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("error",error)
  }, [error])
 
  return (
    <div className="flex-col flex justify-center items-center w-full h-[calc(100vh-160px)] dark:bg-brandDark bg-white">
    {/* <h1 className="text-[20vw] max-lg:text-[40vw] font-black dark:text-white">404</h1> */}
    <Lottie animationData={Wrong} style={{height:400}} autoPlay={true} loop={true}/>
    <div className="">
      <div className="">
        <div className=""></div>
      </div>
    </div>
    <div className="container text-center flex-col flex justify-center items-center">
      <h2 className="font-bold">Bir şeyler ters gitti</h2>
      <p className="max-w-96">Bu sayfayı görüyorsanız muhtemelen geliştiricilerimiz bunu düzeltmeye çalışıyordur.</p>
      {process.env.NODE_ENV !== 'production' && 
      <div className='flex-col flex justify-center items-center w-[500px] max-md:w-90 mt-5'>
        <code className='dark:text-white/50 text-black/50 w-[500px] max-md:w-90'>{error?.message}</code>
        <code className='dark:text-white/50 text-black/50 w-[500px] max-md:w-90 max-h-16 overflow-y-auto overflow-x-hidden border dark:border-white/20 border-black/20 p-2 rounded-xl mt-2'>{error?.stack}</code>
      </div>}
      <button
        className='cursor-pointer mt-7 px-12 py-2 bg-black text-white hover:bg-black/20 hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white rounded-full transition-all'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Tekrar Dene
      </button>
    </div>
    </div>
  )
}