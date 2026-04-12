## What ClarityAI does

You bring the raw material. ClarityAI handles the structure, tone, and delivery.

The app walks you through a four-step flow:

1. **Choose a format** — LinkedIn Post, Prompt, Speech, or Presentation
2. **Choose a style** — unique sub-options tailored to each format
3. **Write freely** — dump your thoughts without worrying about structure
4. **Get refined output** — AI-generated content precisely matched to your format and style, with a before/after Clarity Score

---

## Formats and styles

| Format | Styles |
|---|---|
| LinkedIn Post | Leader-Oriented, Educator-Oriented, Human-Oriented, Promotional |
| Prompt | Generative, Informative, Summarising, Analytical |
| Speech | Persuasive, Storyteller, Educational, Humorous |
| Presentation | Authoritative, Casual, Factual, Empathetic |

Each combination produces a uniquely structured output — a LinkedIn post gets hooks and hashtags, a speech gets sections and audience questions, a presentation gets a full slide outline.

---

## Product thinking

### Problem

Most AI writing tools are either too generic (blank chat boxes) or too rigid (fixed templates). Users are left either staring at a cursor or fighting a template that doesn't fit their voice.

### Solution

ClarityAI introduces a **guided thinking flow** — a structured, opinionated path that helps users make decisions before they write. By choosing format and style upfront, the AI has enough context to produce output that actually fits the use case, not just the words.

### Design principles

- **No blank canvas anxiety** — every step narrows the problem space before the user types a word
- **Opinionated by default, flexible by design** — strong defaults with room for custom context
- **Output over conversation** — this is a production tool, not a chat interface
- **Clarity as a metric** — the Clarity Score gives users a tangible signal of improvement, not just a feeling

### Who it's for

- Professionals who write LinkedIn content regularly
- Founders and students who need to pitch or present
- Anyone who uses AI tools and wants better, more targeted prompts
- People who know what they want to say but struggle with how to say it

### Roadmap ideas

- Save and revisit past outputs
- Tone fine-tuning slider (e.g. more formal / more casual)
- Export to PDF or copy as formatted document
- Team workspace for shared content styles
- Usage analytics — most used formats, average score improvement

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| AI | Groq API — `llama-3.3-70b-versatile` |
| Language | TypeScript |
| Deployment | Vercel (recommended) |

---

## Setup

### Prerequisites

- Node.js 18+
- A free [Groq API key](https://console.groq.com/keys)

### 1. Clone the repo

```bash
git clone https://github.com/mjayson20/ClarityAI.git
cd ClarityAI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your API key

Create a `.env.local` file in the root:

```bash
cp .env.example .env.local
```

Then open `.env.local` and replace the placeholder:

```
GROQ_API_KEY=your_groq_api_key_here
```

Get your key at [console.groq.com/keys](https://console.groq.com/keys) — it's free.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---
## Project structure

```
clarityai/
├── app/
│   ├── api/clarify/route.ts   # Groq API route — all prompt logic lives here
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx               # Main orchestrator — step state and flow
├── components/
│   ├── steps/
│   │   ├── ToneStep.tsx       # Step 1 — format selection
│   │   ├── ContextStep.tsx    # Step 2 — style selection (unique per format)
│   │   ├── InputStep.tsx      # Step 3 — thought canvas
│   │   └── OutputStep.tsx     # Step 4 — before/after + clarity score
│   ├── LandingScreen.tsx
│   ├── StepBreadcrumb.tsx
│   ├── ClarityScore.tsx
│   └── ModeSelector.tsx       # Shared type definitions
└── .env.example
```

---
