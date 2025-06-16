'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSearchParams } from "next/navigation"
 
enum Error {
  Configuration = "Configuration",
}
 
const errorMap = {
  [Error.Configuration]: (
    <>
    <p>
      Kimlik doğrulaması yapılırken bir sorun oluştu. Bu hata devam ederse lütfen bizimle iletişime geçin. <a href="/yardim" className="dark:text-white text-black underline dark:hover:text-white/30 hover:text-black/70">Destek Ekibi</a>
    </p>
    <a href="/giris-yap" className="mt-5 block w-full dark:bg-white dark:text-black py-2 rounded-md">Tekrar Dene</a>
    </>
  ),
}
 
export default function AuthErrorPage() {
  const search:any = useSearchParams()
  const error = search.get("error") as Error
  console.log("error",error)
 
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <a
          href="#"
          className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow dark:border-gray-700 dark:bg-gray-800 "
        >
          <h5 className="mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Bir şeyler ters gitti
          </h5>
          <div className="font-normal text-gray-700 dark:text-gray-400">
            {errorMap[error] || "Bu hata devam ederse lütfen bizimle iletişime geçin."}
          </div>
        </a>
      </div>
    </>
  )
}