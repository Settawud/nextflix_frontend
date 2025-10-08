'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const useIsDarkTheme = () => {
  const { resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return true;
  }

  const effective = resolvedTheme ?? theme ?? 'dark';
  return effective === 'dark';
};
