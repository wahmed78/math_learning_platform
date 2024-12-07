import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  return { theme, setTheme };
};