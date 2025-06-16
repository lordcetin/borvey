/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";


interface InputProps{
  id: string;
  name:string;
  onChange: any;
  onError:boolean;
  label: string;
  type?: string;
  errorMessage:any;
}

const Textarea: React.FC<InputProps> = ({id,onChange,name,label,onError,errorMessage=""}) => {

  return (
      <>
      <label htmlFor={label} className="block relative w-full">
      <textarea
      required={true}
      id={id}
      name={name}
      autoComplete='off'
      onChange={onChange}
      className={onError 
      ? "peer valid:pt-4 transition-all ease-linear w-full dark:bg-[#15171B] bg-white min-h-36 h-36 max-h-48 my-2 py-3 px-4 rounded-lg dark:text-red-900 text-red-500 dark:placeholder:text-red-900 placeholder:text-red-500 outline-hidden active:border-2 active:border-blue-500 focus:border-blue-500 border-2 dark:border-red-800 border-red-500 hover:border-2 hover:border-blue-500" 
      : "peer valid:pt-4 transition-all ease-linear w-full dark:bg-[#15171B] bg-white min-h-36 h-36 max-h-48 my-2 py-3 px-4 rounded-lg text-neutral-600 dark:text-white placeholder:text-slate-600 outline-hidden active:border-2 active:border-blue-500 focus:border-blue-500 border dark:border-white/30 border-black/30 hover:border-2 hover:border-amber-500"
      }></textarea>
      <small className={onError 
        ? "absolute left-4 top-1/2 -translate-y-1/2 text-lg cursor-text pointer pointer-events-none dark:text-red-900 text-red-500 antialiased peer-valid:text-sm peer-valid:top-1/3 transition-all ease-linear" 
        : "absolute left-4 top-6 -translate-y-1 text-lg cursor-text pointer pointer-events-none text-neutral-600 antialiased peer-valid:text-sm peer-valid:top-3 transition-all ease-linear"}>
          {label}
      </small>
      </label>
      {onError && <p className="text-sm mt-3 text-red-600">{errorMessage}</p>}
      </>
  );
};

export default Textarea;


