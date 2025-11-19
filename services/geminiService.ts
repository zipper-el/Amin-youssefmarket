
import { GoogleGenAI, Type } from "@google/genai";
import { RecipeSuggestion } from '../types';

const apiKey = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey });

export const getSmartSuggestions = async (query: string, lang: 'en' | 'fr'): Promise<RecipeSuggestion[]> => {
  if (!apiKey) {
    console.warn("No API Key found for Gemini.");
    return [{ 
        recipeName: lang === 'fr' ? "Recette Démo" : "Demo Recipe", 
        description: lang === 'fr' ? "Clé API manquante." : "API Key missing.", 
        ingredients: ["Demo Ingredient"] 
    }];
  }

  try {
    const languageName = lang === 'fr' ? 'French' : 'English';
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Suggest 3 distinct, simple recipes based on this user request: "${query}". For each recipe, list key ingredients available in a supermarket. Respond strictly in ${languageName}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              recipeName: { type: Type.STRING },
              description: { type: Type.STRING },
              ingredients: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as RecipeSuggestion[];
    }
    return [];
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};
