// src/theme/useTheme.js
import { useColorScheme } from 'react-native';
import { getColors, space, radius, CATEGORY_META } from './theme.js';

// One hook: gives the active palette (follows system light/dark) plus tokens.
export function useTheme() {
  const scheme = useColorScheme(); // 'light' | 'dark' | null
  const colors = getColors(scheme);
  return { colors, space, radius, CATEGORY_META, scheme: scheme || 'light' };
}