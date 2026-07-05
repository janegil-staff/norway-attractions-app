// src/components/AttractionCard.js
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../theme/useTheme.js';

export function AttractionCard({ attraction, onPress }) {
  const { colors, space, radius, CATEGORY_META } = useTheme();
  const meta = CATEGORY_META[attraction.category] || CATEGORY_META.other;

  const detailBits = [];
  if (attraction.difficulty) detailBits.push(cap(attraction.difficulty));
  if (attraction.distanceKm) detailBits.push(`${attraction.distanceKm} km`);
  if (attraction.durationMinutes) detailBits.push(`${Math.round(attraction.durationMinutes / 60)}h`);

  return (
    <Pressable
      onPress={() => onPress?.(attraction)}
      style={({ pressed }) => [
        {
          backgroundColor: colors.surface,
          borderRadius: radius.md,
          borderColor: colors.border,
          borderWidth: 1,
          marginBottom: space.sm,
          overflow: 'hidden',
          opacity: pressed ? 0.85 : 1,
          flexDirection: 'row',
        },
      ]}
    >
      {/* category color accent bar */}
      <View style={{ width: 5, backgroundColor: meta.color }} />
      <View style={{ flex: 1, padding: space.md }}>
        <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text }}>
          {attraction.nameEn || attraction.name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 8 }}>
          <View style={{
            backgroundColor: meta.color + '22',
            paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.pill,
          }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: meta.color }}>{meta.label}</Text>
          </View>
          {attraction.municipality ? (
            <Text style={{ fontSize: 13, color: colors.textDim }}>{attraction.municipality}</Text>
          ) : null}
        </View>
        {detailBits.length ? (
          <Text style={{ fontSize: 13, color: colors.textDim, marginTop: 6 }}>
            {detailBits.join('  ·  ')}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1).replace('_', ' ') : ''; }