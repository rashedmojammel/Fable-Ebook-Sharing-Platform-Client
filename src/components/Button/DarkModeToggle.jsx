"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "@gravity-ui/icons";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        w-9 h-9
        rounded-xl
        flex items-center justify-center
        border border-gray-200 dark:border-zinc-700
        bg-white dark:bg-zinc-800
        text-gray-600 dark:text-zinc-300
        hover:bg-gray-100 dark:hover:bg-zinc-700
        transition-all duration-200
        shadow-sm
      "
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}