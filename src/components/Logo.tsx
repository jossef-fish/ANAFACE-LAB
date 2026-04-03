import { motion } from "motion/react";

export default function Logo() {
  return (
    <motion.div 
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 bg-[#4DA3FF] rounded-lg rotate-45 blur-sm opacity-50 animate-pulse" />
        <div className="absolute inset-0 border-2 border-[#4DA3FF] rounded-lg rotate-45 flex items-center justify-center overflow-hidden">
          <div className="w-full h-[2px] bg-[#4DA3FF] absolute top-1/2 -translate-y-1/2 rotate-45" />
          <div className="w-full h-[2px] bg-[#4DA3FF] absolute top-1/2 -translate-y-1/2 -rotate-45" />
          <div className="w-2 h-2 bg-white rounded-full z-10 shadow-[0_0_10px_#4DA3FF]" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-tighter text-white leading-none">
          ANAFACE <span className="text-[#4DA3FF]">LAB</span>
        </span>
        <span className="text-[10px] font-medium tracking-[0.2em] text-[#7A5CFF] uppercase">
          AI Laboratory
        </span>
      </div>
    </motion.div>
  );
}
