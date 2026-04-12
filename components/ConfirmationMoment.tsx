"use client";

import { useEffect, useState } from "react";
import { type Format, type Style } from "@/components/ModeSelector";

interface ConfirmationMomentProps {
  format: Format;
  style: Style;
  onContinue: () => void;
}

const formatLabels: Record<Format, string> = {
  linkedin:     "LinkedIn post",
  prompt:       "AI prompt",
  speech:       "speech",
  presentation: "presentation",
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

// Subtext per combination
const subtext: Partial<Record<`${Format}:${Style}`, string>> = {
  "linkedin:leader":         "Share a hard-won insight. Lead with conviction.",
  "linkedin:educator":       "Break it down. Make it stick.",
  "linkedin:human":          "Be real. People connect with honesty.",
  "linkedin:promotional":    "Lead with value. Close with action.",
  "prompt:generative":       "Describe the world you want to create.",
  "prompt:informative":      "Ask clearly. Learn deeply.",
  "prompt:summarising":      "Give it the raw material. Get the essence.",
  "prompt:analytical":       "Think out loud. Let the AI structure it.",
  "speech:persuasive":       "Make them believe. Make them act.",
  "speech:storyteller":      "Take them somewhere. Bring them back changed.",
  "speech:educational":      "Teach one thing well. Make it unforgettable.",
  "speech:humorous":         "Make them laugh. Make them remember you.",
  "presentation:authoritative": "Own the room before you say a word.",
  "presentation:casual":     "Keep it human. Keep it moving.",
  "presentation:factual":    "Let the data do the talking.",
  "presentation:empathetic": "Meet your audience where they are.",
};

export default function ConfirmationMoment({ format, style, onContinue }: ConfirmationMomentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Slight delay so the transition feels intentional
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const key = `${format}:${style}` as `${Format}:${Style}`;
  const sub = subtext[key] ?? "Now, tell me what you're thinking.";

  return (
    <div
      className={`w-full flex flex-col items-center justify-center text-center transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ minHeight: "60vh" }}
    >
      {/* Eyebrow */}
      <p className="text-xs font-medium text-slate-300 tracking-[0.18em] mb-8">
        Step 3 — <span className="text-slate-400">Your canvas is ready</span>
      </p>

      {/* Main statement */}
      <h2
        className="font-bold text-slate-900 tracking-tight leading-tight mb-4"
        style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", maxWidth: "680px" }}
      >
        You&apos;re creating a{" "}
        <span className="text-slate-900 underline decoration-indigo-300 decoration-2 underline-offset-4">
          {formatLabels[format]}
        </span>{" "}
        in{" "}
        <span className="text-slate-900 underline decoration-indigo-300 decoration-2 underline-offset-4">
          {styleLabels[style]}
        </span>{" "}
        style.
      </h2>

      {/* Subtext */}
      <p
        className="text-slate-400 mb-14 font-light"
        style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", maxWidth: "480px", lineHeight: 1.6 }}
      >
        {sub}
        <br />
        <span className="text-slate-300">Now, tell me what you&apos;re thinking.</span>
      </p>

      {/* CTA */}
      <button
        onClick={onContinue}
        className="flex items-center gap-3 px-10 py-4 rounded-2xl
          bg-slate-900 text-white font-semibold
          hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-200/40
          active:scale-95 transition-all duration-300"
        style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)" }}
      >
        Let&apos;s go
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path d="M3 7.5h9M9 4l3.5 3.5L9 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
