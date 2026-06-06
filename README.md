# SkyCast

SkyCast is a mobile weather app. The Home tab shows current conditions, an hourly strip for the next 24 hours, and a 5-day forecast — for your current location by default, or for any city you search for. The Favorites tab lets you search and save any city (each row showing its live temperature) and tap into a saved place for its full current + hourly + 5-day detail. A Settings tab toggles temperature (°C / °F) and wind-speed (km/h / mph) units, behind a drawer with an About screen.

Forecasts come from the free 7Timer! service and city search from Open-Meteo's geocoding API, so no API key is required.

## Potential features

- Compare two cities side by side
- Historic weather lookup for a specific date
- Severe-weather alerts and push notifications
- Light and dark theme
- Offline cache of the last successful forecast
- Map view with precipitation and temperature overlays

## Continuous integration

GitHub Actions runs the checks on every push to `main` and every pull request — typecheck, ESLint, Prettier, and Knip as separate steps, then the Jest suite.

EAS builds run on demand (manually from the Actions tab, or by pushing a `v*` tag) and only after the checks pass. The `preview` profile produces an installable Android APK.
