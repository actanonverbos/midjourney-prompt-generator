"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoTooltip from "@/components/info-tooltip";

interface CinematicHelpersProps {
  onInsertGeometry: (value: string) => void;
  onInsertColorDuality: (value: string) => void;
  onInsertAtmosphere: (value: string) => void;
  onInsertEmotion: (value: string) => void;
  onApplyCinematicPreset: () => void;
}

export const GEOMETRIES = [
  "circular portal",
  "hovering disc of light",
  "mirrored obelisk",
  "crystalline pyramid",
  "floating ring structure",
  "geometric monolith",
  "angular archway",
  "suspended sphere",
  "metallic column",
  "transparent cube",
];

export const COLOR_DUALITIES = [
  "orange glow and blue mist",
  "cyan light and magenta shadows",
  "warm gold and cool silver",
  "electric blue and deep red",
  "violet radiance and green fog",
  "amber core and ice-blue edges",
  "crimson spill and cobalt atmosphere",
];

export const ATMOSPHERES = [
  "volumetric mist and snow drift",
  "crystalline particles in air",
  "dense fog with light rays",
  "soft snow catching reflections",
  "diffused light through clouds",
  "atmospheric haze and glow",
  "light bleeding through vapor",
  "ethereal fog with shimmer",
];

export const EMOTIONS = [
  "quiet awe and transcendence",
  "silent revelation",
  "solemn discovery",
  "calm devotion",
  "peaceful solitude",
  "contemplative wonder",
  "meditative presence",
  "serene isolation",
];

export default function CinematicHelpers({
  onInsertGeometry,
  onInsertColorDuality,
  onInsertAtmosphere,
  onInsertEmotion,
  onApplyCinematicPreset,
}: CinematicHelpersProps) {
  return (
    <Card className="shadow-none border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          Cinematic Formula Helpers
          <InfoTooltip content="Quick-insert proven cinematic elements: geometry (portals, monoliths), color duality (orange/blue), atmosphere (mist, fog), and emotional tone. Based on the formula: subject + geometry + color contrast + atmosphere + emotion." />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Cinematic Preset Button */}
        <div>
          <Button
            onClick={onApplyCinematicPreset}
            variant="outline"
            size="sm"
            className="w-full"
          >
            Apply Cinematic Preset
          </Button>
          <p className="text-[10px] text-muted-foreground mt-1">
            Sets ideal parameters: chaos 55, stylize 700, raw mode, 3:2 ratio
          </p>
        </div>

        {/* Geometry */}
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            Key Geometry
          </label>
          <Select onValueChange={onInsertGeometry}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Insert geometry..." />
            </SelectTrigger>
            <SelectContent>
              {GEOMETRIES.map((geo) => (
                <SelectItem key={geo} value={geo} className="text-xs">
                  {geo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Color Duality */}
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            Color Duality <Badge variant="secondary" className="text-[9px] ml-1">warm + cool</Badge>
          </label>
          <Select onValueChange={onInsertColorDuality}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Insert color pair..." />
            </SelectTrigger>
            <SelectContent>
              {COLOR_DUALITIES.map((color) => (
                <SelectItem key={color} value={color} className="text-xs">
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Atmosphere */}
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            Atmospheric Softness
          </label>
          <Select onValueChange={onInsertAtmosphere}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Insert atmosphere..." />
            </SelectTrigger>
            <SelectContent>
              {ATMOSPHERES.map((atm) => (
                <SelectItem key={atm} value={atm} className="text-xs">
                  {atm}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Emotional Tone */}
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            Emotional Tone
          </label>
          <Select onValueChange={onInsertEmotion}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Insert emotion..." />
            </SelectTrigger>
            <SelectContent>
              {EMOTIONS.map((emo) => (
                <SelectItem key={emo} value={emo} className="text-xs">
                  {emo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Formula Reminder */}
        <div className="pt-2 border-t">
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            <strong>Formula:</strong> Character + Geometry + Color Contrast + Atmosphere + Emotion = Cinematic Power
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

