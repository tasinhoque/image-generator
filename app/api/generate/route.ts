import { NextResponse } from "next/server";
import OpenAI from 'openai';



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
  });

export async function POST(req: Request) {
    const { prompt } = await req.json();

    if (!prompt || prompt.length === 0) {
        return NextResponse.json(
            { message: "You must provied a prompt", statusCode: 400 },
            { status: 400 }
        )
    }

    const aiResponse = await openai.images.generate({
        prompt,
        n: 1,
        size: "512x512"
    })

    return NextResponse.json({ url: aiResponse.data[0].url }, { status: 200 })
}