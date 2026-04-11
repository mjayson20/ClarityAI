"use client";

import { useState } from "react";

export interface GuidedContext {
  audience: string;
  goal: string;
}

interface GuidedFlowProps {
  onChange: (ctx: GuidedContext) => void;
}

const audiences = ["Friend", "Interview", "LinkedIn", "Presentation"];
const goals = ["Inform", "Explain", "Persuade"];

export default function GuidedFlow({ onChange }: GuidedFlowProps) {
  const [open, setOpen] = useState(false);
  const [audience, setAudience] = useState("");
  const [goal, setGoal] = useState("");

  const select = (type: "audience" | "goal", value: string) => {
    const next = {
      audience: type === "audience" ? value : audience,
      goal: type === "goal" ? value : goal,
    };
    if (type === "audience") setAudience(value);
    if (type === "goal") setGoal(value);
    onChange(next);
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-indigo-500 transition-colors duration-150"
      >
        <span className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}>▶</span>
        {open ? "Hide" : "Add context"} — guided thinking
        {(audience || goal) && (
          <span className="ml-1 px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-500 text-xs">
            {[audience, goal].filter(Boolean).join(" · ")}
          </span>
        )}
      </button>

      {open && (
        <div className="mt-3 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-100 space-y-4 animate-fade-in">
          {/* Audience */}
          <div>
            <p className="text-xs text-slate-400 mb-2 font-medium">Who is this for?</p>
            <div className="flex gap-2 flex-wrap">
              {audiences.map((a) => (
                <button
                  key={a}
                  onClick={() => select("audience", audience === a ? "" : a)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 border
                    ${audience === a
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-500"
                    }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div>
            <p className="text-xs text-slate-400 mb-2 font-medium">What&apos;s your goal?</p>
            <div className="flex gap-2 flex-wrap">
              {goals.map((g) => (
                <button
                  key={g}
                  onClick={() => select("goal", goal === g ? "" : g)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 border
                    ${goal === g
                      ? "bg-violet-600 text-white border-violet-600"
                      : "bg-white text-slate-500 border-slate-200 hover:border-violet-300 hover:text-violet-500"
                    }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
