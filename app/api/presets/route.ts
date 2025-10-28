import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const presets = await prisma.preset.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(presets);
  } catch (error) {
    console.error("Error fetching presets:", error);
    return NextResponse.json(
      { error: "Failed to fetch presets" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Ensure arrays are serialized as JSON strings
    const data = {
      ...body,
      styleRefs: JSON.stringify(body.styleRefs || []),
      profileIds: JSON.stringify(body.profileIds || []),
    };
    
    const preset = await prisma.preset.create({ data });
    return NextResponse.json(preset);
  } catch (error) {
    console.error("Error creating preset:", error);
    return NextResponse.json(
      { error: "Failed to create preset" },
      { status: 500 }
    );
  }
}

