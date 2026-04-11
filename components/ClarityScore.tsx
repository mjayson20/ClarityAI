"use client";

interface ClarityScoreData {
  score: number;
  issues: string[];
}

interface ClarityScoreProps {
  before: ClarityScoreData | null;
  after: ClarityScoreData | null;
  loading: boolean;
}

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

function scoreColor(score: number): string {
  if (score >= 75) return "bg-emerald-400";
  if (score >= 50) return "bg-amber-400";
  return "bg-red-400";
}

function scoreLabel(score: number): string {
  if (score >= 75) return "Clear";
  if (score >= 50) return "Decent";
  if (score >= 30) return "Needs work";
  return "Unclear";
}

export default function ClarityScore({ before, after, loading }: ClarityScoreProps) {
  if (!before && !loading) return null;

  return (
    <div className="mt-5 animate-fade-in">
      <div className="flex items-center gap-3 flex-wrap">
        {/* Before score */}
        {before && (
          <div className="flex-1 min-w-[160px] p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium">Input clarity</span>
              <span className="text-sm font-semibold text-slate-600">{before.score}<span className="text-xs text-slate-300">/100</span></span>
            </div>
            <ScoreBar score={before.score} color={scoreColor(before.score)} />
            <p className="text-xs text-slate-400 mt-1.5">{scoreLabel(before.score)}</p>
            {before.issues.length > 0 && (
              <ul className="mt-2 space-y-0.5">
                {before.issues.map((issue, i) => (
                  <li key={i} className="text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    {issue}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Arrow */}
        {before && after && (
          <div className="text-slate-300 text-lg select-none">→</div>
        )}

        {/* After score */}
        {after && (
          <div className="flex-1 min-w-[160px] p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-indigo-400 font-medium">Output clarity</span>
              <span className="text-sm font-semibold text-indigo-600">{after.score}<span className="text-xs text-indigo-300">/100</span></span>
            </div>
            <ScoreBar score={after.score} color="bg-indigo-400" />
            <p className="text-xs text-indigo-400 mt-1.5">{scoreLabel(after.score)}</p>
          </div>
        )}

        {/* Loading placeholder */}
        {loading && (
          <div className="flex-1 min-w-[160px] p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm animate-pulse">
            <div className="h-3 bg-slate-100 rounded w-2/3 mb-2" />
            <div className="h-1.5 bg-slate-100 rounded w-full" />
          </div>
        )}
      </div>
    </div>
  );
}

export type { ClarityScoreData };
