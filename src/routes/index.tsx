import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail, FileText, ListTodo, Search, MessageSquare, ArrowRight, Sparkles, Shield, Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard — Helix AI" },
      { name: "description", content: "Your AI workplace productivity dashboard." },
    ],
  }),
});

const tools = [
  { url: "/email", title: "Smart Email Generator", desc: "Draft polished emails in seconds.", icon: Mail },
  { url: "/meetings", title: "Meeting Notes Summarizer", desc: "Turn raw notes into structured summaries.", icon: FileText },
  { url: "/planner", title: "AI Task Planner", desc: "Break goals into actionable plans.", icon: ListTodo },
  { url: "/research", title: "AI Research Assistant", desc: "Get balanced briefings on any topic.", icon: Search },
  { url: "/chat", title: "AI Chatbot", desc: "Ask anything, get a workplace-savvy answer.", icon: MessageSquare },
];

const stats = [
  { label: "AI tools", value: "5" },
  { label: "Avg. time saved / task", value: "12 min" },
  { label: "Editable outputs", value: "100%" },
];

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 p-4 md:p-8">
      <section className="relative overflow-hidden rounded-2xl border bg-card p-8 shadow-card md:p-12">
        <div className="absolute inset-0 bg-gradient-primary opacity-[0.06]" />
        <div className="relative space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3 w-3" /> Powered by AI
          </span>
          <h1 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
            Your <span className="text-gradient">AI Workplace</span> productivity assistant.
          </h1>
          <p className="max-w-xl text-muted-foreground md:text-lg">
            Automate the busywork — write emails, summarize meetings, plan projects, and research topics with structured AI prompts and editable outputs.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-95"
            >
              Start chatting <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/email"
              className="inline-flex items-center gap-2 rounded-lg border bg-background px-5 py-2.5 text-sm font-medium transition hover:bg-accent"
            >
              Draft an email
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
            <p className="mt-1 font-display text-2xl font-semibold md:text-3xl">{s.value}</p>
          </Card>
        ))}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Tools</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.url} to={t.url} className="group">
              <Card className="h-full p-5 transition hover:border-primary/40 hover:shadow-elegant">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground transition group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                  <t.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{t.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                  Open <ArrowRight className="ml-1 h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-card">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Shield className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold">Responsible AI</h3>
            <p className="text-sm text-muted-foreground">
              Helix uses AI to assist, not replace, your judgment. Outputs may contain inaccuracies, bias, or outdated information.
              Always review AI-generated content — especially anything involving people, decisions, finances, or legal matters — before sharing or acting on it.
              Don't paste confidential data unless your organization permits it.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
