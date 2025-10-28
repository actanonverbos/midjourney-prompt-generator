# Cinematic Formula Implementation

This document outlines the proven Midjourney prompt formula integrated into the app, based on successful real-world results.

## The Formula

### Structure (Follow this order):
1. **Character + Action** - Specific subject and what they're doing
2. **Environment + Key Geometry** - Setting with bold geometric element (portal, disc, ring, monolith)
3. **Light Behavior + Color Contrast** - Warm + cool color duality (orange/blue, cyan/magenta)
4. **Atmosphere + Cinematic Tone** - Diffusion elements (mist, fog, snow) and textures
5. **Emotional Cue** - Mood descriptor (quiet awe, silent revelation)
6. **Technical Parameters** - Flags in correct order

### The Tonal Equation (Keep balanced):
- **Isolation**: Single subject or small focus point (minimalist composition)
- **Geometry**: One bold, simple shape as visual anchor
- **Color Duality**: Always pair warm + cool colors for cinematic energy
- **Atmospheric Softness**: Fog, mist, snow, or light diffusion to avoid hard sci-fi

### Ideal Parameter Ranges:
- `--chaos 45-60` - Cinematic variance without losing structure
- `--stylize 600-800` - Refined lighting and color harmony for minimal sci-fi tone
- `--ar 3:2` - Perfect cinematic framing (tall enough but not cramped)
- `--raw` - Realistic material quality (not stylized painting effects)
- `--sw 650` - Locks style consistency when using --sref

## Implementation in App

### 1. Cinematic Helpers Component
**Location**: Left column, after Parameters card

**Features**:
- **Apply Cinematic Preset** button - One-click to set ideal parameters (chaos 55, stylize 700, raw mode, 3:2 ratio)
- **Key Geometry** dropdown - Insert proven geometric elements (portals, monoliths, discs)
- **Color Duality** dropdown - Insert warm+cool color pairs (orange/blue, cyan/magenta, etc.)
- **Atmospheric Softness** dropdown - Insert diffusion elements (volumetric mist, crystalline particles)
- **Emotional Tone** dropdown - Insert mood descriptors (quiet awe, silent revelation)

Each dropdown auto-inserts into the appropriate field:
- Geometry → Setting field
- Color Duality → Lighting field
- Atmosphere → Extras field
- Emotion → Extras field

### 2. Updated AI Composer
**Location**: `app/api/compose/route.ts`

The AI system message now explicitly follows the cinematic formula:
- Enforces the 6-part structure
- Maintains tonal equation balance
- Suggests ideal parameter ranges
- Always includes geometric elements
- Always includes color duality
- Always includes atmospheric softness

### 3. Help Dialog Enhancement
**Location**: Help dialog → Formula tab

Added comprehensive "Formula" tab explaining:
- The 6-step structure with examples
- The tonal equation breakdown
- Ideal parameter ranges and why they work
- Pro tip about using Cinematic Helpers

## Example Prompts Following Formula

### Template:
```
[character + action], [environment + key geometry], [light + color contrast], 
[atmosphere + textures], [emotional tone], [art direction] --ar 3:2 --chaos 55 
--stylize 700 --raw --sref [urls] --sw 650
```

### Real Example:
```
a lone futuristic climber ascending, circular portal of light embedded in snow-covered 
mountain wall, glowing orange core radiating into blue mist, crystalline snow catching 
reflections with volumetric fog, quiet awe and transcendence, cinematic editorial sci-fi 
minimalism --ar 3:2 --chaos 55 --stylize 700 --raw --sref https://s.mj.run/example1 
https://s.mj.run/example2 --sw 650
```

## Expansion Axes

To create variations while staying cohesive, change ONE axis at a time:

| Axis | Examples |
|------|----------|
| **Subject** | climber → monk → explorer → scientist → wanderer |
| **Geometry** | portal → disc → pyramid → mirrored ring → floating monolith |
| **Lighting** | orange/blue → cyan/magenta → white/gold → ultraviolet reflections |
| **Weather** | snowstorm → clear dawn → fog field → night aurora |
| **Emotion** | awe → discovery → devotion → solitude → fear |

## Usage Tips

1. **Start with Cinematic Preset**: Click "Apply Cinematic Preset" to set ideal parameters
2. **Use Quick-Insert Dropdowns**: Select from proven geometries, colors, and atmospheres
3. **Follow the Order**: Fill fields in the suggested order (subject → geometry → color → atmosphere → emotion)
4. **Color Duality is Key**: Always include warm + cool color pair in lighting
5. **Don't Skip Atmosphere**: Diffusion elements (mist, fog) are essential for the aesthetic
6. **Consistent Style Refs**: Use the same --sref URLs for visual consistency across a series

## Why This Works

- **Visual Hierarchy**: The order creates clear compositional structure
- **Tension Balance**: Isolation + geometry + color + softness = powerful imagery
- **Cinematic Quality**: Parameters optimized for editorial, minimal aesthetic
- **Reproducibility**: Formula ensures consistent style across generations
- **AI Enhancement**: System knows to add these elements when using Generate modal

## Files Modified

- `/components/cinematic-helpers.tsx` - New helper component
- `/app/page.tsx` - Integration and handler functions
- `/components/help-dialog.tsx` - Formula tab added
- `/app/api/compose/route.ts` - Updated AI system message

---

This formula is battle-tested and produces consistently high-quality, cohesive results. Use the helpers to build prompts faster, or manually follow the structure for full control.

