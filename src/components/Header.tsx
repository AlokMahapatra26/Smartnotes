
import Link from "next/link";
import { Button } from "@/components/ui/button";
import "@/styles/globals.css";
import { ModeToggle } from "@/components/DarkModeToggle";
import LogoutButton from "@/components/LogoutButton";

import { getUser } from "@/auth/server";
import { SidebarTrigger } from "./ui/sidebar";

async function Header() {
  const user = await getUser();
  

  return (
    <header className="w-full bg-popover text-popover-foreground shadow-md">
      
      <div className="container mx-auto flex items-center justify-between p-4">
        <SidebarTrigger/>
        <Link href="/" className="text-lg font-semibold">
          SmartNotes
        </Link>

        {/* Desktop Menu */}
        <nav className="flex items-center gap-4">
          {user ? (
            <LogoutButton />
          ) : (
            <>
              <Button asChild>
                <Link href="/signup">Signup</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}
          <ModeToggle />
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          
        </div>
      </div>

      
      
    </header>
  );
}

export default Header;