import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { ToolWorkbench } from "@/components/tool-workbench";

export const Route = createFileRoute("/email")({
  component: () => (
    <ToolWorkbench
      tool="email"
      title="Smart Email Generator"
      description="Describe what you need to say — get a polished, ready-to-send email."
      icon={<Mail className="h-5 w-5" />}
      inputLabel="What's the email about?"
      placeholder="e.g. Reply to a client asking to postpone our Friday demo to next Tuesday. Friendly but professional tone."
      buttonLabel="Generate email"
      examples={[
        "Follow up with a client who hasn't responded in a week — polite nudge.",
        "Decline a meeting invite gracefully because of a scheduling conflict.",
        "Announce to the team that I'm out of office next Monday and Tuesday.",
      ]}
    />
  ),
  head: () => ({ meta: [{ title: "Smart Email Generator — Helix AI" }] }),
});
