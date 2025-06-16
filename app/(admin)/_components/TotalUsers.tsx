/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import TimeAgo from '@/components/TimeAgo';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useEffect, useRef } from 'react'

type Props = {user:any}

const TotalUsers = ({user}: Props) => {

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ['offers'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(`/api/getUsers?page=${pageParam}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    // Opsiyonel: Gerçek zamanlılık için polling
    refetchInterval: 5000, // Her 5 saniyede bir yenile
  });

  const observerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) return <div>Veri Yükleniyor...</div>;
  if (error) return <div>Hata: {error.message}</div>;

  return (
    <div className='w-full h-[288px] rounded-2xl border dark:border-white/10 border-black/10 box-border self-start p-5 relative overflow-hidden'>
      <div className='flex justify-center items-center w-full h-20 absolute bottom-0 left-0 bg-linear-to-t to-transparent from-brandDark'></div>
      <Link title='kullanicilar' href={'/admin/users'} className='absolute top-0 right-0 cursor-pointer bg-white/60 hover:bg-white text-black w-12 size-8 flex justify-center items-center rounded-se-xl rounded-es-xl hover:w-34 gap-x-1 hover:before:w-fit hover:before:whitespace-nowrap hover:before:text-black hover:before:content-["Hepsini_Gör"] transition-all font-semibold'><ExternalLink size={23} /></Link>
      <h1 className='font-bold text-xl mb-4 dark:text-white/50 text-black/50'>Kullanıcılar</h1>
      <div className='flex flex-wrap whitespace-pre-wrap gap-x-2 space-y-2'>  
        <div className='dark:text-white/30 text-black/70 py-2 px-3 h-11 rounded-md border dark:border-white/30 border-black/30'>Toplam Kullanıcı: <strong className='dark:text-white/50 text-black/50'>{data.pages[0]?.data?.length}</strong></div>
        <div className='dark:text-white/30 text-black/70 py-2 px-3 h-11 rounded-md border dark:border-white/30 border-black/30'>Toplam Müşteri: <strong className='dark:text-white/50 text-black/50'>{data.pages[0]?.data?.filter((u:any) => u?.firmStatus === false)?.length}</strong></div>
        <div className='dark:text-white/30 text-black/70 py-2 px-3 h-11 rounded-md border dark:border-white/30 border-black/30'>Toplam Firma: <strong className='dark:text-white/50 text-black/50'>{data.pages[0]?.data?.filter((u:any) => u?.firmStatus === true)?.length}</strong></div>
      </div>
      <div className='flex-col items-center space-y-2 mt-5'>
      {/* {isSuccess && (
        <>
          {data.pages.map((page:any, x:any) => (
            <Fragment key={x}>
              {page.data?.map((user:any,index:any) => (
                <Fragment key={index}>
                  <div className='dark:text-white/30 text-black/70 py-2 px-3 h-11 rounded-md border dark:border-white/30 border-black/30 select-none pointer-events-none flex justify-between items-center w-full'>
                    <div className='flex items-center gap-x-2'>
                      <Image src={user?.image} alt='' width={800} height={800} className='size-6 rounded-full border dark:border-white/30 border-black/30'/>
                      <h1>{user.fullName}</h1>
                    </div>
                    <div className='text-sm'>
                      {user?.provinceFrom}
                    </div>
                    <div className=''>
                    <TimeAgo size={'14px'} timestamp={new Date(user?.createdAt)?.getTime()}/>
                    </div>
                  </div>
                </Fragment>
              ))}
            </Fragment>
          ))}
        </>
      )} */}

      {user?.slice(0)?.filter((u:any) => u?.firmStatus === false).map((user:any,index:any) => (
        <Fragment key={index}>
          <div className='dark:text-white/30 text-black/70 py-2 px-3 h-11 rounded-md border dark:border-white/30 border-black/30 select-none pointer-events-none flex justify-between items-center w-full'>
            <div className='flex items-center gap-x-2'>
              <Image src={user?.image} alt='' width={800} height={800} className='size-6 rounded-full border dark:border-white/30 border-black/30'/>
              <h1>{user.fullName}</h1>
            </div>
            <div className='text-sm'>
              {user?.provinceFrom}
            </div>
            <div className=''>
            <TimeAgo size={'14px'} timestamp={new Date(user?.createdAt)?.getTime()}/>
            </div>
          </div>
        </Fragment>
      ))}
      </div>
      {/* <div ref={observerRef} className="h-10">
        {isFetchingNextPage && <div>Yükleniyor...</div>}
        {!hasNextPage && isSuccess && <div>Tüm veriler yüklendi.</div>}
      </div> */}
    </div>
  )
}

export default TotalUsers