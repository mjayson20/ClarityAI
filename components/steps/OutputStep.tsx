"use client";

import { useState, useEffect, useRef } from "react";
import { type ClarityScoreData } from "@/components/ClarityScore";

interface OutputStepProps {
  input: string;
  output: string;
  loading: boolean;
  beforeScore: ClarityScoreData | null;
  afterScore: ClarityScoreData | null;
  onRegenerate: () => void;
  onStartOver: () => void;
}

function formatOutput(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^[-•] (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>")
    .replace(/^(?!<[hul])(.+)/, "<p>$1</p>");
}

function CountUp({ target, duration = 1000 }: { target: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, duration]);

  return <>{display}</>;
}

function scoreInfo(score: number) {
  if (score >= 75) return { bar: "bg-emerald-400", text: "text-emerald-600", label: "Clear" };
  if (score >= 50) return { bar: "bg-amber-400",   text: "text-amber-500",   label: "Decent" };
  return               { bar: "bg-red-400",         text: "text-red-500",     label: "Unclear" };
}

export default function OutputStep({
  input, output, loading, beforeScore, afterScore, onRegenerate, onStartOver,
}: OutputStepProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs font-semibold text-slate-300 uppercase tracking-[0.2em] mb-4">
          Step 4 of 4
        </p>
        <h2
          className="font-bold text-slate-900 tracking-tight"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
        >
          Your refined output
        </h2>
        <p className="mt-3 text-slate-400" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}>
          See how your thoughts transformed
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-32 gap-6 animate-fade-in">
          <div className="flex gap-2.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-slate-200 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <p className="text-sm text-slate-400 font-medium tracking-wide">Refining your thoughts...</p>
        </div>
      )}

      {!loading && output && (
        <div className="space-y-4">
          {/* BEFORE — faded */}
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-[0.15em]">Before</span>
              {beforeScore && (
                <span className={`ml-auto text-xs font-medium ${scoreInfo(beforeScore.score).text}`}>
                  {beforeScore.score}/100 — {scoreInfo(beforeScore.score).label}
                </span>
              )}
            </div>
            <div className="w-full rounded-2xl bg-slate-50 border border-slate-100 px-8 py-6 opacity-50">
              <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-wrap">{input}</p>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center py-1">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-6 bg-slate-200" />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1.5 7l4.5 4 4.5-4" stroke="#cbd5e1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* AFTER — elevated */}
          <div className="animate-slide-up" style={{ animationDelay: "120ms" }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">After</span>
              {afterScore && (
                <span className="ml-auto text-xs font-semibold text-slate-700">
                  <CountUp target={afterScore.score} />/100 — {scoreInfo(afterScore.score).label}
                </span>
              )}
            </div>
            <div className="w-full rounded-2xl bg-white border border-slate-200 px-8 py-6 shadow-xl shadow-slate-100/80">
              <div
                className="output-content text-slate-700 leading-relaxed"
                style={{ fontSize: "clamp(0.9rem, 1.3vw, 1rem)" }}
                dangerouslySetInnerHTML={{ __html: formatOutput(output) }}
              />
            </div>
          </div>

          {/* Clarity Score bars */}
          {beforeScore && afterScore && (
            <div className="animate-fade-in w-full rounded-2xl bg-white border border-slate-100 px-8 py-6 shadow-sm"
              style={{ animationDelay: "200ms" }}>
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-[0.15em] mb-5">
                Clarity Score
              </p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>Before</span>
                    <span>{beforeScore.score}/100</span>
                  </div>
                  <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${scoreInfo(beforeScore.score).bar}`}
                      style={{ width: `${beforeScore.score}%` }}
                    />
                  </div>
                  {beforeScore.issues.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {beforeScore.issues.map((issue, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-slate-50 text-slate-400 border border-slate-100">
                          {issue}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-600 font-medium">After</span>
                    <span className="text-slate-700 font-semibold">
                      <CountUp target={afterScore.score} />/100
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-slate-700 transition-all duration-1000 ease-out"
                      style={{ width: `${afterScore.score}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2 animate-fade-in" style={{ animationDelay: "280ms" }}>
            <button
              onClick={handleCopy}
              className={`flex items-center justify-center gap-2 flex-1 py-3.5 rounded-2xl text-sm font-medium
                border transition-all duration-200
                ${copied
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-900 hover:text-slate-900"
                }`}
            >
              {copied
                ? <><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 6.5l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>Copied</>
                : <><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M1.5 9.5V1.5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>Copy</>
              }
            </button>

            <button
              onClick={onRegenerate}
              className="flex items-center justify-center gap-2 flex-1 py-3.5 rounded-2xl text-sm font-medium
                bg-white text-slate-500 border border-slate-200
                hover:border-slate-900 hover:text-slate-900 transition-all duration-200"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 6.5a5.5 5.5 0 1 0 1.4-3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M1 2.5v4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Regenerate
            </button>

            <button
              onClick={onStartOver}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-medium
                bg-slate-900 text-white
                hover:bg-indigo-600 transition-all duration-200"
            >
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
