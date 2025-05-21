import { db } from "@/db";
import { notes } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || "";

  const inserted = await db.insert(notes).values({
    authorId: userId,
    text: "",
  }).returning();

  // inserted is an array; usually just one row since we inserted one
  const id = inserted[0]?.id;

  return NextResponse.json({
    noteId: id,
  });
}
