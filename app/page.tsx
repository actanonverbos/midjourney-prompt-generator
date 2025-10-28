"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RotateCcw, Plus, X, Sparkles, Save } from "lucide-react";
import { toast } from "sonner";
import { buildPrompt, countTokens } from "@/lib/promptBuilder";
import { DEFAULT_PROMPT_STATE, ASPECT_RATIOS, PromptState } from "@/lib/types";
import Sidebar from "@/components/sidebar";
import GenerateModal from "@/components/generate-modal";
import HelpDialog from "@/components/help-dialog";
import InfoTooltip from "@/components/info-tooltip";
import CinematicHelpers from "@/components/cinematic-helpers";
import SavedPromptsView from "@/components/saved-prompts-view";
import SavePromptDialog from "@/components/save-prompt-dialog";

export default function Home() {
  const [currentView, setCurrentView] = useState<"editor" | "saved">("editor");
  const [promptState, setPromptState] = useState<PromptState>(DEFAULT_PROMPT_STATE);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiVariants, setAiVariants] = useState<string[]>([]);
  const [aiNotes, setAiNotes] = useState("");

  const generatedPrompt = buildPrompt(promptState);
  const tokenStats = countTokens(generatedPrompt);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Copy shortcut: C key (not when typing in input/textarea)
      if (
        e.key.toLowerCase() === "c" &&
        !e.metaKey &&
        !e.ctrlKey &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        handleCopy();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [generatedPrompt]);


  const updateField = <K extends keyof PromptState>(
    field: K,
    value: PromptState[K]
  ) => {
    setPromptState((prev) => ({ ...prev, [field]: value }));
  };

  const addStyleRef = () => {
    setPromptState((prev) => ({
      ...prev,
      styleRefs: [...prev.styleRefs, ""],
    }));
  };

  const updateStyleRef = (index: number, value: string) => {
    setPromptState((prev) => {
      const newRefs = [...prev.styleRefs];
      newRefs[index] = value;
      return { ...prev, styleRefs: newRefs };
    });
  };

  const removeStyleRef = (index: number) => {
    setPromptState((prev) => ({
      ...prev,
      styleRefs: prev.styleRefs.filter((_, i) => i !== index),
    }));
  };

  const addProfileId = () => {
    setPromptState((prev) => ({
      ...prev,
      profileIds: [...prev.profileIds, ""],
    }));
  };

  const updateProfileId = (index: number, value: string) => {
    setPromptState((prev) => {
      const newIds = [...prev.profileIds];
      newIds[index] = value;
      return { ...prev, profileIds: newIds };
    });
  };

  const removeProfileId = (index: number) => {
    setPromptState((prev) => ({
      ...prev,
      profileIds: prev.profileIds.filter((_, i) => i !== index),
    }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  const handleReset = () => {
    setPromptState(DEFAULT_PROMPT_STATE);
    setAiVariants([]);
    setAiNotes("");
    toast.success("Reset to defaults");
  };

  const handleSaveClick = () => {
    setShowSaveDialog(true);
  };

  const handleSavePrompt = async (name: string) => {
    try {
      const res = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...promptState,
          name,
        }),
      });
      if (res.ok) {
        toast.success("Prompt saved!");
      } else {
        toast.error("Failed to save prompt");
      }
    } catch (error) {
      toast.error("Failed to save prompt");
    }
  };

  const loadSavedPrompt = (prompt: any) => {
    const { id, createdAt, updatedAt, ...promptData } = prompt;
    setPromptState(promptData);
    setAiVariants([]);
    setAiNotes("");
    toast.success("Loaded saved prompt");
  };

  const applyGeneratedOption = (option: { prompt_line: string; parsed: Partial<PromptState> }) => {
    setPromptState(prev => ({
      ...prev,
      ...option.parsed,
    }));
  };

  // Cinematic Formula Helpers
  const handleInsertGeometry = (value: string) => {
    setPromptState(prev => ({
      ...prev,
      setting: prev.setting ? `${prev.setting}, ${value}` : value,
    }));
    toast.success("Geometry added to Setting");
  };

  const handleInsertColorDuality = (value: string) => {
    setPromptState(prev => ({
      ...prev,
      lighting: prev.lighting ? `${prev.lighting}, ${value}` : value,
    }));
    toast.success("Color duality added to Lighting");
  };

  const handleInsertAtmosphere = (value: string) => {
    setPromptState(prev => ({
      ...prev,
      extras: prev.extras ? `${prev.extras}, ${value}` : value,
    }));
    toast.success("Atmosphere added to Extras");
  };

  const handleInsertEmotion = (value: string) => {
    setPromptState(prev => ({
      ...prev,
      extras: prev.extras ? `${prev.extras}, ${value}` : value,
    }));
    toast.success("Emotional tone added to Extras");
  };

  const handleApplyCinematicPreset = () => {
    setPromptState(prev => ({
      ...prev,
      aspectRatio: "3:2",
      chaos: 55,
      stylize: 700,
      raw: true,
    }));
    toast.success("Cinematic parameters applied! (3:2, chaos 55, stylize 700, raw mode)");
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    setAiVariants([]);
    setAiNotes("");
    
    try {
      const input = {
        subject: promptState.subject,
        setting: promptState.setting,
        action: promptState.action,
        lighting: promptState.lighting,
        art_direction: promptState.artDirection,
        extras: promptState.extras,
        params: {
          ar: promptState.aspectRatio,
          stylize: promptState.stylize,
          chaos: promptState.chaos,
          raw: promptState.raw,
          seed: promptState.seed || undefined,
          profiles: promptState.profileIds.filter(id => id.trim()),
          srefs: promptState.styleRefs.filter(ref => ref.trim()),
          sw: promptState.styleWeight || undefined,
          strip_query: promptState.stripQueryStrings,
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
      
      // Update the preview with AI-generated prompt
      // We'll parse it back to fill the fields if needed, or just show it
      setAiVariants(output.variants || []);
      setAiNotes(output.notes || "");
      
      toast.success("AI prompt generated!");
    } catch (error) {
      toast.error("Failed to generate AI prompt. Make sure OPENAI_API_KEY is set.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyVariant = async (variant: string) => {
    try {
      await navigator.clipboard.writeText(variant);
      toast.success("Variant copied!");
    } catch (error) {
      toast.error("Failed to copy variant");
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onGenerateClick={() => setShowGenerateModal(true)}
        onResetClick={handleReset}
        onSaveClick={handleSaveClick}
        onHelpClick={() => setShowHelpDialog(true)}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-[1600px]">
        {currentView === "saved" ? (
          <SavedPromptsView
            onLoadPrompt={loadSavedPrompt}
            onSwitchToEditor={() => setCurrentView("editor")}
          />
        ) : (
          <>{/* Editor View */}

        <div className="grid gap-8 lg:grid-cols-2">
          {/* LEFT COLUMN - Prompt Builder */}
          <div className="flex flex-col gap-3">
            {/* Text Fields Card */}
            <Card className="shadow-none border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  Prompt Elements
                  <InfoTooltip content="Structured fields that build your Midjourney prompt. Fill them in order: subject (what), setting (where), action (happening), lighting (crucial!), art direction (style), and extras (composition details)." />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="subject" className="text-xs text-muted-foreground">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={promptState.subject}
                    onChange={(e) => updateField("subject", e.target.value)}
                    placeholder="who or what the image is about"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="setting" className="text-xs text-muted-foreground">
                    Setting
                  </Label>
                  <Input
                    id="setting"
                    value={promptState.setting}
                    onChange={(e) => updateField("setting", e.target.value)}
                    placeholder="where it takes place"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="action" className="text-xs text-muted-foreground">
                    Action
                  </Label>
                  <Input
                    id="action"
                    value={promptState.action}
                    onChange={(e) => updateField("action", e.target.value)}
                    placeholder="what's happening or defining motion"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lighting" className="text-xs text-muted-foreground">
                    Lighting
                  </Label>
                  <Input
                    id="lighting"
                    value={promptState.lighting}
                    onChange={(e) => updateField("lighting", e.target.value)}
                    placeholder="how the scene is lit"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="artDirection" className="text-xs text-muted-foreground">
                    Art Direction
                  </Label>
                  <Input
                    id="artDirection"
                    value={promptState.artDirection}
                    onChange={(e) => updateField("artDirection", e.target.value)}
                    placeholder="stylistic tone (e.g., editorial sci-fi minimalism)"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="extras" className="text-xs text-muted-foreground">
                    Extras
                  </Label>
                  <Textarea
                    id="extras"
                    value={promptState.extras}
                    onChange={(e) => updateField("extras", e.target.value)}
                    placeholder="composition, textures, atmosphere"
                    className="mt-1 min-h-[60px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Parameters Card */}
            <Card className="shadow-none border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  Parameters
                  <InfoTooltip content="Midjourney command flags that control image generation. Aspect ratio, stylization level (0-1000), chaos for variety (0-100), and other technical settings. Always use double hyphens (--) and follow the correct flag order." />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="aspectRatio" className="text-xs text-muted-foreground">
                    Aspect Ratio
                  </Label>
                  <Select
                    value={promptState.aspectRatio}
                    onValueChange={(value) => updateField("aspectRatio", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ASPECT_RATIOS.map((ratio) => (
                        <SelectItem key={ratio.value} value={ratio.value}>
                          {ratio.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">
                      Stylize
                    </Label>
                    <span className="text-xs font-medium">{promptState.stylize}</span>
                  </div>
                  <Slider
                    value={[promptState.stylize]}
                    onValueChange={([value]) => updateField("stylize", value)}
                    min={0}
                    max={1000}
                    step={50}
                    className="mt-2"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">
                      Chaos
                    </Label>
                    <span className="text-xs font-medium">{promptState.chaos}</span>
                  </div>
                  <Slider
                    value={[promptState.chaos]}
                    onValueChange={([value]) => updateField("chaos", value)}
                    min={0}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="raw" className="text-xs text-muted-foreground">
                    Raw Mode
                  </Label>
                  <Switch
                    id="raw"
                    checked={promptState.raw}
                    onCheckedChange={(checked) => updateField("raw", checked)}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">
                      Style Weight
                    </Label>
                    <span className="text-xs font-medium">{promptState.styleWeight}</span>
                  </div>
                  <Slider
                    value={[promptState.styleWeight]}
                    onValueChange={([value]) => updateField("styleWeight", value)}
                    min={0}
                    max={1000}
                    step={50}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="seed" className="text-xs text-muted-foreground">
                    Seed
                  </Label>
                  <Input
                    id="seed"
                    value={promptState.seed}
                    onChange={(e) => updateField("seed", e.target.value)}
                    placeholder="Optional seed for reproducibility"
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="stripQuery" className="text-xs text-muted-foreground">
                    Strip Query Strings from URLs
                  </Label>
                  <Switch
                    id="stripQuery"
                    checked={promptState.stripQueryStrings}
                    onCheckedChange={(checked) => updateField("stripQueryStrings", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Cinematic Helpers */}
            <CinematicHelpers
              onInsertGeometry={handleInsertGeometry}
              onInsertColorDuality={handleInsertColorDuality}
              onInsertAtmosphere={handleInsertAtmosphere}
              onInsertEmotion={handleInsertEmotion}
              onApplyCinematicPreset={handleApplyCinematicPreset}
            />

            {/* Style References Card */}
            <Card className="shadow-none border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    Style References
                    <InfoTooltip content="Image URLs (--sref) that influence the visual style. Must be Midjourney links (s.mj.run). Maximum 3 URLs. Use --sw (style weight, 0-1000) to control influence strength. Note: --sw only works WITH --sref." />
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={addStyleRef}
                    className="h-7 px-2"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {promptState.styleRefs.length === 0 ? (
                  <p className="text-xs text-muted-foreground">
                    No style references added
                  </p>
                ) : (
                  promptState.styleRefs.map((ref, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={ref}
                        onChange={(e) => updateStyleRef(index, e.target.value)}
                        placeholder="https://s.mj.run/..."
                        className="text-xs"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeStyleRef(index)}
                        className="h-9 w-9 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Profile IDs Card */}
            <Card className="shadow-none border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    Profile IDs
                    <InfoTooltip content="Custom Midjourney profile IDs (--profile) to apply preset style preferences. Only use if you have created custom profiles in your Midjourney account." />
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={addProfileId}
                    className="h-7 px-2"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {promptState.profileIds.length === 0 ? (
                  <p className="text-xs text-muted-foreground">
                    No profile IDs added
                  </p>
                ) : (
                  promptState.profileIds.map((id, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={id}
                        onChange={(e) => updateProfileId(index, e.target.value)}
                        placeholder="Profile ID"
                        className="text-xs"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeProfileId(index)}
                        className="h-9 w-9 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
        </div>

          {/* RIGHT COLUMN - Output & Utilities */}
          <div className="flex flex-col gap-3">
            {/* Utilities Bar */}
            <Card className="shadow-none border-border/50">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleCopy} variant="default" className="gap-1.5">
                    <Copy className="h-3 w-3" />
                    Copy
                    <kbd className="ml-1 pointer-events-none inline-flex h-4 select-none items-center justify-center rounded border border-primary-foreground/20 bg-primary-foreground/10 px-1 font-mono text-[10px] font-medium">
                      C
                    </kbd>
                  </Button>
                  <Button size="sm" onClick={handleReset} variant="outline">
                    <RotateCcw className="mr-2 h-3 w-3" />
                    Reset
                  </Button>
                  <Button size="sm" onClick={handleSaveClick} variant="outline">
                    <Save className="mr-2 h-3 w-3" />
                    Save
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleGenerateAI} 
                    variant="secondary"
                    disabled={isGenerating}
                  >
                    <Sparkles className="mr-2 h-3 w-3" />
                    {isGenerating ? "Generating..." : "AI Enhance"}
                  </Button>
                </div>
                <Badge variant="secondary">
                  {tokenStats.words} words / {tokenStats.chars} chars
                </Badge>
              </CardContent>
            </Card>

            {/* Prompt Preview */}
            <Card className="shadow-none border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  Prompt Preview
                  <InfoTooltip content="Your fully assembled Midjourney command. Copy and paste directly after /imagine in Discord. All formatting is already correct with proper flags and syntax." />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={generatedPrompt}
                  readOnly
                  className="min-h-[200px] font-mono text-xs"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  Ready to paste directly after <code>/imagine</code> in Discord
                </p>
              </CardContent>
            </Card>

            {/* AI Variants */}
            {aiVariants.length > 0 && (
              <Card className="shadow-none border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    AI Variants
                    <InfoTooltip content="Alternative prompt variations generated by AI from your current fields. Click to copy any variant and use it in Midjourney." />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {aiVariants.map((variant, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="flex-1 text-xs font-mono">{variant}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyVariant(variant)}
                          className="h-7 w-7 p-0 shrink-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {aiNotes && (
                    <p className="text-xs text-muted-foreground pt-2 border-t">
                      {aiNotes}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

          </div>
        </div>
        </>
        )}
        </div>
      </div>

      <GenerateModal
        open={showGenerateModal}
        onOpenChange={setShowGenerateModal}
        currentPromptState={promptState}
        onApplyOption={applyGeneratedOption}
      />

      <HelpDialog
        open={showHelpDialog}
        onOpenChange={setShowHelpDialog}
      />

      <SavePromptDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        onSave={handleSavePrompt}
        defaultName={promptState.subject ? promptState.subject.substring(0, 50) : ""}
      />
    </div>
  );
}
