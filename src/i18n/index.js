import VueI18n from "vue-i18n";
import Vue from "vue";
import zh from "./zh";
import en from "./en";
// import kr from './kr'
// import ru from './ru'
import tc from "./tc";
import jpn from "./jpn";
import { getToken,setToken } from '@/utils/auth'

Vue.use(VueI18n);

function getBasicLange() {
  let lange = navigator.language || navigator.userLanguage;
  let obj = {
    "zh-CN": "zh",
    en,
  };
  setToken('OZFUND_LANG', obj[lange])
  return obj[lange];
}
const i18n = new VueI18n({
  locale: getToken("OZFUND_LANG") || getBasicLange(),
  globalInjection: true,
  messages: {
    zh,
    en,
    // kr, // 韩语
    // ru, // 俄语
    tc, // 繁体
    jpn,
  },
});

export default i18n;
