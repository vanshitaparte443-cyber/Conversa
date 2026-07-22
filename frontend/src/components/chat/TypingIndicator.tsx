import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-4 py-3 px-4 max-w-[80%] rounded-xl bg-white border border-[#E4E4E7] shadow-xs self-start">
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 animate-pulse" style={{ animationDelay: '0ms' }} />
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 animate-pulse" style={{ animationDelay: '150ms' }} />
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 animate-pulse" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="font-mono text-xs text-zinc-500 tracking-wider font-semibold">THINKING...</span>
    </div>
  );
};
