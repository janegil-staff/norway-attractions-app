// src/screens/MapScreen.js
// Shows attractions as pins. Uses react-native-maps, which needs a dev build
// (expo run:ios/android) — not plain Expo Go on all SDKs. Falls back gracefully.
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { fetchAttractions } from '../api/attractions.js';
import { useTheme } from '../theme/useTheme.js';

let MapView, Marker;
try {
  const maps = require('react-native-maps');
  MapView = maps.default;
  Marker = maps.Marker;
} catch (e) {
  MapView = null;
}

const INITIAL_REGION = { latitude: 60.39, longitude: 5.32, latitudeDelta: 0.4, longitudeDelta: 0.4 };

export default function MapScreen({ navigation, route }) {
  const { colors, space, CATEGORY_META } = useTheme();
  const focus = route?.params?.focus; // attraction to center on, if any
  const mapRef = useRef(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [b, f, o] = await Promise.all([
          fetchAttractions({ region: 'bergen' }),
          fetchAttractions({ region: 'fjords' }),
          fetchAttractions({ region: 'oslo' }),
        ]);
        setItems([...b, ...f, ...o]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // When arriving with a focus attraction, animate the map to it.
  useEffect(() => {
    if (focus && mapRef.current && !loading) {
      mapRef.current.animateToRegion(
        { latitude: focus.location.lat, longitude: focus.location.lng, latitudeDelta: 0.05, longitudeDelta: 0.05 },
        600
      );
    }
  }, [focus?.id, loading]);


  if (!MapView) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', padding: space.xl }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: space.sm }}>
          Map unavailable
        </Text>
        <Text style={{ fontSize: 14, color: colors.textDim, textAlign: 'center', lineHeight: 20 }}>
          The map component couldn't load in this build. Explore works everywhere.
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      initialRegion={INITIAL_REGION}
      zoomEnabled
      zoomControlEnabled
      scrollEnabled
      rotateEnabled
      pitchEnabled
      minZoomLevel={4}
      maxZoomLevel={18}
    >
      {items.map((a) => {
        const meta = CATEGORY_META[a.category] || CATEGORY_META.other;
        return (
          <Marker
            key={a.id}
            coordinate={{ latitude: a.location.lat, longitude: a.location.lng }}
            title={a.nameEn || a.name}
            description={meta.label}
            pinColor={meta.color}
            onCalloutPress={() => navigation.navigate('Detail', { attraction: a })}
          />
        );
      })}
    </MapView>
  );
}