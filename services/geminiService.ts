
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateShareMessage = async (fileNames: string[]): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }

  const prompt = `
    You are a friendly and creative assistant for a file sharing app called "Quick Share AI".
    Your task is to generate a short, catchy, and context-aware message (1-2 sentences) for a user who is about to share a link to a set of files.
    The message should be casual, positive, and reflect the likely content of the files based on their names.
    
    Here are the file names:
    ${fileNames.join(', ')}

    Generate a single message. Do not include any prefixes like "Message:" or quote marks around the output.
    Example for ["vacation_photo_1.jpg", "beach_sunset.mov"]: "Sharing some sunny memories from our trip!"
    Example for ["Project_Proposal_Q3.pdf", "market_analysis.xlsx"]: "Here are the documents for the upcoming project review."
    Example for ["setup.exe", "installer.dmg"]: "Here are the installation files you requested."
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to generate a share message from the AI model.");
  }
};
