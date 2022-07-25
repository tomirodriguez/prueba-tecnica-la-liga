import { createContext } from 'react';

interface ContextProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext({} as ContextProps);
