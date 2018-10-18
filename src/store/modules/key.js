import { getEquipmentGroupByUserid, addEquipmentGroup,
	updateEquipmentGroup, delEquipmentGroup,delEquipment, getEquipmentbyUserid,
	addEquipment,updateEquipment,getOpendoorInfo,getEGroupByEid,getRfidRecords } from '@/api/key'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import i18n from '@/lang'
import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()
const user = {
  state: {
  	groupD: {}
  },
  mutations: {
  	SET_GROUP (state,info) {
      sessionStorage.curKey = JSON.stringify(info)
      state.groupD = info
  	},
    get_group (state,type) {
      if (sessionStorage.curKey) {
        state.groupD = JSON.parse(sessionStorage.curKey)
      }
    },
    remove_group (state) {
      state.groupD = {}
    }
  },
  actions: {
    getEquipmentGroupByUserid({ commit }, info) {
      return new Promise((resolve, reject) => {
        getEquipmentGroupByUserid(info).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getRfidRecords({ commit }, info) {
      return new Promise((resolve, reject) => {
        getRfidRecords(info).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getOpendoorInfo({ commit }, info) {
      return new Promise((resolve, reject) => {
        getOpendoorInfo(info).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getEquipmentbyUserid({ commit }, info) {
      return new Promise((resolve, reject) => {
        getEquipmentbyUserid(info).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addEquipmentGroup({ commit }, info) {
      return new Promise((resolve, reject) => {
        addEquipmentGroup(info).then(response => {
          let {status} = response
          if (status === 0) {
            let local = this.state.app.language
            Message({
              message: i18n.messages[local]['addSuccess'],
              type: 'success'
            })
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addEquipment({ commit }, info) {
      return new Promise((resolve, reject) => {
        addEquipment(info).then(response => {
          let {status} = response
          if (status === 0) {
            let local = this.state.app.language
            Message({
              message: i18n.messages[local]['addSuccess'],
              type: 'success'
            })
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateEquipmentGroup({ commit }, info) {
      return new Promise((resolve, reject) => {
        updateEquipmentGroup(info).then(response => {
          let {status} = response
          if (status === 0) {
            let local = this.state.app.language
            Message({
              message: i18n.messages[local]['updateSuccess'],
              type: 'success'
            })
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getEGroupByEid({ commit }, info) {
      return new Promise((resolve, reject) => {
        getEGroupByEid(info).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateEquipment({ commit }, info) {
      return new Promise((resolve, reject) => {
        updateEquipment(info).then(response => {
          let {status} = response
          if (status === 0) {
            let local = this.state.app.language
            Message({
              message: i18n.messages[local]['updateSuccess'],
              type: 'success'
            })
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    delEquipmentGroup({ commit }, info) {
      return new Promise((resolve, reject) => {
        delEquipmentGroup(info).then(response => {
          let {status} = response
          if (status === 0) {
            let local = this.state.app.language
            Message({
              message: i18n.messages[local]['deleteSuccess'],
              type: 'success'
            })
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    delEquipment({ commit }, info) {
      return new Promise((resolve, reject) => {
        delEquipment(info).then(response => {
          let {status} = response
          if (status === 0) {
            let local = this.state.app.language
            Message({
              message: i18n.messages[local]['deleteSuccess'],
              type: 'success'
            })
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default user
