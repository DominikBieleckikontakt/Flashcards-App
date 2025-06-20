import { Flashcard } from "@/types";
import { NextResponse } from "next/server";

import { OpenAI } from "openai";

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const modelName = "openai/gpt-4o";

const openai = new OpenAI({
  baseURL: endpoint,
  apiKey: token,
});

const extractJSON = (input: string): any => {
  let cleaned = input
    .replace(/```/, "")
    .replace(/```/g, "")
    .replace(/\\n/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const jsonMatch = cleaned.match(/(\[.*\])/s);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[1]);
      } catch (innerError) {
        console.error("JSON extraction failed:", innerError);
      }
    }
    throw new Error("Failed to extract JSON");
  }
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const description = formData.get("description") as string;

    if (!file) {
      return NextResponse.json(
        {
          message: "No file provided",
          flashcards: [],
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString("base64");
    const mimeType = file.type;

    const prompt = `
      Create flashcards from the provided image and description.
      RULES:
      1. Return ONLY a valid JSON array of objects
      2. Each object MUST have: { "question": string, "answer": string }
      3. Use clear, concise language
      4. Prioritize key concepts from the image
      5. ${description ? `Incorporate this context: "${description}"` : ""}
      
      OUTPUT FORMAT: 
      [{ "question": "...", "answer": "..." }]
    `;

    const response = await openai.chat.completions.create({
      model: modelName,
      messages: [
        {
          role: "system",
          content: `You are an educational assistant. Generate flashcards from images. Return ONLY valid JSON array.`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
                detail: "high",
              },
            },
          ],
        },
      ],
      max_completion_tokens: 2000,
      temperature: 0.3,
    });

    const content = response.choices[0].message.content;

    if (!content) throw new Error("No content in response");

    const parsed = extractJSON(content);
    const flashcards = parsed.map((fc: Flashcard, i: number) => ({
      question: fc.question,
      answer: fc.answer,
      id: Date.now() + i,
    }));

    return NextResponse.json(
      {
        message: "File processed successfully, flashcards generated",
        flashcards,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error: ", error);
    return NextResponse.json(
      { message: "Error generating flashcards", flashcards: [] },
      { status: 500 }
    );
  }
}

// {
//   type: "text",
//   text: `You will receive an image and a description. Extract flashcards from the content.

//       Instructions:
//       - Return only a valid JSON array, nothing else.
//       - Format: [{"id": number, "question": string, "answer": string}]
//       - Use double quotes (") for all keys and string values.
//       - Do not add markdown (like \`\`\`json), comments, or extra text.
//       - Flashcards should be based on any of these patterns:
//         - A word in one language and its translation.
//         - A question and its answer.
//         - A word and its definition, synonym, antonym, or example (even if in different languages).
//       - Use the description to improve flashcard quality.

//       Description: ${description}
//       Now extract the flashcards based on this image content.`,
// },
