"use server"
import { getUser } from "@/auth/server";
import { handleError } from "@/lib/utils";
import { db } from "@/db";
import { notes } from "@/db/schema";
import { desc , and , eq } from "drizzle-orm";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs"
import openai from "@/openai/index";

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

export const askAIAboutNotesAction = async (
  newQuestions: string[],
  responses: string[],
) => {
  const user = await getUser();
  if (!user) throw new Error("You must be logged in to ask AI questions");

  const userNotes = await db
  .select({
    text: notes.text,
    createdAt: notes.createdAt,
    updatedAt: notes.updatedAt,
  })
  .from(notes)
  .where(eq(notes.authorId, user.id))
  .orderBy(desc(notes.createdAt));

  if (userNotes.length === 0) {
    return "You don't have any notes yet.";
  }

  const formattedNotes = userNotes
    .map((note) =>
      `
      Text: ${note.text}
      Created at: ${note.createdAt}
      Last updated: ${note.updatedAt}
      `.trim(),
    )
    .join("\n");

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "developer",
      content: `
          You are a helpful assistant that answers questions about a user's notes. 
          Assume all questions are related to the user's notes. 
          Make sure that your answers are not too verbose and you speak succinctly. 
          Your responses MUST be formatted in clean, valid HTML with proper structure. 
          Use tags like <p>, <strong>, <em>, <ul>, <ol>, <li>, <h1> to <h6>, and <br> when appropriate. 
          Do NOT wrap the entire response in a single <p> tag unless it's a single paragraph. 
          Avoid inline styles, JavaScript, or custom attributes.
          
          Rendered like this in JSX:
          <p dangerouslySetInnerHTML={{ __html: YOUR_RESPONSE }} />
    
          Here are the user's notes:
          ${formattedNotes}
          `,
    },
  ];

  for (let i = 0; i < newQuestions.length; i++) {
    messages.push({ role: "user", content: newQuestions[i] });
    if (responses.length > i) {
      messages.push({ role: "assistant", content: responses[i] });
    }
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });

  return completion.choices[0].message.content || "A problem has occurred";
};