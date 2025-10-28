# Midjourney Prompt Generator

A clean, distraction-free dashboard for crafting professional Midjourney prompts. Features a structured editor, AI-powered enhancement, and a comprehensive cinematic formula system for consistent, high-quality results.

![Built with Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

**Built with [Cursor](https://cursor.sh) and Claude 4.5 Sonnet**

## ✨ Features

### 🎨 Prompt Building
- **Structured Editor**: Separate inputs for subject, setting, action, lighting, art direction, and extras
- **Cinematic Formula Helpers**: Quick-insert proven geometric elements, color dualities, atmospheres, and emotional tones
- **Real-time Preview**: See your assembled Midjourney command as you type
- **Parameter Controls**: Fine-tune aspect ratio, stylize (0-1000), chaos (0-100), raw mode, style weight, and seed

### 🤖 AI-Powered
- **Generate from Idea**: Describe a concept and get 3 detailed, professional prompt options
- **GPT-5 Integration**: AI follows the proven cinematic formula for consistent quality
- **Smart Enhancement**: Automatically adds proper lighting, geometry, color contrast, and atmosphere

### 💾 Database & Management
- **Save Prompts**: Name and save your prompts for later use
- **Saved Prompts View**: Browse, search, and manage all saved prompts in a grid layout
- **Quick Load**: Load any saved prompt back into the editor with one click

### 📚 Guidance & Help
- **Cinematic Formula**: Proven structure for powerful, cohesive imagery
- **Parameter Tooltips**: Inline help explaining every Midjourney parameter
- **Help Dialog**: Comprehensive guide with tabs for parameters, formula, syntax, and pro tips
- **Inspiration Links**: Quick access to Lummi.ai and Midjourney Explore

### 🎯 Professional Features
- **Proper Syntax Enforcement**: Correct flag order, double hyphens, query string stripping
- **Style References**: Support for up to 3 --sref URLs with style weight control
- **Token Counter**: Track word and character count
- **Keyboard Shortcuts**: Copy with 'C' key, generate with Cmd/Ctrl+Enter
- **Multi-View Dashboard**: Toggle between Editor and Saved Prompts views

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/actanonverbos/midjourney-prompt-generator.git
cd midjourney-prompt-generator
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy the example environment file and add your OpenAI API key:
```bash
cp env.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY="your-openai-api-key-here"
```

4. **Initialize the database**
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Documentation

Comprehensive guides are available in the `/docs` directory:

- **[Setup Guide](docs/SETUP.md)** - Detailed installation and configuration instructions
- **[Quick Start](docs/QUICK_START.md)** - Learn the UI and basic workflows
- **[Cinematic Formula](docs/CINEMATIC_FORMULA.md)** - Master the proven prompt structure

## 🎬 The Cinematic Formula

This app implements a battle-tested formula for creating powerful Midjourney prompts:

1. **Character + Action** - Who/what and what they're doing
2. **Environment + Key Geometry** - Setting with bold geometric element (portal, disc, ring, monolith)
3. **Light + Color Contrast** - Warm + cool color duality (orange/blue, cyan/magenta)
4. **Atmosphere + Cinematic Tone** - Diffusion elements (mist, fog, snow) and textures
5. **Emotional Cue** - Mood descriptor (quiet awe, silent revelation)
6. **Technical Parameters** - Flags in correct order

**Ideal Parameters:**
- `--chaos 45-60` for cinematic variance
- `--stylize 600-800` for refined lighting
- `--ar 3:2` for perfect cinematic framing
- `--raw` for realistic materials

Read the full [Cinematic Formula Guide](docs/CINEMATIC_FORMULA.md) for details.

## 🎯 Usage Examples

### Manual Prompt Building
1. Click the ✏️ **Prompt Editor** button in sidebar
2. Fill in structured fields (subject, setting, action, lighting, art direction, extras)
3. Use **Cinematic Helpers** to quick-insert proven elements
4. Adjust parameters (aspect ratio, stylize, chaos, etc.)
5. Click **Copy** (or press 'C') to copy the prompt
6. Paste into Midjourney with `/imagine`

### AI Generation
1. Click ✨ **Generate from Idea** in sidebar
2. Enter a simple concept (e.g., "a cyberpunk street vendor at night")
3. Review 3 AI-generated options with full structure
4. Click any option to load it into the editor
5. Refine and copy your favorite

### Saving & Reusing
1. Build a great prompt
2. Click 💾 **Save** in sidebar
3. Enter a memorable name
4. Switch to 📁 **Saved Prompts** view
5. Browse, search, and load any saved prompt

## 🏗️ Tech Stack

- **[Next.js 14+](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[ShadCN UI](https://ui.shadcn.com/)** - Beautiful, accessible components
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Prisma](https://www.prisma.io/)** - Type-safe database ORM
- **[SQLite](https://www.sqlite.org/)** - Lightweight local database
- **[OpenAI GPT-5](https://openai.com/)** - AI-powered prompt generation
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

## 📁 Project Structure

```
midjourney-prompt-generator/
├── app/
│   ├── page.tsx                    # Main dashboard with editor and saved views
│   ├── layout.tsx                  # Root layout
│   └── api/
│       ├── prompts/                # Prompt CRUD endpoints
│       └── compose/                # AI generation endpoint
├── components/
│   ├── ui/                         # ShadCN UI components
│   ├── sidebar.tsx                 # Navigation sidebar
│   ├── cinematic-helpers.tsx       # Formula quick-insert tools
│   ├── save-prompt-dialog.tsx      # Save prompt modal
│   ├── saved-prompts-view.tsx      # Saved prompts grid view
│   ├── generate-modal.tsx          # AI generation modal
│   ├── help-dialog.tsx             # Comprehensive help system
│   └── info-tooltip.tsx            # Parameter info tooltips
├── lib/
│   ├── promptBuilder.ts            # Prompt assembly logic
│   ├── prisma.ts                   # Prisma client singleton
│   ├── types.ts                    # Shared TypeScript types
│   └── utils.ts                    # Utility functions
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── seed.ts                     # Default preset data
├── docs/                           # Documentation
└── env.example                     # Environment template
```

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database GUI
npx prisma studio

# Format code
npm run format

# Lint code
npm run lint
```

### Database Management

```bash
# View/edit database
npx prisma studio

# Create migration after schema changes
npx prisma migrate dev --name your_migration_name

# Reset database (deletes all data)
npx prisma migrate reset

# Re-seed database
npx prisma db seed
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add `OPENAI_API_KEY` environment variable
4. Deploy

Note: SQLite is not supported on Vercel. For production, migrate to PostgreSQL:
- Update `prisma/schema.prisma` datasource to `postgresql`
- Add `DATABASE_URL` with your PostgreSQL connection string
- Run `npx prisma migrate dev`

### Other Platforms

For platforms supporting SQLite (e.g., Railway, Render with persistent volumes):
1. Set environment variables
2. Run build command: `npm run build`
3. Run start command: `npm start`
4. Ensure database file is in persistent storage

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Cursor](https://cursor.sh) - The AI-first code editor
- Powered by [Claude 4.5 Sonnet](https://www.anthropic.com/claude) - Anthropic's AI assistant
- UI components from [ShadCN UI](https://ui.shadcn.com/)
- Inspired by the Midjourney community and proven prompt engineering techniques

## 📧 Support

For issues, questions, or suggestions:
- Open an [issue on GitHub](https://github.com/actanonverbos/midjourney-prompt-generator/issues)
- Check the [documentation](docs/)

---

**Star ⭐ this repo if you find it helpful!**
