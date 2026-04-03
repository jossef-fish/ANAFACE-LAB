import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import UploadZone from "./UploadZone";
import { compareFaces } from "../services/gemini";
import { ComparisonResult } from "../types";
import { ArrowRightLeft, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import ScanningOverlay from "./ScanningOverlay";

export default function ComparisonTool() {
  const [img1, setImg1] = useState<string | null>(null);
  const [img2, setImg2] = useState<string | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const handleCompare = async () => {
    if (!img1 || !img2) return;
    setIsComparing(true);
    try {
      const res = await compareFaces(img1, img2);
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-4">Face vs Face</h2>
        <p className="text-white/40 max-w-xl mx-auto">
          Compare facial structures with friends, celebrities, or influencers. 
          Our AI analyzes symmetry, jawline, and overall harmony.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
        <div className="relative">
          <UploadZone onUpload={setImg1} label="Person 1" className="aspect-[4/5]" />
          {isComparing && <ScanningOverlay />}
        </div>
        
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex w-16 h-16 rounded-full bg-[#0B0B0F] border border-white/10 items-center justify-center text-[#4DA3FF] shadow-[0_0_30px_rgba(77,163,255,0.2)]">
          <ArrowRightLeft size={24} />
        </div>

        <div className="relative">
          <UploadZone onUpload={setImg2} label="Person 2" className="aspect-[4/5]" />
          {isComparing && <ScanningOverlay />}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <motion.button
          onClick={handleCompare}
          disabled={!img1 || !img2 || isComparing}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(77,163,255,0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-4 bg-gradient-to-r from-[#4DA3FF] to-[#7A5CFF] rounded-full text-white font-bold text-lg shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isComparing ? "Analyzing..." : "Start Comparison"}
        </motion.button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Face 1 Stats */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <h4 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-6">Person 1 Metrics</h4>
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-white font-medium">Overall Score</span>
                  <span className="text-3xl font-black text-[#4DA3FF]">{result.face1.score}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-white font-medium">Symmetry</span>
                  <span className="text-xl font-bold text-white/80">{result.face1.symmetry}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-white font-medium">Jawline</span>
                  <span className="text-xl font-bold text-white/80">{result.face1.jawline}</span>
                </div>
              </div>
            </div>

            {/* Comparison Summary */}
            <div className="bg-gradient-to-br from-[#4DA3FF]/20 to-[#7A5CFF]/20 border border-[#4DA3FF]/30 rounded-3xl p-8 backdrop-blur-2xl flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#4DA3FF] flex items-center justify-center mb-6 shadow-[0_0_30px_#4DA3FF]">
                <Zap size={32} className="text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-2">{result.similarity}%</h3>
              <p className="text-[#4DA3FF] font-bold uppercase tracking-widest text-xs mb-6">Structural Similarity</p>
              <div className="space-y-3 w-full">
                {result.breakdown.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/70 bg-black/20 p-3 rounded-xl border border-white/5">
                    <CheckCircle2 size={16} className="text-[#4DA3FF] shrink-0" />
                    <span className="text-left">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Face 2 Stats */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <h4 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-6">Person 2 Metrics</h4>
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-white font-medium">Overall Score</span>
                  <span className="text-3xl font-black text-[#7A5CFF]">{result.face2.score}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-white font-medium">Symmetry</span>
                  <span className="text-xl font-bold text-white/80">{result.face2.symmetry}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-white font-medium">Jawline</span>
                  <span className="text-xl font-bold text-white/80">{result.face2.jawline}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
