"use client";

import { useEffect, useMemo, useState } from "react";

export default function ImageCarousel({
  images,
  alt,
  className,
  intervalMs = 2500,
}: {
  images: string[];
  alt: string;
  className?: string;
  intervalMs?: number;
}) {
  const imgs = useMemo(
    () => (images || []).filter(Boolean).filter((v, i, a) => a.indexOf(v) === i),
    [images]
  );

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (imgs.length <= 1) return;
    const t = setInterval(() => {
      setIdx((v) => (v + 1) % imgs.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [imgs.length, intervalMs, paused]);

  if (!imgs.length) {
    return (
      <div className="flex h-full w-full items-center justify-center text-sm text-[#0B1220]/50">
        No image uploaded
      </div>
    );
  }

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imgs[idx]} alt={alt} className={className || "h-full w-full object-cover"} />

      {imgs.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 rounded-full bg-black/35 px-2 py-1">
          {imgs.slice(0, 8).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIdx(i);
              }}
              className={
                "h-1.5 w-1.5 rounded-full " + (i === idx ? "bg-white" : "bg-white/50")
              }
              aria-label={"Go to image " + (i + 1)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
