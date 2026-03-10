import { TextStyle } from 'react-native';

export const Typography: Record<string, TextStyle> = {
  h1: { fontSize: 30, fontWeight: '700', lineHeight: 38 },
  h2: { fontSize: 24, fontWeight: '700', lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
  h4: { fontSize: 17, fontWeight: '600', lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 26 },
  bodyMedium: { fontSize: 16, fontWeight: '500', lineHeight: 26 },
  caption: { fontSize: 13, fontWeight: '400', lineHeight: 20 },
  label: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
  labelSmall: { fontSize: 12, fontWeight: '500', lineHeight: 18 },
};
