import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com/v1',
  apiKey: process.env.DEEPSEEK_API_KEY!,
});

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  content: string;
  usage?: { input_tokens: number; output_tokens: number };
}

export async function POST(request: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await request.json();
    
    if (!messages?.length) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'deepseek-chat',
      max_tokens: parseInt(process.env.AI_MAX_TOKENS || '1024'),
      messages: [
        { role: 'system', content: 'your name is zulaykha and you are my coding mentor.' },
        ...messages.map(({ role, content }) => ({ role, content }))
      ],
    });

    const content = response.choices[0]?.message?.content || '';

    return NextResponse.json<AIResponse>({
      content,
      usage: {
        input_tokens: response.usage?.prompt_tokens || 0,
        output_tokens: response.usage?.completion_tokens || 0,
      },
    });
  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'AI service unavailable' },
      { status: 500 }
    );
  }
}
