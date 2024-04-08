import { NextResponse } from "next/server";
import OpenAI from 'openai';



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
  });

export async function POST(req: Request) {

    const { prompt,n , size } = await req.json();

    if (!prompt || prompt.length === 0) {
        return NextResponse.json(
            { message: "You must provied a prompt", statusCode: 400 },
            { status: 400 }
        )
    }

    if (!n || n.length === 0) {
        return NextResponse.json(
            { message: "You must provied a N (number of image)", statusCode: 400 },
            { status: 400 }
        )
    }

    if (!size || size.length === 0) {
        return NextResponse.json(
            { message: "You must provied a image size ", statusCode: 400 },
            { status: 400 }
        )
    }

    const aiResponse = await openai.images.generate({
        prompt,
        n,
        size
    })

    return NextResponse.json({ url: aiResponse.data[0].url }, { status: 200 })
}