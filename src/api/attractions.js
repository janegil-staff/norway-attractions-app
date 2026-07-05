// src/api/attractions.js
// Talks to the live Norway Attractions GraphQL API.

const API_URL = 'https://norway-attractions-api-sq4ye.ondigitalocean.app/graphql';

async function gql(query, variables) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // If REQUIRE_API_KEY is turned on in production, add:
      // 'x-api-key': 'YOUR_KEY',
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message || 'GraphQL error');
  return json.data;
}

const ATTRACTION_FIELDS = `
  id
  name
  nameEn
  region
  municipality
  category
  difficulty
  durationMinutes
  distanceKm
  location { lat lng }
  description
  descriptionEn
`;

export async function fetchAttractions({ region, category, difficulty, search } = {}) {
  const data = await gql(
    `query ($region: Region, $category: Category, $difficulty: Difficulty, $search: String) {
      attractions(region: $region, category: $category, difficulty: $difficulty, search: $search, limit: 200) {
        ${ATTRACTION_FIELDS}
      }
    }`,
    { region, category, difficulty, search }
  );
  return data.attractions;
}

export async function fetchRegions() {
  const data = await gql(`query { regions { region count } }`);
  return data.regions.filter((r) => r.count > 0);
}

export async function fetchCategories() {
  const data = await gql(`query { categories { category count } }`);
  return data.categories.filter((c) => c.count > 0);
}