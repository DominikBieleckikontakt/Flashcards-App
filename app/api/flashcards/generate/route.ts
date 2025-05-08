import { NextResponse } from "next/server";

import { OpenAI } from "openai";

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const modelName = "openai/gpt-4o";

const openai = new OpenAI({
  baseURL: endpoint,
  apiKey: token,
});

export async function POST(req: Request) {
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
  const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

  const response = await openai.chat.completions.create({
    model: modelName,
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant that creates flashcards from provided materials..`,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `You will receive an image and a description. Extract flashcards from the content.

                  Instructions:
                  - Return only a valid JSON array, nothing else.
                  - Format: [{"id": number, "question": string, "answer": string}]
                  - Use double quotes (") for all keys and string values.
                  - Do not add markdown (like \`\`\`json), comments, or extra text.
                  - Flashcards should be based on any of these patterns:
                    - A word in one language and its translation.
                    - A question and its answer.
                    - A word and its definition, synonym, antonym, or example (even if in different languages).
                  - Use the description to improve flashcard quality.

                  Description: ${description}
                  Now extract the flashcards based on this image content.`,
          },
          { type: "image_url", image_url: { url: base64Image } },
        ],
      },
    ],
  });

  const flashcards = response.choices[0].message.content;

  return NextResponse.json(
    {
      message: "File processed successfully, flashcards generated",
      flashcards,
    },
    { status: 200 }
  );
}
