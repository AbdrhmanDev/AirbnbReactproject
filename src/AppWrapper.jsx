import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import i18n from './i18n'; // تأكدي من مسار i18n.js

function AppWrapper({ children }) {
  const language = useSelector((state) => state.language.language);

  useEffect(() => {
    i18n.changeLanguage(language);
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return children;
}

export default AppWrapper;
