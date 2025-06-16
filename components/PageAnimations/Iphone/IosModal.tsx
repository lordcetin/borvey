'use client'
import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageAnimation({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
        key={pathname}

        //fade-in / fade-out
        // initial={{ opacity: 0, y: 10 }}
        // animate={{ opacity: 1, y: 0 }}
        // exit={{ opacity: 0, y: -10 }}
        // transition={{ duration: 0.3 }}

        //scale
        // initial={{ scale: 0.9, opacity: 0 }}
        // animate={{ scale: 1, opacity: 1 }}
        // exit={{ scale: 0.9, opacity: 0 }}
        // transition={{ duration: 0.3, ease: "easeInOut" }}

        //slide
        // initial={{ x: 100, opacity: 0 }}
        // animate={{ x: 0, opacity: 1 }}
        // exit={{ x: -100, opacity: 0 }}
        // transition={{ duration: 0.4, ease: "easeInOut" }}

        //flip
        // initial={{ rotateY: 90, opacity: 0 }}
        // animate={{ rotateY: 0, opacity: 1 }}
        // exit={{ rotateY: -90, opacity: 0 }}
        // transition={{ duration: 0.5, ease: "easeInOut" }}

        //blur
        // initial={{ filter: "blur(10px)", opacity: 0 }}
        // animate={{ filter: "blur(0px)", opacity: 1 }}
        // exit={{ filter: "blur(10px)", opacity: 0 }}
        // transition={{ duration: 0.3 }}

        //IOS Push Navigation
        // initial={{ x: "100%", opacity: 0.8 }}
        // animate={{ x: "0%", opacity: 1 }}
        // exit={{ x: "-100%", opacity: 0.8 }}
        // transition={{
        //   duration: 0.4,
        //   ease: [0.4, 0.0, 0.2, 1], // iOS benzeri easing
        // }}

        //IOS Modal
        initial={{ y: "100%", opacity: 0.8 }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: "100%", opacity: 0.8 }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0.0, 0.2, 1], // iOS smooth geçiş
        }}
        
        //IOS Parallax
        // initial={{ x: "5%", opacity: 0.8 }}
        // animate={{ x: "0%", opacity: 1 }}
        // exit={{ x: "-5%", opacity: 0.8 }}
        // transition={{ duration: 0.5, ease: "easeOut" }}

        //Iphone 16 Effect
        // initial={{ x: "100%", opacity: 0.8, scale: 0.98 }}
        // animate={{ x: "0%", opacity: 1, scale: 1 }}
        // exit={{ x: "-100%", opacity: 0.8, scale: 0.98 }}
        // transition={{
        //   duration: 0.4,
        //   ease: [0.4, 0.0, 0.2, 1], // iOS animasyon eğrisi
        // }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
