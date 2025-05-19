"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import "@/styles/globals.css";
import { ModeToggle } from "@/components/DarkModeToggle";
import LogoutButton from "@/components/LogoutButton";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Header() {
  const user = 1; // Simulated user login status
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-popover text-popover-foreground shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-lg font-semibold">
          SmartNotes
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-4">
          {user ? (
            <LogoutButton />
          ) : (
            <>
              <Button asChild>
                <Link href="/signup">Signup</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/signin">Login</Link>
              </Button>
            </>
          )}
          <ModeToggle />
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2 bg-popover text-popover-foreground">
          {user ? (
            <LogoutButton />
          ) : (
            <>
              <Button asChild className="w-full">
                <Link href="/signup">Signup</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/signin">Login</Link>
              </Button>
            </>
          )}
          <ModeToggle />
        </div>
      )}
    </header>
  );
}

export default Header;