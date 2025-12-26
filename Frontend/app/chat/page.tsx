"use client"

import type React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

type DashboardPayload = {
  totalBalance: number
  accounts: any[]
  categoryData: any[]
  monthlySpending: any[]
  recentTransactions: any[]
  transactions: any[]
}

const suggestedQuestions = [
  "What were my biggest expenses last month?",
  "How can I reduce my spending on dining out?",
  "Am I on track to meet my savings goals?",
  "Show me my spending patterns over the past 6 months",
  "What's my average monthly spending?",
  "Help me create a budget for next month",
]

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000"

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [detail, setDetail] = useState<"concise" | "detailed">("concise")
  const [dashboardData, setDashboardData] = useState<DashboardPayload | null>(null)
  const [dataError, setDataError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/dashboard`)
        if (!res.ok) throw new Error(`Dashboard request failed ${res.status}`)
        const json = (await res.json()) as DashboardPayload
        setDashboardData(json)
      } catch (err: any) {
        setDataError(err.message || "Failed to load dashboard data")
      }
    }
    fetchDashboard()
  }, [])

  const handleSend = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Ensure dashboard data is loaded
      if (!dashboardData) {
        throw new Error("Dashboard data not yet available")
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: content,
          dashboard: dashboardData,
          detail,
        }),
      })

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}))
        throw new Error(errJson?.error || `Chat API failed with ${response.status}`)
      }

      const data = await response.json()
      const reply = data?.reply || "I could not generate a response."

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err: any) {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Sorry, I couldn't complete your request. ${err.message || "Unknown error"}`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend(input)
  }

  const handleSuggestedClick = (question: string) => {
    handleSend(question)
  }

  return (
    <main className="min-h-dvh bg-white flex flex-col">
      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto pt-16 pb-4 px-4">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-spend-text-gray-600 hover:text-spend-text-gray-900 mb-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-spend-text-gray-900">Finance MCP Assistant</h1>
          <p className="text-sm text-spend-text-gray-600">Your personal AI-powered financial advisor</p>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-spend-text-gray-900 mb-2">How can I help you today?</h2>
              <p className="text-sm text-spend-text-gray-600 mb-8 text-center max-w-md">
                Ask me anything about your finances, spending patterns, or budgeting advice.
              </p>

              {/* Suggested Questions */}
              <div className="grid gap-3 md:grid-cols-2 max-w-2xl w-full">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedClick(question)}
                    className="text-left p-4 rounded-xl border border-spend-text-gray-200 hover:border-primary hover:bg-spend-bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span className="text-sm text-spend-text-gray-700">{question}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-4 duration-500`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-white"
                        : "bg-spend-bg-gray-50 text-spend-text-gray-900 border border-spend-text-gray-200"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    )}
                    <p
                      className={`text-xs mt-2 ${message.role === "user" ? "text-white/70" : "text-spend-text-gray-500"}`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-spend-bg-gray-50 border border-spend-text-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-spend-text-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-spend-text-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-spend-text-gray-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="sticky bottom-0 bg-white pt-4 border-t border-spend-text-gray-200">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about your finances..."
              className="flex-1 px-4 py-3 rounded-xl border border-spend-text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-spend-text-gray-900 placeholder:text-spend-text-gray-400"
              disabled={isLoading}
            />
            <select
              value={detail}
              onChange={(e) => setDetail(e.target.value as "concise" | "detailed")}
              className="px-3 py-3 rounded-xl border border-spend-text-gray-200 text-sm text-spend-text-gray-700 bg-white"
              disabled={isLoading}
              aria-label="Detail level"
            >
              <option value="concise">Concise</option>
              <option value="detailed">Detailed</option>
            </select>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-[#4a5f44] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span className="hidden sm:inline">Send</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
