import { TFunction } from 'i18next';

import { UnitCode } from '@/features/mock/types';

export function formatCurrency(value: number, language: string, currency: string) {
  return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'es-DO', {
    currency,
    maximumFractionDigits: 2,
    style: 'currency',
  }).format(value);
}

export function formatNumber(value: number, language: string, maximumFractionDigits = 2) {
  return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'es-DO', {
    maximumFractionDigits,
    minimumFractionDigits: value % 1 === 0 ? 0 : Math.min(2, maximumFractionDigits),
  }).format(value);
}

export function formatPercent(value: number, language: string) {
  return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'es-DO', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatQuantity(
  value: number,
  unit: UnitCode,
  language: string,
  t: TFunction
) {
  const formattedValue = formatNumber(value, language, 2);
  if (unit === 'unit') {
    const label =
      value === 1 ? t('common.units.unitSingular') : t('common.units.unitPlural');
    return `${formattedValue} ${label}`;
  }

  return `${formattedValue} ${t(`common.units.${unit}`)}`;
}
