import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const prompts = await prisma.prompt.findMany({
      orderBy: { updatedAt: "desc" },
    });
    // Ensure all prompts have a name field (for backwards compatibility)
    const promptsWithNames = prompts.map(p => ({
      ...p,
      name: p.name || "Untitled Prompt"
    }));
    return NextResponse.json(promptsWithNames);
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompts" },
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
      name: body.name || "Untitled Prompt",
      styleRefs: JSON.stringify(body.styleRefs || []),
      profileIds: JSON.stringify(body.profileIds || []),
    };
    
    const prompt = await prisma.prompt.create({ data });
    return NextResponse.json(prompt);
  } catch (error) {
    console.error("Error creating prompt:", error);
    return NextResponse.json(
      { error: "Failed to create prompt" },
      { status: 500 }
    );
  }
}

