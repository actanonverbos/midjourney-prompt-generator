"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Copy, Trash2, RefreshCcw, Search, Edit3 } from "lucide-react";
import { toast } from "sonner";
import { PromptState } from "@/lib/types";
import { buildPrompt } from "@/lib/promptBuilder";

interface SavedPrompt extends PromptState {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface SavedPromptsViewProps {
  onLoadPrompt: (prompt: SavedPrompt) => void;
  onSwitchToEditor: () => void;
}

export default function SavedPromptsView({
  onLoadPrompt,
  onSwitchToEditor,
}: SavedPromptsViewProps) {
  const [prompts, setPrompts] = useState<SavedPrompt[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    onSwitchToEditor();
  };

  useEffect(() => {
    loadPrompts();
  }, []);

  const filteredPrompts = prompts.filter((prompt) =>
    (prompt.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (prompt.subject || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (prompt.setting || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Saved Prompts</h1>
        <p className="text-muted-foreground mt-2">
          Manage and reuse your saved Midjourney prompts
        </p>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={loadPrompts}
          disabled={isLoading}
        >
          <RefreshCcw className="h-3 w-3 mr-1.5" />
          Refresh
        </Button>
        <Badge variant="secondary">
          {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {/* Prompts Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">
          Loading saved prompts...
        </div>
      ) : filteredPrompts.length === 0 ? (
        <Card className="shadow-none border-border/50">
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery
                ? "No prompts match your search."
                : "No saved prompts yet."}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Use the Save button to save your prompts.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrompts.map((prompt) => {
            const fullPrompt = buildPrompt(prompt);
            const createdDate = new Date(prompt.createdAt).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            );

            return (
              <Card
                key={prompt.id}
                className="shadow-none border-border/50 hover:border-primary transition-all group"
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm mb-1 truncate">
                          {prompt.name || "Untitled Prompt"}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {createdDate}
                        </p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1">
                      {prompt.raw && (
                        <Badge variant="outline" className="text-[10px]">
                          RAW
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-[10px]">
                        {prompt.aspectRatio}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        {prompt.stylize}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        chaos {prompt.chaos}
                      </Badge>
                    </div>

                    {/* Preview */}
                    {prompt.subject && (
                      <p className="text-xs line-clamp-2">{prompt.subject}</p>
                    )}

                    {/* Full Prompt Preview */}
                    <div className="bg-muted/50 p-2 rounded text-[10px] font-mono line-clamp-3">
                      {fullPrompt}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-8 text-xs"
                        onClick={() => handleLoad(prompt)}
                      >
                        <Edit3 className="h-3 w-3 mr-1.5" />
                        Load & Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => handleCopyPrompt(prompt)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

