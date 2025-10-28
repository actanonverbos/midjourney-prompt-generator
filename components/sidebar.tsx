"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sparkles, Save, RotateCcw, HelpCircle, FolderOpen, Lightbulb, ExternalLink, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";

type View = "editor" | "saved";

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  onGenerateClick: () => void;
  onResetClick: () => void;
  onSaveClick: () => void;
  onHelpClick: () => void;
}

export default function Sidebar({
  currentView,
  onViewChange,
  onGenerateClick,
  onResetClick,
  onSaveClick,
  onHelpClick,
}: SidebarProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-full w-16 flex-col items-center border-r bg-muted/30 py-6 px-2">
        {/* Views */}
        <div className="flex flex-col items-center gap-3 mb-4 pb-4 border-b border-border/50 w-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={currentView === "editor" ? "default" : "ghost"}
                size="icon"
                className="h-10 w-10 rounded-lg"
                onClick={() => onViewChange("editor")}
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Prompt Editor</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={currentView === "saved" ? "default" : "ghost"}
                size="icon"
                className="h-10 w-10 rounded-lg"
                onClick={() => onViewChange("saved")}
              >
                <FolderOpen className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Saved Prompts</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Tools */}
        <div className="flex flex-col items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 rounded-xl"
                onClick={onGenerateClick}
              >
                <Sparkles className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Generate from Idea</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-lg"
                onClick={onSaveClick}
              >
                <Save className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Save Prompt</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-lg"
                onClick={onResetClick}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Reset All Fields</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Inspiration Links */}
        <div className="flex flex-col items-center gap-3 mb-4">
          <Separator className="mb-2 w-8" />
          <p className="text-[10px] text-muted-foreground rotate-0 mb-1">Inspiration</p>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://www.lummi.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-lg hover:bg-accent"
                >
                  <Lightbulb className="h-4 w-4" />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Lummi.ai - Free AI Images</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://www.midjourney.com/explore?tab=top"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-lg hover:bg-accent"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Midjourney Explore</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Bottom Help */}
        <div className="flex flex-col items-center">
          <Separator className="mb-3 w-8" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-lg"
                onClick={onHelpClick}
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Help & Syntax Guide</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}

