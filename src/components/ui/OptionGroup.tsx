import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radius, spacing, typography } from '@/theme/theme';

type Option = {
  key: string;
  label: string;
};

type OptionGroupProps = {
  onChange: (value: string) => void;
  options: Option[];
  selectedKey: string;
};

export default function OptionGroup({
  onChange,
  options,
  selectedKey,
}: OptionGroupProps) {
  return (
    <View style={styles.group}>
      {options.map((option) => {
        const isSelected = option.key === selectedKey;

        return (
          <Pressable
            key={option.key}
            accessibilityRole="button"
            onPress={() => onChange(option.key)}
            style={[
              styles.option,
              isSelected ? styles.optionSelected : styles.optionIdle,
            ]}
          >
            <Text
              style={[
                styles.label,
                isSelected ? styles.labelSelected : styles.labelIdle,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  option: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  optionSelected: {
    backgroundColor: colors.goldPrimary,
  },
  optionIdle: {
    backgroundColor: colors.ivoryBackground,
  },
  label: {
    fontSize: typography.sm,
    fontWeight: '600',
  },
  labelSelected: {
    color: colors.coffeeDarkBrown,
  },
  labelIdle: {
    color: colors.mutedText,
  },
});
