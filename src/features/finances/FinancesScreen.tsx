import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

import PageHeader from '@/components/ui/PageHeader';
import ScreenContainer from '@/components/ui/ScreenContainer';
import SectionCard from '@/components/ui/SectionCard';
import StatusBadge from '@/components/ui/StatusBadge';
import {
  assets,
  capitalContributions,
  cashClosing,
  employees,
  expenses,
  ownerWithdrawals,
  payrollRecords,
} from '@/features/mock/mockData';
import { formatCurrency } from '@/lib/formatters';
import { colors } from '@/theme/colors';
import { radius, spacing, typography } from '@/theme/theme';

export default function FinancesScreen() {
  const { i18n, t } = useTranslation();
  const { width } = useWindowDimensions();
  const isWide = width >= 940;

  const financeModules = [
    'finances.modules.expenses',
    'finances.modules.payroll',
    'finances.modules.employees',
    'finances.modules.withdrawals',
    'finances.modules.capital',
    'finances.modules.assets',
    'finances.modules.reports',
    'finances.modules.cashClosing',
  ];

  return (
    <ScreenContainer>
      <PageHeader
        eyebrow={t('navigation.finances')}
        subtitle={t('finances.subtitle')}
        title={t('finances.title')}
      />

      <SectionCard subtitle={t('finances.modulesSubtitle')} title={t('finances.modulesTitle')}>
        <View style={styles.moduleGrid}>
          {financeModules.map((moduleKey) => (
            <View key={moduleKey} style={styles.moduleCard}>
              <Text style={styles.moduleTitle}>{t(moduleKey)}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <View style={[styles.grid, !isWide && styles.gridMobile]}>
        <SectionCard subtitle={t('finances.expensesSubtitle')} title={t('finances.expensesTitle')}>
          {expenses.map((expense) => (
            <View key={expense.id} style={styles.row}>
              <Text style={styles.rowLabel}>{t(expense.categoryKey)}</Text>
              <Text style={styles.rowValue}>
                {formatCurrency(expense.amount, i18n.language, t('common.currency'))}
              </Text>
            </View>
          ))}
        </SectionCard>

        <SectionCard subtitle={t('finances.employeesSubtitle')} title={t('finances.employeesTitle')}>
          {employees.map((employee) => (
            <View key={employee.id} style={styles.employeeCard}>
              <View style={styles.employeeHeader}>
                <View style={styles.employeeCopy}>
                  <Text style={styles.rowLabel}>{employee.name}</Text>
                  <Text style={styles.rowMeta}>{t(employee.positionKey)}</Text>
                </View>
                <StatusBadge
                  label={t(employee.active ? 'common.status.active' : 'common.status.inactive')}
                  tone={employee.active ? 'success' : 'neutral'}
                />
              </View>
              <Text style={styles.rowMeta}>
                {t('finances.salary')}: {formatCurrency(employee.salary, i18n.language, t('common.currency'))}
              </Text>
              <Text style={styles.rowMeta}>
                {t('finances.salaryType')}: {t(`finances.salaryTypes.${employee.salaryType}`)}
              </Text>
            </View>
          ))}
        </SectionCard>
      </View>

      <View style={[styles.grid, !isWide && styles.gridMobile]}>
        <SectionCard subtitle={t('finances.payrollSubtitle')} title={t('finances.payrollTitle')}>
          {payrollRecords.map((record) => (
            <View key={record.id} style={styles.row}>
              <View style={styles.rowCopy}>
                <Text style={styles.rowLabel}>{record.employeeName}</Text>
                <Text style={styles.rowMeta}>{t(record.periodKey)}</Text>
              </View>
              <Text style={styles.rowValue}>
                {formatCurrency(record.amount, i18n.language, t('common.currency'))}
              </Text>
            </View>
          ))}
        </SectionCard>

        <SectionCard subtitle={t('finances.withdrawalsSubtitle')} title={t('finances.withdrawalsTitle')}>
          {ownerWithdrawals.map((record) => (
            <View key={record.id} style={styles.row}>
              <View style={styles.rowCopy}>
                <Text style={styles.rowLabel}>{record.ownerName}</Text>
                <Text style={styles.rowMeta}>{t('finances.ownerWithdrawalNote')}</Text>
              </View>
              <Text style={styles.rowValue}>
                {formatCurrency(record.amount, i18n.language, t('common.currency'))}
              </Text>
            </View>
          ))}
        </SectionCard>
      </View>

      <View style={[styles.grid, !isWide && styles.gridMobile]}>
        <SectionCard subtitle={t('finances.capitalSubtitle')} title={t('finances.capitalTitle')}>
          {capitalContributions.map((record) => (
            <View key={record.id} style={styles.row}>
              <View style={styles.rowCopy}>
                <Text style={styles.rowLabel}>{record.ownerName}</Text>
                <Text style={styles.rowMeta}>{t('finances.capitalNote')}</Text>
              </View>
              <Text style={styles.rowValue}>
                {formatCurrency(record.amount, i18n.language, t('common.currency'))}
              </Text>
            </View>
          ))}
        </SectionCard>

        <SectionCard subtitle={t('finances.cashClosingSubtitle')} title={t('finances.cashClosingTitle')}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{t('finances.expectedCash')}</Text>
            <Text style={styles.rowValue}>
              {formatCurrency(cashClosing.expectedCash, i18n.language, t('common.currency'))}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{t('finances.countedCash')}</Text>
            <Text style={styles.rowValue}>
              {formatCurrency(cashClosing.countedCash, i18n.language, t('common.currency'))}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{t('finances.difference')}</Text>
            <Text style={[styles.rowValue, styles.differenceValue]}>
              {formatCurrency(cashClosing.difference, i18n.language, t('common.currency'))}
            </Text>
          </View>
        </SectionCard>
      </View>

      <SectionCard subtitle={t('finances.assetsSubtitle')} title={t('finances.assetsTitle')}>
        <View style={styles.assetGrid}>
          {assets.map((asset) => (
            <View key={asset.id} style={styles.assetCard}>
              <Text style={styles.rowLabel}>{t(asset.nameKey)}</Text>
              <Text style={styles.rowMeta}>
                {t('finances.purchaseDate')}: {asset.purchaseDate}
              </Text>
              <Text style={styles.rowMeta}>
                {t('finances.originalValue')}:{' '}
                {formatCurrency(asset.purchaseValue, i18n.language, t('common.currency'))}
              </Text>
              <Text style={styles.rowMeta}>
                {t('finances.currentValue')}:{' '}
                {formatCurrency(asset.currentValue, i18n.language, t('common.currency'))}
              </Text>
              <Text style={styles.rowMeta}>
                {t('finances.usefulLife')}:{' '}
                {asset.usefulLifeYears} {t('finances.years')}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.infoCallout}>
          <Feather color={colors.goldPrimary} name="info" size={18} />
          <Text style={styles.infoText}>{t('finances.depreciationInfo')}</Text>
        </View>
      </SectionCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  moduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  moduleCard: {
    minWidth: 150,
    flex: 1,
    borderRadius: radius.md,
    backgroundColor: colors.ivoryBackground,
    padding: spacing.lg,
  },
  moduleTitle: {
    color: colors.coffeeDarkBrown,
    fontSize: typography.sm,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.lg,
  },
  gridMobile: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.ivoryBackground,
    padding: spacing.lg,
  },
  rowCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  rowLabel: {
    color: colors.carbon,
    fontSize: typography.md,
    fontWeight: '700',
  },
  rowMeta: {
    color: colors.mutedText,
    fontSize: typography.sm,
  },
  rowValue: {
    color: colors.coffeeDarkBrown,
    fontSize: typography.sm,
    fontWeight: '700',
  },
  differenceValue: {
    color: colors.dangerRed,
  },
  employeeCard: {
    borderRadius: radius.md,
    backgroundColor: colors.ivoryBackground,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  employeeHeader: {
    gap: spacing.sm,
  },
  employeeCopy: {
    gap: spacing.xs,
  },
  assetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  assetCard: {
    minWidth: 220,
    flex: 1,
    borderRadius: radius.md,
    backgroundColor: colors.ivoryBackground,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  infoCallout: {
    flexDirection: 'row',
    gap: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.beigeSurface,
    padding: spacing.lg,
  },
  infoText: {
    flex: 1,
    color: colors.coffeeDarkBrown,
    fontSize: typography.sm,
    lineHeight: 20,
  },
});
