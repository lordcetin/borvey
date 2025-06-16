/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useTransport } from '@/store/useTransport'
import useValid from '@/store/useValid'
import useValidForm from '@/store/useValidForm'
import React, { useEffect } from 'react'

type Props = {}

const TransportType = (props: Props) => {
  const transportype = useTransport((state) => state.transportype)
  const setTransportType = useTransport((state) => state.setTransportType)
  const { isValid , setIsValid } = useValidForm()

    useEffect(() => {
      setIsValid(false)
    }, []);

  return (
    <div className='flex justify-center items-center w-full mt-10 mb-20'>

      <div className='flex-col items-center w-full space-y-4 max-md:grid max-md:grid-cols-1'>
        <div className='flex items-center w-full space-x-4'>

          <div onClick={() => {setTransportType("evdenEve"),setIsValid(true)}} className={`w-[50%] h-70 relative flex-col items-center py-7 px-5 rounded-3xl max-md:rounded-2xl cursor-pointer ${transportype === 'evdenEve' ? "dark:bg-blue-600 bg-blue-300/50 border-2 border-blue-500" : "border dark:border-white/20 border-black/30"}`}>
            <div className='flex items-center w-full gap-x-2'>
              <div className={`rounded-full max-md:shrink-0 size-6 transition-all self-start mt-2 ${transportype === 'evdenEve' ? "border-4 border-blue-500 dark:bg-[#0a0d11] bg-white" : "border dark:border-white/30 border-black/30"}`}></div>
              <div className='flex-col items-center space-y-2 self-start'>
              <h1 className='text-4xl font-bold max-md:text-[16px]'>Evden Eve Nakliyat</h1>
              <p className='w-70 text-sm max-md:w-32 max-md:text-[10px]'>Yeni eviniz, yeni anılarınız... Taşınma telaşını bize bırakın, siz sadece yerleşmenin keyfini çıkarın. Eviniz, güvenli ellerde.</p>
              </div>
              <svg className='absolute bottom-3 right-3 max-md:scale-50 max-md:-bottom-5 max-md:-right-1' width="203" height="133" viewBox="0 0 203 133" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M201.924 66.8457L178.443 38.5456C177.549 37.4689 176.224 36.8456 174.82 36.8456H143.979V4.70345C143.979 2.10805 141.874 0 139.281 0H4.70987C2.10586 0 0 2.11939 0 4.70345V34.1935C0 36.8003 2.10586 38.9083 4.70987 38.9083V38.829H35.7656C38.3583 38.829 40.4755 36.7209 40.4755 34.1142V27.552L68.2252 46.5472L40.4755 67.333V60.6349C40.4755 58.0281 38.3696 55.9314 35.7656 55.9314H4.70987C2.10586 55.9314 0 58.0395 0 60.6349V109.63C0 112.237 2.10586 114.334 4.70987 114.334H11.4916C12.069 117.745 13.4163 120.896 15.341 123.582H4.70987C2.10586 123.582 0 125.701 0 128.285C0 130.869 2.10586 133 4.70987 133H165.072C172.59 133 179.236 129.271 183.3 123.582C185.236 120.884 186.583 117.734 187.149 114.334H198.301C200.905 114.334 203 112.225 203 109.63V69.8604C203 68.7497 202.615 67.6844 201.913 66.857L201.924 66.8457ZM169.771 46.2525H172.624L191.78 69.3504H169.771V46.2525ZM9.40842 65.327H31.0557V76.7173C31.0557 78.4966 32.0634 80.1287 33.6484 80.9334C34.3164 81.2507 35.0297 81.432 35.7543 81.432C36.7506 81.432 37.7356 81.1147 38.5734 80.48L79.1281 50.1513C80.3395 49.2446 81.0415 47.7939 81.0075 46.2752C80.9736 44.7565 80.215 43.3511 78.9583 42.4897L38.4149 14.7337C36.977 13.7477 35.1089 13.6457 33.5578 14.4617C32.0181 15.2777 31.0557 16.8871 31.0557 18.6325V29.4221H9.40842V9.42957H134.582V83.8008H9.40842V65.327ZM11.8992 104.904H9.40842V93.219H19.3943C15.7826 96.1771 13.1107 100.257 11.8992 104.904ZM33.5805 123.57C26.4138 123.57 20.583 117.734 20.583 110.571C20.583 103.408 26.4138 97.5598 33.5805 97.5598C40.7472 97.5598 46.5779 103.385 46.5779 110.571C46.5779 117.756 40.7359 123.57 33.5805 123.57ZM47.7667 93.219H134.582V104.904H55.2617C54.0503 100.246 51.3784 96.1771 47.7667 93.219ZM51.8199 123.57C53.7446 120.873 55.0919 117.722 55.6693 114.322H139.292C140.673 114.322 141.908 113.733 142.768 112.781C142.825 113.302 142.893 113.812 142.983 114.322C143.561 117.734 144.908 120.884 146.833 123.57H51.8199ZM165.072 123.57C157.905 123.57 152.075 117.734 152.075 110.571C152.075 103.408 157.905 97.5598 165.072 97.5598C172.239 97.5598 178.069 103.385 178.069 110.571C178.069 117.756 172.239 123.57 165.072 123.57ZM193.603 104.904H186.753C184.24 95.2704 175.477 88.1302 165.072 88.1302C155.38 88.1302 147.127 94.307 143.991 102.932V46.2638H160.362V74.0765C160.362 76.6833 162.468 78.78 165.072 78.78H193.603V104.915V104.904Z" fill="#F69B14"></path></svg>
            </div>
          </div>

          <div onClick={() => {setTransportType("tekliUrun"),setIsValid(true)}} className={`w-[50%] h-70 relative flex-col items-center py-7 px-5 rounded-3xl max-md:rounded-2xl cursor-pointer ${transportype === 'tekliUrun' ? "dark:bg-blue-600 bg-blue-300/50 border-2 border-blue-500" : "border dark:border-white/20 border-black/30"}`}>
            <div className='flex items-center w-full gap-x-2'>
              <div className={`rounded-full max-md:shrink-0 size-6 transition-all self-start mt-2 ${transportype === 'tekliUrun' ? "border-4 border-blue-500 dark:bg-[#0a0d11] bg-white" : "border dark:border-white/30 border-black/30"}`}></div>
              <div className='flex-col items-center space-y-2 self-start'>
              <h1 className='text-4xl font-bold max-md:text-[16px]'>Parça Eşya Nakliyat</h1>
              <p className='w-70 text-sm max-md:w-32 max-md:text-[10px]'>O özel parça sizin için ne kadar değerliyse, bizim için de o kadar kıymetli. Tek bir eşyanız bile olsa, ona VIP hizmet sunuyor, sorunsuz ulaştırıyoruz.</p>
              </div>
              <svg className='absolute bottom-3 right-3 max-md:scale-50 max-md:-bottom-5 max-md:-right-0' width="170" height="134" viewBox="0 0 170 134" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M166.196 95.144H143.613V35.4008C143.613 34.2078 143.052 33.0974 142.125 32.3724C141.996 32.2806 141.849 32.1705 141.702 32.097L86.9156 0.509331C85.7304 -0.169777 84.2788 -0.169777 83.1027 0.509331L28.3073 32.097C28.1603 32.1705 28.0225 32.2806 27.8939 32.3724C26.9659 33.0974 26.4054 34.2078 26.4054 35.4008V95.8782H3.82208C1.7181 95.8782 0 97.5851 0 99.6959C0 101.807 1.70891 103.514 3.82208 103.514H30.2183C30.4848 103.514 30.7329 103.477 30.9809 103.44L83.0936 133.486C83.0936 133.486 83.1119 133.495 83.1211 133.504C83.2497 133.578 83.3876 133.651 83.5438 133.706C83.5438 133.715 83.5621 133.715 83.5621 133.725C83.6908 133.771 83.8286 133.826 83.9664 133.862C84.0031 133.862 84.0491 133.872 84.0766 133.881C84.1869 133.917 84.3063 133.936 84.4166 133.945C84.4625 133.954 84.4993 133.963 84.536 133.963C84.683 133.982 84.8392 134 84.9862 134C85.1424 134 85.2894 133.991 85.4456 133.963C85.4824 133.963 85.5191 133.954 85.5559 133.945C85.6753 133.936 85.7856 133.908 85.905 133.881C85.9417 133.872 85.9785 133.862 86.0152 133.862C86.1531 133.826 86.2909 133.78 86.4287 133.725C86.4287 133.725 86.4379 133.725 86.4471 133.706C86.5941 133.651 86.7319 133.578 86.8697 133.504C86.8697 133.495 86.8881 133.495 86.8973 133.486L140.14 102.789H166.178C168.282 102.789 170 101.072 170 98.9709C170 96.8693 168.291 95.1532 166.178 95.1532L166.196 95.144ZM135.978 77.4046L118.88 87.2884V51.8646L135.978 41.9992V77.4046ZM58.7737 56.2696L81.1917 69.2002V104.679L58.7737 91.7209V56.2788V56.2696ZM88.8267 69.2002L111.235 56.2696V91.7117L88.8267 104.67V69.191V69.2002ZM85.0046 8.21813L132.156 35.41L115.048 45.2662L67.6031 18.2487L84.9954 8.21813H85.0046ZM59.9497 22.6629L107.395 49.6896L85.0138 62.6019L37.8625 35.41L59.9497 22.6721V22.6629ZM51.1387 51.8646V87.2884L34.0404 77.4046V41.9992L51.1387 51.8646ZM34.0496 86.2146L81.2009 113.48V123.584L34.0496 96.3829V86.2146ZM88.8267 113.48L135.969 86.2146V96.3829L88.8267 123.584V113.48Z" fill="#3170DE"></path></svg>
            </div>
          </div>

        </div>
        <div className='flex items-center w-full space-x-4'>

          <div onClick={() => {setTransportType("ofis"),setIsValid(true)}} className={`w-[50%] h-70 relative flex-col items-center py-7 px-5 rounded-3xl max-md:rounded-2xl cursor-pointer ${transportype === 'ofis' ? "dark:bg-blue-600 bg-blue-300/50 border-2 border-blue-500" : "border dark:border-white/20 border-black/30"}`}>
            <div className='flex items-center w-full gap-x-2'>
              <div className={`rounded-full max-md:shrink-0 size-6 transition-all self-start mt-2 ${transportype === 'ofis' ? "border-4 border-blue-500 dark:bg-[#0a0d11] bg-white" : "border dark:border-white/30 border-black/30"}`}></div>
              <div className='flex-col items-center space-y-2 self-start'>
              <h1 className='text-4xl font-bold max-md:text-[16px]'>Ofis, Depo Nakliyat</h1>
              <p className='w-70 text-sm max-md:w-32 max-md:text-[10px]'>İşinizin kalbi nerede atarsa atsın, biz oradayız. Verimli bir taşınma süreciyle iş akışınızı kesintiye uğratmadan, ofisinizi geleceğe taşıyoruz.</p>
              </div>
              <svg className='absolute bottom-3 right-3 max-md:scale-50 max-md:-bottom-5 max-md:right-10' width="121" height="133" viewBox="0 0 121 133" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M118.021 127.034H110.75V49.0537C110.75 47.4076 109.408 46.0633 107.764 46.0633H99.4169V2.98319C99.4169 1.32986 98.0747 0 96.4311 0H25.2939C23.6502 0 22.3152 1.32986 22.3152 2.98319V46.0562H13.9604C12.3168 46.0562 10.9817 47.4004 10.9817 49.0465V127.026H2.98588C1.34221 127.026 0 128.363 0 130.017C0 131.67 1.34221 133 2.98588 133H118.021C119.665 133 121 131.663 121 130.017C121 128.371 119.665 127.026 118.021 127.026V127.034ZM93.4524 27.5676H28.2797V18.8121H93.4524V27.5676ZM71.3095 33.5411V41.2184H50.4298V33.5411H71.3095ZM28.2797 33.5411H44.4581V44.2159C44.4581 45.8549 45.7931 47.1991 47.4368 47.1991H74.281C75.9318 47.1991 77.2669 45.8549 77.2669 44.2159V33.5411H93.4524V66.7516H28.2797V33.5411ZM28.2797 5.97357H93.4524V12.8385H28.2797V5.97357ZM16.9463 52.0369H22.3152V69.742C22.3152 71.3881 23.6502 72.7324 25.2939 72.7324H96.4311C98.0747 72.7324 99.4169 71.3809 99.4169 69.742V52.0369H104.786V79.5038H16.9463V52.0369ZM75.573 85.4846V94.5923H46.152V85.4846H75.573ZM16.9463 127.034V85.4846H40.1874V97.5755C40.1874 99.236 41.5224 100.566 43.1661 100.566H78.566C80.2169 100.566 81.5519 99.236 81.5519 97.5755V85.4846H104.793V127.034H16.9463Z" fill="#24C4BB"></path></svg>
            </div>
          </div>

          <div onClick={() => {setTransportType("kisaMesafe"),setIsValid(true)}} className={`w-[50%] h-70 relative flex-col items-center py-7 px-5 rounded-3xl max-md:rounded-2xl cursor-pointer ${transportype === 'kisaMesafe' ? "dark:bg-blue-600 bg-blue-300/50 border-2 border-blue-500" : "border dark:border-white/20 border-black/30"}`}>
            <div className='flex items-center w-full gap-x-2'>
              <div className={`rounded-full max-md:shrink-0 size-6 transition-all self-start mt-2 ${transportype === 'kisaMesafe' ? "border-4 border-blue-500 dark:bg-[#0a0d11] bg-white" : "border dark:border-white/30 border-black/30"}`}></div>
              <div className='flex-col items-center space-y-2 self-start'>
              <h1 className='text-4xl font-bold max-md:text-[16px]'>Kısa Mesafe Nakliyat</h1>
              <p className='w-70 text-sm max-md:w-32 max-md:text-[10px]'>Kapı komşunuz olmasak da, eşyalarınızın en yakın arkadaşıyız! Az eşya, kısa mesafe fark etmez; taşınma derdini sırtınızdan alıyor, hızla yol alıyoruz.</p>
              </div>
              <svg className='absolute bottom-3 right-3 max-md:scale-50 max-md:-bottom-5 max-md:right-10 dark:fill-white fill-[#1E1E1E]' width="146" height="134" viewBox="0 0 146 134" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_92_24004)"><path d="M25.3182 6.51536H46.6048V24.1876C46.6048 25.9909 48.0802 27.4492 49.8869 27.4492C51.6937 27.4492 53.169 25.983 53.169 24.1876V3.25376C53.169 1.45047 51.7015 0 49.8869 0H25.3182C23.5114 0 22.0439 1.45831 22.0439 3.25376C22.0439 5.04921 23.5114 6.50752 25.3182 6.50752V6.51536Z"></path><path d="M145.046 117.386L137.558 109.946C136.943 109.334 136.107 108.997 135.239 108.997H58.3058C56.783 107.946 55.0473 107.202 53.1695 106.817V52.6952C53.1695 50.8919 51.702 49.4336 49.8874 49.4336C48.0727 49.4336 46.6052 50.8919 46.6052 52.6952V107.107C40.8615 108.77 36.6562 114.038 36.6562 120.279C36.6562 127.853 42.8497 134 50.4633 134C58.0769 134 64.2704 127.845 64.2704 120.279C64.2704 118.601 63.9627 117.002 63.4104 115.512H133.89L140.414 121.996C141.054 122.631 141.898 122.953 142.734 122.953C143.57 122.953 144.415 122.631 145.054 121.996C146.332 120.726 146.332 118.664 145.054 117.386H145.046ZM50.4554 127.492C46.4632 127.492 43.2126 124.254 43.2126 120.279C43.2126 116.304 46.4632 113.082 50.4554 113.082C54.4477 113.082 57.7061 116.312 57.7061 120.279C57.7061 124.247 54.4555 127.492 50.4554 127.492Z" ></path><path d="M58.9208 106.025H131.909C133.724 106.025 135.191 104.567 135.191 102.772V40.2445C135.191 38.4412 133.724 36.9908 131.909 36.9908H126.37V4.68054C126.37 2.87726 124.903 1.41895 123.096 1.41895H67.7337C65.9269 1.41895 64.4594 2.87726 64.4594 4.68054V36.9908H58.9208C57.1062 36.9908 55.6387 38.4491 55.6387 40.2445V102.764C55.6387 104.559 57.1062 106.018 58.9208 106.018V106.025ZM128.635 99.51H62.203V69.3323H78.3691V77.7215C78.3691 79.517 79.8366 80.9832 81.6512 80.9832H109.194C111.001 80.9832 112.477 79.517 112.477 77.7215V69.3323H128.635V99.51ZM84.9255 74.46V69.3245H105.912V74.46H84.9255ZM119.822 22.7134H71.0237V17.8524H119.822V22.7134ZM102.583 29.2209V33.2431H88.2549V29.2209H102.583ZM71.0237 29.2209H81.6986V36.5125C81.6986 38.3079 83.166 39.7663 84.9807 39.7663H105.873C107.68 39.7663 109.155 38.3079 109.155 36.5125V29.2209H119.83V52.9616H71.0316V29.2209H71.0237ZM71.0237 7.9343H119.822V11.337H71.0237V7.9343ZM62.203 43.5061H64.4673V56.2232C64.4673 58.0265 65.9348 59.477 67.7416 59.477H123.104C124.911 59.477 126.378 58.0265 126.378 56.2232V43.5061H128.643V62.8091H62.2108V43.5061H62.203Z" ></path><path d="M83.7574 90.0703H69.7215C67.9069 90.0703 66.4473 91.5365 66.4473 93.3319C66.4473 95.1274 67.9148 96.5935 69.7215 96.5935H83.7574C85.5642 96.5935 87.0395 95.1352 87.0395 93.3319C87.0395 91.5286 85.572 90.0703 83.7574 90.0703Z" fill="#1E1E1E"></path><path d="M88.9489 45.1841H76.9013C75.0945 45.1841 73.6191 46.6424 73.6191 48.4457C73.6191 50.249 75.0866 51.6994 76.9013 51.6994H88.9489C90.7636 51.6994 92.2311 50.2411 92.2311 48.4457C92.2311 46.6502 90.7636 45.1841 88.9489 45.1841Z" ></path><path d="M31.1806 17.2881C29.3738 17.2881 27.8984 18.7464 27.8984 20.5497C27.8984 22.353 29.3738 23.8113 31.1806 23.8113H40.2854C42.0921 23.8113 43.5675 22.353 43.5675 20.5497C43.5675 18.7464 42.1 17.2881 40.2854 17.2881H31.1806Z" ></path><path d="M43.5675 59.9476C43.5675 58.1443 42.1 56.686 40.2854 56.686H31.1806C29.3738 56.686 27.8984 58.1443 27.8984 59.9476C27.8984 61.7509 29.3738 63.2092 31.1806 63.2092H40.2854C42.0921 63.2092 43.5675 61.7509 43.5675 59.9476Z" ></path><path d="M53.1612 32.2084C53.1612 30.4129 51.6937 28.9468 49.8791 28.9468H3.28214C1.4675 28.9468 0 30.4129 0 32.2084C0 34.0038 1.4675 35.47 3.28214 35.47H49.8791C51.6937 35.47 53.1612 34.0195 53.1612 32.2084Z" ></path><path d="M53.1615 43.9925C53.1615 42.1971 51.6941 40.7388 49.8794 40.7388H16.411C14.6043 40.7388 13.1289 42.2049 13.1289 43.9925C13.1289 45.7801 14.5964 47.2541 16.411 47.2541H49.8794C51.6941 47.2541 53.1615 45.8037 53.1615 43.9925Z" ></path></g><defs><clipPath id="clip0_92_24004"><rect width="146" height="134"></rect></clipPath></defs></svg>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default TransportType