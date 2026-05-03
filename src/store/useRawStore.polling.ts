import type { Poll } from "./useRawStore.types";
import { POLL_QUESTION_SEEDS } from "@/features/polls/pollQuestions";

export const INITIAL_POLLS: Poll[] = POLL_QUESTION_SEEDS.map((poll, index) => ({
  id: poll.id,
  question: poll.question,
  options: [
    { id: `p${index + 1}-yes`, text: "Yes", votes: poll.yesVotes },
    { id: `p${index + 1}-no`, text: "No", votes: poll.noVotes },
  ],
  locked: false,
}));
