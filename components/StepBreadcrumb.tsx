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
    <div className="flex items-center gap-3 flex-wrap mb-12 animate-fade-in">
      {/* Creating block */}
      {format && (
        <button
          onClick={onEditFormat}
          className="group flex items-center gap-2 transition-all duration-200"
        >
          <span className="text-xs text-slate-300 font-medium">Creating</span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold
            group-hover:bg-indigo-600 transition-all duration-200 flex items-center gap-1.5">
            {formatLabels[format]}
            <span className="opacity-30 text-[9px]">✕</span>
          </span>
        </button>
      )}

      {/* Style block — only from step 3 onward */}
      {step >= 3 && style && (
        <>
          <span className="text-slate-200 text-sm">·</span>
          <button
            onClick={onEditStyle}
            className="group flex items-center gap-2 transition-all duration-200"
          >
            <span className="text-xs text-slate-300 font-medium">Style</span>
            <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-semibold
              group-hover:border-slate-900 group-hover:text-slate-900 transition-all duration-200 flex items-center gap-1.5">
              {styleLabels[style]}
              <span className="opacity-30 text-[9px]">✕</span>
            </span>
          </button>
        </>
      )}
    </div>
  );
}
