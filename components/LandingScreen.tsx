"use client";

interface LandingScreenProps {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 bg-white">
      {/* Wordmark */}
      <p
        className="text-xs font-semibold tracking-[0.25em] text-slate-300 uppercase mb-12 animate-fade-in"
        style={{ animationDelay: "0ms" }}
      >
        ClarityAI
      </p>

      {/* Hero headline */}
      <h1
        className="text-center font-extrabold text-slate-900 leading-[1.08] tracking-tight animate-slide-up"
        style={{
          fontSize: "clamp(2.8rem, 8vw, 7rem)",
          animationDelay: "80ms",
        }}
      >
        Say hello to
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500">
          ClarityAI
        </span>
      </h1>

      {/* Subheading */}
      <p
        className="mt-7 text-center text-slate-400 font-light animate-slide-up"
        style={{
          fontSize: "clamp(1rem, 2.2vw, 1.35rem)",
          maxWidth: "520px",
          lineHeight: 1.65,
          animationDelay: "200ms",
        }}
      >
        Where your thoughts are made structured and precise.
      </p>

      {/* CTA */}
      <button
        onClick={onStart}
        className="mt-14 flex items-center gap-3 px-10 py-4 rounded-2xl
          bg-slate-900 text-white font-semibold
          hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-200/50
          active:scale-95 transition-all duration-300 animate-slide-up"
        style={{
          fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
          animationDelay: "340ms",
        }}
      >
        Get Started
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Subtle bottom hint */}
      <p
        className="absolute bottom-8 text-xs text-slate-200 animate-fade-in-slow"
        style={{ animationDelay: "700ms" }}
      >
        Think better. Express clearly.
      </p>
    </div>
  );
}
