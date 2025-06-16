/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";


interface InputProps{
  id: string;
  name:string;
  onError:boolean;
  errorMessage:any;
  value: any;
  label: string;
  type?: string;
  required:any;
}

const InputThird: React.FC<InputProps> = ({id,name,value,label,type = "text",onError,errorMessage="",required=true}) => {
  
  const [show,setShow] = useState(false);
  const [inputType,setType] = useState(type)

  useEffect(() => {
      if(show) {
          setType('text')
      }else if(type == "password"){
          setType('password')
      }

  }, [show]);
  return (
      <>
      <label htmlFor={label} className="block relative w-full">
      <input
      required={required}
      type={inputType}
      name={name}
      id={id}
      autoComplete='new-password'
      className={onError 
      ? "peer valid:pt-4 transition-all ease-linear w-full dark:bg-[#15171B] bg-white my-2 py-2 px-4 rounded-lg dark:text-red-900 text-red-500 dark:placeholder:text-red-900 placeholder:text-red-500 outline-hidden active:border-2 active:border-blue-500 focus:border-blue-500 border-2 dark:border-red-800 border-red-500 hover:border-2 hover:border-blue-500 " 
      : "peer valid:pt-4 transition-all ease-linear w-full dark:bg-[#15171B] bg-white my-2 py-2 px-4 rounded-lg text-neutral-600 dark:text-white placeholder:text-slate-600 outline-hidden active:border-2 active:border-blue-500 focus:border-blue-500 border dark:border-white/30 border-black/30 hover:border-2 hover:border-amber-500 "
      }/>
      <small className={onError ? "absolute left-4 top-1/2 -translate-y-1/2 text-lg cursor-text pointer pointer-events-none dark:text-red-900 text-red-500 antialiased peer-valid:text-sm peer-valid:top-1/3 transition-all ease-linear" : "absolute left-4 top-1/2 -translate-y-1/2 text-lg cursor-text pointer pointer-events-none text-neutral-600 antialiased peer-valid:text-sm peer-valid:top-1/3 transition-all ease-linear"}>{label}</small>
      {type == 'password' && value && (
          <div onClick={() => setShow(!show)} className="absolute top-0 right-3 h-full flex items-center select-none">
               {show ? <EyeOff size={20} className="cursor-pointer"/>
               : <Eye size={20} className="cursor-pointer"/>}
          </div>    
      )}
      </label>
      {onError && <p className="text-sm text-red-600 mt-3">{errorMessage}</p>}
      </>
  );
};

export default InputThird;


