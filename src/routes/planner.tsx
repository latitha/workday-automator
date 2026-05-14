import { createFileRoute } from "@tanstack/react-router";
import { ListTodo } from "lucide-react";
import { ToolWorkbench } from "@/components/tool-workbench";

export const Route = createFileRoute("/planner")({
  component: () => (
    <ToolWorkbench
      tool="planner"
      title="AI Task Planner"
      description="Describe a goal — get a prioritized, time-boxed action plan."
      icon={<ListTodo className="h-5 w-5" />}
      inputLabel="What do you want to accomplish?"
      placeholder="e.g. Launch a new pricing page in 2 weeks with copy, design, and analytics."
      buttonLabel="Build plan"
      examples={[
        "Onboard a new engineer in their first week.",
        "Prepare for a quarterly business review presentation.",
        "Plan a 5-day product launch campaign.",
      ]}
    />
  ),
  head: () => ({ meta: [{ title: "AI Task Planner — Helix AI" }] }),
});
