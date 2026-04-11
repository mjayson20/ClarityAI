"use client";

import { type Format, type Style } from "@/components/ModeSelector";

// Re-export Context as Style alias so page.tsx import still resolves
export type Context = Style;

interface StyleOption {
  id: Style;
  icon: string;
  label: string;
  description: string;
  example: string;
}

const styleMap: Record<Format, StyleOption[]> = {
  linkedin: [
    {
      id: "leader",
      icon: "◉",
      label: "Leader-Oriented",
      description: "Authoritative insights that position you as a thought leader",
      example: "Sharing lessons from managing a team through a crisis",
    },
    {
      id: "educator",
      icon: "◈",
      label: "Educator-Oriented",
      description: "Teach your audience something valuable and actionable",
      example: "A step-by-step breakdown of a skill or concept",
    },
    {
      id: "human",
      icon: "◌",
      label: "Human-Oriented",
      description: "Simple, raw and relatable — real talk, no polish",
      example: "Sharing a personal struggle or honest reflection",
    },
    {
      id: "promotional",
      icon: "◫",
      label: "Promotional",
      description: "Highlight a product, service, or achievement compellingly",
      example: "Announcing a product launch or a new role",
    },
  ],
  prompt: [
    {
      id: "generative",
      icon: "◎",
      label: "Generative",
      description: "Create media — images, videos, music, or written content",
      example: "Generate a cinematic image of a futuristic city at dusk",
    },
    {
      id: "informative",
      icon: "◈",
      label: "Informative",
      description: "Learn something new or get a clear explanation of a topic",
      example: "Explain how transformer models work in simple terms",
    },
    {
      id: "summarising",
      icon: "◌",
      label: "Summarising",
      description: "Condense long content into clear, digestible takeaways",
      example: "Summarise this 10-page report into 5 bullet points",
    },
    {
      id: "analytical",
      icon: "◉",
      label: "Analytical",
      description: "Get a deep analysis, critique, or structured review",
      example: "Analyse the strengths and weaknesses of this business idea",
    },
  ],
  speech: [
    {
      id: "persuasive",
      icon: "◉",
      label: "Persuasive",
      description: "Drive action — ideal for pitches, sales, and negotiations",
      example: "A startup pitch to a room of investors",
    },
    {
      id: "storyteller",
      icon: "◎",
      label: "Storyteller",
      description: "Inspire and move people through narrative and emotion",
      example: "A motivational keynote or graduation speech",
    },
    {
      id: "educational",
      icon: "◈",
      label: "Educational",
      description: "Teach clearly and memorably with structure and examples",
      example: "A lecture, workshop, or explainer talk",
    },
    {
      id: "humorous",
      icon: "◌",
      label: "Humorous",
      description: "Entertain and connect through wit, warmth, and timing",
      example: "A best man speech or a light-hearted team address",
    },
  ],
  presentation: [
    {
      id: "authoritative",
      icon: "◉",
      label: "Authoritative",
      description: "Command the room with confidence and expertise",
      example: "An executive strategy briefing or board presentation",
    },
    {
      id: "casual",
      icon: "◌",
      label: "Casual",
      description: "Relaxed, conversational and easy to follow",
      example: "An internal team update or a lunch-and-learn session",
    },
    {
      id: "factual",
      icon: "◈",
      label: "Factual",
      description: "Data-driven and precise — let the evidence speak",
      example: "A research findings deck or a quarterly metrics review",
    },
    {
      id: "empathetic",
      icon: "◫",
      label: "Empathetic",
      description: "Connect emotionally and speak to your audience's needs",
      example: "A change management presentation or a community address",
    },
  ],
};

const formatHeadings: Record<Format, { title: string; subtitle: string }> = {
  linkedin:     { title: "Choose your style",    subtitle: "How should your LinkedIn post feel?" },
  prompt:       { title: "Choose prompt type",   subtitle: "What should the AI do with your input?" },
  speech:       { title: "Choose your delivery", subtitle: "What tone should your speech carry?" },
  presentation: { title: "Choose your approach", subtitle: "How should your presentation land?" },
};

interface ContextStepProps {
  format: Format;
  selected: Style | null;
  onSelect: (s: Style) => void;
}

export default function ContextStep({ format, selected, onSelect }: ContextStepProps) {
  const options = styleMap[format];
  const heading = formatHeadings[format];

  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold text-slate-300 uppercase tracking-[0.2em] mb-4">Step 2 of 4</p>
        <h2 className="font-bold text-slate-900 tracking-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
          {heading.title}
        </h2>
        <p className="mt-3 text-slate-400" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}>
          {heading.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {options.map((opt, i) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`
                animate-float-in card-delay-${i}
                group relative text-left p-7 rounded-2xl border
                transition-all duration-300
                ${isSelected
                  ? "bg-slate-900 border-slate-900 shadow-2xl shadow-slate-900/20 scale-[1.02]"
                  : "bg-white border-slate-100 hover:border-slate-900 hover:bg-slate-900 hover:shadow-xl hover:shadow-slate-900/15 hover:scale-[1.01]"
                }
              `}
            >
              <span className={`text-xl mb-5 block transition-colors duration-300
                ${isSelected ? "text-indigo-300" : "text-slate-300 group-hover:text-indigo-300"}`}>
                {opt.icon}
              </span>
              <h3 className={`font-semibold mb-2 transition-colors duration-300
                ${isSelected ? "text-white" : "text-slate-800 group-hover:text-white"}`}
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)" }}>
                {opt.label}
              </h3>
              <p className={`text-sm leading-relaxed mb-4 transition-colors duration-300
                ${isSelected ? "text-slate-300" : "text-slate-400 group-hover:text-slate-300"}`}>
                {opt.description}
              </p>
              <p className={`text-xs transition-colors duration-300
                ${isSelected ? "text-slate-500" : "text-slate-300 group-hover:text-slate-500"}`}>
                e.g. {opt.example}
              </p>
              {isSelected && <span className="absolute top-5 right-5 w-2 h-2 rounded-full bg-indigo-400" />}
            </button>
          );
        })}
      </div>

      {selected && (
        <p className="text-center text-xs text-slate-300 mt-8 animate-fade-in">
          Click <span className="text-slate-600 font-medium">Continue</span> to proceed
        </p>
      )}
    </div>
  );
}
