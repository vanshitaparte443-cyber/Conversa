import React from 'react';
import type { Mistake } from '../../types/debrief';
import { AlertCircle } from 'lucide-react';

interface KeyMistakesProps {
  mistakes: Mistake[];
}

export const KeyMistakes: React.FC<KeyMistakesProps> = ({ mistakes }) => {
  if (mistakes.length === 0) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
        <h3 className="font-mono text-sm uppercase text-emerald-800 font-bold tracking-wider mb-1">Zero Errors Detected!</h3>
        <p className="font-sans text-xs text-emerald-800">Amazing! Your grammar and syntax matching were completely clean.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {mistakes.map((mistake) => (
        <div key={mistake.id} className="bg-white border border-[#E4E4E7] hover:border-zinc-300 rounded-xl p-4 transition-all duration-200 shadow-xs">
          
          {/* Header */}
          <div className="flex items-center gap-2 mb-3 border-b border-[#E4E4E7] pb-2">
            <AlertCircle className="w-4 h-4 text-rose-700" />
            <span className="font-mono text-xs uppercase tracking-wider text-rose-800 font-semibold">Grammar / Spelling Correction</span>
          </div>

          {/* Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            
            {/* Original Text */}
            <div className="bg-rose-50/60 rounded-xl p-3.5 border border-rose-200">
              <span className="font-mono text-[9px] uppercase tracking-wider text-rose-800 font-semibold block mb-1">What you said</span>
              <p className="font-sans text-sm text-rose-950 font-medium">{mistake.originalText}</p>
              {mistake.pronunciation && (
                <p className="font-mono text-[10px] text-rose-700 mt-1 italic">"{mistake.pronunciation}"</p>
              )}
            </div>

            {/* Corrected Text */}
            <div className="bg-emerald-50/60 rounded-xl p-3.5 border border-emerald-200">
              <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-800 font-semibold block mb-1">Recommended correction</span>
              <p className="font-sans text-sm text-emerald-950 font-semibold">{mistake.correctedText}</p>
            </div>

          </div>

          {/* Explanation */}
          <div className="mt-3 bg-[#F4F4F5] rounded-xl p-3 border border-[#E4E4E7]">
            <p className="font-sans text-xs text-zinc-700 leading-relaxed">
              <strong className="font-mono text-[10px] text-zinc-500 uppercase block mb-0.5 font-semibold">Grammar Rule / Critique</strong>
              {mistake.explanation}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
};
