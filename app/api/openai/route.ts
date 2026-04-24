import { NextRequest, NextResponse } from "next/server";
import { openai, OPENAI_MODEL } from "../../../lib/openai";

export interface OpenAIRequestBody {
  messages: { role: "system" | "user" | "assistant"; content: string }[];
  temperature?: number;
  max_tokens?: number;
}

export interface OpenAIResponseBody {
  content: string;
}

export async function POST(req: NextRequest) {
  let body: OpenAIRequestBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.messages?.length) {
    return NextResponse.json({ error: "messages is required" }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: body.messages,
      temperature: body.temperature ?? 0.6,
      max_tokens: body.max_tokens ?? 2000,
    });

    const content = completion.choices[0]?.message?.content ?? "";
    return NextResponse.json({ content } satisfies OpenAIResponseBody);
  } catch (err) {
    console.error("[OpenAI API error]", err);
    return NextResponse.json({ error: "OpenAI request failed" }, { status: 502 });
  }
}
