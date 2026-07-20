'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MessageSquare, X, Send, Mic, Sparkles } from 'lucide-react';
import { useChat } from './ChatContext';
import { getChatHistory } from '@/lib/api/chat';
import { getCurrentUser } from '@/lib/auth-client';


function ChatWidgetInner() {
  const { isOpen, closeChat, contextPackageId, openChat } = useChat();
  const searchParams = useSearchParams();
  const paramsPackageId = searchParams.get('packageId');
  const paramsTitle = searchParams.get('title');

  const { user, isPending } = getCurrentUser();
  const isLoggedIn = !!user;

  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested chips
  const suggestedFollowUps = [
    "What are the best hill destinations?",
    "Show me budget options",
    "Any weekend getaways?",
  ];

  useEffect(() => {
    if (paramsPackageId) {
      openChat(paramsPackageId);
      setMessages([
        { role: 'assistant', content: `Hi! I'm Vromon AI. What would you like to know about ${paramsTitle || 'this trip'}?` }
      ]);
    } else if (isOpen) {
      // Load history
      getChatHistory().then(res => {
        if (res.success && res.data.length > 0) {
          // Flatten history
          const hist = res.data.reverse().flatMap(session => [
            { role: 'user' as const, content: session.userMessage },
            { role: 'assistant' as const, content: session.assistantMessage }
          ]);
          setMessages(hist);
        } else if (messages.length === 0) {
          setMessages([{ role: 'assistant', content: "Hello! I'm Vromon AI. Where would you like to travel next?" }]);
        }
      }).catch(console.error);
    }
  }, [isOpen, paramsPackageId, paramsTitle, openChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent, textOverride?: string) => {
    e?.preventDefault();
    const text = textOverride || input;
    if (!text.trim() || isLoading) return;

    setInput('');
    const newMessages = [...messages, { role: 'user' as const, content: text }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, packageId: contextPackageId || undefined })
      });
      if (response.status === 401) {
        setMessages(prev => [
          ...prev, 
          { role: 'assistant', content: 'You must be logged in to use the chat. Please log in first.' }
        ]);
        setIsLoading(false);
        return;
      }
      
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to fetch: ${response.status} ${errText}`);
      }
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      
      setMessages([...newMessages, { role: 'assistant', content: '' }]);

      if (reader) {
        let assistantContent = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          assistantContent += decoder.decode(value, { stream: true });
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1].content = assistantContent;
            return updated;
          });
        }
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => openChat()}
          className="fixed bottom-6 right-6 z-50 p-4 bg-[var(--color-primary)] text-white rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Slide-over Panel */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:right-0 md:top-0 md:bottom-0 md:w-[450px] bg-white z-[100] md:shadow-[-10px_0_30px_rgba(0,0,0,0.1)] flex flex-col transition-transform duration-300 transform translate-x-0">
          {/* Header */}
          <div className="bg-[var(--color-primary)] text-white p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-accent)] rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Vromon AI</h3>
                <span className="text-xs text-blue-200">Your Travel Assistant</span>
              </div>
            </div>
            <button onClick={closeChat} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div 
                  className={`p-3 rounded-[var(--radius-card)] text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-[var(--color-primary)] text-white rounded-br-none' 
                      : 'bg-white text-[var(--color-text-main)] rounded-bl-none border border-gray-100 whitespace-pre-wrap'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 max-w-[85%] self-start">
                 <div className="w-8 h-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="p-4 rounded-[var(--radius-card)] bg-white rounded-bl-none border border-gray-100 flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
              </div>
            )}
            
            {!isLoading && messages.length > 0 && messages[messages.length-1].role === 'assistant' && (
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestedFollowUps.map(chip => (
                  <button 
                    key={chip}
                    onClick={() => handleSubmit(undefined, chip)}
                    className="text-xs bg-white border border-[var(--color-primary)]/20 text-[var(--color-primary)] px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Composer */}
          <div className="p-4 bg-white border-t border-gray-100 shrink-0">
            <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={isLoggedIn ? "Ask about your next trip..." : "Login required to use the AI assistant."}
                disabled={!isLoggedIn || isLoading}
                className={`flex-1 bg-gray-100 border-none rounded-full py-3 pl-4 pr-12 focus:ring-2 focus:ring-[var(--color-primary)] outline-none text-sm ${!isLoggedIn ? 'opacity-60 cursor-not-allowed' : ''}`}
              />
              {isLoggedIn && (
                <button type="button" className="absolute right-14 text-gray-400 hover:text-[var(--color-primary)]">
                  <Mic className="w-5 h-5" />
                </button>
              )}
              <button 
                type="submit"
                disabled={!isLoggedIn || !input.trim() || isLoading}
                className="w-11 h-11 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-opacity shrink-0 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            {!isLoggedIn && (
              <div className="mt-3 text-center">
                <a href="/login" className="text-sm text-[var(--color-primary)] font-medium hover:underline">
                  Log in to start chatting
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export function ChatWidget() {
  return (
    <Suspense fallback={null}>
      <ChatWidgetInner />
    </Suspense>
  );
}
