import "babel-polyfill"
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import App from './App'
import '@/icons'
import store from '@/store'
import i18n from '@/lang'
import vueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
import 'font-awesome/css/font-awesome.css'
Vue.use(ElementUI, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(vueQuillEditor)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  store,
  i18n,
  components: { App },
  template: '<App/>'
})