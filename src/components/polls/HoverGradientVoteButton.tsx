import { useEffect, useState } from "react";
import { useAnimatedPercent } from "@/components/polls/useAnimatedPercent";
import { cn } from "@/lib/utils";

interface HoverGradientVoteButtonProps {
  label: string;
  percent?: number;
  selected?: boolean;
  answered?: boolean;
  disabled?: boolean;
  align?: "left" | "right";
  themeHue?: "primary" | "neutral";
  onClick: () => void;
  showFill?: boolean;
  isLightMode?: boolean;
}

const RESULT_ANIMATION_DURATION_MS = 800;

export function HoverGradientVoteButton({
  label,
  percent,
  selected = false,
  answered = false,
  disabled = false,
  align = "right",
  themeHue = "primary",
  onClick,
  showFill = true,
  isLightMode = false,
}: HoverGradientVoteButtonProps) {
  const [waterFilled, setWaterFilled] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(media.matches);

    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);

    return () => {
      media.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  const displayedPercent = useAnimatedPercent(percent ?? 0, {
    durationMs: RESULT_ANIMATION_DURATION_MS,
    enabled: answered,
    reduceMotion: prefersReducedMotion,
  });

  useEffect(() => {
    if (!answered) {
      setWaterFilled(false);
      return;
    }

    setWaterFilled(false);
    const fillTimer = setTimeout(() => setWaterFilled(true), 60);

    return () => {
      clearTimeout(fillTimer);
    };
  }, [answered]);

  const isPrimary = themeHue === "primary";
  const useLightPillStyle = isLightMode && !answered;
  const dimmed = answered && !selected;
  const borderGradient = useLightPillStyle
    ? isPrimary
      ? "linear-gradient(140deg, #f7d64b, #f2c61f 45%, #d9aa00)"
      : "linear-gradient(140deg, #f5f5f5, #dfdfdf 45%, #c7c7c7)"
    : dimmed
      ? "linear-gradient(120deg, rgba(60,60,60,0.4), rgba(80,80,80,0.5), rgba(60,60,60,0.4))"
      : isPrimary
        ? "linear-gradient(120deg, hsl(var(--primary) / 0.35), hsl(var(--primary) / 1), hsl(var(--ring) / 0.5))"
        : "linear-gradient(120deg, rgba(230,230,230,0.28), rgba(240,240,240,0.9), rgba(170,170,170,0.36))";

  const fillGradient = isPrimary
    ? align === "right"
      ? "linear-gradient(to left, hsl(var(--primary) / 0.95), hsl(var(--primary) / 0.55))"
      : "linear-gradient(to right, hsl(var(--primary) / 0.95), hsl(var(--primary) / 0.55))"
    : align === "right"
      ? "linear-gradient(to left, rgba(230,230,230,0.9), rgba(140,140,140,0.7))"
      : "linear-gradient(to right, rgba(230,230,230,0.9), rgba(140,140,140,0.7))";

  return (
    <button
      type="button"
      disabled={disabled || answered}
      onClick={onClick}
      className={cn(
        "group relative min-h-[4rem] overflow-hidden rounded-2xl p-[1.5px] text-center transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 disabled:cursor-not-allowed sm:min-h-[4.8rem]",
        useLightPillStyle && "rounded-[1.05rem]",
        selected ? "scale-[1.06]" : "hover:scale-[1.03]"
      )}
      style={{
        background: borderGradient,
        boxShadow: useLightPillStyle
          ? isPrimary
            ? "0 10px 18px rgba(217,170,0,0.25), 0 2px 0 rgba(255,255,255,0.35) inset"
            : "0 10px 18px rgba(0,0,0,0.08), 0 2px 0 rgba(255,255,255,0.6) inset"
          : selected
            ? "0 0 24px hsl(var(--primary) / 0.55), 0 0 48px hsl(var(--primary) / 0.28)"
            : dimmed ? "none" : "0 0 12px hsl(var(--primary) / 0.12)",
      }}
    >
      <span className={cn("absolute inset-x-5 top-2 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent", useLightPillStyle && "via-white/80")} />
      <span
        className={cn(
          "relative block h-full w-full rounded-[calc(1rem-1.5px)] px-2 py-2.5 sm:px-3 sm:py-3",
          useLightPillStyle ? (isPrimary ? "bg-[#f2c61f]" : "bg-[#e6e6e6]") : "bg-black/85"
        )}
      >
        {answered && showFill && (
          <span
            className={cn(
              "pointer-events-none absolute inset-y-0",
              align === "right" ? "right-0" : "left-0"
            )}
            style={{
              width: waterFilled ? `${percent ?? 0}%` : "0%",
              background: fillGradient,
              transition: waterFilled ? `width ${RESULT_ANIMATION_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none",
            }}
          />
        )}
        <span
          className={cn("relative z-10 flex h-full flex-col items-center justify-center gap-1 font-display text-base tracking-wide sm:text-lg", useLightPillStyle ? "text-[#1b1b1b]" : "text-white")}
          style={{
            opacity: answered && !selected ? 0.7 : 1,
          }}
        >
          {answered ? <span className="text-xl font-semibold leading-none">{displayedPercent}%</span> : null}
          <span>{label}</span>
        </span>
      </span>
    </button>
  );
}
