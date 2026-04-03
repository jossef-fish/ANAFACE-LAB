import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, Minimize2, Maximize2, Sparkles, User, Bot } from "lucide-react";
import { ChatMessage, FaceAnalysisResult } from "../types";
import { anaChat } from "../services/gemini";
import AIOrb from "./AIOrb";
import { cn } from "../lib/utils";

interface ChatAssistantProps {
  analysisContext: FaceAnalysisResult | null;
}

export default function ChatAssistant({ analysisContext }: ChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Hello, I am ANA. I've analyzed your facial data and I'm ready to help you engineer your best self. How can I assist you today?",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      text: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, text: m.text }));
      const response = await anaChat(input, history, analysisContext || undefined);
      
      const modelMessage: ChatMessage = {
        role: "model",
        text: response,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error("Chat failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-[#4DA3FF] to-[#7A5CFF] shadow-[0_0_30px_rgba(77,163,255,0.5)] flex items-center justify-center text-white overflow-hidden",
          isOpen && "hidden"
        )}
      >
        <div className="absolute inset-0 opacity-50">
          <AIOrb />
        </div>
        <MessageSquare className="relative z-10" size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "80px" : "600px",
              width: isMinimized ? "300px" : "400px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 bg-[#0B0B0F]/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-[#4DA3FF]/10 to-[#7A5CFF]/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black/40 overflow-hidden border border-[#4DA3FF]/30">
                  <AIOrb />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    ANA <Sparkles size={12} className="text-[#4DA3FF]" />
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">AI Assistant</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10"
                >
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "flex gap-3",
                        msg.role === "user" ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                        msg.role === "user" ? "bg-white/10" : "bg-[#4DA3FF]/20 text-[#4DA3FF]"
                      )}>
                        {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                      </div>
                      <div className={cn(
                        "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
                        msg.role === "user" 
                          ? "bg-white/5 text-white rounded-tr-none" 
                          : "bg-[#4DA3FF]/10 text-white/90 border border-[#4DA3FF]/10 rounded-tl-none"
                      )}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#4DA3FF]/20 text-[#4DA3FF] flex items-center justify-center">
                        <Bot size={14} />
                      </div>
                      <div className="bg-[#4DA3FF]/10 p-4 rounded-2xl rounded-tl-none flex gap-1">
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-[#4DA3FF]" />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-[#4DA3FF]" />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-[#4DA3FF]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/5 bg-black/20">
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Ask ANA anything..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#4DA3FF]/50 transition-all"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#4DA3FF] text-white rounded-xl hover:bg-[#4DA3FF]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                  <p className="text-[10px] text-white/20 text-center mt-3 uppercase tracking-widest font-bold">
                    Powered by ANA AI Core
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
