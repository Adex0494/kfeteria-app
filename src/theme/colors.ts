export const colors = {
  carbon: '#1C1C1E',
  coffeeDarkBrown: '#3B2F2A',
  goldPrimary: '#D4AF37',
  beigeSurface: '#F5E9D6',
  ivoryBackground: '#FAF7F2',
  whiteCards: '#FFFFFF',
  mutedText: '#6B625A',
  successGreen: '#16A34A',
  warningAmber: '#F59E0B',
  dangerRed: '#DC2626',
} as const;

export type ColorToken = keyof typeof colors;
