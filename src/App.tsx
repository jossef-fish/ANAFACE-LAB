import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronRight, 
  Dna, 
  Scan, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Github, 
  Twitter, 
  Instagram,
  Menu,
  X,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import Background3D from "./components/Background3D";
import Logo from "./components/Logo";
import UploadZone from "./components/UploadZone";
import ScanningOverlay from "./components/ScanningOverlay";
import Dashboard from "./components/Dashboard";
import ComparisonTool from "./components/ComparisonTool";
import ChatAssistant from "./components/ChatAssistant";
import GlowUpRoadmapComponent from "./components/GlowUpRoadmap";
import { analyzeFace, generateGlowUpRoadmap } from "./services/gemini";
import { FaceAnalysisResult, GlowUpRoadmap } from "./types";

import { HeroSection } from "./components/blocks/hero-section-5";

export default function App() {
  const [step, setStep] = useState<"landing" | "upload" | "scanning" | "dashboard" | "compare" | "roadmap">("landing");
  const [analysisResult, setAnalysisResult] = useState<FaceAnalysisResult | null>(null);
  const [roadmap, setRoadmap] = useState<GlowUpRoadmap | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);

  const handleUpload = async (base64: string) => {
    setUploadedImage(base64);
    setStep("scanning");
    try {
      const result = await analyzeFace(base64);
      setAnalysisResult(result);
      setStep("dashboard");
    } catch (error) {
      console.error("Analysis failed:", error);
      setStep("upload");
    }
  };

  const handleGenerateRoadmap = async () => {
    if (!analysisResult) return;
    setIsGeneratingRoadmap(true);
    try {
      const res = await generateGlowUpRoadmap(analysisResult);
      setRoadmap(res);
      setStep("roadmap");
    } catch (error) {
      console.error("Roadmap generation failed:", error);
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-[#4DA3FF]/30">
      <Background3D />
      
      <AnimatePresence mode="wait">
        {step === "landing" ? (
          <HeroSection 
            onAnalyzeClick={() => setStep("upload")} 
            onCompareClick={() => setStep("compare")} 
          />
        ) : (
          <>
            {/* Navbar for other pages */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0B0B0F]/80 backdrop-blur-xl">
              <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="cursor-pointer" onClick={() => setStep("landing")}>
                  <Logo />
                </div>
                
                <div className="hidden md:flex items-center gap-8">
                  <button onClick={() => setStep("landing")} className="text-sm font-medium text-white/60 hover:text-white transition-colors">Home</button>
                  <button onClick={() => setStep("upload")} className="text-sm font-medium text-white/60 hover:text-white transition-colors">Analyze</button>
                  <button onClick={() => setStep("compare")} className="text-sm font-medium text-white/60 hover:text-white transition-colors">Compare</button>
                  {analysisResult && (
                    <button onClick={() => setStep("dashboard")} className="text-sm font-medium text-white/60 hover:text-white transition-colors">Dashboard</button>
                  )}
                  <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold hover:bg-white/10 transition-all">
                    Join Lab
                  </button>
                </div>
              </div>
            </nav>

            <main className="pt-20 pb-20">
              <AnimatePresence mode="wait">
                {step === "upload" && (
                  <motion.section
                    key="upload"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-4xl mx-auto px-6 pt-20 text-center"
                  >
                    <h2 className="text-4xl lg:text-6xl font-black mb-6">Upload Your Selfie</h2>
                    <p className="text-white/40 mb-12 max-w-lg mx-auto">
                      For best results, use a clear, front-facing photo with neutral lighting. 
                      Our AI will analyze 128+ facial landmarks.
                    </p>
                    <UploadZone onUpload={handleUpload} />
                    <button 
                      onClick={() => setStep("landing")}
                      className="mt-8 text-white/40 hover:text-white transition-colors text-sm font-medium"
                    >
                      Go Back
                    </button>
                  </motion.section>
                )}

                {step === "scanning" && (
                  <motion.section
                    key="scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="max-w-md mx-auto px-6 pt-20 text-center"
                  >
                    <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-8">
                      {uploadedImage && <img src={uploadedImage} alt="Scanning" className="w-full h-full object-cover" />}
                      <ScanningOverlay />
                    </div>
                    <h2 className="text-3xl font-black mb-4">Analyzing Facial DNA</h2>
                    <p className="text-white/40 animate-pulse">
                      Processing structural landmarks, skin texture, and symmetry ratios...
                    </p>
                  </motion.section>
                )}

                {step === "dashboard" && analysisResult && uploadedImage && (
                  <motion.section
                    key="dashboard"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center mb-8">
                      <h2 className="text-3xl font-black">Analysis Report</h2>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => setStep("upload")}
                          className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold hover:bg-white/10 transition-all"
                        >
                          New Scan
                        </button>
                        <button 
                          onClick={handleGenerateRoadmap}
                          disabled={isGeneratingRoadmap}
                          className="px-6 py-2 bg-gradient-to-r from-[#4DA3FF] to-[#7A5CFF] rounded-full text-sm font-bold hover:shadow-[0_0_20px_rgba(77,163,255,0.4)] transition-all flex items-center gap-2"
                        >
                          {isGeneratingRoadmap ? "Generating..." : "Glow-Up Roadmap"}
                          <TrendingUp size={14} />
                        </button>
                      </div>
                    </div>
                    <Dashboard result={analysisResult} imageUrl={uploadedImage} />
                  </motion.section>
                )}

                {step === "compare" && (
                  <motion.section
                    key="compare"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="max-w-7xl mx-auto px-6 mb-8">
                      <button 
                        onClick={() => setStep("landing")}
                        className="text-white/40 hover:text-white transition-colors text-sm font-medium"
                      >
                        ← Back to Home
                      </button>
                    </div>
                    <ComparisonTool />
                  </motion.section>
                )}

                {step === "roadmap" && roadmap && (
                  <motion.section
                    key="roadmap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="max-w-7xl mx-auto px-6 mb-8">
                      <button 
                        onClick={() => setStep("dashboard")}
                        className="text-white/40 hover:text-white transition-colors text-sm font-medium"
                      >
                        ← Back to Dashboard
                      </button>
                    </div>
                    <GlowUpRoadmapComponent roadmap={roadmap} />
                  </motion.section>
                )}
              </AnimatePresence>
            </main>
          </>
        )}
      </AnimatePresence>

      {/* ANA Chat Assistant */}
      <ChatAssistant analysisContext={analysisResult} />

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0B0B0F]/80 backdrop-blur-xl py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Logo />
            <p className="text-white/40 max-w-sm leading-relaxed">
              The world's most advanced AI facial analysis laboratory. 
              Built for those who seek to understand and engineer their best self.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#4DA3FF] hover:border-[#4DA3FF] transition-all">
                <Twitter size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#4DA3FF] hover:border-[#4DA3FF] transition-all">
                <Instagram size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#4DA3FF] hover:border-[#4DA3FF] transition-all">
                <Github size={18} />
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Platform</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><button onClick={() => setStep("upload")} className="hover:text-white transition-colors">AI Analysis</button></li>
              <li><button onClick={() => setStep("compare")} className="hover:text-white transition-colors">Face vs Face</button></li>
              <li><button className="hover:text-white transition-colors">Celebrity Database</button></li>
              <li><button className="hover:text-white transition-colors">API Access</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Legal</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button className="hover:text-white transition-colors">Terms of Service</button></li>
              <li><button className="hover:text-white transition-colors">Cookie Policy</button></li>
              <li><button className="hover:text-white transition-colors">Data Security</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20">© 2026 ANAFACE LAB. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs text-white/20">
            <ShieldCheck size={14} />
            <span>Encrypted Facial Data Processing</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
