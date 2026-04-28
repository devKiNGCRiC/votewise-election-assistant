"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
}

export default function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const baseClasses = "px-6 py-3 rounded-xl font-semibold transition-all duration-300 outline-none focus:ring-2 focus:ring-saffron-start/50 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-saffron-gradient text-white shadow-[0_0_15px_rgba(255,153,51,0.4)] hover:shadow-[0_0_25px_rgba(255,153,51,0.6)] hover:scale-[1.02]",
    secondary: "neumorphic-inset text-text-main border border-white/5 hover:bg-white/5",
    outline: "border border-saffron-start text-saffron-start hover:bg-saffron-start/10"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
