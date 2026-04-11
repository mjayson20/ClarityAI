"use client";

import { type Format, type Style } from "@/components/ModeSelector";

interface InputStepProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  loading: boolean;
  format: Format;
  style: Style | null;
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

const placeholders: Record<Format, string> = {
  linkedin:     "Dump your thoughts here — what do you want to say?",
  prompt:       "Describe what you want the AI to do or create...",
  speech:       "Write out your raw ideas, points, or story...",
  presentation: "Outline your key points or paste your rough notes...",
};

export default function InputStep({ value, onChange, onSubmit, loading, format, style }: InputStepProps) {
  const label = `${formatLabels[format]}${style ? ` · ${styleLabels[style]}` : ""}`;

  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold text-slate-300 uppercase tracking-[0.2em] mb-4">Step 3 of 4</p>
        <h2 className="font-bold text-slate-900 tracking-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
          Your thoughts
        </h2>
        <p className="mt-3 text-slate-400" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}>
          Write freely — don&apos;t worry about structure
        </p>
      </div>

      <div className="relative w-full group mb-6">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={loading}
          placeholder={placeholders[format]}
          rows={12}
          className={`
            w-full resize-none rounded-2xl border border-slate-100
            bg-white px-8 py-7 text-slate-700 leading-relaxed
            placeholder:text-slate-200
            focus:outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-100
            transition-all duration-300 shadow-sm hover:shadow-md
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
          `}
          style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)" }}
        />
        <span className="absolute bottom-5 right-6 text-xs text-slate-200 select-none tabular-nums">
          {value.length}
        </span>
      </div>

      <button
        onClick={onSubmit}
        disabled={loading || !value.trim()}
        className={`
          w-full flex items-center justify-center gap-3
          py-4 rounded-2xl font-semibold
          transition-all duration-300
          ${loading || !value.trim()
            ? "bg-slate-100 text-slate-300 cursor-not-allowed"
            : "bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-200/40 active:scale-[0.99]"
          }
        `}
        style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)" }}
      >
        {loading ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="24" strokeDashoffset="12"/>
            </svg>
            Thinking...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1l2.2 5L14 8l-3.8 2L8 15l-2.2-5L2 8l3.8-2L8 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            Generate — {label}
          </>
        )}
      </button>
    </div>
  );
}
