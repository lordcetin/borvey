/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/OtpInput.tsx
"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useRef, useEffect } from "react";

type Props = {
  setOTPValue:any;
  otpVal:any;
  loading:any;
}

const InputPasswordRenew = ({setOTPValue,otpVal,loading}:Props) => {
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^[0-9]{0,1}$/.test(value)) return; // sadece rakam
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOTPValue(Number(newOtp?.join("")));
    // sonraki inputa odaklan
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      {otp.map((value, index) => (
        <motion.input
          key={index}
          ref={(el:any) => (inputRefs.current[index] = el)}
          value={value}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-12 h-12 text-center border rounded text-lg outline-none"
          maxLength={1}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileFocus={{ scale: 1.1, borderColor: "#3b82f6" }} // mavi renkli animasyon
        />
      ))}
      {Number(otpVal)?.toString()?.length === 6 && loading && <LoaderCircle size={22} className="animate-spin relative left-3"/>}
    </div>
  );
}
export default InputPasswordRenew