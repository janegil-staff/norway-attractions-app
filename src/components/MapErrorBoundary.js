// src/components/MapErrorBoundary.js
// Catches any crash from the map (e.g. missing Google Maps API key on Android)
// and shows a fallback instead of bringing down the whole app.
import React from 'react';
import { View, Text } from 'react-native';

export class MapErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Map failed to load' };
  }

  componentDidCatch(error, info) {
    // Log for debugging; the app keeps running.
    console.warn('Map crashed:', error?.message, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      const { colors } = this.props;
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: colors?.bg || '#eef2f5' }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors?.text || '#12222e', marginBottom: 8 }}>
            Map unavailable
          </Text>
          <Text style={{ fontSize: 14, color: colors?.textDim || '#5c6b78', textAlign: 'center', lineHeight: 20 }}>
            The map couldn't load on this device. This usually means a Google Maps
            API key needs to be configured for Android. Everything else still works.
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}