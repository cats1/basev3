import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../../styles/index.scss'
import App from './App'
import '../../icons'
import store from '../../store'
import i18n from '../../lang'
Vue.use(ElementUI, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})
Vue.config.productionTip = false
new Vue({
  el: '#app',
  store,
  i18n,
  components: { App },
  template: '<App/>'
})