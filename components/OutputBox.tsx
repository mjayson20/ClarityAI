"use client";

import { useState } from "react";

interface OutputBoxProps {
  output: string;
  loading: boolean;
  onRegenerate: () => void;
}

// Light markdown → HTML converter
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

export default function OutputBox({ output, loading, onRegenerate }: OutputBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative h-full flex flex-col">
      {/* Card */}
      <div
        className={`
          flex-1 min-h-[320px] rounded-3xl px-6 py-5
          transition-all duration-300
          ${loading
            ? "bg-white/70 border border-indigo-100 shadow-sm"
            : output
              ? "bg-white border border-slate-100 shadow-lg shadow-slate-100/80"
              : "bg-white/50 border border-slate-100 shadow-sm"
          }
        `}
      >
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-indigo-300 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <p className="text-sm text-slate-400 font-medium">Refining your thoughts...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !output && (
          <div className="flex flex-col items-center justify-center h-full py-16 gap-2 opacity-40">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="#c7d2fe" strokeWidth="1.5"/>
              <path d="M14 8v12M8 14h12" stroke="#c7d2fe" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p className="text-sm text-slate-300 font-medium">Refined output appears here</p>
          </div>
        )}

        {/* Output */}
        {!loading && output && (
          <div
            className="output-content text-slate-700 text-base leading-relaxed animate-fade-in"
            dangerouslySetInnerHTML={{ __html: formatOutput(output) }}
          />
        )}
      </div>

      {/* Actions */}
      {!loading && output && (
        <div className="flex gap-2 mt-3 animate-fade-in">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium
              transition-all duration-200 border
              ${copied
                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"
              }`}
          >
            {copied ? (
              <><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 6.5l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>Copied</>
            ) : (
              <><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M1.5 9.5V1.5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>Copy</>
            )}
          </button>

          <button
            onClick={onRegenerate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium
              bg-white text-slate-500 border border-slate-200
              hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50
              transition-all duration-200"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 6.5a5.5 5.5 0 1 0 1.4-3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M1 2.5v4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Regenerate
          </button>
        </div>
      )}
    </div>
  );
}
