import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import app from './modules/app'
import superApi from './modules/super'
import company from './modules/company'
import emp from './modules/emp'
import stage from './modules/stage'
import smscode from './modules/smscode'
import meeting from './modules/meeting'
import visitor from './modules/visitor'
import notice from './modules/notice'
import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    app,
    superApi,
    company,
    emp,
    stage,
    smscode,
    meeting,
    visitor,
    notice
  },
  getters
})

export default store
