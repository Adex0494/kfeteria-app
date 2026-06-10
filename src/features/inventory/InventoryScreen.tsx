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
import {
  inventoryMovements,
  inventoryProducts,
} from '@/features/mock/mockData';
import { formatCurrency, formatQuantity } from '@/lib/formatters';
import { colors } from '@/theme/colors';
import { radius, spacing, typography } from '@/theme/theme';

export default function InventoryScreen() {
  const { i18n, t } = useTranslation();
  const { width } = useWindowDimensions();
  const isWide = width >= 960;

  const [purchaseProduct, setPurchaseProduct] = useState(inventoryProducts[0]?.id ?? '');
  const [wasteProduct, setWasteProduct] = useState(inventoryProducts[5]?.id ?? '');
  const [purchaseUnit, setPurchaseUnit] = useState('lb');
  const [wasteUnit, setWasteUnit] = useState('unit');

  return (
    <ScreenContainer>
      <PageHeader
        action={
          <PrimaryButton
            icon={<Feather color={colors.coffeeDarkBrown} name="truck" size={16} />}
            label={t('inventory.actions.registerPurchase')}
          />
        }
        eyebrow={t('navigation.inventory')}
        subtitle={t('inventory.subtitle')}
        title={t('inventory.title')}
      />

      <SectionCard
        subtitle={t('inventory.actionsSubtitle')}
        title={t('inventory.actionsTitle')}
      >
        <View style={styles.actionRow}>
          <PrimaryButton label={t('inventory.actions.registerPurchase')} />
          <PrimaryButton label={t('inventory.actions.registerWaste')} tone="neutral" />
          <PrimaryButton label={t('inventory.actions.adjustInventory')} tone="neutral" />
        </View>
      </SectionCard>

      <SectionCard
        subtitle={t('inventory.productsSubtitle')}
        title={t('inventory.productsTitle')}
      >
        <View style={styles.productGrid}>
          {inventoryProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productHeader}>
                <View style={styles.productCopy}>
                  <Text style={styles.productName}>{t(product.nameKey)}</Text>
                  <Text style={styles.productCategory}>{t(product.categoryKey)}</Text>
                </View>
                <StatusBadge
                  label={t(`common.status.${product.status}`)}
                  tone={
                    product.status === 'available'
                      ? 'success'
                      : product.status === 'low'
                        ? 'warning'
                        : 'danger'
                  }
                />
              </View>
              <Text style={styles.productLine}>
                {t('inventory.currentQuantity')}:{' '}
                {formatQuantity(product.quantity, product.unit, i18n.language, t)}
              </Text>
              <Text style={styles.productLine}>
                {t('inventory.baseUnit')}: {t(`common.units.${product.unit}`)}
              </Text>
              <Text style={styles.productLine}>
                {t('inventory.averageCost')}:{' '}
                {formatCurrency(product.averageCost, i18n.language, t('common.currency'))}
              </Text>
              <Text style={styles.productLine}>
                {t('inventory.minimumLevel')}:{' '}
                {formatQuantity(product.minimumLevel, product.unit, i18n.language, t)}
              </Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <View style={[styles.formGrid, !isWide && styles.formGridMobile]}>
        <View style={styles.formColumn}>
        <SectionCard subtitle={t('inventory.purchaseFormSubtitle')} title={t('inventory.purchaseFormTitle')}>
          <FormField label={t('inventory.product')}>
            <OptionGroup
              onChange={setPurchaseProduct}
              options={inventoryProducts.map((product) => ({
                key: product.id,
                label: t(product.nameKey),
              }))}
              selectedKey={purchaseProduct}
            />
          </FormField>
          <FormField label={t('common.labels.quantity')}>
            <TextInput
              keyboardType="numeric"
              placeholder={t('common.placeholders.quantity')}
              placeholderTextColor={colors.mutedText}
              style={styles.input}
            />
          </FormField>
          <FormField label={t('inventory.unit')}>
            <OptionGroup
              onChange={setPurchaseUnit}
              options={[
                { key: 'unit', label: t('common.units.unitSingular') },
                { key: 'lb', label: t('common.units.lb') },
                { key: 'oz', label: t('common.units.oz') },
              ]}
              selectedKey={purchaseUnit}
            />
          </FormField>
          <FormField label={t('inventory.totalCost')}>
            <TextInput
              keyboardType="numeric"
              placeholder={t('common.placeholders.amount')}
              placeholderTextColor={colors.mutedText}
              style={styles.input}
            />
          </FormField>
          <FormField label={t('inventory.supplier')}>
            <TextInput
              placeholder={t('inventory.mockSupplier')}
              placeholderTextColor={colors.mutedText}
              style={styles.input}
            />
          </FormField>
          <FormField label={t('inventory.note')}>
            <TextInput
              multiline
              placeholder={t('common.placeholders.note')}
              placeholderTextColor={colors.mutedText}
              style={[styles.input, styles.textArea]}
            />
          </FormField>
        </SectionCard>
        </View>

        <View style={styles.formColumn}>
        <SectionCard subtitle={t('inventory.wasteFormSubtitle')} title={t('inventory.wasteFormTitle')}>
          <FormField label={t('inventory.product')}>
            <OptionGroup
              onChange={setWasteProduct}
              options={inventoryProducts.map((product) => ({
                key: product.id,
                label: t(product.nameKey),
              }))}
              selectedKey={wasteProduct}
            />
          </FormField>
          <FormField label={t('common.labels.quantity')}>
            <TextInput
              keyboardType="numeric"
              placeholder={t('common.placeholders.quantity')}
              placeholderTextColor={colors.mutedText}
              style={styles.input}
            />
          </FormField>
          <FormField label={t('inventory.unit')}>
            <OptionGroup
              onChange={setWasteUnit}
              options={[
                { key: 'unit', label: t('common.units.unitSingular') },
                { key: 'lb', label: t('common.units.lb') },
                { key: 'oz', label: t('common.units.oz') },
              ]}
              selectedKey={wasteUnit}
            />
          </FormField>
          <FormField label={t('inventory.reason')}>
            <OptionGroup
              onChange={() => undefined}
              options={[
                { key: 'damaged', label: t('inventory.reasons.damaged') },
                { key: 'expired', label: t('inventory.reasons.expired') },
                { key: 'burned', label: t('inventory.reasons.burned') },
              ]}
              selectedKey="damaged"
            />
          </FormField>
          <FormField label={t('inventory.note')}>
            <TextInput
              multiline
              placeholder={t('common.placeholders.note')}
              placeholderTextColor={colors.mutedText}
              style={[styles.input, styles.textArea]}
            />
          </FormField>
        </SectionCard>
        </View>
      </View>

      <SectionCard
        subtitle={t('inventory.movementsSubtitle')}
        title={t('inventory.movementsTitle')}
      >
        {inventoryMovements.map((movement) => (
          <View key={movement.id} style={styles.movementRow}>
            <View style={styles.movementCopy}>
              <Text style={styles.movementTitle}>{t(movement.productKey)}</Text>
              <Text style={styles.movementMeta}>
                {t(movement.typeKey)} · {movement.time}
              </Text>
            </View>
            <Text style={styles.movementValue}>
              {formatQuantity(movement.quantity, movement.unit, i18n.language, t)}
            </Text>
          </View>
        ))}
      </SectionCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  productCard: {
    minWidth: 220,
    flex: 1,
    borderRadius: radius.md,
    backgroundColor: colors.ivoryBackground,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  productHeader: {
    gap: spacing.sm,
  },
  productCopy: {
    gap: spacing.xs,
  },
  productName: {
    color: colors.carbon,
    fontSize: typography.md,
    fontWeight: '700',
  },
  productCategory: {
    color: colors.mutedText,
    fontSize: typography.sm,
  },
  productLine: {
    color: colors.coffeeDarkBrown,
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
    minHeight: 96,
    textAlignVertical: 'top',
  },
  movementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.ivoryBackground,
    padding: spacing.lg,
  },
  movementCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  movementTitle: {
    color: colors.carbon,
    fontSize: typography.md,
    fontWeight: '700',
  },
  movementMeta: {
    color: colors.mutedText,
    fontSize: typography.sm,
  },
  movementValue: {
    color: colors.coffeeDarkBrown,
    fontSize: typography.sm,
    fontWeight: '700',
  },
});
