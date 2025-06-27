'use client';

import { useState } from 'react';
import { Bot, SendHorizonal } from 'lucide-react';
import { sendChatMessage } from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';

type Message = { role: 'user' | 'ai'; text: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const aiText = await sendChatMessage(input);
    const aiMessage: Message = { role: 'ai', text: aiText };
    setMessages((prev) => [...prev, aiMessage]);
    setInput('');
    setLoading(false);
  };

  return (
    <ProtectedRoute>
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 relative">
        <div className="absolute top-4 right-6 text-sm text-gray-400">
          AI Assistant
        </div>

        <Bot className="w-16 h-16 text-blue-600 mb-6" />

        <div className="w-full max-w-2xl">
          <div className="space-y-4 max-h-[50vh] overflow-y-auto mb-6 px-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-md max-w-[75%] text-sm ${
                  msg.role === 'user'
                    ? 'ml-auto bg-blue-100 text-blue-900'
                    : 'mr-auto bg-gray-200 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="mr-auto bg-gray-200 text-gray-600 p-3 rounded-md max-w-[75%] text-sm animate-pulse">
                Typing...
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about your finances..."
              className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm shadow-sm"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <SendHorizonal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}