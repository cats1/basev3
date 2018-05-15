import { getEquipmentGroupByUserid, addEquipmentGroup,
	updateEquipmentGroup, delEquipmentGroup, getEquipmentbyUserid,
	addEquipment,updateEquipment,getOpendoorInfo,getEGroupByEid } from '@/api/key'
import { Message } from 'element-ui'
import i18n from '@/lang'
const local = i18n.locale
const messages = i18n.messages[local]
const user = {
  state: {
  	groupD: {}
  },
  mutations: {
  	SET_GROUP (state,info) {
      state.groupD = info
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
            Message({
              message: messages['addSuccess'],
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
            Message({
              message: messages['addSuccess'],
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
            Message({
              message: messages['updateSuccess'],
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
            Message({
              message: messages['updateSuccess'],
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
            Message({
              message: messages['deleteSuccess'],
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
            Message({
              message: messages['deleteSuccess'],
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
