"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function OurTeamPage() {
  const members = [
    {
      name: "Infancia Felcy",
      role: "MCP & Product Lead",
      image: "/team-infancia-felcy.jpeg",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Jespiah Shihana",
      role: "Frontend & Design",
      image: "/team-jespiah-shihana.jpeg",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Oswald Shilo",
      role: "Backend & Security",
      image: "/team-oswald-shilo.jpeg",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
    },
  ]

  return (
    <main className="min-h-dvh bg-white">
      <Navbar />
      <section className="px-6 md:px-8 mx-auto max-w-5xl pt-28 md:pt-32 pb-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-spend-text-gray-900 text-balance">Our Team</h1>
          <p className="mt-4 text-spend-text-gray-700 max-w-2xl mx-auto">
            The people behind Spend FSS — building secure, intuitive finance experiences powered by MCP.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <article
              key={m.name}
              className="rounded-2xl border border-primary/20 bg-white shadow-sm p-6 flex flex-col items-center text-center"
            >
              <img
                src={m.image || "/placeholder.svg"}
                alt={`${m.name} avatar`}
                className="h-28 w-28 rounded-full ring-2 ring-primary/20 mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-spend-text-gray-900">{m.name}</h3>
              <p className="text-spend-text-gray-700">{m.role}</p>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href={m.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-spend-text-gray-700 hover:text-spend-text-gray-900"
                  aria-label={`${m.name} GitHub`}
                  title="GitHub"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.11.8-.25.8-.56l-.02-2.2c-3.34.73-4.04-1.61-4.04-1.61-.53-1.36-1.3-1.72-1.3-1.72-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.22 1.8 1.22 1.05 1.8 2.76 1.28 3.42.98.11-.78.41-1.28.75-1.58-2.66-.3-5.45-1.33-5.45-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.54-1.53.12-3.19 0 0 1.01-.32 3.3 1.22a11.42 11.42 0 0 1 6 0c2.28-1.54 3.29-1.22 3.29-1.22.66 1.66.24 2.89.12 3.19.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.47 5.92.42.36.8 1.07.8 2.16l-.01 3.2c0 .31.21.69.81.56A11.5 11.5 0 0 0 12 .5Z" />
                  </svg>
                </a>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-spend-text-gray-700 hover:text-spend-text-gray-900"
                  aria-label={`${m.name} LinkedIn`}
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.2 0 22.23 0Z" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-primary/30 px-5 py-2.5 text-sm font-medium text-spend-text-gray-900 hover:bg-primary/5 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}
