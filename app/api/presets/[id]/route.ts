import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const preset = await prisma.preset.findUnique({
      where: { id },
    });
    
    if (!preset) {
      return NextResponse.json(
        { error: "Preset not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(preset);
  } catch (error) {
    console.error("Error fetching preset:", error);
    return NextResponse.json(
      { error: "Failed to fetch preset" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Ensure arrays are serialized as JSON strings
    const data = {
      ...body,
      styleRefs: JSON.stringify(body.styleRefs || []),
      profileIds: JSON.stringify(body.profileIds || []),
    };
    
    const preset = await prisma.preset.update({
      where: { id },
      data,
    });
    
    return NextResponse.json(preset);
  } catch (error) {
    console.error("Error updating preset:", error);
    return NextResponse.json(
      { error: "Failed to update preset" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.preset.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting preset:", error);
    return NextResponse.json(
      { error: "Failed to delete preset" },
      { status: 500 }
    );
  }
}

