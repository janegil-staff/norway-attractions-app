// src/screens/ExploreScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchAttractions } from '../api/attractions.js';
import { AttractionCard } from '../components/AttractionCard.js';
import { FilterChips } from '../components/FilterChips.js';
import { useTheme } from '../theme/useTheme.js';

const REGION_OPTIONS = [
  { value: 'bergen', label: 'Bergen' },
  { value: 'fjords', label: 'Fjords' },
  { value: 'oslo', label: 'Oslo' },
];
const CATEGORY_OPTIONS = [
  { value: 'hike', label: 'Hikes' },
  { value: 'viewpoint', label: 'Views' },
  { value: 'museum', label: 'Museums' },
  { value: 'landmark', label: 'Landmarks' },
  { value: 'waterfall', label: 'Waterfalls' },
  { value: 'park', label: 'Parks' },
];

export default function ExploreScreen({ navigation }) {
  const { colors, space } = useTheme();
  const [region, setRegion] = useState('bergen');
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await fetchAttractions({ region, category }));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [region, category]);

  useEffect(() => { load(); }, [load]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <View style={{ paddingHorizontal: space.md, paddingTop: space.sm }}>
        <Text style={{ fontSize: 30, fontWeight: '800', color: colors.text, letterSpacing: -0.5 }}>
          Explore Norway
        </Text>
        <Text style={{ fontSize: 15, color: colors.textDim, marginTop: 2 }}>
          {loading ? 'Loading…' : `${items.length} places`}
        </Text>
      </View>

      <FilterChips options={REGION_OPTIONS} selected={region} onSelect={setRegion} includeAll={false} />
      <FilterChips options={CATEGORY_OPTIONS} selected={category} onSelect={setCategory} />

      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: space.xl }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: colors.accent }}>
            Couldn't reach the API
          </Text>
          <Text style={{ fontSize: 13, color: colors.textDim, marginTop: 8, textAlign: 'center' }}>
            {error}
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(a) => a.id}
          contentContainerStyle={{ padding: space.md, paddingTop: space.sm }}
          renderItem={({ item }) => (
            <AttractionCard
              attraction={item}
              onPress={(a) => navigation.navigate('Detail', { attraction: a })}
            />
          )}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={load} tintColor={colors.primary} />}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: colors.textDim, marginTop: 40 }}>
              Nothing matches these filters yet.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}