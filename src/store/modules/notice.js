import { UpdateWxConf, updateSMSConf,ivrNotifyConf,updateDDNotify,
  updateRtxConf,updateScanerSwitch, updatePermissionSwitch,
  updateQrcodeConf, updateExtendTime,
  updateComeAgain,updateSignOutSwitch,updateFaceScaner,
  updateOffDutyTime,getGate,addGate,updateblackListSwitch,
  ConfigureEmail,updateTempEditSwitch } from '@/api/notice'
import {updateSecureProtocol,UpdateDefaultPhoto,UploadPic} from '@/api/pad'
import { Message } from 'element-ui'
import { getCache,setCache } from '@/utils/auth'
import i18n from '@/lang'
const local = i18n.locale
const messages = i18n.messages[local]
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
    updateSMSConf({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateSMSConf(info).then(response => {
            let { status , reason } = response
            if (status === 0) {
                setCache('smsNotify',info.smsNotify)
                Message({
                  message: messages['updateSuccess'],
                  type: 'success'
                })
            }  else {
              Message({
                message: status + ':' + reason,
                type: 'error'
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
    updateDDNotify({ commit }, info) {
      return new Promise((resolve, reject) => {
          if (getCache('ddnotify') === 0) {
            Message({
              message: messages['exporttype'].tip5,
              type: 'error'
            })
          } else if(getCache('rtxip') && getCache('rtxport')) {
            Message({
              message: messages['exporttype'].tip2,
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
                    message: messages['updateSuccess'],
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
                  message: messages['updateSuccess'],
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
    updateTempEditSwitch({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateTempEditSwitch(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('tempEditSwitch',info.tempEditSwitch)
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
    updatePermissionSwitch({ commit }, info) {
      return new Promise((resolve, reject) => {
          updatePermissionSwitch(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('permissionSwitch',info.permissionSwitch)
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
    updateQrcodeConf({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateQrcodeConf(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('qrMaxCount',info.qrMaxCount)
                setCache('qrMaxDuration',info.qrMaxDuration)
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
    updateExtendTime({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateExtendTime(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('preExtendTime',info.preExtendTime)
                setCache('latExtendTime',info.latExtendTime)
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
    updateComeAgain({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateComeAgain(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('comeAgain',info.comeAgain)
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
    updateSignOutSwitch({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateSignOutSwitch(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('signOutSwitch',info.signOutSwitch)
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
    updateFaceScaner({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateFaceScaner(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('faceScaner',info.faceScaner)
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
    updateOffDutyTime({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateOffDutyTime(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('offDuty',info.offDuty)
                setCache('upDuty',info.upDuty)
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
    updateSecureProtocol({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateSecureProtocol(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('secureProtocol',info.secureProtocol)
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
    UpdateDefaultPhoto({ commit }, info) {
      return new Promise((resolve, reject) => {
          UpdateDefaultPhoto(info).then(response => {
            let { status , result } = response
            if (status === 0) {
                setCache('defaultPhoto',info.defaultPhoto)
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
    updateblackListSwitch({ commit }, info) {
      return new Promise((resolve, reject) => {
          updateblackListSwitch(info).then(response => {
            let { status , result } = response
            if (status === 0) {
              setCache('blackListSwitch',info.blackListSwitch)
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
    ConfigureEmail({ commit }, info) {
      return new Promise((resolve, reject) => {
          ConfigureEmail(info).then(response => {
            let { status , result } = response
            if (status === 0) {
              setCache('emailType',info.type)
              setCache('emailAccount',info.account)
              setCache('emailPwd',info.pwd)
              setCache('smtp',info.smtp)
              setCache('smtpPort',info.smtp_port)
              setCache('ssl',info.ssl)
              setCache('exchange',info.exchange)
              setCache('domain',info.domain)
              Message({
                message: messages['setSuccess'],
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
                  message: messages['uploadPicSuccess'],
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