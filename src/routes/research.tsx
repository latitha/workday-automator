import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { ToolWorkbench } from "@/components/tool-workbench";

export const Route = createFileRoute("/research")({
  component: () => (
    <ToolWorkbench
      tool="research"
      title="AI Research Assistant"
      description="Ask any workplace topic — get a structured, balanced briefing."
      icon={<Search className="h-5 w-5" />}
      inputLabel="What would you like to research?"
      placeholder="e.g. Pros and cons of moving from Jira to Linear for a 30-person engineering team."
      buttonLabel="Research"
      examples={[
        "Best practices for remote-first team rituals.",
        "Overview of OKRs vs KPIs for goal setting.",
        "Common pitfalls when adopting AI coding tools at work.",
      ]}
    />
  ),
  head: () => ({ meta: [{ title: "AI Research Assistant — Helix AI" }] }),
});
