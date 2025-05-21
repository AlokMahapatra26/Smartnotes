"use server"
import { getUser } from "@/auth/server";
import { handleError } from "@/lib/utils";
import { db } from "@/db";
import { notes } from "@/db/schema";
import { and , eq } from "drizzle-orm";

export const createNoteAction = async (noteId: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to create a note");

    await db.insert(notes).values({
        id: noteId,
        authorId: user.id,
        text: "",
    });

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};


export const updateNoteAction = async (noteId: string, text: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to update a note");

    await db
        .update(notes)
        .set({ text })
        .where(eq(notes.id, noteId));

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};


export const deleteNoteAction = async (noteId: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to delete a note");

    await db
  .delete(notes)
  .where(
    and(eq(notes.id, noteId), eq(notes.authorId, user.id))
  );

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};