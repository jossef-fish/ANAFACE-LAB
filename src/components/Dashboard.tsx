import { motion } from "motion/react";
import { FaceAnalysisResult } from "../types";
import { CheckCircle2, Info, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "../lib/utils";

interface DashboardProps {
  result: FaceAnalysisResult;
  imageUrl: string;
}

function ScoreCard({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
    >
      <div className="flex justify-between items-end mb-4">
        <span className="text-white/60 text-sm font-medium uppercase tracking-wider">{label}</span>
        <span className={cn("text-2xl font-bold", color)}>{score}</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className={cn("h-full rounded-full", `bg-gradient-to-r from-${color.split('-')[1]}-500 to-${color.split('-')[1]}-400`)}
          style={{ backgroundColor: color.includes('blue') ? '#4DA3FF' : '#7A5CFF' }}
        />
      </div>
    </motion.div>
  );
}

export default function Dashboard({ result, imageUrl }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-6 py-12">
      {/* Left Column: Image & Main Score */}
      <div className="lg:col-span-4 space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
        >
          <img src={imageUrl} alt="Analyzed Face" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Main Score Overlay */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <div className="relative inline-block">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-white/5"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={364.4}
                  initial={{ strokeDashoffset: 364.4 }}
                  animate={{ strokeDashoffset: 364.4 - (364.4 * result.overallScore) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-[#4DA3FF]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white">{result.overallScore}</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Overall</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          <ScoreCard label="Symmetry" score={result.symmetryScore} color="text-[#4DA3FF]" />
          <ScoreCard label="Skin Quality" score={result.skinQualityScore} color="text-[#7A5CFF]" />
          <ScoreCard label="Jawline" score={result.jawlineScore} color="text-[#4DA3FF]" />
          <ScoreCard label="Eye Harmony" score={result.eyeHarmonyScore} color="text-[#7A5CFF]" />
        </div>
      </div>

      {/* Right Column: Detailed Analysis & Tips */}
      <div className="lg:col-span-8 space-y-8">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(result.features).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#4DA3FF]/10 flex items-center justify-center text-[#4DA3FF] group-hover:bg-[#4DA3FF] group-hover:text-white transition-all">
                  <Sparkles size={16} />
                </div>
                <h4 className="text-sm font-bold text-white/80 uppercase tracking-wider">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">{value}</p>
            </motion.div>
          ))}
        </div>

        {/* Improvement Insights */}
        <div className="bg-gradient-to-br from-[#4DA3FF]/10 to-[#7A5CFF]/10 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#4DA3FF] flex items-center justify-center shadow-[0_0_20px_rgba(77,163,255,0.4)]">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Improvement Insights</h3>
              <p className="text-white/40 text-sm">Personalized bio-hacking for your face</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.improvementTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-black/20 rounded-2xl p-6 border border-white/5 hover:border-[#4DA3FF]/30 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <h5 className="font-bold text-white">{tip.title}</h5>
                  <span className="text-[10px] font-bold bg-[#4DA3FF]/20 text-[#4DA3FF] px-2 py-1 rounded uppercase tracking-tighter">
                    Impact: {tip.impact}
                  </span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
