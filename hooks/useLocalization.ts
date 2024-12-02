import '../i18n';
import { useTranslation } from "react-i18next";

const useLocalization = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: 'en' | 'ja') => {
    i18n.changeLanguage(lang);
  };

  return { t, i18n, changeLanguage}
}

export default useLocalization