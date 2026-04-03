import { GoogleGenAI, Type } from "@google/genai";
import { FaceAnalysisResult, ComparisonResult, GlowUpRoadmap } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function analyzeFace(base64Image: string): Promise<FaceAnalysisResult> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            text: `Analyze this face for attractiveness and facial structure. 
            Return a JSON object with:
            - overallScore (0-100)
            - symmetryScore (0-100)
            - skinQualityScore (0-100)
            - jawlineScore (0-100)
            - eyeHarmonyScore (0-100)
            - features (object with descriptions for symmetry, jawline, skin, eyes, eyebrows, nose, lips, facialThirds, goldenRatio)
            - improvementTips (array of objects with title, description, and impact)
            
            Be scientific, objective, and professional. Focus on facial proportions and harmony.`,
          },
          {
            inlineData: {
              data: base64Image.split(",")[1],
              mimeType: "image/jpeg",
            },
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overallScore: { type: Type.NUMBER },
          symmetryScore: { type: Type.NUMBER },
          skinQualityScore: { type: Type.NUMBER },
          jawlineScore: { type: Type.NUMBER },
          eyeHarmonyScore: { type: Type.NUMBER },
          features: {
            type: Type.OBJECT,
            properties: {
              symmetry: { type: Type.STRING },
              jawline: { type: Type.STRING },
              skin: { type: Type.STRING },
              eyes: { type: Type.STRING },
              eyebrows: { type: Type.STRING },
              nose: { type: Type.STRING },
              lips: { type: Type.STRING },
              facialThirds: { type: Type.STRING },
              goldenRatio: { type: Type.STRING },
            },
          },
          improvementTips: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                impact: { type: Type.STRING },
              },
            },
          },
        },
        required: ["overallScore", "symmetryScore", "skinQualityScore", "jawlineScore", "eyeHarmonyScore", "features", "improvementTips"],
      },
    },
  });

  return JSON.parse(response.text);
}

export async function compareFaces(base64Image1: string, base64Image2: string): Promise<ComparisonResult> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            text: `Compare these two faces for attractiveness and facial structure. 
            Return a JSON object with:
            - face1 (score, symmetry, jawline)
            - face2 (score, symmetry, jawline)
            - breakdown (array of comparison strings like "Face 1 has 12% sharper jawline")
            - similarity (percentage 0-100)
            
            Be scientific and objective.`,
          },
          {
            inlineData: {
              data: base64Image1.split(",")[1],
              mimeType: "image/jpeg",
            },
          },
          {
            inlineData: {
              data: base64Image2.split(",")[1],
              mimeType: "image/jpeg",
            },
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          face1: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              symmetry: { type: Type.NUMBER },
              jawline: { type: Type.NUMBER },
            },
          },
          face2: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              symmetry: { type: Type.NUMBER },
              jawline: { type: Type.NUMBER },
            },
          },
          breakdown: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          similarity: { type: Type.NUMBER },
        },
        required: ["face1", "face2", "breakdown", "similarity"],
      },
    },
  });

  return JSON.parse(response.text);
}

export async function generateGlowUpRoadmap(analysis: FaceAnalysisResult): Promise<GlowUpRoadmap> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            text: `Based on this facial analysis: ${JSON.stringify(analysis)}, generate a 3-phase custom glow-up roadmap.
            Return a JSON object with phase1, phase2, phase3. Each phase has a title and an array of tasks (task, description).
            Phase 1: Quick Improvements (hair, grooming, skincare).
            Phase 2: Structural Improvements (posture, exercises, fitness).
            Phase 3: Advanced Glow Up (wardrobe, confidence, presentation).`,
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          phase1: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              tasks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    task: { type: Type.STRING },
                    description: { type: Type.STRING },
                  },
                },
              },
            },
          },
          phase2: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              tasks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    task: { type: Type.STRING },
                    description: { type: Type.STRING },
                  },
                },
              },
            },
          },
          phase3: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              tasks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    task: { type: Type.STRING },
                    description: { type: Type.STRING },
                  },
                },
              },
            },
          },
        },
        required: ["phase1", "phase2", "phase3"],
      },
    },
  });

  return JSON.parse(response.text);
}

export async function anaChat(
  message: string, 
  history: { role: "user" | "model"; text: string }[],
  analysisContext?: FaceAnalysisResult
): Promise<string> {
  const systemInstruction = `You are ANA, a high-intelligence personal AI glow-up assistant for ANAFACE LAB.
  Your tone is professional, supportive, analytical, and confident.
  You help users improve their appearance, confidence, and aesthetics.
  ${analysisContext ? `The user's facial analysis results are: ${JSON.stringify(analysisContext)}. Use these to provide personalized advice.` : "The user hasn't uploaded a photo yet. Encourage them to do so for personalized advice."}
  Provide actionable, scientific, and encouraging advice. Avoid sounding robotic.`;

  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction,
    },
    history: history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }))
  });

  const response = await chat.sendMessage({ message });
  return response.text || "I'm sorry, I couldn't process that request.";
}
