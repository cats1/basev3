import { UpdateWxConf, updateSMSConf,ivrNotifyConf,updateDDNotify,
  updateRtxConf,updateScanerSwitch, updatePermissionSwitch,
  updateQrcodeConf, updateExtendTime, getUsertemplate,
  updateComeAgain,updateSignOutSwitch,updateFaceScaner,
  updateOffDutyTime,getGate,addGate,updateblackListSwitch } from '@/api/notice'
import {updateSecureProtocol,UpdateDefaultPhoto,UploadPic} from '@/api/pad'
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
          if (getCache('ddnotify') === 0) {
            Message({
              message: '钉钉设置未打开，无法开启自动同步',
              type: 'error'
            })
          } else if(getCache('rtxip') && getCache('rtxport')) {
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
              message: this.$t('exporttype.tip1'),
              type: 'error'
            })
          } else {
            updateRtxConf(info).then(response => {
              let { status , result } = response
              if (status === 0) {
                setCache('rtxip',info.rtxIp)
                setCache('rtxport',info.rtxPort)
                Message({
                  message: 'RTX设置成功',
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
    updateComeAgain({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateComeAgain(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('comeAgain',info.comeAgain)
                Message({
                  message: '曾经来过开关修改成功',
                  type: 'success'
                })
            }
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    updateSignOutSwitch({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateSignOutSwitch(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('signOutSwitch',info.signOutSwitch)
                Message({
                  message: '登出开关修改成功',
                  type: 'success'
                })
            }
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    updateFaceScaner({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateFaceScaner(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('faceScaner',info.faceScaner)
                Message({
                  message: '刷脸签到开关修改成功',
                  type: 'success'
                })
            }
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    updateOffDutyTime({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateOffDutyTime(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('offDuty',info.offDuty)
                setCache('upDuty',info.upDuty)
                Message({
                  message: '工作时间设置成功',
                  type: 'success'
                })
            }
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    updateSecureProtocol({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateSecureProtocol(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('secureProtocol',info.secureProtocol)
                Message({
                  message: '安全协议设置成功',
                  type: 'success'
                })
            }
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    UpdateDefaultPhoto({ commit }, info) {
      return new Promise((resolve, reject) => {
          UpdateDefaultPhoto(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('defaultPhoto',info.defaultPhoto)
                Message({
                  message: '缺省头像设置成功',
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
    },
    getGate({ commit }, info) {
      return new Promise((resolve, reject) => {
          getGate(info).then(response => {
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    addGate({ commit }, info) {
      return new Promise((resolve, reject) => {
          addGate(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                Message({
                  message: '门岗设置成功',
                  type: 'success'
                })
            }
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    updateblackListSwitch({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateblackListSwitch(info).then(response => {
            let { status , result } = response
            if (status === 0) {
              setCache('blackListSwitch',info.blackListSwitch)
                Message({
                  message: '黑名单设置成功',
                  type: 'success'
                })
            }
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
    UploadPic({ commit }, params) {
      return new Promise((resolve, reject) => {
          UploadPic(params).then(response => {
            let { status , result } = response
            if (status === 0) {
                Message({
                  message: '图片上传成功',
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

export default app