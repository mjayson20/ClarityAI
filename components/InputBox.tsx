"use client";

interface InputBoxProps {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export default function InputBox({ value, onChange, disabled }: InputBoxProps) {
  return (
    <div className="relative h-full group">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Dump your thoughts here..."
        className={`
          w-full h-full min-h-[320px] resize-none rounded-3xl
          bg-white/80 backdrop-blur-sm
          border border-slate-100
          px-6 py-5 text-slate-700 text-base leading-relaxed
          placeholder:text-slate-300
          focus:outline-none focus:ring-2 focus:ring-indigo-200/60 focus:border-indigo-200
          transition-all duration-300
          shadow-sm group-hover:shadow-md
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      />
      <span className="absolute bottom-4 right-5 text-xs text-slate-200 select-none tabular-nums">
        {value.length}
      </span>
    </div>
  );
}
