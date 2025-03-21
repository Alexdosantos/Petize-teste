import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "../../locales/resources";

i18next.use(initReactI18next).init({
  resources,
  lng: "pt", // língua padrão
 
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: true,
  },
});
