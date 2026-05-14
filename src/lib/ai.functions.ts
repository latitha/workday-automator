import { createServerFn } from "@tanstack/react-start";

type ToolType = "email" | "summary" | "planner" | "research" | "chat";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

type AiInput = {
  tool: ToolType;
  prompt: string;
  messages?: ChatMessage[];
};

const SYSTEM_PROMPTS: Record<ToolType, string> = {
  email:
    "You are a professional email writing assistant. Generate clear, concise, polite, well-structured business emails. Always include a subject line on the first line prefixed with 'Subject: '. Adapt tone (formal, friendly, persuasive) based on the user's request. Output only the email — no preamble.",
  summary:
    "You are a meeting notes summarizer. From raw notes or transcripts, produce a structured markdown summary with sections: ## Overview, ## Key Decisions, ## Action Items (as a checklist with owner and due date when known), ## Risks / Open Questions. Be faithful to the input — never invent attendees or decisions.",
  planner:
    "You are an expert task planner. Break the user's goal into a prioritized, actionable plan. Output markdown with: ## Goal, ## Plan (numbered steps with effort estimate in hours), ## Suggested Schedule (Today / This Week / Later), ## Done Criteria. Be specific and realistic.",
  research:
    "You are an AI research assistant. Provide a balanced, well-structured briefing in markdown with: ## Summary, ## Key Points (bullets), ## Considerations & Tradeoffs, ## Suggested Next Steps. Acknowledge uncertainty where it exists. Do not fabricate citations.",
  chat:
    "You are a helpful, professional workplace productivity assistant. Be concise, friendly, and practical. Use markdown when it improves clarity.",
};

export const runAi = createServerFn({ method: "POST" })
  .inputValidator((input: AiInput) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const system = SYSTEM_PROMPTS[data.tool];
    const messages: ChatMessage[] =
      data.tool === "chat" && data.messages?.length
        ? [{ role: "system", content: system }, ...data.messages]
        : [
            { role: "system", content: system },
            { role: "user", content: data.prompt },
          ];

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
      }),
    });

    if (!res.ok) {
      if (res.status === 429) throw new Error("Rate limit reached. Please wait and try again.");
      if (res.status === 402) throw new Error("AI credits exhausted. Add credits in Settings → Workspace → Usage.");
      const text = await res.text();
      console.error("AI gateway error", res.status, text);
      throw new Error("AI request failed.");
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });
