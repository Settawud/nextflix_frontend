"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="dark"
    disableTransitionOnChange
    {...props}
  >
    {children}
  </NextThemesProvider>
);

export { useTheme } from "next-themes";
