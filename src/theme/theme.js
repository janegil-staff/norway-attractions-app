// src/theme/theme.js
// Light + dark palettes grounded in Norwegian landscape: deep fjord blue,
// slate rock, glacier off-white, a warm rust accent (cabin red).

const light = {
  bg: '#eef2f5',
  surface: '#ffffff',
  surfaceAlt: '#f4f7f9',
  primary: '#1f5673',
  primaryText: '#ffffff',
  accent: '#c65a3a',
  text: '#12222e',
  textDim: '#5c6b78',
  border: '#dce4ea',
};

const dark = {
  bg: '#0e161c',
  surface: '#182631',
  surfaceAlt: '#20323f',
  primary: '#4d9dc7',
  primaryText: '#0e161c',
  accent: '#e07a5a',
  text: '#eaf1f5',
  textDim: '#93a4b1',
  border: '#2a3d4a',
};

export function getColors(scheme) {
  return scheme === 'dark' ? dark : light;
}

export const space = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };
export const radius = { sm: 10, md: 14, lg: 20, pill: 999 };

// Category identity: a color accent + short label, tuned to read on both themes.
export const CATEGORY_META = {
  hike:      { label: 'Hike',      color: '#3f8f5b' },
  viewpoint: { label: 'Viewpoint', color: '#c99544' },
  museum:    { label: 'Museum',    color: '#8a6bb0' },
  landmark:  { label: 'Landmark',  color: '#3f7fa8' },
  beach:     { label: 'Beach',     color: '#3fa0c2' },
  waterfall: { label: 'Waterfall', color: '#4aabc4' },
  park:      { label: 'Park',      color: '#4f9d63' },
  church:    { label: 'Church',    color: '#9a8468' },
  district:  { label: 'District',  color: '#c65a3a' },
  cable_car: { label: 'Cable car', color: '#c99544' },
  other:     { label: 'Place',     color: '#6b7a89' },
};