"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Midjourney Help & Syntax Guide</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="parameters" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="formula">Formula</TabsTrigger>
            <TabsTrigger value="syntax">Syntax</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="parameters" className="space-y-3 mt-4">
            <Card className="shadow-none">
              <CardContent className="pt-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-sm mb-1">--ar (Aspect Ratio)</h3>
                  <p className="text-xs text-muted-foreground">
                    Controls the width-to-height ratio of the image. Common values: 1:1 (square), 16:9 (wide), 9:16 (tall), 3:2 (photo).
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm mb-1">--stylize (Stylization)</h3>
                  <p className="text-xs text-muted-foreground">
                    Range: 0-1000. Controls how much Midjourney's aesthetic style is applied. Low (0-300): more literal, High (700-1000): more artistic interpretation.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-1">--chaos</h3>
                  <p className="text-xs text-muted-foreground">
                    Range: 0-100. Controls variety in results. Low (0-20): consistent results, High (50-100): wild variations. Default is 0.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-1">--raw</h3>
                  <p className="text-xs text-muted-foreground">
                    Uses Midjourney's raw mode for less opinionated, more literal interpretations. Good for photorealistic or specific styles.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-1">--sref (Style Reference)</h3>
                  <p className="text-xs text-muted-foreground">
                    Provide image URLs to influence the visual style. Maximum 3 URLs. Must be Midjourney image links (s.mj.run).
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-1">--sw (Style Weight)</h3>
                  <p className="text-xs text-muted-foreground">
                    Range: 0-1000. Only works WITH --sref. Controls how much the style reference influences the output. Higher = more influence.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-1">--seed</h3>
                  <p className="text-xs text-muted-foreground">
                    Use a specific number (0-4294967295) to get reproducible results. Same prompt + seed = similar images.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="formula" className="space-y-3 mt-4">
            <Card className="shadow-none">
              <CardContent className="pt-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-sm mb-1">🎬 The Cinematic Formula</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    A proven structure that creates powerful, cohesive imagery. Follow this order:
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex gap-2">
                      <span className="font-mono bg-muted px-2 py-0.5 rounded">1.</span>
                      <div>
                        <strong>Character + Action</strong>
                        <p className="text-muted-foreground">e.g., "a lone climber ascending"</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-mono bg-muted px-2 py-0.5 rounded">2.</span>
                      <div>
                        <strong>Environment + Key Geometry</strong>
                        <p className="text-muted-foreground">e.g., "a circular portal in a snow ridge"</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-mono bg-muted px-2 py-0.5 rounded">3.</span>
                      <div>
                        <strong>Light Behavior + Color Contrast</strong>
                        <p className="text-muted-foreground">e.g., "orange glow and blue mist"</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-mono bg-muted px-2 py-0.5 rounded">4.</span>
                      <div>
                        <strong>Atmosphere + Cinematic Tone</strong>
                        <p className="text-muted-foreground">e.g., "volumetric mist, reflective textures"</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-mono bg-muted px-2 py-0.5 rounded">5.</span>
                      <div>
                        <strong>Emotional Cue</strong>
                        <p className="text-muted-foreground">e.g., "quiet awe and transcendence"</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-mono bg-muted px-2 py-0.5 rounded">6.</span>
                      <div>
                        <strong>Technical Parameters</strong>
                        <p className="text-muted-foreground">--ar 3:2 --chaos 55 --stylize 700 --raw --sref ... --sw 650</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-1">🎨 The Tonal Equation</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Keep these four qualities in balance:
                  </p>
                  <div className="space-y-1.5 text-xs">
                    <div>
                      <strong>Isolation:</strong> Single subject or small focus point for minimal composition
                    </div>
                    <div>
                      <strong>Geometry:</strong> Bold, simple shape (portal, disc, monolith) creates visual logic
                    </div>
                    <div>
                      <strong>Color Duality:</strong> One warm + one cool (orange/blue, red/blue) for cinematic energy
                    </div>
                    <div>
                      <strong>Atmospheric Softness:</strong> Snow, fog, mist to blend and avoid hard sci-fi
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-1">⚙️ Ideal Parameter Ranges</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>--chaos</span>
                      <span className="text-muted-foreground">45-60 (cinematic variance)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>--stylize</span>
                      <span className="text-muted-foreground">600-800 (minimal sci-fi tone)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>--ar</span>
                      <span className="text-muted-foreground">3:2 (perfect cinematic framing)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>--raw</span>
                      <span className="text-muted-foreground">recommended (realistic materials)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>--sw</span>
                      <span className="text-muted-foreground">650 (locks style consistency)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-xs font-semibold mb-1">💡 Pro Tip</p>
                  <p className="text-xs text-muted-foreground">
                    Use the <strong>Cinematic Formula Helpers</strong> card in the editor to quickly insert proven geometries, color dualities, atmospheres, and emotional tones. One click applies all ideal parameters!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="syntax" className="space-y-3 mt-4">
            <Card className="shadow-none">
              <CardContent className="pt-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-sm mb-1">✅ Correct Flag Order</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Flags must appear in this order:
                  </p>
                  <code className="text-xs bg-muted p-2 rounded block">
                    --ar → --stylize → --chaos → --raw → --profile → --sref → --sw → --seed
                  </code>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-1">❌ Common Mistakes</h3>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Using --sw without --sref (will be ignored)</li>
                    <li>Using single hyphen (-) instead of double (--)</li>
                    <li>Adding line breaks in the prompt</li>
                    <li>Using more than 3 style reference URLs</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-1">✏️ Text Structure</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Best practice order (comma-separated):
                  </p>
                  <code className="text-xs bg-muted p-2 rounded block">
                    subject, setting, action, lighting, art direction, extras
                  </code>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-1">🔗 Style Reference URLs</h3>
                  <p className="text-xs text-muted-foreground">
                    Must start with https://s.mj.run/ or similar Midjourney domains. Regular image URLs won't work.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips" className="space-y-3 mt-4">
            <Card className="shadow-none">
              <CardContent className="pt-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-sm mb-1">💡 Lighting is Key</h3>
                  <p className="text-xs text-muted-foreground">
                    Always specify lighting! It's the most important factor. Examples: "golden hour light", "soft rim lighting", "dramatic shadows", "neon glow".
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-1">🎨 Be Specific</h3>
                  <p className="text-xs text-muted-foreground">
                    Avoid vague terms. Instead of "futuristic", say "chrome surfaces with holographic displays". Instead of "beautiful", describe actual visual qualities.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-1">📷 Camera & Composition</h3>
                  <p className="text-xs text-muted-foreground">
                    Add camera angles and composition notes: "wide angle shot", "shallow depth of field", "overhead view", "cinematic composition".
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-1">🎬 Reference Styles</h3>
                  <p className="text-xs text-muted-foreground">
                    Mention photography/art styles: "shot on Arri Alexa", "National Geographic style", "editorial fashion photography", "ukiyo-e art".
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-1">⚡ Start Simple with AI</h3>
                  <p className="text-xs text-muted-foreground">
                    Use the "Generate Options" feature with a basic idea. The AI will add professional details, proper lighting, and creative enhancements.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-1">🔄 Iterate with Seeds</h3>
                  <p className="text-xs text-muted-foreground">
                    Found an image you like? Use its seed number to generate similar variations while tweaking your prompt.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

