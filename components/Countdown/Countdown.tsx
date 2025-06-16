/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react'

type Props = {
  timestamp:any
}

const Countdown = ({ timestamp }: Props) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Calculate the remaining time
      const now = new Date().getTime();
      const distance = timestamp - now;
      if (distance < 0) {
        clearInterval(intervalId);
        return;
      }

      // Update the countdown state
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timestamp]);

  return (
    <div className='flex justify-center items-center w-full max-md:w-80'>
 
    <div className='flex justify-between items-center w-fit whitespace-nowrap border-[1px] dark:border-neutral-600 border-black/30 px-3 rounded-md bg-gradient-to-tl dark:to-neutral-800 dark:from-brandDark to-neutral-100 from-transparent dark:shadow-xl dark:shadow-black/20'>
      <div className='flex justify-center items-center border-r-[1px] dark:border-neutral-600 border-black/30 py-3 pr-3 w-full pointer-events-none cursor-default select-none'>{countdown.days} gün</div>
      <div className='flex justify-center items-center border-l-[1px] border-r-[1px] dark:border-neutral-600 border-black/30 py-3 px-3 w-full pointer-events-none cursor-default select-none'>{countdown.hours} saat</div>
      <div className='flex justify-center items-center border-l-[1px] border-r-[1px] dark:border-neutral-600 border-black/30 py-3 px-3 w-full pointer-events-none cursor-default select-none'>{countdown.minutes} dk.</div>
      <div className='flex justify-center items-center border-l-[1px] dark:border-neutral-600 border-black/30 py-3 pl-3 w-full pointer-events-none cursor-default select-none'>{countdown.seconds} sn.</div>
    </div>

    </div>
  )
}

export default Countdown