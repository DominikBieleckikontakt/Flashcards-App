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
        role: "user",
        content: [
          {
            type: "text",
            text: 'Extract flashcards from the text. Return a plain JSON array of objects, using this format exactly: [{ "id": number, "question": string, "answer": string }] Use double quotes (") for all keys and string values. Do not include any extra text, comments, markdown (like ```json), or explanations. The response must be a valid JSON array only. Now you have to know more about creating flashcards. If you see word in 2 languages like from a book you create object with original word and translation. If you see a question and answer you create object with question and answer. If you see a word in one language and its definition in another language, create an object with the word and its definition. If you see a word in one language and its synonym in another language, create an object with the word and its synonym. If you see a word in one language and its antonym in another language, create an object with the word and its antonym. If you see a word in one language and its example in another language, create an object with the word and its example.',
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
