// libs
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// languages
import en from './en';
import ar from './ar';

export default i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar }
  },
  fallbackLng: window.localStorage.getItem('language') || process.env.REACT_APP_DEFAULT_LANGUAGE
});
