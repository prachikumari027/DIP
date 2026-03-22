import Groq from "groq-sdk";
import Patient from "../models/Patient.js";
import ConversationLog from "../models/ConversationLog.js";
import DistressEvent from "../models/DistressEvent.js";
import detectDistress from "./distressDetector.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ─── BUILD SYSTEM PROMPT ─────────────────────────────────
const buildSystemPrompt = (patient, isDistressed = false) => {
  const familyList = patient.familyMembers
    .map((m) => `${m.name} (${m.relation})`)
    .join(", ");

  const storedFacts = patient.storedFacts
    .slice(-10)
    .map((f) => f.fact)
    .join("\n- ");

  const stageRules = {
    mild: `Use sentences under 15 words. Ask one question at a time. Be warm and friendly.`,
    moderate: `Use sentences under 8 words only. Only ask yes or no questions. Repeat information calmly if needed. Never use complex words.`,
    severe: `Give one simple instruction only. Be very warm and reassuring. Never ask questions. Use the simplest possible words.`,
  };

  const distressInstructions = isDistressed
    ? `The patient seems confused or distressed right now. Be extra gentle and reassuring. Say things like "You are safe" and "I am here with you". Do not ask any questions. Just reassure them calmly.`
    : "";

  return `
You are a compassionate, patient assistant for an Alzheimer's patient named ${patient.name}, age ${patient.age}.
Their family members are: ${familyList || "not provided"}.
They are at cognitive stage: ${patient.cognitiveStage}.

Language rules for this patient:
${stageRules[patient.cognitiveStage] || stageRules.mild}

${distressInstructions}

Things you remember about this patient from previous conversations:
${storedFacts ? `- ${storedFacts}` : "Nothing stored yet."}

Important rules:
- Always use very short sentences.
- Never ask more than one question at a time.
- If they seem confused, gently redirect.
- Repeat information calmly if asked.
- Never express frustration.
- Always be warm, calm, and reassuring.
- Address the patient by their first name occasionally.
- Never mention that you are an AI unless directly asked.
  `.trim();
};

// ─── EXTRACT FACTS FROM CONVERSATION ────────────────────
const extractFacts = async (messages) => {
  try {
    const conversation = messages
      .map((m) => `${m.role === "patient" ? "Patient" : "AI"}: ${m.content}`)
      .join("\n");

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `Extract any important personal facts mentioned by the patient in this conversation. 
Return ONLY a JSON array of strings. Example: ["Patient likes tea", "Patient mentioned daughter visited"].
If no important facts, return an empty array [].
Conversation:
${conversation}`,
        },
      ],
    });

    const text = response.choices[0].message.content.trim();
    const clean = text.replace(/```json|```/g, "").trim();
    const facts = JSON.parse(clean);
    return facts;
  } catch (error) {
    console.error("Extract facts error:", error.message);
    return [];
  }
};

// ─── MAIN CHAT FUNCTION ──────────────────────────────────
const chat = async ({ patientId, message, sessionMessages = [], io }) => {
  try {
    // 1. get patient from DB
    const patient = await Patient.findById(patientId);
    if (!patient) throw new Error("Patient not found");

    // 2. run distress detection
    const distressResult = detectDistress(message, sessionMessages);

    // 3. save distress event if score is high
    if (distressResult.isDistressed) {
      await DistressEvent.create({
        patientId,
        triggerType: distressResult.triggerType,
        messageSnippet: message.slice(0, 100),
        distressScore: distressResult.score,
      });

      // emit alert to caregiver via socket
      if (io) {
        io.to(`caregiver_${patient.caregiverId}`).emit("distress_alert", {
          patientId,
          patientName: patient.name,
          distressScore: distressResult.score,
          triggerType: distressResult.triggerType,
          messageSnippet: message.slice(0, 100),
          timestamp: new Date(),
        });
      }
    }

    // 4. build system prompt
    const systemPrompt = buildSystemPrompt(
      patient,
      distressResult.isDistressed
    );

    // 5. build messages array for Groq
    const groqMessages = [
      { role: "system", content: systemPrompt },
      ...sessionMessages.map((m) => ({
        role: m.role === "patient" ? "user" : "assistant",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    // 6. call Groq
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 150,
      messages: groqMessages,
    });

    const aiReply = response.choices[0].message.content.trim();

    // 7. update session messages
    const updatedMessages = [
      ...sessionMessages,
      { role: "patient", content: message, timestamp: new Date() },
      { role: "ai", content: aiReply, timestamp: new Date() },
    ];

    return {
      reply: aiReply,
      updatedMessages,
      distressResult,
    };
  } catch (error) {
    console.error("AI chat error:", error.message);
    throw error;
  }
};

// ─── END SESSION — SAVE LOG + EXTRACT FACTS ──────────────
const endSession = async ({ patientId, sessionMessages }) => {
  try {
    // 1. calculate overall distress score for session
    const distressScores = sessionMessages
      .filter((m) => m.role === "patient")
      .map((m) => detectDistress(m.content).score);

    const avgDistressScore =
      distressScores.length > 0
        ? distressScores.reduce((a, b) => a + b, 0) / distressScores.length
        : 0;

    // 2. save conversation log
    await ConversationLog.create({
      patientId,
      messages: sessionMessages,
      startTime: sessionMessages[0]?.timestamp || new Date(),
      endTime: new Date(),
      distressScore: Math.round(avgDistressScore),
    });

    // 3. extract and save facts to patient profile
    const facts = await extractFacts(sessionMessages);
    if (facts.length > 0) {
      await Patient.findByIdAndUpdate(patientId, {
        $push: {
          storedFacts: {
            $each: facts.map((fact) => ({ fact })),
          },
        },
      });
    }

    return { message: "✅ Session saved successfully", facts };
  } catch (error) {
    console.error("End session error:", error.message);
    throw error;
  }
};

export { chat, endSession };







// // ---------------------------------------------------------------------------

// //  --------------------------------------------------------------------------

// import OpenAI from "openai";
// import Patient from "../models/Patient.js";
// import ConversationLog from "../models/ConversationLog.js";
// import DistressEvent from "../models/DistressEvent.js";
// import detectDistress from "./distressDetector.js";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // ─── BUILD SYSTEM PROMPT ─────────────────────────────────
// const buildSystemPrompt = (patient, isDistressed = false) => {
//   const familyList = patient.familyMembers
//     .map((m) => `${m.name} (${m.relation})`)
//     .join(", ");

//   const storedFacts = patient.storedFacts
//     .slice(-10)
//     .map((f) => f.fact)
//     .join("\n- ");

//   // stage based language rules
//   const stageRules = {
//     mild: `Use sentences under 15 words. Ask one question at a time. Be warm and friendly.`,
//     moderate: `Use sentences under 8 words only. Only ask yes or no questions. Repeat information calmly if needed. Never use complex words.`,
//     severe: `Give one simple instruction only. Be very warm and reassuring. Never ask questions. Use the simplest possible words.`,
//   };

//   const distressInstructions = isDistressed
//     ? `The patient seems confused or distressed right now. Be extra gentle and reassuring. Say things like "You are safe" and "I am here with you". Do not ask any questions. Just reassure them calmly.`
//     : "";

//   return `
// You are a compassionate, patient assistant for an Alzheimer's patient named ${patient.name}, age ${patient.age}.
// Their family members are: ${familyList || "not provided"}.
// They are at cognitive stage: ${patient.cognitiveStage}.

// Language rules for this patient:
// ${stageRules[patient.cognitiveStage] || stageRules.mild}

// ${distressInstructions}

// Things you remember about this patient from previous conversations:
// ${storedFacts ? `- ${storedFacts}` : "Nothing stored yet."}

// Important rules:
// - Always use very short sentences.
// - Never ask more than one question at a time.
// - If they seem confused, gently redirect.
// - Repeat information calmly if asked.
// - Never express frustration.
// - Always be warm, calm, and reassuring.
// - Address the patient by their first name occasionally.
// - Never mention that you are an AI unless directly asked.
//   `.trim();
// };

// // ─── EXTRACT FACTS FROM CONVERSATION ────────────────────
// const extractFacts = async (messages) => {
//   try {
//     const conversation = messages
//       .map((m) => `${m.role === "patient" ? "Patient" : "AI"}: ${m.content}`)
//       .join("\n");

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o",
//       max_tokens: 300,
//       messages: [
//         {
//           role: "user",
//           content: `Extract any important personal facts mentioned by the patient in this conversation. 
// Return ONLY a JSON array of strings. Example: ["Patient likes tea", "Patient mentioned daughter visited"].
// If no important facts, return an empty array [].
// Conversation:
// ${conversation}`,
//         },
//       ],
//     });

//     const text = response.choices[0].message.content.trim();
//     const clean = text.replace(/```json|```/g, "").trim();
//     const facts = JSON.parse(clean);
//     return facts;
//   } catch (error) {
//     console.error("Extract facts error:", error.message);
//     return [];
//   }
// };

// // ─── MAIN CHAT FUNCTION ──────────────────────────────────
// const chat = async ({ patientId, message, sessionMessages = [], io }) => {
//   try {
//     // 1. get patient from DB
//     const patient = await Patient.findById(patientId);
//     if (!patient) throw new Error("Patient not found");

//     // 2. run distress detection
//     const distressResult = detectDistress(message, sessionMessages);

//     // 3. save distress event if score is high
//     if (distressResult.isDistressed) {
//       const distressEvent = await DistressEvent.create({
//         patientId,
//         triggerType: distressResult.triggerType,
//         messageSnippet: message.slice(0, 100),
//         distressScore: distressResult.score,
//       });

//       // emit alert to caregiver via socket
//       if (io) {
//         io.to(`caregiver_${patient.caregiverId}`).emit("distress_alert", {
//           patientId,
//           patientName: patient.name,
//           distressScore: distressResult.score,
//           triggerType: distressResult.triggerType,
//           messageSnippet: message.slice(0, 100),
//           timestamp: new Date(),
//         });
//       }
//     }

//     // 4. build system prompt
//     const systemPrompt = buildSystemPrompt(patient, distressResult.isDistressed);

//     // 5. build messages array for OpenAI
//     const openAIMessages = [
//       { role: "system", content: systemPrompt },
//       ...sessionMessages.map((m) => ({
//         role: m.role === "patient" ? "user" : "assistant",
//         content: m.content,
//       })),
//       { role: "user", content: message },
//     ];

//     // 6. call OpenAI
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o",
//       max_tokens: 150, // keep responses short for patient
//       messages: openAIMessages,
//     });

//     const aiReply = response.choices[0].message.content.trim();

//     // 7. update session messages
//     const updatedMessages = [
//       ...sessionMessages,
//       { role: "patient", content: message, timestamp: new Date() },
//       { role: "ai", content: aiReply, timestamp: new Date() },
//     ];

//     return {
//       reply: aiReply,
//       updatedMessages,
//       distressResult,
//     };
//   } catch (error) {
//     console.error("AI chat error:", error.message);
//     throw error;
//   }
// };

// // ─── END SESSION — SAVE LOG + EXTRACT FACTS ──────────────
// const endSession = async ({ patientId, sessionMessages }) => {
//   try {
//     // 1. calculate overall distress score for session
//     const distressScores = sessionMessages
//       .filter((m) => m.role === "patient")
//       .map((m) => detectDistress(m.content).score);

//     const avgDistressScore =
//       distressScores.length > 0
//         ? distressScores.reduce((a, b) => a + b, 0) / distressScores.length
//         : 0;

//     // 2. save conversation log
//     await ConversationLog.create({
//       patientId,
//       messages: sessionMessages,
//       startTime: sessionMessages[0]?.timestamp || new Date(),
//       endTime: new Date(),
//       distressScore: Math.round(avgDistressScore),
//     });

//     // 3. extract and save facts to patient profile
//     const facts = await extractFacts(sessionMessages);
//     if (facts.length > 0) {
//       await Patient.findByIdAndUpdate(patientId, {
//         $push: {
//           storedFacts: {
//             $each: facts.map((fact) => ({ fact })),
//           },
//         },
//       });
//     }

//     return { message: "✅ Session saved successfully", facts };
//   } catch (error) {
//     console.error("End session error:", error.message);
//     throw error;
//   }
// };

// export { chat, endSession };