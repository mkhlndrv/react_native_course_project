# SkyCast

A weather app built with React Native and Expo as the course project for
Harbour.Space FE411: React Native.

## Stack

- Expo (SDK 54) with TypeScript (strict)
- ESLint v9 (flat config) + `@christopherjbaker/eslint-config/react-strict` + `eslint-config-expo`
- Prettier (no semicolons, trailing commas everywhere)
- Knip (dead-code detection)
- `tsc --noEmit` for type-checking

## Getting started

```sh
npm install
npm start           # start the Expo dev server
npm run ios         # open in iOS simulator
npm run android     # open in Android emulator
npm run web         # open in the browser
```

## Linting

A single `lint` script runs typecheck, ESLint, Prettier (check mode), and Knip:

```sh
npm run lint
```

The sub-scripts (`lint-typecheck`, `lint-eslint`, `lint-prettier`, `lint-knip`)
can be run individually.

## Potential features

- Detect the user's current location and show the local forecast
- Multi-day forecast (hourly + daily)
- Save favorite cities for quick access
- Compare weather between two or more cities side by side
- View historical weather data for a given date and location
- Severe weather alerts and push notifications
- Map view with precipitation / temperature overlays
- Unit toggle (metric / imperial)
- Light and dark theme
- Offline cache of the last successful forecast
