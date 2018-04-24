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
import key from './modules/key'
import visit from './modules/visit'
import upload from './modules/upload'
import depart from './modules/depart'
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
    notice,
    key,
    visit,
    depart,
    upload
  },
  getters
})

export default store
