import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const themes = ['light', 'dark', 'playful'];

  return (
    <div className="flex gap-2">
      {themes.map(t => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`p-2 rounded ${theme === t ? 'bg-accent-color' : ''}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
};
