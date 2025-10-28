# Quick Start Guide - Midjourney Prompt Generator

## ✅ System Status

All features are fully functional and tested:
- ✅ Next.js app running on http://localhost:3000
- ✅ Database connected (SQLite with 3 presets loaded)
- ✅ OpenAI API connected and working
- ✅ All API endpoints responding correctly

## 🎯 How to Use

### 1. Access the Dashboard
Open your browser and navigate to:
```
http://localhost:3000
```

### 2. Start with a Simple Idea (Recommended)

**The easiest way to begin:**

1. Type your basic idea in the **"Start with an Idea"** box at the top:
   - Example: "a cyberpunk street vendor in a neon-lit alley at night"
   - Example: "mountain climber reaching summit at sunrise"
   - Example: "floating geometric shapes in minimal space"

2. Click **"Generate Options"** (or press `Cmd/Ctrl + Enter`)

3. AI generates 3 structured prompt options with:
   - Complete Midjourney-ready command
   - Proper parameter formatting
   - Different creative interpretations

4. **Click any option** to instantly load it into the editor below

5. **Fine-tune if needed** using the structured fields

6. Press **`C` key** or click **Copy** button to copy to clipboard

7. Paste directly into Discord after `/imagine`

### 3. Build a Prompt Manually (Advanced)

**Left Column - Prompt Builder:**
1. Fill in the creative fields:
   - **Subject**: Who or what (e.g., "lone futuristic climber on a snow ridge")
   - **Setting**: Where it takes place (e.g., "dark blizzard, jagged peaks")
   - **Action**: What's happening (e.g., "ascending toward a glowing monolith")
   - **Lighting**: How the scene is lit (e.g., "soft rim light, neon reflections")
   - **Art Direction**: Stylistic tone (e.g., "editorial sci-fi minimalism")
   - **Extras**: Additional details (e.g., "cinematic composition")

2. Adjust parameters with sliders:
   - **Aspect Ratio**: Choose from presets (16:9, 1:1, 3:2, etc.)
   - **Stylize** (0-1000): Control AI interpretation strength
   - **Chaos** (0-100): Add variation to results
   - **Style Weight** (0-1000): How much to weight style references
   - **Raw Mode**: Toggle for less opinionated output

3. Add optional enhancements:
   - **Style References**: Paste Midjourney image URLs
   - **Profile IDs**: Add your custom Midjourney profile IDs
   - **Seed**: For reproducible results

**Right Column - Preview & Actions:**
- Watch the **Prompt Preview** update in real-time
- See **token count** (words/characters)
- Press **`C`** key or click **Copy** to copy prompt to clipboard
- Click **Save** to store prompt in database

### 4. Use AI Enhancement on Existing Fields

1. Fill in your basic prompt elements in the structured fields
2. Click the **AI Enhance** button
3. Wait a few seconds for GPT-5 to generate:
   - One optimized main prompt
   - Two creative variants
   - A notes section explaining the choices
4. Copy any version you like with one click

### 5. Work with Presets

**Load a Preset:**
1. Go to the **Quick Start** section (bottom right)
2. Click tabs: **Climb**, **Summit**, or **Beacon**
3. Click "Load" to instantly fill all fields

**Create Your Own Preset:**
1. Build a prompt you like
2. Click **Manage** in the Quick Start section
3. Enter a name and click **Create**
4. Your preset is now saved!

**Edit or Delete Presets:**
1. Click **Manage** in Quick Start
2. Use Edit (pencil) or Delete (trash) icons
3. Rename presets inline by clicking Edit

## 🔥 Example Workflows

### Fastest Workflow (Beginner-Friendly):
1. Type idea: "cyberpunk street vendor in neon alley at night"
2. Press `Cmd/Ctrl + Enter` to generate
3. Click your favorite option from the 3 generated
4. Press `C` key to copy
5. Paste into Discord after `/imagine`

**Total time: 15 seconds!**

### Quick Preset Workflow:
1. Click **Climb** preset tab → loads example prompt
2. Tweak any fields you want
3. Press `C` to copy
4. Paste into Discord after `/imagine`

### Advanced Custom Workflow:
1. Type idea: "cyberpunk street vendor"
2. Generate options and pick one
3. Fine-tune: Adjust Stylize to 900, Chaos to 40
4. Add: Style reference URL if you have one
5. Click **AI Enhance** for additional variants
6. Choose best variant and press `C` to copy
7. Click **Save** to store for later
8. Click **Manage** → save as preset "Cyberpunk Vendor"

## 📝 Tips & Tricks

1. **Start Simple**: Type a basic idea first, let AI expand it into structured prompts
2. **Keyboard Shortcuts**: 
   - Press `C` to copy (when not typing in a field)
   - Press `Cmd/Ctrl + Enter` in the idea box to generate
3. **Click to Load**: Generated options are clickable - just click to apply!
4. **Use AI Enhancement**: It optimizes order, removes duplicates, and fixes formatting
5. **Style References**: Limit to 2-3 URLs for best results
6. **Stylize Values**:
   - Low (0-300): More literal interpretation
   - Medium (400-700): Balanced creativity
   - High (800-1000): More artistic interpretation
7. **Chaos Values**:
   - Low (0-20): Consistent results
   - Medium (25-50): Some variation
   - High (50-100): Wild variation
8. **Save Often**: Create presets for styles you use frequently

## 🚀 Advanced Features

### Direct API Access

**Get all presets:**
```bash
curl http://localhost:3000/api/presets
```

**Generate AI prompt:**
```bash
curl -X POST http://localhost:3000/api/compose \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "your subject",
    "setting": "your setting",
    "action": "your action",
    "lighting": "your lighting",
    "art_direction": "your art direction",
    "extras": "your extras",
    "params": {
      "ar": "16:9",
      "stylize": 700,
      "chaos": 30,
      "raw": false,
      "profiles": [],
      "srefs": [],
      "strip_query": true,
      "max_srefs": 3
    }
  }'
```

## 🎨 Example Prompts to Try

**Sci-Fi Explorer:**
- Subject: "lone astronaut"
- Setting: "alien planet with two moons"
- Action: "discovering ancient ruins"
- Lighting: "bioluminescent glow, star field"
- Art Direction: "cinematic sci-fi realism"
- Stylize: 800, Chaos: 40

**Moody Portrait:**
- Subject: "contemplative figure"
- Setting: "abandoned library, dusty shelves"
- Action: "reading by candlelight"
- Lighting: "warm amber glow, dramatic shadows"
- Art Direction: "editorial photography, muted tones"
- Stylize: 600, Chaos: 20

**Abstract Architecture:**
- Subject: "impossible geometric structure"
- Setting: "minimal void, gradient sky"
- Action: "floating weightlessly"
- Lighting: "studio lighting, clean reflections"
- Art Direction: "brutalist minimalism"
- Stylize: 900, Chaos: 10

## 🛠️ Troubleshooting

**Problem:** Presets not loading
- **Solution**: Refresh the page, check database is running

**Problem:** AI Enhancement not working
- **Solution**: Check OPENAI_API_KEY in .env.local

**Problem:** Copy button not working
- **Solution**: Check browser permissions for clipboard access

**Problem:** Prompt looks wrong
- **Solution**: Click Reset and start over, or load a preset

## 📚 Next Steps

1. **Experiment**: Try all three default presets
2. **Learn**: See how AI Enhancement improves your prompts
3. **Create**: Build 3-5 presets for your favorite styles
4. **Iterate**: Use seeds to refine specific images
5. **Share**: Export presets to JSON for team members

---

**Enjoy creating amazing Midjourney prompts!** 🎨✨

