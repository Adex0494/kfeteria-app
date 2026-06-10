import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { spacing, typography } from '@/theme/theme';

type PageHeaderProps = {
  action?: ReactNode;
  eyebrow?: string;
  subtitle: string;
  title: string;
};

export default function PageHeader({
  action,
  eyebrow,
  subtitle,
  title,
}: PageHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.copy}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.lg,
  },
  copy: {
    flex: 1,
    gap: spacing.sm,
  },
  eyebrow: {
    color: colors.goldPrimary,
    fontSize: typography.xs,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.carbon,
    fontSize: typography.xxl,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: typography.md,
    lineHeight: 22,
  },
});
