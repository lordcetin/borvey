/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import TimeAgo from '@/components/TimeAgo';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ExternalLink } from 'lucide-react';
import React, { Fragment, useEffect, useRef } from 'react'

type Props = {offer:any}

const OfferDatas = ({offer}: Props) => {

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
      const response = await fetch(`/api/getOffers?page=${pageParam}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    refetchInterval: 5000,
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
    <div className='rounded-2xl border dark:border-white/10 border-black/10 box-border w-[400px] h-[291px] relative overflow-hidden'>
      <div className='flex justify-center items-center w-full h-20 absolute bottom-0 left-0 bg-linear-to-t to-transparent from-brandDark'></div>
      <div className='absolute top-0 right-0 cursor-pointer bg-white/60 hover:bg-white text-black w-12 size-8 flex justify-center items-center rounded-se-xl rounded-es-xl hover:w-34 gap-x-1 hover:before:w-fit hover:before:whitespace-nowrap hover:before:text-black hover:before:content-["Hepsini_Gör"] transition-all font-semibold'><ExternalLink size={23} /></div>
      <h1 className='font-bold text-xl mb-4 py-2 px-3 dark:text-white/50 text-black/50'>Teklifler</h1>
      <div className='flex-col items-center space-y-2 mt-9 px-3'>
      {offer?.slice(0,4).map((offer:any,index:any) => (
        <Fragment key={index}>
          <div className='dark:text-white/30 text-black/70 py-2 px-3 h-11 rounded-md border dark:border-white/30 border-black/30 select-none pointer-events-none flex justify-between items-center w-full'>
            <div className='flex items-center gap-x-2'>
              <h1 className='text-sm whitespace-nowrap w-12 overflow-hidden'>{offer.offerText}</h1>
            </div>
            <div className='text-sm flex items-center gap-x-6'>
              <h1>{offer?.price}₺</h1>
            </div>
            <div className=''>
            <TimeAgo size={'14px'} timestamp={new Date(offer?.createdAt)?.getTime()}/>
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

export default OfferDatas