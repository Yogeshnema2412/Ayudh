import { GoogleGenAI, Type, Chat } from "@google/genai";
import { PersonalizedRoutine, Dosha, HerbalRemedy, KnowledgeInfo } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const routineGenerationSchema = {
    type: Type.OBJECT,
    properties: {
        morning: {
            type: Type.OBJECT,
            properties: {
                habits: { type: Type.ARRAY, items: { type: Type.STRING } },
                yoga: { type: Type.ARRAY, items: { type: Type.STRING } },
                herbs: { type: Type.ARRAY, items: { type: Type.STRING } },
            }
        },
        afternoon: {
            type: Type.OBJECT,
            properties: {
                habits: { type: Type.ARRAY, items: { type: Type.STRING } },
                yoga: { type: Type.ARRAY, items: { type: Type.STRING } },
                herbs: { type: Type.ARRAY, items: { type: Type.STRING } },
            }
        },
        evening: {
            type: Type.OBJECT,
            properties: {
                habits: { type: Type.ARRAY, items: { type: Type.STRING } },
                yoga: { type: Type.ARRAY, items: { type: Type.STRING } },
                herbs: { type: Type.ARRAY, items: { type: Type.STRING } },
            }
        },
    },
};

export const getPersonalizedRoutine = async (dosha: Dosha, location: { latitude: number; longitude: number } | null): Promise<PersonalizedRoutine> => {
    try {
        const season = getSeason(new Date().getMonth());
        const locationInfo = location ? `The user is at latitude ${location.latitude} and longitude ${location.longitude}.` : "The user's location is unknown.";

        const prompt = `
            You are an expert Ayurvedic practitioner. Based on the following information, generate a personalized daily wellness routine.
            User's Dosha: ${dosha}.
            Current Season: ${season}.
            ${locationInfo} Please factor in the likely climate for this location and season.
            The routine should include sections for Morning, Afternoon, and Evening.
            For each section, suggest 2-3 specific, actionable habits, simple yoga poses, and relevant herbs.
            Provide brief, one-sentence descriptions for each item.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: routineGenerationSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as PersonalizedRoutine;

    } catch (error) {
        console.error("Error generating personalized routine:", error);
        throw new Error("Could not generate a routine. Please try again.");
    }
};


export const createAyurDocChat = (): Chat => {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are AyurDoc, a friendly and knowledgeable AI assistant specializing in Ayurveda. 
            You provide information and guidance based on Ayurvedic principles. 
            You are not a medical doctor and must always include a disclaimer at the end of every message that users should consult a qualified healthcare professional for any health concerns. 
            Do not provide medical advice or prescriptions. Keep your answers concise, empathetic, and easy to understand.
            Format your responses using simple markdown.`,
        },
    });
};

const knowledgeSchema = {
    type: Type.OBJECT,
    properties: {
        content: {
            type: Type.STRING,
            description: "A concise but comprehensive summary of the Ayurvedic properties and uses of the topic, formatted in simple markdown."
        },
        imageSearchQuery: {
            type: Type.STRING,
            description: "A simple but descriptive photo search query for Unsplash to find a high-quality, relevant image of the topic. Focus on natural settings or ingredients. Examples: 'Ashwagandha root herb', 'Turmeric powder flatlay', 'Yoga meditation nature'."
        }
    },
    required: ["content", "imageSearchQuery"]
};

export const getKnowledgeInfo = async (topic: string): Promise<KnowledgeInfo> => {
    try {
        const prompt = `
            You are an Ayurvedic encyclopedia. For the topic "${topic}", provide two things:
            1. A concise but comprehensive summary of its Ayurvedic properties and uses. Include traditional uses, benefits, and any common contraindications. Do not provide medical advice. Format this summary as simple markdown.
            2. A simple but descriptive photo search query for Unsplash to find a high-quality, relevant image of the topic. Focus on natural settings or ingredients. Examples: 'Ashwagandha root herb', 'Turmeric powder flatlay', 'Yoga meditation nature'.
        `;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: knowledgeSchema,
            }
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as KnowledgeInfo;

    } catch (error) {
        console.error("Error fetching knowledge info:", error);
        throw new Error("Could not fetch information. Please try again.");
    }
};


const herbalRemedySchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            herb: { type: Type.STRING },
            description: { type: Type.STRING },
            usage: { type: Type.STRING },
        },
        required: ["herb", "description", "usage"],
    }
};


export const getHerbalRemedies = async (symptoms: string): Promise<HerbalRemedy[]> => {
    try {
        const prompt = `
            You are an expert Ayurvedic practitioner. A user is experiencing the following symptoms: "${symptoms}".
            Based on these symptoms, recommend 3-4 relevant Ayurvedic herbs.
            For each herb, provide a brief description of its Ayurvedic properties and benefits related to the symptoms, and a common usage suggestion.
            IMPORTANT: Your entire response must be ONLY the JSON array, without any introductory text, markdown, or explanation.
            This is for informational purposes only and not medical advice.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: herbalRemedySchema,
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as HerbalRemedy[];

    } catch (error) {
        console.error("Error generating herbal remedies:", error);
        throw new Error("Could not generate remedies. Please try again.");
    }
};


const getSeason = (month: number): string => {
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Autumn';
    return 'Winter';
};