
import { GoogleGenAI, Type } from "@google/genai";
import { AIResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    route: {
      type: Type.OBJECT,
      properties: {
        from: { type: Type.STRING, description: "The starting city of the route." },
        to: { type: Type.STRING, description: "The destination city of the route." },
        totalDistanceKm: { type: Type.NUMBER, description: "The total distance of the route in kilometers." },
      },
      required: ["from", "to", "totalDistanceKm"],
    },
    services: {
      type: Type.ARRAY,
      description: "A list of services available along the route.",
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "A unique identifier for the service." },
          name: { type: Type.STRING, description: "The name of the service station or restaurant." },
          type: { 
            type: Type.STRING, 
            enum: ['PETROL', 'EV_CHARGING', 'RESTAURANT', 'REPAIR', 'HOTEL'],
            description: "The type of service."
          },
          distanceFromStartKm: { 
            type: Type.NUMBER, 
            description: "The distance of the service from the starting point in kilometers." 
          },
          description: { type: Type.STRING, description: "A brief description of the service." },
          amenities: {
            type: Type.ARRAY,
            description: "A list of amenities available, e.g., 'Clean Toilets', '24/7', 'Fast Charging'.",
            items: { type: Type.STRING }
          }
        },
        required: ["id", "name", "type", "distanceFromStartKm", "description"]
      }
    }
  },
  required: ["route", "services"],
};


export const planRouteWithAI = async (userPrompt: string): Promise<AIResponse | null> => {
  try {
    const systemInstruction = `You are 'Highway Hub AI', an expert travel planner for Indian National Highways. Your goal is to generate a structured travel plan in JSON format based on the user's request. The plan must include a list of services like petrol pumps, EV charging stations, restaurants, hotels and repair shops along the specified route. All distances must be in kilometers. Ensure the 'distanceFromStartKm' for each service is less than or equal to the 'totalDistanceKm' of the route. Create plausible but fictional data for names and amenities.`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: responseSchema,
        },
    });

    const text = response.text.trim();
    const parsedJson = JSON.parse(text);

    // Basic validation
    if (parsedJson && parsedJson.route && Array.isArray(parsedJson.services)) {
        return parsedJson as AIResponse;
    } else {
        console.error("Invalid JSON structure received from AI:", parsedJson);
        throw new Error("Received invalid data structure from AI.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};
