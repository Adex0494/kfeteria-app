import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

import PrimaryButton from '@/components/ui/PrimaryButton';
import FormField from '@/components/ui/FormField';
import OptionGroup from '@/components/ui/OptionGroup';
import PageHeader from '@/components/ui/PageHeader';
import ScreenContainer from '@/components/ui/ScreenContainer';
import SectionCard from '@/components/ui/SectionCard';
import {
  menuItems,
  salesBreakdown,
  todaySales,
} from '@/features/mock/mockData';
import { formatCurrency } from '@/lib/formatters';
import { colors } from '@/theme/colors';
import { radius, spacing, typography } from '@/theme/theme';

export default function SalesScreen() {
  const { i18n, t } = useTranslation();
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  const [selectedItem, setSelectedItem] = useState(menuItems[0]?.id ?? '');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer' | 'credit'>('cash');
  const [quantity, setQuantity] = useState('1');
  const [customer, setCustomer] = useState('');
  const [note, setNote] = useState('');

  const selectedMenuItem =
    menuItems.find((item) => item.id === selectedItem) ?? menuItems[0];

  return (
    <ScreenContainer>
      <PageHeader
        action={
          <PrimaryButton
            icon={<Feather color={colors.coffeeDarkBrown} name="plus" size={16} />}
            label={t('salesPage.registerSale')}
          />
        }
        eyebrow={t('navigation.sales')}
        subtitle={t('salesPage.subtitle')}
        title={t('salesPage.title')}
      />

      <View style={styles.summaryGrid}>
        <SectionCard subtitle={t('salesPage.summarySubtitle')} title={t('salesPage.summaryTitle')}>
          <View style={styles.metricRow}>
            <View style={styles.metricBlock}>
              <Text style={styles.metricLabel}>{t('salesPage.totalSold')}</Text>
              <Text style={styles.metricValue}>
                {formatCurrency(salesBreakdown.total, i18n.language, t('common.currency'))}
              </Text>
            </View>
            <View style={styles.metricBlock}>
              <Text style={styles.metricLabel}>{t('salesPage.cash')}</Text>
              <Text style={styles.metricValue}>
                {formatCurrency(salesBreakdown.cash, i18n.language, t('common.currency'))}
              </Text>
            </View>
            <View style={styles.metricBlock}>
              <Text style={styles.metricLabel}>{t('salesPage.transfer')}</Text>
              <Text style={styles.metricValue}>
                {formatCurrency(salesBreakdown.transfer, i18n.language, t('common.currency'))}
              </Text>
            </View>
            <View style={styles.metricBlock}>
              <Text style={styles.metricLabel}>{t('salesPage.credit')}</Text>
              <Text style={styles.metricValue}>
                {formatCurrency(salesBreakdown.credit, i18n.language, t('common.currency'))}
              </Text>
            </View>
          </View>
        </SectionCard>
      </View>

      <View style={[styles.contentGrid, !isWide && styles.contentGridMobile]}>
        <SectionCard
          subtitle={t('salesPage.salesListSubtitle')}
          title={t('salesPage.salesListTitle')}
        >
          {todaySales.map((sale) => (
            <View key={sale.id} style={styles.saleCard}>
              <View style={styles.saleCardHeader}>
                <View style={styles.saleCardCopy}>
                  <Text style={styles.saleTitle}>{t(sale.productKey)}</Text>
                  <Text style={styles.saleMeta}>
                    {t('common.labels.quantity')}: {sale.quantity}
                  </Text>
                </View>
                <Text style={styles.saleTotal}>
                  {formatCurrency(sale.total, i18n.language, t('common.currency'))}
                </Text>
              </View>
              <View style={styles.saleDetails}>
                <Text style={styles.saleDetail}>
                  {t('salesPage.paymentMethod')}: {t(`common.paymentMethods.${sale.paymentMethod}`)}
                </Text>
                <Text style={styles.saleDetail}>
                  {t('salesPage.estimatedProfit')}:{' '}
                  {formatCurrency(sale.estimatedProfit, i18n.language, t('common.currency'))}
                </Text>
                <Text style={styles.saleDetail}>
                  {t('common.labels.time')}: {sale.time}
                </Text>
              </View>
            </View>
          ))}
        </SectionCard>

        <SectionCard
          subtitle={t('salesPage.formSubtitle')}
          title={t('salesPage.formTitle')}
        >
          <FormField label={t('salesPage.product')}>
            <OptionGroup
              onChange={setSelectedItem}
              options={menuItems.map((item) => ({
                key: item.id,
                label: t(item.nameKey),
              }))}
              selectedKey={selectedItem}
            />
          </FormField>

          <FormField label={t('common.labels.quantity')}>
            <TextInput
              keyboardType="numeric"
              onChangeText={setQuantity}
              placeholder={t('common.placeholders.quantity')}
              placeholderTextColor={colors.mutedText}
              style={styles.input}
              value={quantity}
            />
          </FormField>

          <FormField label={t('salesPage.paymentMethod')}>
            <OptionGroup
              onChange={(value) => setPaymentMethod(value as 'cash' | 'transfer' | 'credit')}
              options={[
                { key: 'cash', label: t('common.paymentMethods.cash') },
                { key: 'transfer', label: t('common.paymentMethods.transfer') },
                { key: 'credit', label: t('common.paymentMethods.credit') },
              ]}
              selectedKey={paymentMethod}
            />
          </FormField>

          <FormField label={t('salesPage.customerOptional')}>
            <TextInput
              onChangeText={setCustomer}
              placeholder={t('common.placeholders.optional')}
              placeholderTextColor={colors.mutedText}
              style={styles.input}
              value={customer}
            />
          </FormField>

          <FormField label={t('salesPage.noteOptional')}>
            <TextInput
              multiline
              onChangeText={setNote}
              placeholder={t('common.placeholders.note')}
              placeholderTextColor={colors.mutedText}
              style={[styles.input, styles.textArea]}
              value={note}
            />
          </FormField>

          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>{t('salesPage.preview')}</Text>
            <Text style={styles.previewText}>{t(selectedMenuItem.nameKey)}</Text>
            <Text style={styles.previewText}>
              {t('common.labels.quantity')}: {quantity}
            </Text>
            <Text style={styles.previewText}>
              {t('salesPage.paymentMethod')}: {t(`common.paymentMethods.${paymentMethod}`)}
            </Text>
          </View>

          <PrimaryButton
            icon={<Feather color={colors.coffeeDarkBrown} name="save" size={16} />}
            label={t('salesPage.registerSale')}
          />
        </SectionCard>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  summaryGrid: {
    gap: spacing.lg,
  },
  metricRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  metricBlock: {
    minWidth: 150,
    flex: 1,
    borderRadius: radius.md,
    backgroundColor: colors.ivoryBackground,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  metricLabel: {
    color: colors.mutedText,
    fontSize: typography.sm,
    fontWeight: '600',
  },
  metricValue: {
    color: colors.carbon,
    fontSize: typography.lg,
    fontWeight: '700',
  },
  contentGrid: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.lg,
  },
  contentGridMobile: {
    flexDirection: 'column',
  },
  saleCard: {
    borderRadius: radius.md,
    backgroundColor: colors.ivoryBackground,
    padding: spacing.lg,
    gap: spacing.md,
  },
  saleCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  saleCardCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  saleTitle: {
    color: colors.carbon,
    fontSize: typography.md,
    fontWeight: '700',
  },
  saleMeta: {
    color: colors.mutedText,
    fontSize: typography.sm,
  },
  saleTotal: {
    color: colors.coffeeDarkBrown,
    fontSize: typography.md,
    fontWeight: '700',
  },
  saleDetails: {
    gap: spacing.xs,
  },
  saleDetail: {
    color: colors.mutedText,
    fontSize: typography.sm,
  },
  input: {
    minHeight: 48,
    borderRadius: radius.md,
    backgroundColor: colors.ivoryBackground,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.carbon,
    fontSize: typography.md,
  },
  textArea: {
    minHeight: 92,
    textAlignVertical: 'top',
  },
  previewCard: {
    borderRadius: radius.md,
    backgroundColor: colors.beigeSurface,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  previewTitle: {
    color: colors.coffeeDarkBrown,
    fontSize: typography.sm,
    fontWeight: '700',
  },
  previewText: {
    color: colors.carbon,
    fontSize: typography.sm,
  },
});
