// ─── CONFUSION KEYWORD LIST ──────────────────────────────
// Built from DementiaBank Pitt Corpus research
const confusionKeywords = [
  "i don't know",
  "who are you",
  "where am i",
  "i'm scared",
  "i am scared",
  "i'm lost",
  "i am lost",
  "i'm confused",
  "i am confused",
  "i don't understand",
  "i do not understand",
  "what is happening",
  "what's happening",
  "help me",
  "i need help",
  "i'm afraid",
  "i am afraid",
  "i forgot",
  "i can't remember",
  "i cannot remember",
  "where is everyone",
  "i want to go home",
  "i don't recognize",
  "who is that",
  "i'm frightened",
  "i am frightened",
];

// ─── NEGATIVE EMOTION WORDS ──────────────────────────────
const negativeEmotionWords = [
  "scared",
  "lost",
  "confused",
  "help",
  "afraid",
  "frightened",
  "worried",
  "anxious",
  "upset",
  "angry",
  "sad",
  "lonely",
  "tired",
  "pain",
  "hurt",
];

// ─── DISTRESS DETECTOR FUNCTION ──────────────────────────
const detectDistress = (currentMessage, previousMessages = []) => {
  const message = currentMessage.toLowerCase();
  const words = message.split(" ");
  let score = 0;
  let triggerType = null;

  // Signal 1 — very short response (less than 3 words)
  if (words.length < 3) {
    score += 2;
    triggerType = "short_response";
  }

  // Signal 2 — confusion keywords
  const hasConfusionKeyword = confusionKeywords.some((keyword) =>
    message.includes(keyword)
  );
  if (hasConfusionKeyword) {
    score += 4;
    triggerType = "confusion_keyword";
  }

  // Signal 3 — negative emotion words
  const hasNegativeEmotion = negativeEmotionWords.some((word) =>
    words.includes(word)
  );
  if (hasNegativeEmotion) {
    score += 2;
    triggerType = triggerType || "negative_emotion";
  }

  // Signal 4 — repeated question (same message sent twice)
  if (previousMessages.length > 0) {
    const lastMessage = previousMessages[previousMessages.length - 1];
    if (
      lastMessage &&
      lastMessage.role === "patient" &&
      lastMessage.content.toLowerCase() === message
    ) {
      score += 3;
      triggerType = "repeated_question";
    }
  }

  return {
    score: Math.min(score, 10), // cap at 10
    triggerType,
    isDistressed: score >= 5,
  };
};

export default detectDistress;