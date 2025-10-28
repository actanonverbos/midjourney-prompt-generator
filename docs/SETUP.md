# Quick Setup Guide

## Initial Setup

The project has been fully configured and is ready to use! Here's what's already done:

✅ Next.js 14+ with TypeScript and App Router
✅ ShadCN UI components installed
✅ Prisma with SQLite database configured
✅ Database schema created and migrated
✅ Default presets seeded (Climb, Summit, Beacon)
✅ OpenAI integration ready

## Required: Add Your OpenAI API Key

1. Copy the example environment file:

```bash
cp env.example .env.local
```

2. Add your OpenAI API key by editing `.env.local`:

```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY=your-openai-api-key-here
```

Get your API key from: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

## Running the Application

The dev server should already be running! If not, start it with:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## What You'll See

- **Left Column**: Prompt builder with fields for subject, setting, action, lighting, art direction, and extras, plus parameter controls
- **Right Column**: Live preview, AI enhancement button, copy/save/reset tools, and quick-start presets
- **Three Default Presets**: Climb, Summit, and Beacon - click any tab to load them instantly

## Key Features to Try

1. **Manual Prompt Building**
   - Fill in the text fields
   - Adjust sliders for stylize, chaos, and style weight
   - Add style reference URLs
   - Watch the preview update in real-time
   - Click "Copy" to copy to clipboard

2. **AI Enhancement**
   - Fill in basic prompt details
   - Click "AI Enhance"
   - Get an optimized prompt plus 2 variants
   - Copy any variant with one click

3. **Preset Management**
   - Click "Manage" in Quick Start section
   - Save current prompt as a new preset
   - Edit or delete existing presets
   - Load presets from the tabs

4. **Save Prompts**
   - Click "Save" to store prompts in the database
   - Access saved prompts through the API at `/api/prompts`

## Helpful Commands

```bash
# View/edit database in GUI
npm run db:studio

# Re-seed the database with default presets
npm run db:seed

# Create a new database migration
npm run db:migrate
```

## Notes

- The database file (`dev.db`) is stored in the root directory
- All data persists between sessions
- Style references are automatically cleaned (query strings stripped by default)
- Prompts are formatted exactly as Midjourney expects them

## Troubleshooting

**AI Enhancement not working?**
- Make sure `OPENAI_API_KEY` is set in `.env.local`
- Restart the dev server after adding the API key
- Check the browser console for any error messages

**Database errors?**
- Run `npm run db:migrate` to ensure schema is up to date
- Check that `DATABASE_URL` is set in `.env.local`

**UI components not rendering?**
- Clear `.next` directory: `rm -rf .next`
- Restart dev server: `npm run dev`

Enjoy crafting beautiful Midjourney prompts! 🎨

