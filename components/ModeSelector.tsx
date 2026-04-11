// Type definitions for format + style selections
// Format = top-level card (step 1)
// Style  = sub-option card (step 2), unique per format

export type Format = "linkedin" | "prompt" | "speech" | "presentation";

export type LinkedInStyle    = "leader" | "educator" | "human" | "promotional";
export type PromptStyle      = "generative" | "informative" | "summarising" | "analytical";
export type SpeechStyle      = "persuasive" | "storyteller" | "educational" | "humorous";
export type PresentationStyle = "authoritative" | "casual" | "factual" | "empathetic";

export type Style = LinkedInStyle | PromptStyle | SpeechStyle | PresentationStyle;

// Keep Mode as an alias so existing imports don't break
export type Mode = Format;
