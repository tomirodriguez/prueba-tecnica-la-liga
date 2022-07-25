import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export const useIsDarkMode = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return { isDarkMode, toggleDarkMode };
};
