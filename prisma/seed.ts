import { PrismaClient } from "../lib/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with default presets...");

  // Clear existing presets (optional)
  await prisma.preset.deleteMany({});

  // Create default presets
  const climb = await prisma.preset.create({
    data: {
      name: "Climb",
      subject: "lone futuristic climber on a snow ridge",
      setting: "dark blizzard, jagged peaks, reflective ice",
      action: "ascending toward a glowing obsidian monolith",
      lighting: "soft rim light, neon reflections, volumetric mist",
      artDirection: "editorial sci-fi minimalism, web3 tone",
      extras: "cinematic composition, atmospheric perspective, reflective textures",
      aspectRatio: "3:2",
      stylize: 700,
      chaos: 55,
      raw: true,
      styleWeight: 650,
      stripQueryStrings: true,
      styleRefs: JSON.stringify([
        "https://s.mj.run/AXLYHDNd5Ao",
        "https://s.mj.run/xFZ89e3Blpo",
      ]),
      profileIds: JSON.stringify([]),
    },
  });

  const summit = await prisma.preset.create({
    data: {
      name: "Summit",
      subject: "explorer reaching mountain peak at dawn",
      setting: "ice-covered summit, crystal clear sky, distant valleys below",
      action: "planting illuminated beacon on highest point",
      lighting: "golden hour light, lens flares, god rays through clouds",
      artDirection: "epic landscape photography, heroic composition",
      extras: "wide angle, dramatic scale, triumph and achievement",
      aspectRatio: "16:9",
      stylize: 800,
      chaos: 30,
      raw: false,
      styleWeight: 500,
      stripQueryStrings: true,
      styleRefs: JSON.stringify([]),
      profileIds: JSON.stringify([]),
    },
  });

  const beacon = await prisma.preset.create({
    data: {
      name: "Beacon",
      subject: "geometric light structure floating in atmosphere",
      setting: "minimal void, soft gradient sky, weightless environment",
      action: "pulsing with rhythmic energy, casting perfect shadows",
      lighting: "studio lighting, clean specular highlights, ambient occlusion",
      artDirection: "architectural visualization, brutalist minimalism",
      extras: "perfect symmetry, sharp edges, glass and chrome materials",
      aspectRatio: "1:1",
      stylize: 900,
      chaos: 10,
      raw: true,
      styleWeight: 700,
      stripQueryStrings: true,
      styleRefs: JSON.stringify([]),
      profileIds: JSON.stringify([]),
    },
  });

  console.log("✅ Created presets:", {
    climb: climb.name,
    summit: summit.name,
    beacon: beacon.name,
  });
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

