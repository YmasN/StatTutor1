
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message } from './types';
import Sidebar from './components/Sidebar';
import ChatBubble from './components/ChatBubble';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hello! I'm StatTutor, your dedicated assistant for Introductory Statistics (OpenStax 2e). Whether you have a concept question, need a problem worked out step by step, or want to check your own solution, I'm here to help. What are you working on today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const modelMessage: Message = { role: 'model', text: '' };
      setMessages(prev => [...prev, modelMessage]);

      let fullResponse = '';
      for await (const chunk of geminiService.sendMessage(input)) {
        fullResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { 
            role: 'model', 
            text: fullResponse 
          };
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "I apologize, but I encountered an error. Please try again or check your connection." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChapterClick = (title: string) => {
    const prompt = `I'm studying Chapter ${title}. Can you give me a brief overview and a practice problem from this chapter?`;
    setInput(prompt);
    // Option to auto-send or just set input. Let's set input so they can refine it.
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onChapterClick={handleChapterClick} 
      />

      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0 z-30">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 mr-2 text-slate-500 hover:text-slate-700 lg:hidden rounded-lg hover:bg-slate-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h2 className="font-bold text-slate-800 leading-tight">Statistics Tutoring Session</h2>
              <p className="text-xs text-slate-500 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                Tutor Online • OpenStax 2nd Edition
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 text-xs font-medium text-slate-400 uppercase tracking-widest">
            <span>Powered by Gemini 3 Pro</span>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            {messages.map((msg, index) => (
              <ChatBubble key={index} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Tips / Floating Status */}
        {isLoading && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm border border-slate-200 px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 animate-pulse">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
            <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">Tutor is thinking...</span>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 shadow-xl">
          <form 
            onSubmit={handleSend}
            className="max-w-4xl mx-auto relative flex items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Ask a question (e.g., 'What is a p-value?' or 'Help me with a hypothesis test')"
              className="w-full pl-4 pr-14 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </form>
          <div className="max-w-4xl mx-auto mt-2 flex items-center justify-between text-[10px] text-slate-400 px-2">
            <span>Tip: You can use $x$ for inline math and $$x^2$$ for display math.</span>
            <span className="hidden sm:inline">Referencing: OpenStax Introductory Statistics 2e</span>
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        /* KaTeX Overrides */
        .katex-display { margin: 1em 0; overflow-x: auto; overflow-y: hidden; }
        .inline-math .katex { font-size: 1.1em; }
      `}</style>
    </div>
  );
};

export default App;
