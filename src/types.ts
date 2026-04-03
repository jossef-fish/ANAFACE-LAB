export interface FaceAnalysisResult {
  overallScore: number;
  symmetryScore: number;
  skinQualityScore: number;
  jawlineScore: number;
  eyeHarmonyScore: number;
  features: {
    symmetry: string;
    jawline: string;
    skin: string;
    eyes: string;
    eyebrows: string;
    nose: string;
    lips: string;
    facialThirds: string;
    goldenRatio: string;
  };
  improvementTips: {
    title: string;
    description: string;
    impact: string;
  }[];
}

export interface ComparisonResult {
  face1: {
    score: number;
    symmetry: number;
    jawline: number;
  };
  face2: {
    score: number;
    symmetry: number;
    jawline: number;
  };
  breakdown: string[];
  similarity: number;
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
  timestamp: number;
}

export interface GlowUpPhase {
  title: string;
  tasks: {
    task: string;
    description: string;
  }[];
}

export interface GlowUpRoadmap {
  phase1: GlowUpPhase;
  phase2: GlowUpPhase;
  phase3: GlowUpPhase;
}
