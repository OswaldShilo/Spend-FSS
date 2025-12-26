import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const question: string = body?.question || ""
    const dashboard = body?.dashboard
    const detail: "concise" | "detailed" = (body?.detail === "detailed" ? "detailed" : "concise")

    if (!question?.trim()) {
      return NextResponse.json({ error: "Missing question" }, { status: 400 })
    }

    const apiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server missing GROQ_API_KEY. Set it in Frontend/.env.local" },
        { status: 500 }
      )
    }

    const messages = [
      {
        role: "system",
        content:
          [
            "You are a Finance MCP assistant.",
            "Always respond in clean GitHub-Flavored Markdown (GFM).",
            "Structure the answer with clear headers and short bullet lists.",
            "Use this section order when applicable:",
            "1. Overview",
            "2. Accounts (table)",
            "3. Monthly Spending (bullet list)",
            "4. Category Breakdown (bullet list)",
            "5. Recent Transactions (compact list)",
            "6. Recommendations (3–6 actionable bullets)",
            "Formatting rules:",
            "- Use Title Case headers (e.g., **Overview**).",
            "- Prefer bullets; avoid raw paragraphs of stars/asterisks.",
            "- For tables, include headers and align columns neatly.",
            "- Keep the response concise and readable on mobile.",
            "Length policy:",
            "- Default: concise summary (<= 160 words).",
            "- If the user says 'brief it', 'details', 'explain', 'deep dive', or detail level is 'detailed': provide a longer, structured brief with all sections.",
            "- Match tone to question: short questions → short answers; explicit request for detail → longer brief.",
          ].join(" \n"),
      },
      {
        role: "user",
        content: `User question: ${question}\nDashboard JSON: ${JSON.stringify(dashboard ?? {})}`,
      },
    ]

    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages,
        max_tokens: detail === "detailed" ? 1024 : 256,
      }),
    })

    if (!resp.ok) {
      const t = await resp.text()
      return NextResponse.json({ error: `Groq failed: ${resp.status} ${t}` }, { status: 502 })
    }

    const json = await resp.json()
    const reply = json?.choices?.[0]?.message?.content || "No response"

    return NextResponse.json({ reply })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 })
  }
}
