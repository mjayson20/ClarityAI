import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ─── Prompt builders per format+style ────────────────────────────────────────

function linkedInPrompt(input: string, style: string): string {
  const styleGuides: Record<string, string> = {
    leader: `Write as a confident thought leader. Use a bold opening statement, share a hard-won insight or lesson, and close with a call to reflection or action. Tone: authoritative, direct, inspiring. No fluff.`,
    educator: `Write as a knowledgeable educator. Break the idea into clear, numbered or bulleted takeaways. Use simple language. Add a practical tip the reader can apply today. Tone: helpful, clear, structured.`,
    human: `Write in a raw, honest, human voice. No corporate speak. Short sentences. Real emotion. Share the thought as if texting a close friend but slightly polished. Tone: vulnerable, relatable, authentic.`,
    promotional: `Write a compelling promotional post. Lead with the value or benefit, not the feature. Build curiosity. End with a clear, low-friction call to action. Tone: confident, benefit-focused, persuasive.`,
  };

  return `You are an expert LinkedIn content writer.

Style directive: ${styleGuides[style] ?? styleGuides.leader}

Transform the following raw thoughts into a LinkedIn post that fits this style exactly.

Rules:
- Start with a hook line (no "I" as the first word)
- Use line breaks for readability (short paragraphs)
- Add 3–5 relevant hashtags at the end
- Do NOT use markdown headers
- Keep it under 250 words

Raw input:
${input}

LinkedIn Post:`;
}

function promptBuilderPrompt(input: string, style: string): string {
  const styleGuides: Record<string, string> = {
    generative: `Transform the input into a detailed generative prompt for creating media (image, video, music, or written content). Include style, mood, format, and specific visual/creative details. Be precise and descriptive.`,
    informative: `Transform the input into a clear, well-scoped informational prompt. Specify the depth of explanation needed, the target audience level (beginner/intermediate/expert), and the format of the answer (explanation, list, comparison, etc.).`,
    summarising: `Transform the input into a precise summarisation prompt. Specify what to summarise, the desired length or format (bullet points, paragraph, key takeaways), and any focus areas to prioritise.`,
    analytical: `Transform the input into a rigorous analytical prompt. Ask for structured analysis with clear sections: strengths, weaknesses, opportunities, risks, or a custom framework relevant to the topic. Request evidence-based reasoning.`,
  };

  return `You are an expert prompt engineer.

Style directive: ${styleGuides[style] ?? styleGuides.informative}

Transform the following rough idea into a polished, effective AI prompt.

Rules:
- Output ONLY the final prompt (no explanation, no preamble)
- Make it specific, unambiguous, and actionable
- Include context, constraints, and desired output format within the prompt
- The prompt should be ready to paste directly into an AI tool

Raw input:
${input}

Refined Prompt:`;
}

function speechPrompt(input: string, style: string): string {
  const styleGuides: Record<string, string> = {
    persuasive: `Structure this as a persuasive speech for business pitches or sales. Use the Problem → Solution → Proof → Call to Action framework. Build urgency. Use confident, assertive language.`,
    storyteller: `Structure this as a motivational or inspirational speech. Open with a personal story or vivid scene. Build emotional arc. Use the Hero's Journey pattern loosely. Close with a powerful, memorable line.`,
    educational: `Structure this as an educational talk. Use the Tell-Show-Tell method: introduce the concept, explain with examples, reinforce the key lesson. Use clear transitions. Make it easy to follow and remember.`,
    humorous: `Structure this as a light-hearted, humorous speech. Open with a self-deprecating or observational joke. Weave in wit throughout. Keep it warm, not mean. End on a heartfelt note beneath the humour.`,
  };

  return `You are a professional speechwriter.

Style directive: ${styleGuides[style] ?? styleGuides.persuasive}

Transform the following raw thoughts into a structured speech.

Format the output exactly like this:
**Opening**
[Opening lines]

**Main Point 1**
[First key point with supporting detail]

**Main Point 2**
[Second key point with supporting detail]

**Main Point 3**
[Third key point with supporting detail]

**Story / Example**
[A brief illustrative story or example]

**Closing**
[Memorable closing lines]

**Suggested Audience Questions**
- [Question 1]
- [Question 2]
- [Question 3]

Raw input:
${input}`;
}

function presentationPrompt(input: string, style: string): string {
  const styleGuides: Record<string, string> = {
    authoritative: `Write with command and expertise. Use declarative statements. Lead with conclusions, then support with evidence. Tone: confident, decisive, expert-level.`,
    casual: `Write in a relaxed, conversational tone. Use contractions. Keep slides punchy and friendly. Avoid jargon. Tone: approachable, warm, easy to follow.`,
    factual: `Write in a data-driven, objective tone. Lead every point with a statistic, finding, or evidence. Avoid opinion. Tone: precise, neutral, evidence-based.`,
    empathetic: `Write with emotional intelligence. Acknowledge the audience's perspective and challenges. Use inclusive language ("we", "together"). Tone: warm, understanding, human-centred.`,
  };

  return `You are an expert presentation strategist and slide writer.

Style directive: ${styleGuides[style] ?? styleGuides.factual}

Transform the following raw thoughts into a structured presentation outline.

Format the output exactly like this:
**Slide 1 — Title**
[Suggested title and one-line subtitle]

**Slide 2 — Opening / Hook**
[Opening statement or question to engage the audience]

**Slide 3 — Key Point 1**
[Headline + 2–3 bullet points]

**Slide 4 — Key Point 2**
[Headline + 2–3 bullet points]

**Slide 5 — Key Point 3**
[Headline + 2–3 bullet points]

**Slide 6 — Evidence / Example**
[Data point, case study, or story that supports the narrative]

**Slide 7 — Conclusion**
[Summary and clear takeaway]

**Slide 8 — Call to Action / Next Steps**
[What you want the audience to do or think after this]

Raw input:
${input}`;
}

function buildPrompt(input: string, format: string, style: string): string {
  switch (format) {
    case "linkedin":     return linkedInPrompt(input, style);
    case "prompt":       return promptBuilderPrompt(input, style);
    case "speech":       return speechPrompt(input, style);
    case "presentation": return presentationPrompt(input, style);
    default:             return linkedInPrompt(input, style);
  }
}

function buildScorePrompt(input: string): string {
  return `Analyze the following text for clarity and structure. Return ONLY a valid JSON object with no extra text, no markdown, no code fences.

Text: "${input}"

Return this exact JSON shape:
{"score": <number 0-100>, "issues": ["<issue 1>", "<issue 2>"]}

Score guide: 0-30 = very unclear, 31-60 = needs work, 61-80 = decent, 81-100 = clear.
Issues should be short (max 6 words each), e.g. "Unclear main point", "Weak structure".`;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { input, mode: format, style } = await req.json();

    if (!input || !format || !style) {
      return NextResponse.json({ error: "Missing input, format, or style" }, { status: 400 });
    }

    const clarifyRes = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: buildPrompt(input, format, style) }],
      temperature: 0.75,
      max_tokens: 1200,
    });

    const result = clarifyRes.choices[0]?.message?.content ?? "";

    // Clarity score — non-critical, fail gracefully
    let clarityScore = { score: 50, issues: [] as string[] };
    try {
      const scoreRes = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: buildScorePrompt(input) }],
        temperature: 0.1,
        max_tokens: 128,
      });
      const raw = scoreRes.choices[0]?.message?.content?.trim() ?? "";
      clarityScore = JSON.parse(raw);
    } catch {
      // keep default
    }

    return NextResponse.json({ result, clarityScore });
  } catch (err: unknown) {
    console.error("Groq error:", err);
    const message = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
