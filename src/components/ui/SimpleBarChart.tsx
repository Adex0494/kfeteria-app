import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radius, spacing, typography } from '@/theme/theme';

type BarChartPoint = {
  label: string;
  value: number;
};

type SimpleBarChartProps = {
  points: BarChartPoint[];
};

export default function SimpleBarChart({ points }: SimpleBarChartProps) {
  const maxValue = Math.max(...points.map((point) => point.value), 1);

  return (
    <View style={styles.chart}>
      {points.map((point) => (
        <View key={point.label} style={styles.point}>
          <Text style={styles.value}>{point.value}</Text>
          <View style={styles.track}>
            <View
              style={[
                styles.bar,
                { height: `${Math.max((point.value / maxValue) * 100, 12)}%` },
              ]}
            />
          </View>
          <Text style={styles.label}>{point.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    minHeight: 220,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  point: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.sm,
  },
  value: {
    color: colors.coffeeDarkBrown,
    fontSize: typography.sm,
    fontWeight: '700',
  },
  track: {
    width: '100%',
    maxWidth: 48,
    minHeight: 140,
    justifyContent: 'flex-end',
    borderRadius: radius.pill,
    backgroundColor: colors.beigeSurface,
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.goldPrimary,
  },
  label: {
    color: colors.mutedText,
    fontSize: typography.sm,
    fontWeight: '600',
  },
});
