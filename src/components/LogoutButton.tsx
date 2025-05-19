"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import "@/styles/globals.css"

function LogoutButton() {

    const [loading , setloading] = useState(false)
    const router = useRouter()

    const handleLogOut = async () => {
        setloading(true)

        await new Promise((resolve) => setTimeout(resolve , 2000))

        const errorMessage = 0

        if(!errorMessage){
            toast.success("Logout successfully")
            router.push("/login")
        }else{
            toast.error("Error while Logout ", {
                description : errorMessage
            })
        }

        setloading(false)
        console.log("Logging out..")
    }

  return (
    <Button   disabled={loading} variant="destructive" onClick={handleLogOut}>
        {loading ? <Loader2 className='animate-spin'/> : <LogOut className=''/>}
    </Button>
  )
}

export default LogoutButton