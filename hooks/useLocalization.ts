import { useEffect } from 'react';
import '../i18n';
import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLocalization = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: 'en' | 'ja') => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('lang');
      if (storedLanguage) {
        i18n.changeLanguage(storedLanguage);
      }
    };

    loadLanguage();
  }, [i18n]);

  const currentLanguage = i18n.language as 'en' | 'ja';

  return { t, i18n, changeLanguage, currentLanguage}
}

export default useLocalization