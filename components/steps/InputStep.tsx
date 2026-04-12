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

// Unique placeholder per format+style combination — rough notebook-style jots
const placeholderMap: Partial<Record<`${Format}:${Style}`, string>> = {
  "linkedin:leader":
    "- managing teams 5 yrs\n- biggest mistake: busy ≠ productive\n- cut meetings 40%, output went up\n- what we actually changed\n- lesson I wish I knew earlier",
  "linkedin:educator":
    "- skill learning myth — not 10k hrs\n- 20 hrs if done right\n- deliberate practice, not repetition\n- 3 steps I use with my team\n- practical, anyone can try this",
  "linkedin:human":
    "- rejected 12 times in a row\n- cried after the 8th\n- almost gave up\n- something shifted\n- stopped performing, started being honest\n- what changed after that",
  "linkedin:promotional":
    "- 6 months building this\n- problem: 3hrs/week lost to status syncs\n- what it does\n- why we built it this way\n- who it's for\n- link / CTA",

  "prompt:generative":
    "- short film poster\n- neo-noir vibe\n- rainy Tokyo alley, night\n- neon reflections on wet pavement\n- lone figure, trench coat\n- cinematic, high contrast",
  "prompt:informative":
    "- gut microbiome + mental health\n- not a scientist, keep it simple\n- what research actually says\n- what's still uncertain\n- what I can do about it",
  "prompt:summarising":
    "- 15-page EV market report, SE Asia\n- need top 5 takeaways\n- key risks mentioned\n- important numbers / projections\n- keep it under 300 words",
  "prompt:analytical":
    "- personal finance newsletter idea\n- market size?\n- who's already doing it\n- monetisation models that work\n- biggest risks\n- should I do it",

  "speech:persuasive":
    "- seed round pitch\n- problem: restaurants waste 30% food\n- our fix: AI demand forecasting\n- traction so far\n- what we need + why now\n- strong close",
  "speech:storyteller":
    "- failed my first business at 24\n- lost everything, moved back home\n- darkest point\n- what shifted\n- what I built after\n- what failure actually taught me",
  "speech:educational":
    "- negotiation workshop, junior staff\n- 3 core principles\n- real examples they'll relate to\n- common mistakes\n- practical exercise to try that week\n- keep it under 30 mins",
  "speech:humorous":
    "- best man speech\n- he showed up to his own bday a day late\n- other disasters (the trip, the flat)\n- why he's actually the best person I know\n- end on something real\n- keep it under 5 mins",

  "presentation:authoritative":
    "- Q3 board presentation\n- revenue up 18%\n- churn also up — own it\n- why it happened\n- 90-day response plan\n- clear ask from the board",
  "presentation:casual":
    "- lunch-and-learn: async comms\n- nothing formal\n- 4 things we could do differently\n- a few jokes, keep it light\n- open discussion at the end\n- 20 mins max",
  "presentation:factual":
    "- remote work productivity research\n- 3 studies, 200-person survey\n- 6 months internal data\n- present objectively\n- no spin, let numbers speak\n- recommendations at the end",
  "presentation:empathetic":
    "- restructuring plan\n- affects 20% of team\n- be honest, don't sugarcoat\n- acknowledge how hard this is\n- explain the reasoning clearly\n- what happens next for people",
};

// Fallback placeholders per format
const fallbackPlaceholders: Record<Format, string> = {
  linkedin:     "- main idea or story\n- key point I want to make\n- why it matters\n- who it's for",
  prompt:       "- what I want the AI to do\n- context or constraints\n- format I want back\n- anything to avoid",
  speech:       "- main message\n- key points (3 max)\n- story or example\n- how I want to close",
  presentation: "- topic / title\n- key points per slide\n- data or examples I have\n- what I want the audience to do",
};

export default function InputStep({ value, onChange, onSubmit, loading, format, style }: InputStepProps) {
  const label = `${formatLabels[format]}${style ? ` · ${styleLabels[style]}` : ""}`;
  const key = style ? (`${format}:${style}` as `${Format}:${Style}`) : null;
  const placeholder = (key && placeholderMap[key]) ?? fallbackPlaceholders[format];

  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-12">
        <p className="text-xs font-medium text-slate-300 tracking-[0.18em] mb-4">
          Step 3 — <span className="text-slate-400">Your canvas</span>
        </p>
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
          placeholder={placeholder}
          rows={12}
          className={`
            w-full resize-none rounded-2xl border border-slate-200
            bg-white px-8 py-7 text-slate-700 leading-relaxed
            placeholder:text-slate-300 placeholder:text-sm placeholder:leading-relaxed
            focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100
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
