import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radius, shadows, spacing, typography } from '@/theme/theme';

type SectionCardProps = {
  action?: ReactNode;
  children: ReactNode;
  subtitle?: string;
  title: string;
};

export default function SectionCard({
  action,
  children,
  subtitle,
  title,
}: SectionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {action}
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.whiteCards,
    borderRadius: radius.lg,
    padding: spacing.xl,
    gap: spacing.lg,
    ...shadows.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  headerCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.carbon,
    fontSize: typography.lg,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: typography.sm,
    lineHeight: 20,
  },
  content: {
    gap: spacing.lg,
  },
});
