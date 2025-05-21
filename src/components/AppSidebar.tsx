import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import SidebarGroupContent from "./SidebarGroupContent" 

import Link from "next/link"
import { getUser } from "@/auth/server"
import { notes } from "@/db/schema"
import { desc, eq } from "drizzle-orm";
import { db } from "@/db/index";


export async function AppSidebar() {

  const user = await getUser()

  let userNotes: {
    id: string;
    text: string;
    authorId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  }[] = []


  if (user) {
    userNotes = await db
      .select()
      .from(notes)
      .where(eq(notes.authorId, user.id))
      .orderBy(desc(notes.updatedAt));
}

  return (
    <Sidebar>
      
      <SidebarContent className="custom-scrollbar">
       <SidebarGroup>
        <SidebarGroupLabel className="mb-2 mt-2 text-lg">
          {user ? ("Your Notes") : (<p><Link href="/login" className="underline">Login</Link> {" "} to see your notes </p>)}
        </SidebarGroupLabel>
        {
          user && (
            <SidebarGroupContent
              notes={userNotes.filter((note) => note.updatedAt !== null) as {
                id: string;
                text: string;
                authorId: string;
                createdAt: Date | null;
                updatedAt: Date;
              }[]}
            />
          )
        }
       </SidebarGroup>
      </SidebarContent>
    
    </Sidebar>
  )
}
