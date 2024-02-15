import { createSSRApp } from "vue";
import App from "./App.vue";
import uViewPlus from "uview-plus";
import en from "./locales/en.json";
import zhHans from "./locales/zh-Hans.json";
import zhHant from "./locales/zh-Hant.json";
import { createI18n } from "vue-i18n";
import './static/fonts/iconfont.css'

const Messages = {
  en,
  "zh-Hans": zhHans,
  "zh-Hant": zhHant,
};

let i18nConfig = {
  locale: uni.getLocale(),
  globalInjection: true,
  messages: Messages,
  legacy: false,
};

const i18n = createI18n(i18nConfig);

export function createApp() {
  const app = createSSRApp(App);
  app.use(uViewPlus);
  app.use(i18n);
  return {
    app,
  };
}

export { i18n };
