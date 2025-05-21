"use client"
import { User } from "@supabase/supabase-js"

type Props = {
    users: User | null ;
}

function AskAIButton({users} : Props) {
    console.log(users?.email)
  return (
    <div>AskAIButton</div>
  )
}

export default AskAIButton