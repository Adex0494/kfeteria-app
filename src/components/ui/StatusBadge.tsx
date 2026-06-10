import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radius, spacing, typography } from '@/theme/theme';

type BadgeTone = 'danger' | 'gold' | 'neutral' | 'success' | 'warning';

type StatusBadgeProps = {
  label: string;
  tone: BadgeTone;
};

const toneMap = {
  danger: {
    background: `${colors.dangerRed}18`,
    text: colors.dangerRed,
  },
  gold: {
    background: `${colors.goldPrimary}22`,
    text: colors.coffeeDarkBrown,
  },
  neutral: {
    background: `${colors.mutedText}18`,
    text: colors.mutedText,
  },
  success: {
    background: `${colors.successGreen}18`,
    text: colors.successGreen,
  },
  warning: {
    background: `${colors.warningAmber}20`,
    text: colors.warningAmber,
  },
} as const;

export default function StatusBadge({ label, tone }: StatusBadgeProps) {
  const palette = toneMap[tone];

  return (
    <View style={[styles.badge, { backgroundColor: palette.background }]}>
      <Text style={[styles.label, { color: palette.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  label: {
    fontSize: typography.xs,
    fontWeight: '700',
  },
});
