"use client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { CardContent } from "./ui/card"
import { CardFooter } from "./ui/card"
import { Input } from "@/components/ui/input"
import { useTransition } from "react"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"

type Props = {
    type : "login" | "signup"
}

function AuthForm({type}:Props) {

    const isLoginForm = type === "login"
    const isSignupForm = type === "signup"

    const router = useRouter()

    const [isPending , startTransition] =  useTransition();

    const handleSubmit = (formData : FormData) => {
        console.log("form submitted")
    }
    

  return (
    <form action={handleSubmit}>
        <CardContent className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="Enter your email" type="email" required disabled={isPending}/>
            </div>
             <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" placeholder="Enter your password" type="password" required disabled={isPending}/>
            </div>
            
        </CardContent>
        <br />
        <CardFooter className="mt-4 flex flex-col gap-6">
            <Button className="w-full">{isPending ? ( <Loader2 className="animate-spin"/> ) : isLoginForm ? "Login" : "Sign Up"}</Button>
            <p className="text-xs">
                {isLoginForm ? "Dont have an account yet ? " : "Already have an account ? "}{"  "}
                <Link className={`underline text-blue-500 ${isPending ? " pointer-event-none opacity-50" : ""}`} href={isLoginForm ? "/signup" : "/login"}>{isLoginForm ? "signup" : "login"}</Link>
            </p>
        </CardFooter>
    </form>
  )
}

export default AuthForm



