import { Feather } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { navigationItems } from '@/config/navigation';
import { colors } from '@/theme/colors';
import { radius, spacing, typography } from '@/theme/theme';

export default function SidebarNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <View style={styles.sidebar}>
      <View style={styles.brandSection}>
        <Text style={styles.brandName}>Kfeteria</Text>
        <Text style={styles.brandSubtitle}>{t('shell.subtitle')}</Text>
      </View>

      <View style={styles.navList}>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} asChild href={item.href}>
              <Pressable
                style={StyleSheet.flatten([
                  styles.navItem,
                  isActive ? styles.navItemActive : undefined,
                ])}
              >
                <Feather
                  color={isActive ? colors.coffeeDarkBrown : colors.beigeSurface}
                  name={item.icon}
                  size={18}
                />
                <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                  {t(item.labelKey)}
                </Text>
              </Pressable>
            </Link>
          );
        })}
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileInitials}>KD</Text>
        </View>
        <View style={styles.profileCopy}>
          <Text style={styles.profileName}>Kdie</Text>
          <Text style={styles.profileRole}>{t('roles.administrator')}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 264,
    backgroundColor: colors.carbon,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xxl,
    gap: spacing.xxl,
  },
  brandSection: {
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  brandName: {
    color: colors.goldPrimary,
    fontSize: 40,
    fontWeight: '700',
  },
  brandSubtitle: {
    color: colors.beigeSurface,
    fontSize: typography.sm,
    lineHeight: 20,
  },
  navList: {
    gap: spacing.sm,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  navItemActive: {
    backgroundColor: colors.goldPrimary,
  },
  navLabel: {
    color: colors.beigeSurface,
    fontSize: typography.md,
    fontWeight: '600',
  },
  navLabelActive: {
    color: colors.coffeeDarkBrown,
  },
  profileCard: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.06)',
    padding: spacing.md,
  },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.goldPrimary,
  },
  profileInitials: {
    color: colors.coffeeDarkBrown,
    fontSize: typography.sm,
    fontWeight: '800',
  },
  profileCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  profileName: {
    color: colors.whiteCards,
    fontSize: typography.sm,
    fontWeight: '700',
  },
  profileRole: {
    color: colors.beigeSurface,
    fontSize: typography.xs,
  },
});
