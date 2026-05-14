import { useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Loader2, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { runAi } from "@/lib/ai.functions";

type ToolType = "email" | "summary" | "planner" | "research";

type Props = {
  tool: ToolType;
  title: string;
  description: string;
  icon: ReactNode;
  inputLabel: string;
  placeholder: string;
  buttonLabel?: string;
  examples?: string[];
};

export function ToolWorkbench({
  tool,
  title,
  description,
  icon,
  inputLabel,
  placeholder,
  buttonLabel = "Generate",
  examples = [],
}: Props) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const callAi = useServerFn(runAi);

  const handleRun = async () => {
    if (!input.trim()) {
      toast.error("Please enter some details first.");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const res = await callAi({ data: { tool, prompt: input } });
      setOutput(res.content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-8">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant text-primary-foreground">
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5 shadow-card">
          <div className="mb-3 flex items-center justify-between">
            <label className="text-sm font-medium">{inputLabel}</label>
            {input && (
              <button
                onClick={() => setInput("")}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="min-h-[280px] resize-none"
          />

          {examples.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground">Try an example</p>
              <div className="flex flex-wrap gap-2">
                {examples.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setInput(ex)}
                    className="rounded-full border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:bg-accent"
                  >
                    {ex.length > 60 ? ex.slice(0, 60) + "…" : ex}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={handleRun}
            disabled={loading}
            className="mt-5 w-full bg-gradient-primary text-primary-foreground hover:opacity-95"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> {buttonLabel}
              </>
            )}
          </Button>
        </Card>

        <Card className="p-5 shadow-card">
          <div className="mb-3 flex items-center justify-between">
            <label className="text-sm font-medium">AI Output (editable)</label>
            <div className="flex gap-1">
              {output && (
                <>
                  <Button variant="ghost" size="sm" onClick={copy}>
                    <Copy className="mr-1 h-3.5 w-3.5" /> Copy
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleRun} disabled={loading}>
                    <RotateCcw className="mr-1 h-3.5 w-3.5" /> Regenerate
                  </Button>
                </>
              )}
            </div>
          </div>
          <Textarea
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            placeholder={loading ? "Thinking…" : "Your AI-generated result will appear here. Edit freely before sharing."}
            className="min-h-[340px] resize-none font-mono text-sm leading-relaxed"
          />
          <p className="mt-3 text-[11px] text-muted-foreground">
            ⚠ Responsible AI: Outputs may contain mistakes. Verify facts and sensitive details before use.
          </p>
        </Card>
      </div>
    </div>
  );
}
