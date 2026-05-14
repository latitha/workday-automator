import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { ToolWorkbench } from "@/components/tool-workbench";

export const Route = createFileRoute("/meetings")({
  component: () => (
    <ToolWorkbench
      tool="summary"
      title="Meeting Notes Summarizer"
      description="Paste raw notes or a transcript — get a structured summary with action items."
      icon={<FileText className="h-5 w-5" />}
      inputLabel="Raw meeting notes or transcript"
      placeholder="Paste your meeting notes here…"
      buttonLabel="Summarize"
      examples={[
        "Q3 planning sync — discussed launch dates, marketing budget, and hiring needs. Sarah owns the launch checklist…",
      ]}
    />
  ),
  head: () => ({ meta: [{ title: "Meeting Notes Summarizer — Helix AI" }] }),
});
