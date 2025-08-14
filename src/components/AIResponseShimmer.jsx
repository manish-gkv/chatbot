import React from "react";

/**
 * AIResponseShimmer
 * A lightweight shimmer/skeleton bubble for an AI response while it's loading.
 *
 * Usage:
 *   <AIResponseShimmer lines={4} align="left" />
 *
 * Props:
 * - lines?: number        // number of skeleton text lines
 * - align?: 'left'|'right'// which side the bubble sits on
 * - className?: string    // extra classes for the outer wrapper
 */
export default function AIResponseShimmer({
  lines = 4,
  align = "left",
  className = "",
}) {
  const widths = ["w-[92%]", "w-[86%]", "w-[74%]", "w-[65%]", "w-[40%]"];

  return (
    <div className={`w-full flex ${align === "left" ? "justify-start" : "justify-end"} ${className}`}>
      <div className={`flex items-start gap-3 w-[70%] ${align === "left" ? "flex-row" : "flex-row-reverse"}`}>
        <div className="relative rounded-2xl bg-gray-100 dark:bg-gray-900/60 border border-black/5 dark:border-white/10 p-4 shadow-sm overflow-hidden w-full">
          {/* shimmer sweep */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.55),transparent)] [animation:shimmer_1.6s_infinite]" />

          {/* bot is thinking */}
          <div className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">
            Bot is thinking...
          </div>

          {/* typing dots */}
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-black/20 dark:bg-white/20 animate-pulse" />
            <div className="h-2 w-2 rounded-full bg-black/20 dark:bg-white/20 animate-pulse [animation-delay:.15s]" />
            <div className="h-2 w-2 rounded-full bg-black/20 dark:bg-white/20 animate-pulse [animation-delay:.3s]" />
          </div>

          {/* skeleton lines */}
          <div className="flex flex-col gap-2">
            {Array.from({ length: lines }).map((_, i) => (
              <div
                key={i}
                className={`h-3 rounded bg-black/10 dark:bg-white/10 ${widths[i]}`}
              />
            ))}
          </div>

          {/* bottom spacer */}
          <div className="mt-3 h-3 w-1/3 rounded bg-black/5 dark:bg-white/5" />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {  
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
