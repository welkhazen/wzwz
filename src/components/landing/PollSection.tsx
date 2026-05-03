import { useCallback, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Poll, PollOption } from "@/store/useRawStore";
import { track } from "@/lib/analytics";
import { useTrackSectionView } from "@/lib/analytics/useTrackSectionView";
import { LandingSectionShell } from "@/components/landing/LandingSectionShell";
import { PremiumPollCard } from "@/components/polls/PremiumPollCard";
import { cn } from "@/lib/utils";

interface PollSectionProps {
  polls: Poll[];
  votedPolls: Set<string>;
  isLoggedIn: boolean;
  freeVotesUsed: number;
  onVote: (pollId: string, optionId: string) => void;
  onSignupClick: () => void;
}

function resolveYesNoOptions(poll: Poll): [PollOption, PollOption] {
  const yesOption = poll.options.find((option) => option.text.trim().toLowerCase() === "yes") ?? poll.options[0];
  const noOption =
    poll.options.find((option) => option.text.trim().toLowerCase() === "no") ??
    poll.options.find((option) => option.id !== yesOption.id) ??
    yesOption;

  return [yesOption, noOption];
}

function PollNavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "absolute top-1/2 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border bg-[#111]/90 text-raw-gold shadow-[0_0_24px_rgba(241,196,45,0.18)] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raw-gold/80 disabled:cursor-not-allowed disabled:opacity-30",
        direction === "previous" ? "-left-2 sm:-left-8" : "-right-2 sm:-right-8",
        !disabled && "hover:border-raw-gold/70 hover:bg-[#1a1609]"
      )}
      aria-label={direction === "previous" ? "Previous poll" : "Next poll"}
    >
      <Icon className="size-5" />
    </button>
  );
}

export function PollSection({
  polls,
  votedPolls,
  isLoggedIn,
  freeVotesUsed,
  onVote,
  onSignupClick,
}: PollSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localVotedIds, setLocalVotedIds] = useState<Record<string, string>>({});
  const [advancing, setAdvancing] = useState(false);
  const sectionRef = useTrackSectionView("polls");
  const gateFiredRef = useRef(false);

<<<<<<< Updated upstream
=======
  useEffect(() => {
    const check = () => setIsLight(document.documentElement.classList.contains("theme-light"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const currentPoll = polls[currentIndex] ?? null;
  const currentHasVoted = currentPoll ? votedPolls.has(currentPoll.id) : false;
  const showSignupGate = !isLoggedIn && freeVotesUsed >= 3;

>>>>>>> Stashed changes
  const advance = useCallback(
    (nextIndex: number) => {
      setCurrentIndex(Math.max(0, Math.min(polls.length - 1, nextIndex)));
    },
    [polls.length]
  );

  const handleVote = useCallback(
<<<<<<< Updated upstream
    (poll: Poll, optionId: string) => {
      if (advancing) return;
=======
    (answer: "yes" | "no") => {
      if (!currentPoll) return;

      const yesOption = currentPoll.options.find((o) => o.text === "Yes");
      const noOption = currentPoll.options.find((o) => o.text === "No");
      const optionId = answer === "yes" ? yesOption?.id : noOption?.id;
      if (!optionId) return;

      setLocalVotedIds((prev) => ({ ...prev, [currentPoll.id]: optionId }));
>>>>>>> Stashed changes

      const answer = poll.options.find((option) => option.id === optionId)?.text.toLowerCase() ?? "unknown";
      const nextVotesUsed = !isLoggedIn ? freeVotesUsed + 1 : freeVotesUsed;
      const gateReached = !isLoggedIn && nextVotesUsed >= 3;

      setAdvancing(true);
      setLocalVotedIds((previous) => ({ ...previous, [poll.id]: optionId }));
      track("landing_poll_sampled", {
        poll_id: poll.id,
        option_id: optionId,
        answer,
        votes_used: nextVotesUsed,
        gate_reached: gateReached,
      });

      if (gateReached && !gateFiredRef.current) {
        gateFiredRef.current = true;
        track("signup_gate_triggered", { trigger: "poll_gate", votes_used: nextVotesUsed });
      }

      onVote(poll.id, optionId);

      window.setTimeout(() => {
        if (gateReached || currentIndex >= polls.length - 1) {
          onSignupClick();
        } else {
          setCurrentIndex((index) => Math.min(polls.length - 1, index + 1));
        }
        setAdvancing(false);
      }, 420);
    },
    [advancing, currentIndex, freeVotesUsed, isLoggedIn, onSignupClick, onVote, polls.length]
  );

  if (polls.length === 0) return null;

  const currentPoll = polls[currentIndex];
  const [yesOption, noOption] = resolveYesNoOptions(currentPoll);
  const hasAnsweredCurrent = Boolean(localVotedIds[currentPoll.id] || votedPolls.has(currentPoll.id));
  const selectedOptionId = localVotedIds[currentPoll.id] ?? (votedPolls.has(currentPoll.id) ? yesOption.id : null);
  const showSignupGate = !isLoggedIn && freeVotesUsed >= 3;

  if (!currentPoll) return null;

  return (
    <LandingSectionShell
      id="polls"
      sectionRef={sectionRef as React.Ref<HTMLElement>}
      title="Start with a question."
      description={
        <>
          Answer anonymously and see live results instantly.
          {!isLoggedIn && " 3 free, then sign up to keep going."}
        </>
      }
      innerClassName="overflow-hidden rounded-none border-raw-gold/20 bg-black/20 p-0"
    >
      <div className="relative flex min-h-[36rem] flex-col items-center overflow-hidden px-3 py-8 sm:px-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(241,196,45,0.48) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_0%,rgba(241,196,45,0.16),transparent_70%)]" />

        <div className="relative mb-7 flex w-full max-w-[20rem] flex-col items-center gap-3">
          <div className="flex w-full items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-raw-gold/60 to-raw-gold/20" />
            <span className="font-display text-xs tracking-[0.32em] text-raw-gold">
              {showSignupGate ? polls.length : currentIndex + 1} / {polls.length}
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-raw-gold/60 to-raw-gold/20" />
          </div>
          <div className="flex items-center justify-center gap-2">
            {polls.map((poll, index) => (
              <button
                key={poll.id}
                type="button"
                onClick={() => advance(index)}
                className={cn(
                  "h-1.5 rounded-none transition-all duration-200",
                  index === currentIndex ? "w-8 bg-raw-gold shadow-[0_0_10px_rgba(241,196,45,0.55)]" : "w-3 bg-raw-silver/20",
                  index < currentIndex && "bg-raw-gold/45"
                )}
                aria-label={`Go to poll ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="relative w-full max-w-[24rem]">
          <PollNavButton
            direction="previous"
            disabled={currentIndex === 0}
            onClick={() => advance(currentIndex - 1)}
          />

          {showSignupGate ? (
            <div className="mx-auto max-w-[20rem] border border-raw-gold/35 bg-[#080808] p-6 text-center shadow-[0_28px_70px_rgba(0,0,0,0.68),0_0_36px_rgba(241,196,45,0.14)]">
              <p className="font-display text-lg text-raw-text">All polls answered.</p>
              <p className="mt-3 text-sm text-raw-silver/55">Sign up to keep answering and earn rewards.</p>
              <button
                type="button"
                onClick={onSignupClick}
                className="mt-6 w-full border border-raw-gold bg-raw-gold px-4 py-3 font-display text-xs uppercase tracking-[0.16em] text-black transition hover:bg-[#ffd84a]"
              >
                Sign Up & Earn Rewards
              </button>
            </div>
          ) : (
            <motion.div
              key={currentPoll.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.26, ease: "easeOut" }}
            >
              <PremiumPollCard
                question={currentPoll.question}
                primaryOption={{ id: yesOption.id, label: yesOption.text, votes: yesOption.votes }}
                secondaryOption={{ id: noOption.id, label: noOption.text, votes: noOption.votes }}
                selectedOptionId={selectedOptionId}
                showHint
                disabled={advancing}
                onVote={(optionId) => handleVote(currentPoll, optionId)}
              />
            </motion.div>
          )}

          <PollNavButton
            direction="next"
            disabled={currentIndex >= polls.length - 1 || !hasAnsweredCurrent}
            onClick={() => advance(currentIndex + 1)}
          />
        </div>
      </div>
    </LandingSectionShell>
  );
}
