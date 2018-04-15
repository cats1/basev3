import { getEquipmentGroupByUserid, addEquipmentGroup,
	updateEquipmentGroup, delEquipmentGroup, getEquipmentbyUserid,
	addEquipment,updateEquipment,getOpendoorInfo } from '@/api/key'
import { Message } from 'element-ui'
const user = {
  state: {
  	groupD: {}
  },
  mutations: {
  	SET_GROUP (state,info) {
  	  console.log(info)
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
              message: '设备组添加成功！',
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
              message: '设备添加成功！',
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
              message: '设备组修改成功！',
              type: 'success'
            })
          }
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
              message: '设备修改成功！',
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
              message: '设备组删除成功！',
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
              message: '设备删除成功！',
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
