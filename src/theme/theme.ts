import { TextStyle, ViewStyle } from 'react-native';

import { colors } from '@/theme/colors';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const typography = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
} as const;

export const shadows: Record<'card' | 'hero', ViewStyle> = {
  card: {
    shadowColor: colors.carbon,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
  hero: {
    shadowColor: colors.carbon,
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.14,
    shadowRadius: 28,
    elevation: 8,
  },
};

export const textPresets: Record<'eyebrow' | 'body' | 'label', TextStyle> = {
  eyebrow: {
    fontSize: typography.xs,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  body: {
    fontSize: typography.md,
    lineHeight: 22,
  },
  label: {
    fontSize: typography.sm,
    fontWeight: '600',
  },
};
