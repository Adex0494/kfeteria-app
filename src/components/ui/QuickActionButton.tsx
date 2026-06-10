import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppRoute } from '@/config/navigation';
import { colors } from '@/theme/colors';
import { radius, shadows, spacing, typography } from '@/theme/theme';

type QuickActionButtonProps = {
  accent: string;
  href?: AppRoute;
  icon: keyof typeof Feather.glyphMap;
  label: string;
};

export default function QuickActionButton({
  accent,
  href,
  icon,
  label,
}: QuickActionButtonProps) {
  const content = (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      style={({ pressed }) =>
        StyleSheet.flatten([styles.button, pressed ? styles.buttonPressed : undefined])
      }
    >
      <View style={styles.content}>
        <View style={[styles.iconBadge, { backgroundColor: accent }]}>
          <Feather color={colors.whiteCards} name={icon} size={18} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </Pressable>
  );

  if (href) {
    return (
      <Link asChild href={href}>
        {content}
      </Link>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    minWidth: 190,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.whiteCards,
    ...shadows.card,
  },
  buttonPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    width: '100%',
    color: colors.carbon,
    fontSize: typography.sm,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
});
