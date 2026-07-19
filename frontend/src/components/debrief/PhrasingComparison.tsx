import React from 'react';
import type { Mistake } from '../../types/debrief';
import { Sparkles } from 'lucide-react';

interface PhrasingComparisonProps {
  phrasing: Mistake[];
}

export const PhrasingComparison: React.FC<PhrasingComparisonProps> = ({ phrasing }) => {
  if (phrasing.length === 0) {
    return (
      <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 text-center">
        <p className="text-xs text-zinc-400">No phrasing adjustments recommended for this session.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {phrasing.map((item) => (
        <div key={item.id} className="bg-zinc-900/30 border border-white/5 hover:border-white/10 rounded-2xl p-5 md:p-6 transition-all duration-300 shadow-sm flex flex-col gap-4">
          
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse-ring" />
            <span className="text-xs uppercase tracking-wider text-indigo-400 font-bold">Natural Phrasing Alternative</span>
          </div>

          {/* Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            
            {/* Clunky/Literal Phrasing */}
            <div className="bg-zinc-950/40 rounded-xl p-4 border border-white/5 flex flex-col justify-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block mb-1.5">Literal phrasing</span>
              <p className="text-sm text-zinc-400 font-medium">{item.originalText}</p>
            </div>

            {/* Native Phrasing */}
            <div className="bg-indigo-500/[0.03] rounded-xl p-4 border border-indigo-500/20 flex flex-col justify-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 block mb-1.5">Natural Native phrasing</span>
              <p className="text-sm text-indigo-400 font-semibold">{item.correctedText}</p>
            </div>

          </div>

          {/* Explanation */}
          <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Cultural Context / Idiom</span>
            <p className="text-xs text-zinc-300 leading-relaxed font-medium">
              {item.explanation}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
};
