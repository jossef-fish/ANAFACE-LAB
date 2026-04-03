import { motion } from "motion/react";
import { GlowUpRoadmap } from "../types";
import { CheckCircle2, Circle, Sparkles, TrendingUp, Zap } from "lucide-react";
import { cn } from "../lib/utils";

interface GlowUpRoadmapProps {
  roadmap: GlowUpRoadmap;
}

function PhaseCard({ phase, icon: Icon, color, delay }: { phase: any; icon: any; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group hover:bg-white/10 transition-all"
    >
      <div className={cn("absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 rounded-full -mr-16 -mt-16", color)} />
      
      <div className="flex items-center gap-4 mb-8">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg", color)}>
          <Icon className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{phase.title}</h3>
          <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Phase {delay * 10 + 1}</p>
        </div>
      </div>

      <div className="space-y-6">
        {phase.tasks.map((task: any, i: number) => (
          <div key={i} className="flex gap-4">
            <div className="mt-1">
              <Circle size={16} className="text-[#4DA3FF] opacity-30" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">{task.task}</h4>
              <p className="text-xs text-white/40 leading-relaxed">{task.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function GlowUpRoadmapComponent({ roadmap }: GlowUpRoadmapProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4DA3FF] to-[#7A5CFF] flex items-center justify-center shadow-[0_0_30px_rgba(77,163,255,0.4)]">
          <TrendingUp className="text-white" size={28} />
        </div>
        <div>
          <h2 className="text-4xl font-black text-white">Your Glow-Up Roadmap</h2>
          <p className="text-white/40">A scientific, step-by-step strategy engineered by ANA</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <PhaseCard 
          phase={roadmap.phase1} 
          icon={Zap} 
          color="bg-[#4DA3FF]" 
          delay={0.1} 
        />
        <PhaseCard 
          phase={roadmap.phase2} 
          icon={Sparkles} 
          color="bg-[#7A5CFF]" 
          delay={0.2} 
        />
        <PhaseCard 
          phase={roadmap.phase3} 
          icon={TrendingUp} 
          color="bg-[#4DA3FF]" 
          delay={0.3} 
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 text-sm text-white/60"
      >
        <CheckCircle2 className="text-[#4DA3FF]" size={20} />
        <p>
          This roadmap is dynamically generated based on your unique facial proportions. 
          Consistency is key to seeing structural and aesthetic improvements.
        </p>
      </motion.div>
    </div>
  );
}
