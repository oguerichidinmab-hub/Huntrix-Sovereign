import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateRoutine = async (userProfile: string, goals: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `As an AI campus coach for Huntrix Sovereign, generate a personalized daily routine for this student:
    Profile: ${userProfile}
    Goals: ${goals}
    
    The routine should be realistic, supportive, and focus on academic success, mental health, and career readiness.
    Format the response as a JSON array of objects with 'time', 'activity', and 'category' fields.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            time: { type: Type.STRING },
            activity: { type: Type.STRING },
            category: { type: Type.STRING, enum: ['academic', 'wellness', 'finance', 'career', 'social'] },
          },
          required: ['time', 'activity', 'category'],
        },
      },
    },
  });

  return JSON.parse(response.text);
};

export const getWellnessAdvice = async (mood: string, note: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `The student is feeling ${mood}. Note: ${note}. 
    Provide a supportive, empathetic, and actionable piece of advice (max 100 words) as an AI wellness coach. 
    Focus on emotional safety and practical steps.`,
  });

  return response.text;
};

export const getCareerAdvice = async (skills: string[], major: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Student Major: ${major}. Current Skills: ${skills.join(', ')}.
    Provide 3 specific career development steps or skills to learn next to improve employability.
    Format as a JSON array of strings.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
    },
  });

  return JSON.parse(response.text);
};
