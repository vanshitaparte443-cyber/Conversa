import React from 'react';
import type { Mistake } from '../../types/debrief';
import { Sparkles } from 'lucide-react';

interface PhrasingComparisonProps {
  phrasing: Mistake[];
}

export const PhrasingComparison: React.FC<PhrasingComparisonProps> = ({ phrasing }) => {
  if (phrasing.length === 0) {
    return (
      <div className="bg-[#F4F4F5] border border-[#E4E4E7] rounded-xl p-5 text-center">
        <p className="font-sans text-xs text-zinc-500">No phrasing adjustments recommended for this session.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {phrasing.map((item) => (
        <div key={item.id} className="bg-white border border-[#E4E4E7] hover:border-zinc-300 rounded-xl p-4 transition-all duration-200 shadow-xs">
          
          {/* Header */}
          <div className="flex items-center gap-2 mb-3 border-b border-[#E4E4E7] pb-2">
            <Sparkles className="w-4 h-4 text-zinc-800 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-900 font-semibold">Natural Phrasing Alternative</span>
          </div>

          {/* Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            
            {/* Clunky/Literal Phrasing */}
            <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-200">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 font-semibold block mb-1">Literal phrasing</span>
              <p className="font-sans text-sm text-zinc-700 font-medium">{item.originalText}</p>
            </div>

            {/* Native Phrasing */}
            <div className="bg-zinc-100/70 rounded-xl p-3.5 border border-zinc-200">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-800 font-semibold block mb-1">Natural Native phrasing</span>
              <p className="font-sans text-sm text-zinc-950 font-semibold">{item.correctedText}</p>
            </div>

          </div>

          {/* Explanation */}
          <div className="mt-3 bg-[#F4F4F5] rounded-xl p-3 border border-[#E4E4E7]">
            <p className="font-sans text-xs text-zinc-700 leading-relaxed">
              <strong className="font-mono text-[10px] text-zinc-500 uppercase block mb-0.5 font-semibold">Cultural Context / Idiom</strong>
              {item.explanation}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
};
