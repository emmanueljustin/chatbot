import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en.json';
import ja from './locales/ja.json';

type Resources = {
  en: typeof en;
  ja: typeof ja;
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ja: { translation: ja },
    },
    lng: Localization.locale.split('-')[0],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    saveMissing: true,
    backend: {
      loadPath: './locales/{{lng}}.json',
    },
  });

i18n.on('languageChanged', (lng) => {
  AsyncStorage.setItem('lang', lng);
});

export default i18n;
