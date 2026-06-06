# SkyCast

SkyCast is a small weather app for checking the sky without signing up for anything. Open it and you get the current conditions, an hourly strip for the next 24 hours, and a 5-day outlook — for wherever you are by default, or for any city you search. Cities you check often can be saved to Favorites so they're one tap away, each row showing its live temperature, and you can switch temperature between °C and °F and wind between km/h and mph to match how you read the weather. It runs from the same codebase on iOS, Android, and the web, and needs no account and no API key, so it's genuinely usable from the first launch.

## What it does

- **Home** — current conditions + next-24-hour hourly strip + 5-day forecast, for your detected location (with a Barcelona fallback) or any city you type into the search box.
- **Favorites** — search for a city and save it; saved rows show a live temperature and open a full detail screen (current + hourly + 5-day).
- **Settings** — toggle temperature (°C / °F) and wind speed (km/h / mph); the choice persists and updates every screen live. A drawer holds an About page.

## How it's built

SkyCast is an Expo / React Native app written in TypeScript. Routing is file-based with Expo Router and kept separate from the rest of the app: route files live under `src/app/` (a root Stack → a bottom-tab navigator → a nested Stack for Favorites and a Drawer for Settings) and contain only screen wiring, while all reusable logic and UI live in feature modlets under `src/shared/`. Each modlet — `weather`, `cities`, `geocoding`, `location`, `storage`, `design` — exposes its public surface through an `index.ts` barrel and is imported through the `#shared/*` and `#design/*` subpath aliases, so screens never reach in with relative `../../` paths. State that needs to survive a restart (favorites, unit choices) goes through a single `usePersistedState` hook backed by `AsyncStorage` with a small pub/sub layer, which is why flipping a unit in Settings updates the Home and detail screens immediately. Device capabilities (location, haptics) and the visual language (a foundations/elements design system) are their own modlets too, and the whole thing is covered by a Jest test suite and a GitHub Actions pipeline.

**Stack**

- Expo SDK 56 · React Native 0.85 · React 19
- TypeScript (strict, ESM) with `#shared/*` / `#design/*` subpath imports
- Expo Router — file-based, typed routes (Stack / Tabs / Drawer)
- AsyncStorage — persistence via the `usePersistedState` hook
- expo-location · expo-haptics · expo-screen-orientation — device features
- @expo/vector-icons (Ionicons)
- Jest + @testing-library/react-native — tests
- ESLint · Prettier · Knip — quality gates
- GitHub Actions (CI) · EAS (builds)

**External services** (both free, no key required)

- [7Timer!](https://www.7timer.info) — current, hourly (`civil`), and 5-day (`civillight`) forecasts.
- [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api) — turns a typed city name into coordinates for search.

## Project structure

```
src/
  app/                      # routing only — Expo Router screens
    _layout.tsx             # root Stack
    (tabs)/
      _layout.tsx           # bottom tabs: Home / Favorites / Settings
      index.tsx             # Home
      favorites/            # nested Stack: index + [id] detail
      settings/             # nested Drawer: index + about
  shared/                   # feature modlets, each behind an index.ts barrel
    weather/                # CurrentWeather, HourlyForecast, Forecast, loaders
    cities/                 # city catalog + City type
    geocoding/              # searchCities (Open-Meteo)
    location/               # useCurrentLocation (expo-location)
    storage/                # usePersistedState + KEYS
    design/                 # foundations (tokens) + elements (Card, Stat, …)
```

Imports use the aliases declared in `package.json`:

- `#shared/*` → `src/shared/*/index.ts`
- `#design/*` → `src/shared/design/*/index.ts`

## Getting started

### Prerequisites

- **Node 20.19.4 or newer** (Expo SDK 56 requirement).
- For native runs: an iOS Simulator (Xcode) or Android emulator, or a physical device with a **dev build**. The App Store / Play Store Expo Go currently tops out at SDK 54 and cannot open this project — use the web build or a dev client instead.

### Install

```sh
npm install
```

`.npmrc` already sets `legacy-peer-deps=true`, which a clean install needs to resolve the React peer ranges.

### Run

```sh
npm start        # starts the dev server; press w (web), i (iOS), or a (Android)
```

The quickest way to see it with no native toolchain is `npm start` then `w` for the web build. Note that 7Timer is CORS-blocked in the browser, so live forecasts (and the location lookup) only appear on iOS/Android; city **search** works everywhere.

### Test & lint

```sh
npm test         # Jest suite
npm run lint     # typecheck → eslint → prettier --check → knip → tests
```

Each lint stage is also runnable on its own: `lint-typecheck`, `lint-eslint`, `lint-prettier`, `lint-knip`.

### Environment variables

None are needed to run the app — both data services are keyless. The only secret is `EXPO_TOKEN`, a GitHub repo secret used by the CI build job to authenticate EAS; it isn't required for local development.

## Continuous integration

`.github/workflows/ci.yml` runs on every push to `main` and every pull request: `npm ci`, then each lint stage as its own step, then the Jest suite. A separate build job (`needs: quality`) runs only on manual dispatch or a `v*` tag and produces an installable Android APK via EAS using the `preview` profile.


