// Header with app name and tagline
export default function Header() {
  return (
    <header className="w-full py-6 px-6 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-1">
        {/* Logo mark */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M8 3l5 5-5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-xl font-700 tracking-tight text-slate-900 font-semibold">
          ClarityAI
        </span>
      </div>
      <p className="text-sm text-slate-400 font-medium tracking-wide">
        Think better. Express clearly.
      </p>
    </header>
  );
}
