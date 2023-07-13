import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  supportedLngs: ["en", "ar"],
  resources: {
    en: {
      common: require("./locales/en/common.json"),
      bookings: require("./locales/en/bookings.json"),
    },
    ar: {
      common: require("./locales/ar/common.json"),
    },
  },
  ns: ["common", "bookings"],
  defaultNS: "common",
});

export default i18n;
