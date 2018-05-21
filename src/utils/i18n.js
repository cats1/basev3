import Cookies from 'js-cookie'
// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  const hasKey = this.$te('route.' + title)
  const translatedTitle = this.$t('route.' + title) // $t :this method from vue-i18n, inject in @/lang/index.js

  if (hasKey) {
    return translatedTitle
  }
  return title
}
export function getLanguage() {
  var lan = (navigator.browserLanguage || navigator.language).toLowerCase();
  var valueLan = 'en'
  if (lan.indexOf('en') > -1) {
    valueLan = 'en'
  } else if (lan.indexOf('zh-cn') > -1) {
    valueLan = 'zh'
  } else if (lan.indexOf('zh-hk') > -1) {
    valueLan = 'hk'
  } else {
    valueLan = 'en'
  }
  return Cookies.get('language') || valueLan
}
