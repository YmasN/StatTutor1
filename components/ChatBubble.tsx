
import React from 'react';
import { Message } from '../types';
import MathRenderer from './MathRenderer';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isModel = message.role === 'model';
  
  return (
    <div className={`flex w-full mb-6 ${isModel ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 shadow-sm ${
        isModel 
          ? 'bg-white text-slate-800 border border-slate-200' 
          : 'bg-indigo-600 text-white'
      }`}>
        <div className="flex items-center mb-2">
          {isModel ? (
            <div className="bg-indigo-100 p-1.5 rounded-lg mr-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          ) : null}
          <span className={`text-xs font-bold uppercase tracking-wider ${isModel ? 'text-indigo-600' : 'text-indigo-100'}`}>
            {isModel ? 'StatTutor' : 'Student'}
          </span>
        </div>
        
        <div className={!isModel ? 'text-white' : ''}>
          {isModel ? (
            <MathRenderer content={message.text} />
          ) : (
            <p className="whitespace-pre-wrap">{message.text}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
