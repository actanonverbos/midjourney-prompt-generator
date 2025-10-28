"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PromptState } from "@/lib/types";

interface GenerateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPromptState: PromptState;
  onApplyOption: (option: { prompt_line: string; parsed: Partial<PromptState> }) => void;
}

export default function GenerateModal({
  open,
  onOpenChange,
  currentPromptState,
  onApplyOption,
}: GenerateModalProps) {
  const [quickIdea, setQuickIdea] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOptions, setGeneratedOptions] = useState<
    Array<{
      prompt_line: string;
      parsed: Partial<PromptState>;
    }>
  >([]);
  const [aiNotes, setAiNotes] = useState("");

  const parsePromptLine = (line: string): Partial<PromptState> => {
    const arMatch = line.match(/--ar\s+([^\s]+)/);
    const stylizeMatch = line.match(/--stylize\s+(\d+)/);
    const chaosMatch = line.match(/--chaos\s+(\d+)/);
    const rawMatch = line.includes("--raw");
    const swMatch = line.match(/--sw\s+(\d+)/);
    const seedMatch = line.match(/--seed\s+(\d+)/);
    const srefMatch = line.match(/--sref\s+(https?:\/\/[^\s]+(?:\s+https?:\/\/[^\s]+)*)/);

    const textPart = line
      .replace(/--ar\s+[^\s]+/g, "")
      .replace(/--stylize\s+\d+/g, "")
      .replace(/--chaos\s+\d+/g, "")
      .replace(/--raw/g, "")
      .replace(/--sw\s+\d+/g, "")
      .replace(/--seed\s+\d+/g, "")
      .replace(/--sref\s+https?:\/\/[^\s]+(?:\s+https?:\/\/[^\s]+)*/g, "")
      .replace(/--profile\s+[^\s]+/g, "")
      .trim();

    const parts = textPart.split(",").map((p) => p.trim()).filter((p) => p);

    return {
      subject: parts[0] || "",
      setting: parts[1] || "",
      action: parts[2] || "",
      lighting: parts[3] || "",
      artDirection: parts[4] || "",
      extras: parts.slice(5).join(", "),
      aspectRatio: arMatch ? arMatch[1] : currentPromptState.aspectRatio,
      stylize: stylizeMatch ? parseInt(stylizeMatch[1]) : currentPromptState.stylize,
      chaos: chaosMatch ? parseInt(chaosMatch[1]) : currentPromptState.chaos,
      raw: rawMatch,
      styleWeight: swMatch ? parseInt(swMatch[1]) : currentPromptState.styleWeight,
      seed: seedMatch ? seedMatch[1] : currentPromptState.seed,
      styleRefs: srefMatch ? srefMatch[1].split(/\s+/) : currentPromptState.styleRefs,
    };
  };

  const handleGenerate = async () => {
    if (!quickIdea.trim()) {
      toast.error("Please enter an idea first");
      return;
    }

    setIsGenerating(true);
    setGeneratedOptions([]);
    setAiNotes("");

    try {
      const input = {
        subject: quickIdea,
        setting: "",
        action: "",
        lighting: "",
        art_direction: "",
        extras: "",
        params: {
          ar: currentPromptState.aspectRatio,
          stylize: currentPromptState.stylize,
          chaos: currentPromptState.chaos,
          raw: currentPromptState.raw,
          seed: currentPromptState.seed || undefined,
          profiles: currentPromptState.profileIds.filter((id) => id.trim()),
          srefs: currentPromptState.styleRefs.filter((ref) => ref.trim()),
          sw: currentPromptState.styleWeight || undefined,
          strip_query: currentPromptState.stripQueryStrings,
          max_srefs: 3,
        },
      };

      const res = await fetch("/api/compose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        throw new Error("Failed to generate prompt");
      }

      const output = await res.json();

      const options = [output.prompt_line, ...(output.variants || [])].map((line) => ({
        prompt_line: line,
        parsed: parsePromptLine(line),
      }));

      setGeneratedOptions(options);
      setAiNotes(output.notes || "");

      toast.success(`Generated ${options.length} prompt options!`);
    } catch (error) {
      toast.error("Failed to generate. Make sure OPENAI_API_KEY is set.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectOption = (option: { prompt_line: string; parsed: Partial<PromptState> }) => {
    onApplyOption(option);
    onOpenChange(false);
    toast.success("Prompt loaded into editor!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate Prompt from Idea</DialogTitle>
          <DialogDescription>
            Describe your concept and let AI create detailed, professional Midjourney prompts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Input Section */}
          <div className="flex gap-2">
            <Textarea
              value={quickIdea}
              onChange={(e) => setQuickIdea(e.target.value)}
              placeholder="e.g., a cyberpunk street vendor in a neon-lit alley at night"
              className="min-h-[100px] flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Press <kbd className="rounded border bg-muted px-1 py-0.5 text-xs">Cmd/Ctrl + Enter</kbd> to generate
            </p>
            <Button onClick={handleGenerate} disabled={isGenerating || !quickIdea.trim()}>
              <Sparkles className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate Options"}
            </Button>
          </div>

          {/* Generated Options */}
          {generatedOptions.length > 0 && (
            <div className="space-y-3 border-t pt-4">
              <h3 className="text-sm font-medium">Generated Options (click to use)</h3>
              {generatedOptions.map((option, index) => (
                <Card
                  key={index}
                  className="cursor-pointer transition-all hover:border-primary hover:bg-accent/50 shadow-none"
                  onClick={() => handleSelectOption(option)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <Badge variant="secondary" className="mt-0.5 shrink-0">
                        Option {index + 1}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-mono break-words">{option.prompt_line}</p>
                        {option.parsed && (
                          <div className="mt-2 grid grid-cols-2 gap-1 text-[10px] text-muted-foreground">
                            {option.parsed.subject && (
                              <span>Subject: {option.parsed.subject.substring(0, 30)}...</span>
                            )}
                            {option.parsed.setting && (
                              <span>Setting: {option.parsed.setting.substring(0, 30)}...</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {aiNotes && (
                <p className="text-xs text-muted-foreground pt-2 border-t">
                  <strong>AI Notes:</strong> {aiNotes}
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

