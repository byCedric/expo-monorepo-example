import { useColorScheme as useRNColorScheme } from 'react-native';

// React Native 0.85 widened `ColorSchemeName` to `'light' | 'dark' | 'unspecified'`.
// Normalize it down to the two values our theme is keyed by.
export function useColorScheme(): 'light' | 'dark' {
  return useRNColorScheme() === 'dark' ? 'dark' : 'light';
}
