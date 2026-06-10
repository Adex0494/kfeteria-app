import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from '@/i18n/locales/en/common.json';
import esCommon from '@/i18n/locales/es/common.json';

const resources = {
  en: {
    common: enCommon,
  },
  es: {
    common: esCommon,
  },
} as const;

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    lng: 'es',
    fallbackLng: 'es',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    ns: ['common'],
    supportedLngs: ['es', 'en'],
    resources,
  });
}

export default i18n;
