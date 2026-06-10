import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

import PrimaryButton from '@/components/ui/PrimaryButton';
import FormField from '@/components/ui/FormField';
import OptionGroup from '@/components/ui/OptionGroup';
import PageHeader from '@/components/ui/PageHeader';
import ScreenContainer from '@/components/ui/ScreenContainer';
import SectionCard from '@/components/ui/SectionCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { menuItems } from '@/features/mock/mockData';
import { formatCurrency, formatPercent, formatQuantity } from '@/lib/formatters';
import { colors } from '@/theme/colors';
import { radius, spacing, typography } from '@/theme/theme';

export default function MenuScreen() {
  const { i18n, t } = useTranslation();
  const { width } = useWindowDimensions();
  const isWide = width >= 940;

  const [selectedMenuItem, setSelectedMenuItem] = useState(menuItems[0]?.id ?? '');
  const selectedItem = menuItems.find((item) => item.id === selectedMenuItem) ?? menuItems[0];

  return (
    <ScreenContainer>
      <PageHeader
        action={
          <PrimaryButton
            icon={<Feather color={colors.coffeeDarkBrown} name="edit-3" size={16} />}
            label={t('menuPage.editPlate')}
          />
        }
        eyebrow={t('navigation.menu')}
        subtitle={t('menuPage.subtitle')}
        title={t('menuPage.title')}
      />

      <SectionCard subtitle={t('menuPage.adminNotice')} title={t('menuPage.menuItemsTitle')}>
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <View key={item.id} style={styles.menuCard}>
              <View style={styles.menuCardHeader}>
                <View style={styles.menuCopy}>
                  <Text style={styles.menuName}>{t(item.nameKey)}</Text>
                  <Text style={styles.menuCategory}>{t(item.categoryKey)}</Text>
                </View>
                <StatusBadge
                  label={t(`menuPage.profitability.${item.profitability}`)}
                  tone={
                    item.profitability === 'high'
                      ? 'success'
                      : item.profitability === 'medium'
                        ? 'gold'
                        : 'warning'
                  }
                />
              </View>
              <Text style={styles.metricLine}>
                {t('menuPage.salePrice')}:{' '}
                {formatCurrency(item.salePrice, i18n.language, t('common.currency'))}
              </Text>
              <Text style={styles.metricLine}>
                {t('menuPage.estimatedCost')}:{' '}
                {formatCurrency(item.estimatedCost, i18n.language, t('common.currency'))}
              </Text>
              <Text style={styles.metricLine}>
                {t('menuPage.estimatedProfit')}:{' '}
                {formatCurrency(item.estimatedProfit, i18n.language, t('common.currency'))}
              </Text>
              <Text style={styles.metricLine}>
                {t('menuPage.margin')}:{' '}
                {formatPercent(item.margin, i18n.language)}%
              </Text>
              <View style={styles.recipePreview}>
                <Text style={styles.recipeTitle}>{t('menuPage.recipePreview')}</Text>
                {item.recipe.map((ingredient) => (
                  <Text key={`${item.id}-${ingredient.ingredientKey}`} style={styles.recipeLine}>
                    {t(ingredient.ingredientKey)} ·{' '}
                    {formatQuantity(ingredient.quantity, ingredient.unit, i18n.language, t)}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </SectionCard>

      <View style={[styles.formGrid, !isWide && styles.formGridMobile]}>
        <View style={styles.formColumn}>
        <SectionCard subtitle={t('menuPage.formSubtitle')} title={t('menuPage.formTitle')}>
          <FormField label={t('menuPage.itemName')}>
            <OptionGroup
              onChange={setSelectedMenuItem}
              options={menuItems.map((item) => ({
                key: item.id,
                label: t(item.nameKey),
              }))}
              selectedKey={selectedMenuItem}
            />
          </FormField>
          <FormField label={t('menuPage.category')}>
            <TextInput
              placeholder={t(selectedItem.categoryKey)}
              placeholderTextColor={colors.mutedText}
              style={styles.input}
            />
          </FormField>
          <FormField label={t('menuPage.ingredients')}>
            <TextInput
              multiline
              placeholder={t('menuPage.ingredientsPlaceholder')}
              placeholderTextColor={colors.mutedText}
              style={[styles.input, styles.textArea]}
            />
          </FormField>
          <FormField label={t('menuPage.salePrice')}>
            <TextInput
              keyboardType="numeric"
              placeholder={formatCurrency(
                selectedItem.salePrice,
                i18n.language,
                t('common.currency')
              )}
              placeholderTextColor={colors.mutedText}
              style={styles.input}
            />
          </FormField>
          <FormField label={t('menuPage.calculatedCost')}>
            <TextInput
              editable={false}
              placeholder={formatCurrency(
                selectedItem.estimatedCost,
                i18n.language,
                t('common.currency')
              )}
              placeholderTextColor={colors.mutedText}
              style={styles.input}
            />
          </FormField>
        </SectionCard>
        </View>

        <View style={styles.formColumn}>
        <SectionCard subtitle={t('menuPage.recipePanelSubtitle')} title={t('menuPage.recipePanelTitle')}>
          <Text style={styles.recipePanelTitle}>{t(selectedItem.nameKey)}</Text>
          {selectedItem.recipe.map((ingredient) => (
            <View key={`${selectedItem.id}-${ingredient.ingredientKey}-detail`} style={styles.recipePanelRow}>
              <Text style={styles.recipePanelLabel}>{t(ingredient.ingredientKey)}</Text>
              <Text style={styles.recipePanelValue}>
                {formatQuantity(ingredient.quantity, ingredient.unit, i18n.language, t)}
              </Text>
            </View>
          ))}
          <View style={styles.noticeBox}>
            <Feather color={colors.goldPrimary} name="shield" size={18} />
            <Text style={styles.noticeText}>{t('menuPage.adminFutureNote')}</Text>
          </View>
        </SectionCard>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  menuCard: {
    minWidth: 240,
    flex: 1,
    borderRadius: radius.md,
    backgroundColor: colors.ivoryBackground,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  menuCardHeader: {
    gap: spacing.sm,
  },
  menuCopy: {
    gap: spacing.xs,
  },
  menuName: {
    color: colors.carbon,
    fontSize: typography.md,
    fontWeight: '700',
  },
  menuCategory: {
    color: colors.mutedText,
    fontSize: typography.sm,
  },
  metricLine: {
    color: colors.coffeeDarkBrown,
    fontSize: typography.sm,
  },
  recipePreview: {
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  recipeTitle: {
    color: colors.carbon,
    fontSize: typography.sm,
    fontWeight: '700',
  },
  recipeLine: {
    color: colors.mutedText,
    fontSize: typography.sm,
  },
  formGrid: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.lg,
  },
  formGridMobile: {
    flexDirection: 'column',
  },
  formColumn: {
    flex: 1,
    minWidth: 0,
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
    minHeight: 112,
    textAlignVertical: 'top',
  },
  recipePanelTitle: {
    color: colors.carbon,
    fontSize: typography.lg,
    fontWeight: '700',
  },
  recipePanelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  recipePanelLabel: {
    flex: 1,
    color: colors.mutedText,
    fontSize: typography.sm,
    lineHeight: 20,
  },
  recipePanelValue: {
    color: colors.coffeeDarkBrown,
    fontSize: typography.sm,
    fontWeight: '700',
    textAlign: 'right',
  },
  noticeBox: {
    flexDirection: 'row',
    gap: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.beigeSurface,
    padding: spacing.lg,
  },
  noticeText: {
    flex: 1,
    color: colors.coffeeDarkBrown,
    fontSize: typography.sm,
    lineHeight: 20,
  },
});
