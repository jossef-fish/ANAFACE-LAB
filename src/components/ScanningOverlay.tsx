import { motion } from "motion/react";

export default function ScanningOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
      {/* Moving scan line */}
      <motion.div
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#4DA3FF] to-transparent shadow-[0_0_15px_#4DA3FF]"
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(77,163,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(77,163,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Scanning text */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[#4DA3FF] text-xs font-mono tracking-[0.3em] uppercase"
        >
          AI Scanning in progress...
        </motion.div>
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#4DA3FF]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Target corners */}
      <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 border-[#4DA3FF] opacity-50" />
      <div className="absolute top-10 right-10 w-12 h-12 border-t-2 border-r-2 border-[#4DA3FF] opacity-50" />
      <div className="absolute bottom-10 left-10 w-12 h-12 border-b-2 border-l-2 border-[#4DA3FF] opacity-50" />
      <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 border-[#4DA3FF] opacity-50" />
    </div>
  );
}
