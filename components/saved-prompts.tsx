"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Trash2, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { PromptState } from "@/lib/types";
import { buildPrompt } from "@/lib/promptBuilder";

interface SavedPrompt extends PromptState {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface SavedPromptsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoadPrompt: (prompt: SavedPrompt) => void;
}

export default function SavedPrompts({
  open,
  onOpenChange,
  onLoadPrompt,
}: SavedPromptsProps) {
  const [prompts, setPrompts] = useState<SavedPrompt[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadPrompts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/prompts");
      if (res.ok) {
        const data = await res.json();
        // Parse JSON strings back to arrays
        const parsed = data.map((p: any) => ({
          ...p,
          styleRefs: JSON.parse(p.styleRefs || "[]"),
          profileIds: JSON.parse(p.profileIds || "[]"),
        }));
        setPrompts(parsed);
      } else {
        toast.error("Failed to load saved prompts");
      }
    } catch (error) {
      toast.error("Failed to load saved prompts");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/prompts/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Prompt deleted");
        loadPrompts();
      } else {
        toast.error("Failed to delete prompt");
      }
    } catch (error) {
      toast.error("Failed to delete prompt");
      console.error(error);
    }
  };

  const handleCopyPrompt = async (prompt: SavedPrompt) => {
    const fullPrompt = buildPrompt(prompt);
    try {
      await navigator.clipboard.writeText(fullPrompt);
      toast.success("Prompt copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  const handleLoad = (prompt: SavedPrompt) => {
    onLoadPrompt(prompt);
    onOpenChange(false);
  };

  useEffect(() => {
    if (open) {
      loadPrompts();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Saved Prompts</DialogTitle>
          <DialogDescription>
            View and manage your saved prompts. Click to load into editor.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-muted-foreground">
            {prompts.length} saved prompt{prompts.length !== 1 ? "s" : ""}
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={loadPrompts}
            disabled={isLoading}
          >
            <RefreshCcw className="h-3 w-3 mr-1.5" />
            Refresh
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading saved prompts...
          </div>
        ) : prompts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No saved prompts yet.</p>
            <p className="text-xs mt-2">
              Use the Save button in the sidebar to save your prompts.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {prompts.map((prompt) => {
              const fullPrompt = buildPrompt(prompt);
              const createdDate = new Date(prompt.createdAt).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );

              return (
                <Card
                  key={prompt.id}
                  className="shadow-none border-border/50 hover:border-primary transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-[10px]">
                              {createdDate}
                            </Badge>
                            {prompt.raw && (
                              <Badge variant="outline" className="text-[10px]">
                                RAW
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-[10px]">
                              {prompt.aspectRatio}
                            </Badge>
                          </div>
                          {prompt.subject && (
                            <p className="text-sm font-medium mb-0.5">
                              {prompt.subject}
                            </p>
                          )}
                          {prompt.setting && (
                            <p className="text-xs text-muted-foreground">
                              {prompt.setting}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopyPrompt(prompt)}
                            className="h-7 w-7 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(prompt.id)}
                            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Full Prompt Preview */}
                      <div className="bg-muted/50 p-2 rounded text-[11px] font-mono break-words">
                        {fullPrompt}
                      </div>

                      {/* Load Button */}
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => handleLoad(prompt)}
                      >
                        Load into Editor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

