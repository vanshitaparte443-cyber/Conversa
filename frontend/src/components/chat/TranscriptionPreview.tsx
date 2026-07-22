import React from 'react';
import { useSession } from '../../context/SessionContext';
import { Terminal } from 'lucide-react';

export const TranscriptionPreview: React.FC = () => {
  const { transcription, recordingState } = useSession();

  if (recordingState === 'idle') return null;

  return (
    <div className="w-full bg-zinc-100/80 border border-zinc-200 rounded-xl p-3.5 font-mono text-xs text-zinc-950 relative overflow-hidden shadow-xs">
      <div className="flex items-center gap-2 mb-1.5 border-b border-zinc-200 pb-1">
        <Terminal className="w-3.5 h-3.5 animate-pulse text-zinc-900" />
        <span className="uppercase tracking-wider font-bold text-zinc-900">Speech Input Monitor</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${recordingState === 'listening' ? 'bg-red-500 animate-ping' : 'bg-zinc-900 animate-pulse'}`} />
          <span className="text-[10px] text-zinc-500 uppercase font-semibold">
            {recordingState === 'listening' ? 'Streaming' : 'Processing Speech...'}
          </span>
        </span>
      </div>

      <div className="flex items-start gap-1 font-sans text-sm min-h-6 leading-relaxed text-zinc-900">
        <span className="text-zinc-900 font-bold">&gt;</span>
        <span className="flex-1 select-none">
          {transcription || <span className="text-zinc-400 italic">Start speaking to transcribe...</span>}
          {recordingState === 'listening' && (
            <span className="inline-block w-1.5 h-4 bg-zinc-900 ml-0.5 align-middle animate-pulse" />
          )}
        </span>
      </div>
    </div>
  );
};
