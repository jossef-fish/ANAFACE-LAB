import { motion, AnimatePresence } from "motion/react";
import { Upload, Camera, X } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "../lib/utils";

interface UploadZoneProps {
  onUpload: (base64: string) => void;
  label?: string;
  className?: string;
}

export default function UploadZone({ onUpload, label = "Upload Selfie", className }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setPreview(base64);
        onUpload(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
  };

  return (
    <motion.div
      className={cn(
        "relative group cursor-pointer",
        "w-full aspect-square max-w-md mx-auto",
        "rounded-3xl border-2 border-dashed transition-all duration-500",
        isDragging ? "border-[#4DA3FF] bg-[#4DA3FF]/10 scale-[1.02]" : "border-white/10 hover:border-white/20 bg-white/5",
        "flex flex-col items-center justify-center gap-4 overflow-hidden",
        className
      )}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 w-full h-full"
          >
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <button
              onClick={handleClear}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-4 text-center px-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4DA3FF] to-[#7A5CFF] flex items-center justify-center shadow-[0_0_20px_rgba(77,163,255,0.3)]">
              <Upload className="text-white" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{label}</h3>
              <p className="text-white/40 text-sm">Drag & drop or click to upload</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/20 uppercase tracking-widest mt-4">
              <Camera size={14} />
              <span>Front-facing selfie preferred</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Futuristic corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#4DA3FF]/30 rounded-tl-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#4DA3FF]/30 rounded-tr-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#4DA3FF]/30 rounded-bl-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#4DA3FF]/30 rounded-br-3xl pointer-events-none" />
    </motion.div>
  );
}
