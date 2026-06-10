import { Feather } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { navigationItems } from '@/config/navigation';
import { colors } from '@/theme/colors';
import { radius, spacing, typography } from '@/theme/theme';

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link key={item.href} asChild href={item.href}>
            <Pressable style={styles.navItem}>
              <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
                <Feather
                  color={isActive ? colors.coffeeDarkBrown : colors.beigeSurface}
                  name={item.icon}
                  size={18}
                />
              </View>
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {t(item.labelKey)}
              </Text>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: spacing.sm,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    backgroundColor: colors.carbon,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: colors.goldPrimary,
  },
  label: {
    color: colors.beigeSurface,
    fontSize: typography.xs,
    fontWeight: '600',
  },
  labelActive: {
    color: colors.goldPrimary,
  },
});
