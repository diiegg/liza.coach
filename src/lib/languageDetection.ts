import { Lang } from './i18n';

/**
 * Russian-speaking countries and territories
 * Countries where Russian is an official or widely spoken language
 */
const RUSSIAN_SPEAKING_REGIONS = [
  'RU', // Russia
  'BY', // Belarus
  'KZ', // Kazakhstan
  'KG', // Kyrgyzstan
  'TJ', // Tajikistan
  'UZ', // Uzbekistan
  'TM', // Turkmenistan
  'AM', // Armenia
  'AZ', // Azerbaijan
  'GE', // Georgia
  'MD', // Moldova
  'UA', // Ukraine
];

/**
 * Detect user's preferred language based on multiple factors
 * Priority: 
 * 1. localStorage (user's previous choice)
 * 2. Browser language settings
 * 3. Geographic location (if available)
 * 
 * @returns Detected language ('en' or 'ru')
 */
export function detectUserLanguage(): Lang {
  // 1. Check localStorage for saved preference (highest priority)
  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem('lang');
    if (saved === 'en' || saved === 'ru') {
      console.log('🌐 Language from localStorage:', saved);
      return saved;
    }
  }

  // 2. Check browser language settings
  if (typeof navigator !== 'undefined') {
    // Check primary language
    const primaryLang = navigator.language.toLowerCase();
    if (primaryLang.startsWith('ru')) {
      console.log('🌐 Language from navigator.language:', 'ru', `(${primaryLang})`);
      return 'ru';
    }

    // Check all preferred languages
    const languages = navigator.languages || [navigator.language];
    for (const lang of languages) {
      const normalized = lang.toLowerCase();
      if (normalized.startsWith('ru')) {
        console.log('🌐 Language from navigator.languages:', 'ru', `(${lang})`);
        return 'ru';
      }
    }
  }

  // 3. Geographic detection via timezone (rough approximation)
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timezone) {
    // Check if timezone suggests Russian-speaking region
    const russianTimezones = [
      'Europe/Moscow',
      'Europe/Kaliningrad',
      'Europe/Samara',
      'Asia/Yekaterinburg',
      'Asia/Omsk',
      'Asia/Novosibirsk',
      'Asia/Krasnoyarsk',
      'Asia/Irkutsk',
      'Asia/Yakutsk',
      'Asia/Vladivostok',
      'Asia/Magadan',
      'Asia/Kamchatka',
      'Europe/Minsk', // Belarus
      'Asia/Almaty', // Kazakhstan
      'Asia/Bishkek', // Kyrgyzstan
      'Asia/Tashkent', // Uzbekistan
    ];

    if (russianTimezones.some(tz => timezone.includes(tz))) {
      console.log('🌐 Language from timezone:', 'ru', `(${timezone})`);
      return 'ru';
    }
  }

  // Default to English
  console.log('🌐 Language default:', 'en');
  return 'en';
}

/**
 * Get user's country code from timezone (approximate)
 * Note: This is a rough approximation. For accurate geolocation,
 * use a proper IP geolocation service.
 */
export function getCountryFromTimezone(): string | null {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const timezoneToCountry: Record<string, string> = {
    'Europe/Moscow': 'RU',
    'Europe/Kaliningrad': 'RU',
    'Europe/Samara': 'RU',
    'Asia/Yekaterinburg': 'RU',
    'Asia/Omsk': 'RU',
    'Asia/Novosibirsk': 'RU',
    'Asia/Krasnoyarsk': 'RU',
    'Asia/Irkutsk': 'RU',
    'Asia/Yakutsk': 'RU',
    'Asia/Vladivostok': 'RU',
    'Asia/Magadan': 'RU',
    'Asia/Kamchatka': 'RU',
    'Europe/Minsk': 'BY',
    'Asia/Almaty': 'KZ',
    'Asia/Bishkek': 'KG',
    'Asia/Tashkent': 'UZ',
    'Europe/Chisinau': 'MD',
    'Europe/Kiev': 'UA',
    'Asia/Tbilisi': 'GE',
    'Asia/Yerevan': 'AM',
    'Asia/Baku': 'AZ',
  };

  for (const [tz, country] of Object.entries(timezoneToCountry)) {
    if (timezone.includes(tz)) {
      return country;
    }
  }

  return null;
}

/**
 * Check if user is likely from a Russian-speaking region
 */
export function isRussianSpeakingRegion(): boolean {
  const country = getCountryFromTimezone();
  return country ? RUSSIAN_SPEAKING_REGIONS.includes(country) : false;
}

/**
 * Save user's language preference
 */
export function saveLanguagePreference(lang: Lang): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('lang', lang);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
    console.log('💾 Language preference saved:', lang);
  }
}
