// src/screens/DetailScreen.js
import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/useTheme.js';

export default function DetailScreen({ route, navigation }) {
  const { colors, space, radius, CATEGORY_META } = useTheme();
  const { attraction: a } = route.params;
  const meta = CATEGORY_META[a.category] || CATEGORY_META.other;

  const showOnMap = () => {
    // Detail lives in a stack inside a tab; jump to the Map tab, then its MapView.
    navigation.navigate('Map', { screen: 'MapView', params: { focus: a } });
  };

  const stats = [];
  if (a.distanceKm) stats.push(['Distance', `${a.distanceKm} km`]);
  if (a.durationMinutes) stats.push(['Duration', `${Math.round(a.durationMinutes / 60)}h`]);
  if (a.elevationGainM) stats.push(['Ascent', `${a.elevationGainM} m`]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: space.md }}>
        <Pressable onPress={() => navigation.goBack()} style={{ marginBottom: space.sm }}>
          <Text style={{ fontSize: 16, color: colors.primary, fontWeight: '600' }}>‹ Back</Text>
        </Pressable>

        {/* hero band in the category color */}
        <View style={{ height: 120, borderRadius: radius.lg, backgroundColor: meta.color, justifyContent: 'flex-end', padding: space.md, marginBottom: space.md }}>
          <Text style={{ color: '#fff', fontSize: 13, fontWeight: '700', opacity: 0.9 }}>
            {meta.label.toUpperCase()}
          </Text>
        </View>

        <Text style={{ fontSize: 28, fontWeight: '800', color: colors.text, letterSpacing: -0.5 }}>
          {a.nameEn || a.name}
        </Text>
        {a.nameEn && a.name !== a.nameEn ? (
          <Text style={{ fontSize: 16, color: colors.textDim, marginTop: 2 }}>{a.name}</Text>
        ) : null}
        {a.municipality ? (
          <Text style={{ fontSize: 14, color: colors.textDim, marginTop: 4 }}>{a.municipality}</Text>
        ) : null}

        {stats.length ? (
          <View style={{ flexDirection: 'row', gap: space.xl, marginTop: space.lg }}>
            {stats.map(([label, val]) => (
              <View key={label}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: colors.primary }}>{val}</Text>
                <Text style={{ fontSize: 12, color: colors.textDim }}>{label}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {a.descriptionEn || a.description ? (
          <Text style={{ fontSize: 15, lineHeight: 23, color: colors.text, marginTop: space.lg }}>
            {a.descriptionEn || a.description}
          </Text>
        ) : null}

        <Pressable
          onPress={showOnMap}
          style={{ backgroundColor: colors.primary, borderRadius: radius.md, padding: space.md, alignItems: 'center', marginTop: space.xl }}
        >
          <Text style={{ color: colors.primaryText, fontSize: 16, fontWeight: '700' }}>Show on map</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}