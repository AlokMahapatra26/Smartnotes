import { db } from "@/db";
import { notes } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || "";

  const result = await db
    .select({ id: notes.id }) // 👈 only select the ID
    .from(notes)
    .where(eq(notes.authorId, userId))
    .orderBy(desc(notes.createdAt))
    .limit(1);

  const newestNoteId = result[0]?.id;

  return NextResponse.json({
    newestNoteId,
  });
}
