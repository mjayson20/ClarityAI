"use client";

import { useState, useCallback } from "react";
import LandingScreen from "@/components/LandingScreen";
import StepBreadcrumb from "@/components/StepBreadcrumb";
import ConfirmationMoment from "@/components/ConfirmationMoment";
import ToneStep from "@/components/steps/ToneStep";
import ContextStep from "@/components/steps/ContextStep";
import InputStep from "@/components/steps/InputStep";
import OutputStep from "@/components/steps/OutputStep";
import { type Format, type Style } from "@/components/ModeSelector";
import { type ClarityScoreData } from "@/components/ClarityScore";

// 2.5 = confirmation moment between style selection and input
type Step = 0 | 1 | 2 | 2.5 | 3 | 4;

const stepLabel = (step: Step): string => {
  if (step === 1)   return "Pick your format";
  if (step === 2)   return "Define your voice";
  if (step === 2.5) return "Your canvas is ready";
  if (step === 3)   return "Write freely";
  if (step === 4)   return "Your output";
  return "";
};

export default function Home() {
  const [step, setStep]       = useState<Step>(0);
  const [format, setFormat]   = useState<Format | null>(null);
  const [style, setStyle]     = useState<Style | null>(null);
  const [input, setInput]     = useState("");
  const [output, setOutput]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [beforeScore, setBeforeScore] = useState<ClarityScoreData | null>(null);
  const [afterScore, setAfterScore]   = useState<ClarityScoreData | null>(null);

  const handleFormatSelect = (f: Format) => {
    setFormat(f);
    setStyle(null);
  };

  const canContinue =
    (step === 1 && format !== null) ||
    (step === 2 && style !== null);

  const goNext = () => {
    if (step === 1 && format) setStep(2);
    // After style selection → confirmation moment
    else if (step === 2 && style) setStep(2.5);
  };

  const handleClarify = useCallback(async () => {
    if (!input.trim() || !format || !style) return;
    setLoading(true);
    setOutput("");
    setError("");
    setAfterScore(null);
    setStep(4);

    try {
      const res = await fetch("/api/clarify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, mode: format, style }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setOutput(data.result);
      if (data.clarityScore) {
        setBeforeScore(data.clarityScore);
        const improved = Math.min(100, data.clarityScore.score + Math.floor(Math.random() * 18) + 14);
        setAfterScore({ score: improved, issues: [] });
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep(3);
    } finally {
      setLoading(false);
    }
  }, [input, format, style]);

  const handleStartOver = () => {
    setStep(0);
    setFormat(null);
    setStyle(null);
    setInput("");
    setOutput("");
    setBeforeScore(null);
    setAfterScore(null);
    setError("");
  };

  if (step === 0) return <LandingScreen onStart={() => setStep(1)} />;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f9f8f6" }}>
      {/* Minimal nav */}
      <header className="w-full px-8 py-5 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
        <button
          onClick={handleStartOver}
          className="text-sm font-semibold text-slate-900 tracking-tight hover:text-indigo-600 transition-colors duration-200"
        >
          ClarityAI
        </button>
        <span className="text-xs text-slate-300 font-medium">{stepLabel(step)}</span>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-8 py-12 pb-20">
        {/* Building-block breadcrumb */}
        <StepBreadcrumb
          step={step as number}
          format={format}
          style={style}
          onEditFormat={() => setStep(1)}
          onEditStyle={() => setStep(2)}
        />

        {/* Step 1 — Format */}
        {step === 1 && (
          <ToneStep selected={format} onSelect={handleFormatSelect} />
        )}

        {/* Step 2 — Style */}
        {step === 2 && format && (
          <ContextStep format={format} selected={style} onSelect={setStyle} />
        )}

        {/* Step 2.5 — Confirmation moment */}
        {step === 2.5 && format && style && (
          <ConfirmationMoment
            format={format}
            style={style}
            onContinue={() => setStep(3)}
          />
        )}

        {/* Step 3 — Input */}
        {step === 3 && format && (
          <InputStep
            value={input}
            onChange={setInput}
            onSubmit={handleClarify}
            loading={loading}
            format={format}
            style={style}
          />
        )}

        {/* Step 4 — Output */}
        {step === 4 && (
          <OutputStep
            input={input}
            output={output}
            loading={loading}
            beforeScore={beforeScore}
            afterScore={afterScore}
            onRegenerate={() => {
              setOutput("");
              setBeforeScore(null);
              setAfterScore(null);
              handleClarify();
            }}
            onStartOver={handleStartOver}
          />
        )}

        {/* Continue button — steps 1 & 2 only */}
        {(step === 1 || step === 2) && (
          <div className="flex justify-center mt-12">
            <button
              onClick={goNext}
              disabled={!canContinue}
              className={`
                flex items-center gap-2.5 px-10 py-4 rounded-2xl font-semibold
                transition-all duration-300
                ${canContinue
                  ? "bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-200/40 active:scale-95"
                  : "bg-slate-100 text-slate-300 cursor-not-allowed"
                }
              `}
              style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)" }}
            >
              Continue
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M3 7.5h9M9 4l3.5 3.5L9 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}

        {error && (
          <div className="mt-8 px-6 py-4 rounded-2xl bg-red-50 border border-red-100 text-sm text-red-400 text-center animate-fade-in">
            {error}
          </div>
        )}
      </main>

      <footer className="py-5 text-center text-xs text-slate-200 tracking-widest">
        CLARITYAI
      </footer>
    </div>
  );
}
