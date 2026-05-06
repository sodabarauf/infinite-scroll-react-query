export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
}

export type AIResponse = {
  content: string;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
}
