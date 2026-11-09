"use client";

import Icon from "@/components/ui/Icon";
import { icons } from "@/lib/site";

const DURATION = 600;

function scrollToTop() {
  const start = window.scrollY;
  if (start === 0) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }

  const startTime = performance.now();
  let frame = 0;
  const step = (now: number) => {
    const progress = Math.min((now - startTime) / DURATION, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    window.scrollTo({ top: start * (1 - eased), behavior: "instant" });
    if (progress < 1) frame = requestAnimationFrame(step);
  };
  frame = requestAnimationFrame(step);

  // Throttled tabs can starve requestAnimationFrame, so always land on the top.
  window.setTimeout(() => {
    cancelAnimationFrame(frame);
    if (window.scrollY !== 0) window.scrollTo({ top: 0, behavior: "instant" });
  }, DURATION + 100);
}

export default function BackToTop({ className }: { className?: string }) {
  return (
    <button type="button" onClick={scrollToTop} className={className}>
      Back to top
      <Icon d={icons.arrowUp} size={14} strokeWidth={2.4} />
    </button>
  );
}
