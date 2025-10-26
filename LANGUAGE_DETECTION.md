# 🌐 Language Detection & Localization

This website supports automatic language detection for Russian and English speakers.

## Detection Priority

The language is detected in the following order:

1. **localStorage** (Highest Priority)
   - If user previously selected a language, it will be remembered
   - Persists across sessions

2. **Browser Language Settings**
   - Checks `navigator.language` (primary language)
   - Falls back to `navigator.languages` (all preferred languages)
   - If Russian (`ru`, `ru-RU`, etc.) is detected → Russian
   - Otherwise → English

3. **Geographic Location** (via Timezone)
   - Approximate detection based on system timezone
   - Russian-speaking regions supported:
     - 🇷🇺 Russia (all timezones from Kaliningrad to Kamchatka)
     - 🇧🇾 Belarus
     - 🇰🇿 Kazakhstan
     - 🇰🇬 Kyrgyzstan
     - 🇹🇯 Tajikistan
     - 🇺🇿 Uzbekistan
     - 🇹🇲 Turkmenistan
     - 🇦🇲 Armenia
     - 🇦🇿 Azerbaijan
     - 🇬🇪 Georgia
     - 🇲🇩 Moldova
     - 🇺🇦 Ukraine

## Features

### Auto-Detection Hint
- First-time visitors see a tooltip: "🌐 Language auto-detected"
- Appears for 5 seconds on initial page load
- Only shown once per session
- Does not appear if user previously selected a language

### Manual Language Switcher
- Desktop: Full dropdown with flags (🇬🇧 English / 🇷🇺 Русский)
- Mobile: Compact dropdown (🇬🇧 EN / 🇷🇺 RU)
- User selection overrides auto-detection
- Choice is saved to localStorage

### Debug Logging
Console logs show detection source:
```
🌐 Language from localStorage: ru
🌐 Language from navigator.language: ru (ru-RU)
🌐 Language from timezone: ru (Europe/Moscow)
🌐 Language default: en
```

## Technical Implementation

### Files
- `src/lib/languageDetection.ts` - Detection logic
- `src/lib/i18n.ts` - Translations (EN/RU)
- `src/components/LifeCoachLandingOptimized.tsx` - Main component
- `src/components/sections/Header.tsx` - Language switcher UI

### Functions
- `detectUserLanguage()` - Main detection function
- `saveLanguagePreference(lang)` - Save user choice
- `getCountryFromTimezone()` - Approximate country detection
- `isRussianSpeakingRegion()` - Check if region speaks Russian

## Testing

### Test Russian Auto-Detection
1. Clear localStorage: `localStorage.clear()`
2. Change browser language to Russian
3. Refresh page → Should load in Russian

### Test Timezone Detection
1. Clear localStorage
2. Set browser language to non-Russian
3. Use VPN/proxy from Russian-speaking country
4. System timezone should trigger Russian

### Test Manual Override
1. Click language selector
2. Choose different language
3. Refresh page → Should remember choice

## Browser Compatibility

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

Uses standard Web APIs:
- `navigator.language`
- `navigator.languages`
- `Intl.DateTimeFormat().resolvedOptions().timeZone`
- `localStorage`
- `sessionStorage`

## Limitations

**Timezone-based detection is approximate:**
- VPN/proxy may show incorrect timezone
- Some regions share timezones
- For precise geolocation, use IP geolocation API (e.g., MaxMind, IPInfo)

**localStorage limitations:**
- Private/incognito mode may not persist
- User can clear browser data
- Shared device may show last user's preference

## Future Enhancements

- [ ] IP-based geolocation API for accurate country detection
- [ ] Add more languages (Ukrainian, Belarusian, Kazakh)
- [ ] A/B test language hint placement
- [ ] Analytics: track which detection method is most accurate
- [ ] URL parameter override: `?lang=ru`
- [ ] Remember language per domain (not subdomain)
