import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

import KpiCard from '@/components/ui/KpiCard';
import PageHeader from '@/components/ui/PageHeader';
import QuickActionButton from '@/components/ui/QuickActionButton';
import ScreenContainer from '@/components/ui/ScreenContainer';
import SectionCard from '@/components/ui/SectionCard';
import SimpleBarChart from '@/components/ui/SimpleBarChart';
import StatusBadge from '@/components/ui/StatusBadge';
import {
  dashboardSummary,
  inventoryProducts,
  recentActivity,
  salesSummaryBars,
} from '@/features/mock/mockData';
import { formatCurrency, formatQuantity } from '@/lib/formatters';
import { colors } from '@/theme/colors';
import { radius, spacing, typography } from '@/theme/theme';

export default function DashboardScreen() {
  const { i18n, t } = useTranslation();
  const { width } = useWindowDimensions();

  const isWide = width >= 900;
  const lowProducts = inventoryProducts.filter((product) => product.status !== 'available');
  const currentDate = new Intl.DateTimeFormat(i18n.language === 'en' ? 'en-US' : 'es-DO', {
    dateStyle: 'medium',
  }).format(new Date('2026-06-07'));

  return (
    <ScreenContainer>
      <View style={styles.heroCard}>
        <View style={styles.heroGlowPrimary} />
        <View style={styles.heroGlowSecondary} />
        <View style={styles.heroTopRow}>
          <View style={styles.heroCopy}>
            <Text style={styles.brandName}>Kfeteria</Text>
            <Text style={styles.welcome}>{t('dashboard.welcome')}</Text>
          </View>
          <View style={styles.datePill}>
            <Feather color={colors.goldPrimary} name="calendar" size={16} />
            <Text style={styles.dateText}>{currentDate}</Text>
          </View>
        </View>
        <Text style={styles.heroTitle}>{t('dashboard.title')}</Text>
        <Text style={styles.heroSubtitle}>{t('dashboard.subtitle')}</Text>
      </View>

      <PageHeader
        eyebrow={t('dashboard.sectionOverview')}
        subtitle={t('dashboard.overviewSubtitle')}
        title={t('dashboard.kpiTitle')}
      />

      <View style={styles.kpiGrid}>
        <KpiCard
          accent={colors.goldPrimary}
          helper={t('dashboard.trendSales')}
          icon="trending-up"
          title={t('dashboard.salesToday')}
          value={formatCurrency(
            dashboardSummary.salesToday,
            i18n.language,
            t('common.currency')
          )}
        />
        <KpiCard
          accent={colors.successGreen}
          helper={t('dashboard.trendProfit')}
          icon="dollar-sign"
          title={t('dashboard.estimatedProfit')}
          value={formatCurrency(
            dashboardSummary.estimatedProfit,
            i18n.language,
            t('common.currency')
          )}
        />
        <KpiCard
          accent={colors.warningAmber}
          helper={t('dashboard.trendExpenses')}
          icon="credit-card"
          title={t('dashboard.expensesToday')}
          value={formatCurrency(
            dashboardSummary.expensesToday,
            i18n.language,
            t('common.currency')
          )}
        />
        <KpiCard
          accent={colors.coffeeDarkBrown}
          helper={t('dashboard.cashHelper')}
          icon="briefcase"
          title={t('dashboard.expectedCash')}
          value={formatCurrency(
            dashboardSummary.expectedCash,
            i18n.language,
            t('common.currency')
          )}
        />
        <KpiCard
          accent={colors.dangerRed}
          helper={t('dashboard.lowInventorySummary')}
          icon="alert-triangle"
          title={t('dashboard.lowProducts')}
          value={String(dashboardSummary.lowProducts)}
        />
      </View>

      <SectionCard
        subtitle={t('dashboard.quickActionsHint')}
        title={t('dashboard.quickActions')}
      >
        <View style={styles.actionsGrid}>
          <QuickActionButton
            accent={colors.goldPrimary}
            href="/sales"
            icon="shopping-cart"
            label={t('dashboard.newSale')}
          />
          <QuickActionButton
            accent={colors.coffeeDarkBrown}
            href="/inventory"
            icon="truck"
            label={t('dashboard.registerPurchase')}
          />
          <QuickActionButton
            accent={colors.warningAmber}
            href="/finances"
            icon="credit-card"
            label={t('dashboard.newExpense')}
          />
          <QuickActionButton
            accent={colors.carbon}
            href="/finances"
            icon="check-square"
            label={t('dashboard.cashClosing')}
          />
        </View>
      </SectionCard>

      <View style={[styles.summaryGrid, !isWide && styles.summaryGridMobile]}>
        <SectionCard
          subtitle={t('dashboard.salesSummaryHint')}
          title={t('dashboard.salesSummary')}
        >
          <SimpleBarChart
            points={salesSummaryBars.map((point) => ({
              label: t(point.labelKey),
              value: point.value,
            }))}
          />
        </SectionCard>

        <View style={styles.sideCards}>
          <SectionCard
            subtitle={t('dashboard.liveMockData')}
            title={t('dashboard.recentActivity')}
          >
            {recentActivity.map((activity) => (
              <View key={activity.id} style={styles.listRow}>
                <View style={styles.listIcon}>
                  <Feather color={colors.whiteCards} name={activity.icon} size={16} />
                </View>
                <View style={styles.listCopy}>
                  <Text style={styles.listTitle}>{t(activity.labelKey)}</Text>
                  <Text style={styles.listMeta}>{t(activity.timeKey)}</Text>
                </View>
                <Text style={styles.listAmount}>
                  {formatCurrency(activity.amount, i18n.language, t('common.currency'))}
                </Text>
              </View>
            ))}
          </SectionCard>

          <SectionCard
            subtitle={t('dashboard.inventoryAlertHint')}
            title={t('dashboard.inventoryAlerts')}
          >
            {lowProducts.slice(0, 4).map((product) => (
              <View key={product.id} style={styles.alertRow}>
                <View style={styles.alertCopy}>
                  <Text style={styles.listTitle}>{t(product.nameKey)}</Text>
                  <Text style={styles.listMeta}>
                    {formatQuantity(product.quantity, product.unit, i18n.language, t)}
                  </Text>
                </View>
                <StatusBadge
                  label={t(`common.status.${product.status}`)}
                  tone={product.status === 'out' ? 'danger' : 'warning'}
                />
              </View>
            ))}
          </SectionCard>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    overflow: 'hidden',
    minHeight: 220,
    borderRadius: radius.xl,
    backgroundColor: colors.carbon,
    padding: spacing.xxl,
    gap: spacing.md,
  },
  heroGlowPrimary: {
    position: 'absolute',
    top: -110,
    left: -40,
    width: 220,
    height: 220,
    borderRadius: radius.pill,
    backgroundColor: `${colors.goldPrimary}20`,
  },
  heroGlowSecondary: {
    position: 'absolute',
    right: -70,
    bottom: -90,
    width: 240,
    height: 240,
    borderRadius: radius.pill,
    backgroundColor: `${colors.coffeeDarkBrown}75`,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.lg,
  },
  heroCopy: {
    flex: 1,
    gap: spacing.sm,
  },
  brandName: {
    color: colors.goldPrimary,
    fontSize: 42,
    fontWeight: '700',
  },
  welcome: {
    color: colors.beigeSurface,
    fontSize: typography.md,
    fontWeight: '600',
  },
  datePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  dateText: {
    color: colors.beigeSurface,
    fontSize: typography.sm,
    fontWeight: '600',
  },
  heroTitle: {
    maxWidth: 620,
    color: colors.whiteCards,
    fontSize: typography.xxl,
    fontWeight: '700',
    lineHeight: 38,
  },
  heroSubtitle: {
    maxWidth: 640,
    color: colors.beigeSurface,
    fontSize: typography.md,
    lineHeight: 24,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  summaryGrid: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.lg,
  },
  summaryGridMobile: {
    flexDirection: 'column',
  },
  sideCards: {
    flex: 1,
    gap: spacing.lg,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  listIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.coffeeDarkBrown,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  listTitle: {
    color: colors.carbon,
    fontSize: typography.md,
    fontWeight: '600',
  },
  listMeta: {
    color: colors.mutedText,
    fontSize: typography.sm,
  },
  listAmount: {
    color: colors.carbon,
    fontSize: typography.sm,
    fontWeight: '700',
  },
  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  alertCopy: {
    flex: 1,
    gap: spacing.xs,
  },
});
