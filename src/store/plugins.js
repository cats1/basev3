import VueI18n from 'vue-i18n'
import i18n from '@/lang'
import Vue from 'vue'
Vue.use(VueI18n)
const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}
function checkLanguage() {
  var lan = (navigator.browserLanguage || navigator.language).toLowerCase();
  if (lan.indexOf('en') > -1) {
    return 'en'
  } else if (lan.indexOf('zh-cn') > -1) {
    return 'zh'
  } else if (lan.indexOf('zh-hk') > -1) {
    return 'hk'
  } else {
    return 'en'
  }
}
const i18n = new VueI18n({
  locale: Cookies.get('language') || checkLanguage(),
  messages // set locale messages
})
export default i18n