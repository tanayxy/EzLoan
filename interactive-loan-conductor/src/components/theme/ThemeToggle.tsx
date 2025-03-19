
import { Button } from "@/components/ui/button";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Fix for hydration issues and ensuring theme persistence across tabs
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="rounded-full transition-all border-bank-primary/40 w-9 h-9 relative overflow-hidden"
        aria-label="Toggle theme"
        disabled
      >
        <SunMoon className="h-5 w-5 text-bank-primary absolute animate-pulse" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full transition-all duration-500 hover:scale-110 border-bank-primary/40 hover:border-bank-primary hover:shadow-glow-sm w-9 h-9 relative overflow-hidden"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <Moon className="h-[18px] w-[18px] text-bank-primary transition-all absolute" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-bank-primary/5 to-bank-primary/10 animate-spin-slow rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
        </div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          <Sun className="h-[18px] w-[18px] text-bank-primary transition-all absolute" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-bank-primary/10 to-bank-primary/20 animate-spin-slow rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
        </div>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
