"use client";

import { useEffect, useRef } from "react";

export function RichTextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (html: string) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.innerHTML !== (value || "")) {
      ref.current.innerHTML = value || "";
    }
  }, [value]);

  function cmd(command: string) {
    document.execCommand(command);
    onChange(ref.current?.innerHTML || "");
  }

  return (
    <div className="md:col-span-2">
      <div className="text-xs font-semibold text-[#0B1220]/60">{label}</div>

      <div className="mt-2 flex flex-wrap gap-2">
        <button type="button" className="rounded-xl border px-3 py-1 text-sm" onClick={() => cmd("bold")}>Bold</button>
        <button type="button" className="rounded-xl border px-3 py-1 text-sm" onClick={() => cmd("italic")}>Italic</button>
        <button type="button" className="rounded-xl border px-3 py-1 text-sm" onClick={() => cmd("insertUnorderedList")}>• List</button>
        <button type="button" className="rounded-xl border px-3 py-1 text-sm" onClick={() => cmd("insertOrderedList")}>1. List</button>
      </div>

      <div
        ref={ref}
        contentEditable
        className="mt-3 min-h-[140px] w-full rounded-2xl border border-[#E6EEFF] bg-white px-4 py-3 outline-none"
        onInput={() => onChange(ref.current?.innerHTML || "")}
      />
    </div>
  );
}

