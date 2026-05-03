export interface PollQuestionSeed {
  id: string;
  question: string;
  yesVotes: number;
  noVotes: number;
}

// Placeholder seed list for local/dev fallback.
// Replace or append entries here whenever you upload your own poll questions.
export const POLL_QUESTION_SEEDS: PollQuestionSeed[] = [
  {
    id: "poll-1",
    question: "Do you feel more yourself when no one is judging?",
    yesVotes: 514,
    noVotes: 121,
  },
  {
    id: "poll-2",
    question: "Would you join a community built around shared values?",
    yesVotes: 468,
    noVotes: 153,
  },
  {
    id: "poll-3",
    question: "Should instructors grow with their communities?",
    yesVotes: 437,
    noVotes: 166,
  },
];
