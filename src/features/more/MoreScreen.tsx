import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import PageHeader from '@/components/ui/PageHeader';
import ScreenContainer from '@/components/ui/ScreenContainer';
import SectionCard from '@/components/ui/SectionCard';
import { mockSettingsCards } from '@/features/mock/mockData';
import { colors } from '@/theme/colors';
import { radius, spacing, typography } from '@/theme/theme';

export default function MoreScreen() {
  const { t } = useTranslation();

  return (
    <ScreenContainer>
      <PageHeader
        eyebrow={t('navigation.more')}
        subtitle={t('more.subtitle')}
        title={t('more.title')}
      />

      <SectionCard subtitle={t('more.cardsSubtitle')} title={t('more.cardsTitle')}>
        <View style={styles.cardGrid}>
          {mockSettingsCards.map((card) => (
            <View key={card.id} style={styles.card}>
              <View style={styles.iconWrap}>
                <Feather color={colors.goldPrimary} name={card.icon} size={20} />
              </View>
              <Text style={styles.cardTitle}>{t(card.titleKey)}</Text>
              <Text style={styles.cardDescription}>{t(card.descriptionKey)}</Text>
            </View>
          ))}
        </View>
      </SectionCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  card: {
    minWidth: 220,
    flex: 1,
    borderRadius: radius.md,
    backgroundColor: colors.ivoryBackground,
    padding: spacing.lg,
    gap: spacing.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.carbon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: colors.carbon,
    fontSize: typography.md,
    fontWeight: '700',
  },
  cardDescription: {
    color: colors.mutedText,
    fontSize: typography.sm,
    lineHeight: 20,
  },
});
