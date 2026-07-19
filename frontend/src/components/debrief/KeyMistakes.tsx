import React from 'react';
import type { Mistake } from '../../types/debrief';
import { AlertCircle } from 'lucide-react';

interface KeyMistakesProps {
  mistakes: Mistake[];
}

export const KeyMistakes: React.FC<KeyMistakesProps> = ({ mistakes }) => {
  if (mistakes.length === 0) {
    return (
      <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 text-center">
        <h3 className="text-sm uppercase text-emerald-400 tracking-wider font-bold mb-1">No Mistakes Detected</h3>
        <p className="text-xs text-zinc-400">Excellent! Your grammar, spelling, and phrasing were completely clean.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {mistakes.map((mistake) => (
        <div key={mistake.id} className="bg-zinc-900/30 border border-white/5 hover:border-white/10 rounded-2xl p-5 md:p-6 transition-all duration-300 shadow-sm flex flex-col gap-4">
          
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span className="text-xs uppercase tracking-wider text-rose-400 font-bold">Grammar & Syntax Correction</span>
          </div>

          {/* Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            
            {/* Original Text */}
            <div className="bg-zinc-950/40 rounded-xl p-4 border border-white/5 flex flex-col justify-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block mb-1.5">What you said</span>
              <p className="text-sm text-rose-400 font-semibold">{mistake.originalText}</p>
              {mistake.pronunciation && (
                <p className="text-[11px] text-zinc-500 mt-1 italic">"{mistake.pronunciation}"</p>
              )}
            </div>

            {/* Corrected Text */}
            <div className="bg-emerald-500/[0.03] rounded-xl p-4 border border-emerald-500/20 flex flex-col justify-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-1.5">Recommended correction</span>
              <p className="text-sm text-emerald-400 font-semibold">{mistake.correctedText}</p>
            </div>

          </div>

          {/* Explanation */}
          <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Critique & Rule</span>
            <p className="text-xs text-zinc-300 leading-relaxed font-medium">
              {mistake.explanation}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
};
