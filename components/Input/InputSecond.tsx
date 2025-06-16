/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

type Props = {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
  placeholder:any;
}

const InputSecond = ({id,onChange,value,label,type = "text",placeholder}: Props) => {
  return (
    <>
    <label htmlFor={id} className='space-y-2 block'>
    <h1 className=' text-teal-700 font-semibold'>{label}</h1>
    <input
    required={true} 
    type={type} 
    id={id} 
    value={value} 
    onChange={onChange} 
    placeholder={placeholder}
    className='border-4 border-white/5 rounded-lg py-2 px-3 w-full placeholder:text-white/20 text-white focus:outline-1 focus:outline-teal-700' 
    />
    </label>
    </>
  )
}

export default InputSecond