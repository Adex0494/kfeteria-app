import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radius, shadows, spacing, typography } from '@/theme/theme';

type KpiCardProps = {
  accent: string;
  helper: string;
  icon: keyof typeof Feather.glyphMap;
  title: string;
  value: string;
};

export default function KpiCard({
  accent,
  helper,
  icon,
  title,
  value,
}: KpiCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.iconBadge, { backgroundColor: accent }]}>
          <Feather color={colors.whiteCards} name={icon} size={18} />
        </View>
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={[styles.helper, { color: accent }]}>{helper}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minWidth: 210,
    flex: 1,
    backgroundColor: colors.whiteCards,
    borderRadius: radius.lg,
    padding: spacing.xl,
    gap: spacing.md,
    ...shadows.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  title: {
    flex: 1,
    color: colors.mutedText,
    fontSize: typography.sm,
    fontWeight: '600',
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    color: colors.carbon,
    fontSize: typography.xl,
    fontWeight: '700',
  },
  helper: {
    fontSize: typography.sm,
    fontWeight: '600',
  },
});
