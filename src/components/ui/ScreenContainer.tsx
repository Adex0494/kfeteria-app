import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/theme';

type ScreenContainerProps = {
  children: ReactNode;
};

export default function ScreenContainer({ children }: ScreenContainerProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
    >
      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.ivoryBackground,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  content: {
    width: '100%',
    maxWidth: 1180,
    alignSelf: 'center',
    gap: spacing.xxl,
  },
});
