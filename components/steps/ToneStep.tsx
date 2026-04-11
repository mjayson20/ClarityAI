"use client";

import { type Format } from "@/components/ModeSelector";

interface ToneStepProps {
  selected: Format | null;
  onSelect: (f: Format) => void;
}

const formats: {
  id: Format;
  icon: string;
  label: string;
  description: string;
  example: string;
}[] = [
  {
    id: "linkedin",
    icon: "◧",
    label: "LinkedIn Post",
    description: "Craft posts that resonate on your professional network",
    example: "Sharing a career milestone or industry insight",
  },
  {
    id: "prompt",
    icon: "◈",
    label: "Prompt",
    description: "Turn rough ideas into precise, effective AI prompts",
    example: "Writing a prompt to generate an image or research a topic",
  },
  {
    id: "speech",
    icon: "◎",
    label: "Speech",
    description: "Structure your words for live spoken delivery",
    example: "A business pitch, motivational talk, or class presentation",
  },
  {
    id: "presentation",
    icon: "◫",
    label: "Presentation",
    description: "Organise your content into a clear slide narrative",
    example: "A quarterly review, product demo, or team briefing",
  },
];

export default function ToneStep({ selected, onSelect }: ToneStepProps) {
  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold text-slate-300 uppercase tracking-[0.2em] mb-4">Step 1 of 4</p>
        <h2 className="font-bold text-slate-900 tracking-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
          What are you creating?
        </h2>
        <p className="mt-3 text-slate-400" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}>
          Choose the format that fits your goal
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {formats.map((f, i) => {
          const isSelected = selected === f.id;
          return (
            <button
              key={f.id}
              onClick={() => onSelect(f.id)}
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
                {f.icon}
              </span>
              <h3 className={`font-semibold mb-2 transition-colors duration-300
                ${isSelected ? "text-white" : "text-slate-800 group-hover:text-white"}`}
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)" }}>
                {f.label}
              </h3>
              <p className={`text-sm leading-relaxed mb-4 transition-colors duration-300
                ${isSelected ? "text-slate-300" : "text-slate-400 group-hover:text-slate-300"}`}>
                {f.description}
              </p>
              <p className={`text-xs transition-colors duration-300
                ${isSelected ? "text-slate-500" : "text-slate-300 group-hover:text-slate-500"}`}>
                e.g. {f.example}
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
