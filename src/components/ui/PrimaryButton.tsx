import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radius, spacing, typography } from '@/theme/theme';

type ButtonTone = 'gold' | 'neutral';

type PrimaryButtonProps = {
  icon?: ReactNode;
  label: string;
  onPress?: () => void;
  tone?: ButtonTone;
};

const toneStyles = {
  gold: {
    backgroundColor: colors.goldPrimary,
    color: colors.coffeeDarkBrown,
  },
  neutral: {
    backgroundColor: colors.carbon,
    color: colors.whiteCards,
  },
} as const;

export default function PrimaryButton({
  icon,
  label,
  onPress,
  tone = 'gold',
}: PrimaryButtonProps) {
  const palette = toneStyles[tone];

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: palette.backgroundColor },
        pressed && styles.buttonPressed,
      ]}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text style={[styles.label, { color: palette.color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  buttonPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: typography.sm,
    fontWeight: '700',
  },
});
