
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MathRendererProps {
  content: string;
}

const MathRenderer: React.FC<MathRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-slate max-w-none prose-sm md:prose-base">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Use specific classes for math to ensure overflow handling
          span: ({ node, ...props }) => {
            if ((props as any).className?.includes('katex')) {
              return <span {...props} className="inline-math" />;
            }
            return <span {...props} />;
          },
          div: ({ node, ...props }) => {
            if ((props as any).className?.includes('katex-display')) {
              return <div {...props} className="math-display" />;
            }
            return <div {...props} />;
          },
          // Custom styles for lists and headers to match tutor style
          h1: ({ children }) => <h1 className="text-xl font-bold mt-4 mb-2 text-indigo-700">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-bold mt-3 mb-1 text-indigo-600">{children}</h2>,
          h3: ({ children }) => <h3 className="text-md font-semibold mt-2 mb-1 text-indigo-500">{children}</h3>,
          strong: ({ children }) => <strong className="font-bold text-slate-800">{children}</strong>,
          ul: ({ children }) => <ul className="list-disc pl-5 mb-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 mb-2">{children}</ol>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-amber-400 bg-amber-50 p-3 my-2 italic text-slate-700">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MathRenderer;
