"use client";

import { type Format, type Style } from "@/components/ModeSelector";

interface StepBreadcrumbProps {
  step: number;
  format: Format | null;
  style: Style | null;
  onEditFormat: () => void;
  onEditStyle: () => void;
}

const formatLabels: Record<Format, string> = {
  linkedin:     "LinkedIn Post",
  prompt:       "Prompt",
  speech:       "Speech",
  presentation: "Presentation",
};

const styleLabels: Record<Style, string> = {
  leader:         "Leader-Oriented",
  educator:       "Educator-Oriented",
  human:          "Human-Oriented",
  promotional:    "Promotional",
  generative:     "Generative",
  informative:    "Informative",
  summarising:    "Summarising",
  analytical:     "Analytical",
  persuasive:     "Persuasive",
  storyteller:    "Storyteller",
  educational:    "Educational",
  humorous:       "Humorous",
  authoritative:  "Authoritative",
  casual:         "Casual",
  factual:        "Factual",
  empathetic:     "Empathetic",
};

export default function StepBreadcrumb({ step, format, style, onEditFormat, onEditStyle }: StepBreadcrumbProps) {
  if (step < 2) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap mb-10 animate-fade-in">
      {format && (
        <button
          onClick={onEditFormat}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
            bg-slate-900 text-white text-xs font-medium
            hover:bg-indigo-600 transition-all duration-200"
        >
          {formatLabels[format]}
          <span className="opacity-40 text-[10px]">✕</span>
        </button>
      )}

      {step >= 3 && style && (
        <>
          <span className="text-slate-200 text-xs">→</span>
          <button
            onClick={onEditStyle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
              bg-white text-slate-500 text-xs font-medium border border-slate-200
              hover:border-slate-900 hover:text-slate-900 transition-all duration-200"
          >
            {styleLabels[style]}
            <span className="opacity-40 text-[10px]">✕</span>
          </button>
        </>
      )}
    </div>
  );
}
