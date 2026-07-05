// src/components/FilterChips.js
import React from 'react';
import { ScrollView, Pressable, Text } from 'react-native';
import { useTheme } from '../theme/useTheme.js';

export function FilterChips({ options, selected, onSelect, includeAll = true }) {
  const { colors, space, radius } = useTheme();

  const Chip = ({ label, active, onPress }) => (
    <Pressable
      onPress={onPress}
      style={{
        // size to content — this fixes the clipping
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderRadius: radius.pill,
        backgroundColor: active ? colors.primary : colors.surface,
        borderWidth: 1,
        borderColor: active ? colors.primary : colors.border,
        marginRight: 8,
      }}
    >
      <Text
        numberOfLines={1}
        style={{
          fontSize: 14,
          fontWeight: '600',
          color: active ? colors.primaryText : colors.textDim,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: space.md,
        paddingVertical: space.sm,
        alignItems: 'center',
      }}
    >
      {includeAll ? (
        <Chip label="All" active={!selected} onPress={() => onSelect(null)} />
      ) : null}
      {options.map((opt) => (
        <Chip
          key={opt.value}
          label={opt.label}
          active={selected === opt.value}
          onPress={() => onSelect(opt.value)}
        />
      ))}
    </ScrollView>
  );
}