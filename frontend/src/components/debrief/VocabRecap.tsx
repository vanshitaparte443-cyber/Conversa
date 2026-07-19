import React from 'react';
import type { VocabItem } from '../../types/debrief';

interface VocabRecapProps {
  vocabulary: VocabItem[];
}

export const VocabRecap: React.FC<VocabRecapProps> = ({ vocabulary }) => {
  if (vocabulary.length === 0) {
    return (
      <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 text-center">
        <p className="text-xs text-zinc-400">No vocabulary highlights recorded for this session.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {vocabulary.map((vocab) => (
        <div key={vocab.id} className="bg-zinc-900/30 border border-white/5 hover:border-white/10 rounded-2xl p-5 md:p-6 transition-all duration-300 shadow-sm flex flex-col gap-3">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-base font-extrabold text-white tracking-wide">{vocab.word}</span>
            <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-zinc-500">
              {vocab.partOfSpeech}
            </span>
          </div>

          {/* Translation */}
          <p className="text-sm text-indigo-400 font-bold">
            {vocab.translation}
          </p>

          {/* Example Sentence */}
          <div className="bg-zinc-950/40 rounded-xl p-3.5 border border-white/5 flex flex-col gap-1 shadow-inner">
            <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 block mb-0.5">Context Example</span>
            <p className="text-xs text-zinc-300 leading-relaxed font-semibold">{vocab.exampleSentence}</p>
            <p className="text-xs text-zinc-500 italic font-medium">{vocab.exampleTranslation}</p>
          </div>

        </div>
      ))}
    </div>
  );
};
