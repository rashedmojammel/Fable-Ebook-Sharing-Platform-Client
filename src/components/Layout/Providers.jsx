"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
    </ThemeProvider>
  );
}