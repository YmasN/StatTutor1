
import React from 'react';
import { CHAPTERS } from '../constants';

interface SidebarProps {
  onChapterClick: (title: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onChapterClick, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`fixed inset-y-0 left-0 w-72 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static lg:inset-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-500 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white">StatTutor</h1>
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l18 18" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
              Course Material (OpenStax 2e)
            </h2>
            <ul className="space-y-1">
              {CHAPTERS.map((chapter) => (
                <li key={chapter.id}>
                  <button
                    onClick={() => onChapterClick(chapter.title)}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition-colors flex flex-col group"
                  >
                    <span className="text-indigo-400 font-medium group-hover:text-indigo-300">Chapter {chapter.id}</span>
                    <span className="text-slate-300">{chapter.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-6 border-t border-slate-800">
            <a 
              href="https://openstax.org/books/introductory-statistics-2e/pages/1-introduction" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open Textbook Link
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
