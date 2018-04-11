import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import app from './modules/app'
import superApi from './modules/super'
import company from './modules/company'
import emp from './modules/emp'
import stage from './modules/stage'
import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    app,
    superApi,
    company,
    emp,
    stage
  },
  getters
})

export default store
