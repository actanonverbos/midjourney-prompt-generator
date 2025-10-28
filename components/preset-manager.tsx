"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Edit2, Check, X } from "lucide-react";
import { toast } from "sonner";
import { PromptState, PresetData } from "@/lib/types";

interface PresetManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  presets: PresetData[];
  currentPromptState: PromptState;
  onPresetsChange: () => void;
  onLoadPreset: (preset: PresetData) => void;
}

export default function PresetManager({
  open,
  onOpenChange,
  presets,
  currentPromptState,
  onPresetsChange,
  onLoadPreset,
}: PresetManagerProps) {
  const [newPresetName, setNewPresetName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreatePreset = async () => {
    if (!newPresetName.trim()) {
      toast.error("Please enter a preset name");
      return;
    }

    setIsCreating(true);
    try {
      const res = await fetch("/api/presets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newPresetName,
          ...currentPromptState,
        }),
      });

      if (res.ok) {
        toast.success("Preset created!");
        setNewPresetName("");
        onPresetsChange();
      } else {
        toast.error("Failed to create preset");
      }
    } catch (error) {
      toast.error("Failed to create preset");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeletePreset = async (id: string) => {
    try {
      const res = await fetch(`/api/presets/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Preset deleted");
        onPresetsChange();
      } else {
        toast.error("Failed to delete preset");
      }
    } catch (error) {
      toast.error("Failed to delete preset");
    }
  };

  const startEditing = (preset: PresetData) => {
    setEditingId(preset.id);
    setEditingName(preset.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleUpdatePreset = async (preset: PresetData) => {
    if (!editingName.trim()) {
      toast.error("Preset name cannot be empty");
      return;
    }

    try {
      const res = await fetch(`/api/presets/${preset.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...preset,
          name: editingName,
        }),
      });

      if (res.ok) {
        toast.success("Preset updated!");
        setEditingId(null);
        setEditingName("");
        onPresetsChange();
      } else {
        toast.error("Failed to update preset");
      }
    } catch (error) {
      toast.error("Failed to update preset");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Presets</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Create New Preset */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="new-preset-name" className="text-sm">
                    Save Current as New Preset
                  </Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="new-preset-name"
                      value={newPresetName}
                      onChange={(e) => setNewPresetName(e.target.value)}
                      placeholder="Enter preset name..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleCreatePreset();
                        }
                      }}
                    />
                    <Button
                      onClick={handleCreatePreset}
                      disabled={isCreating || !newPresetName.trim()}
                    >
                      {isCreating ? "Creating..." : "Create"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Existing Presets */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Existing Presets</Label>
            {presets.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No presets yet. Create your first preset above.
              </p>
            ) : (
              <div className="space-y-2">
                {presets.map((preset) => (
                  <Card key={preset.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      {editingId === preset.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="max-w-xs"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleUpdatePreset(preset);
                              } else if (e.key === "Escape") {
                                cancelEditing();
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleUpdatePreset(preset)}
                            className="h-8 w-8 p-0"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={cancelEditing}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{preset.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {preset.subject && preset.subject.substring(0, 50)}
                              {preset.subject && preset.subject.length > 50 ? "..." : ""}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                onLoadPreset(preset);
                                onOpenChange(false);
                              }}
                            >
                              Load
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEditing(preset)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeletePreset(preset.id)}
                              className="h-8 w-8 p-0 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

