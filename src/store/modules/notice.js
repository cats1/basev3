import { UpdateWxConf, updateSMSConf,ivrNotifyConf,updateDDNotify,
  updateRtxConf,updateScanerSwitch, updatePermissionSwitch,
  updateQrcodeConf, updateExtendTime, getUsertemplate } from '@/api/notice'
import { Message } from 'element-ui'
import { getCache,setCache } from '@/utils/auth'
const app = {
  state: {},
  mutations: {},
  actions: {
    UpdateWxConf({ commit }, info) {
      return new Promise((resolve, reject) => {
          UpdateWxConf(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('msgNotify',info.msgNotify)
                Message({
                  message: '微信开关修改成功',
                  type: 'success'
                })
            }
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    updateSMSConf({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateSMSConf(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('smsNotify',info.smsNotify)
                Message({
                  message: '短信开关修改成功',
                  type: 'success'
                })
            }
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    ivrNotifyConf({ commit }, info) {
      return new Promise((resolve, reject) => {
          ivrNotifyConf(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('ivrNotify',info.ivrNotify)
                Message({
                  message: '语音开关修改成功',
                  type: 'success'
                })
            }
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    updateDDNotify({ commit }, info) {
      return new Promise((resolve, reject) => {
          if(getCache('rtxip') && getCache('rtxport')) {
            Message({
              message: 'RTX已开启，钉钉无法打开',
              type: 'error'
            })
          } else {
            updateDDNotify(info).then(response => {
              let { status , result } = response
              if (status === 0) {
                  setCache('ddnotify',info.ddnotify)
                  setCache('ddautosync',info.ddautosync)
                  setCache('ddcorpid',info.ddcorpid)
                  setCache('ddcorpsecret',info.ddcorpsecret)
                  setCache('ddagentid',info.ddagentid)
                  Message({
                    message: '钉钉开关修改成功',
                    type: 'success'
                  })
              }
              resolve(response)
            }).catch(error => {
            reject(error)
            })
          }
      })
    },
    updateRtxConf({ commit }, info) {
      return new Promise((resolve, reject) => {
          if (getCache('ddnotify') === 1) {
            Message({
              message: '钉钉已开启，RTX无法打开',
              type: 'error'
            })
          } else {
            updateRtxConf(info).then(response => {
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          }
      })
    },
    updateScanerSwitch({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateScanerSwitch(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('scaner',info.ivrNotify)
                Message({
                  message: '二维码开关修改成功',
                  type: 'success'
                })
            }
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    updatePermissionSwitch({ commit }, info) {
      return new Promise((resolve, reject) => {
          updatePermissionSwitch(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('scaner',info.ivrNotify)
                Message({
                  message: '二维码开关修改成功',
                  type: 'success'
                })
            }
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    updateQrcodeConf({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateQrcodeConf(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('qrMaxCount',info.qrMaxCount)
                setCache('qrMaxDuration',info.qrMaxDuration)
                Message({
                  message: '二维码有效期设置成功',
                  type: 'success'
                })
            }
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    updateExtendTime({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateExtendTime(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('preExtendTime',info.preExtendTime)
                setCache('latExtendTime',info.latExtendTime)
                Message({
                  message: '前台验证有效期设置成功',
                  type: 'success'
                })
            }
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    getUsertemplate({ commit }, info) {
      return new Promise((resolve, reject) => {
          getUsertemplate(info).then(response => {
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default app