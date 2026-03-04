import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { plot, rating, title } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const prompt = `
You are a movie analyst.

Movie Title: ${title}
IMDb Rating: ${rating}
Plot: ${plot}

1. Write a short 3-4 line audience summary.
2. Then clearly write:
Overall Sentiment: Positive / Mixed / Negative
`;

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    });

    const result = response.choices[0].message.content;

    return NextResponse.json({ result });

  } catch (error) {
    console.error("GROQ ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}