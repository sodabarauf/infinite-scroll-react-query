'use client';

import { useState } from 'react';
import { ChatMessage } from '../types/chat';
import { sendMessage } from '../lib/ai-service';

const Icon = ({ path, className = 'w-5 h-5' }: { path: string; className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
  </svg>
);

const ICONS = {
  chat: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  close: 'M6 18L18 6M6 6l12 12',
  send: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
  support: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  chatBubble: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
};

export default function ChatOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessage(newMessages);
      setMessages([...newMessages, { role: 'assistant', content: response.content }]);
    } catch {
      setError('Unable to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 hover:from-blue-700 hover:to-blue-800 z-50 group cursor-pointer"
      >
        <Icon path={ICONS.chat} className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col transform transition-all duration-300 scale-100 animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
              <Icon path={ICONS.support} className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Chat Support</h3>
              <p className="text-xs text-green-600 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                Available
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Icon path={ICONS.close} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon path={ICONS.chatBubble} className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-gray-500 font-medium">Hi there! 👋</p>
              <p className="text-gray-400 text-sm mt-2">How can I help you today?</p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'bg-white border border-gray-200 text-gray-900 shadow-sm'
                }`}>
                  <div className="text-xs font-medium mb-1 opacity-70">{msg.role === 'user' ? 'You' : 'Support'}</div>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start animate-fadeIn">
              <div className="bg-white border border-gray-200 text-gray-900 px-4 py-3 rounded-2xl shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="px-6 py-3 bg-red-50 border-t border-red-100">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white shadow-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Send</span>
                  <Icon path={ICONS.send} className="w-4 h-4" />
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
