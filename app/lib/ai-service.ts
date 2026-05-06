import { ChatMessage, AIResponse } from '../types/chat';

export async function sendMessage(messages: ChatMessage[]): Promise<AIResponse> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const error = await  response.json().catch(() => ({}));
   throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}
