
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useRoleStore } from "@/store/useRoleStore";
import { useStepStore } from "@/store/useStepStore";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

type Props = {
  data:any;
}

const TopBar = ({ data }:Props) => {
  const pathname = usePathname();
  const currentStep = useStepStore((state) => state.currentStep)
  const service = useRoleStore((state) => state.service)

  return (
    <div className="flex-col justify-center items-center w-fit">
      <div className="flex justify-center text-center items-center gap-x-2 relative">
        {data.slice(`${pathname === '/kayit-ol' ? `${0},${(data?.length - 1)}` : data?.length - (data?.length - 1)}`)?.map((item:any,index:any) => {
          return (
          <Fragment key={index}>
            <div className="flex-col justify-center items-center space-y-2">
              <div className={`w-24 h-3 max-md:w-12 rounded-full ${currentStep >= index ? `${service === 'service' ? "bg-amber-500 shadow-lg shadow-amber-500/80" : "bg-blue-500 shadow-lg shadow-blue-500/80"}` : "dark:bg-neutral-800 bg-neutral-300"}`}></div>

                {currentStep === index ? 
                <div className={`absolute top-7 whitespace-nowrap w-24 max-md:w-12 text-center rounded-lg dark:text-white/80 text-black/50 flex justify-center items-center cursor-default select-none bg-neutral-700 text-sm`}>
                <span className="dark:bg-neutral-700 bg-neutral-300 size-5 absolute -top-[8px] rotate-45 rounded-t-sm z-0"></span>
                <h1 className="dark:bg-neutral-700 bg-neutral-300 z-50 py-2 max-md:py-1 max-md:rounded-sm px-5 rounded-lg max-md:text-[10px]">{currentStep === index ? item?.title : ""}</h1>
                </div> : <div></div>}

            </div>
          </Fragment>
          )
        })}
      </div>
    </div>
  );
};

export default TopBar;
