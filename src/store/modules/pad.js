import { UpdateThemeColor,GetExtendVisitor,addExtendVisitor,updateQRcode,updateCardType } from '@/api/pad'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
import { Message } from 'element-ui'
import i18n from '@/lang'
const local = i18n.locale
const messages = i18n.messages[local]
const user = {
	state: {},
	mutations: {},
	actions: {
		UpdateThemeColor({ commit }, info) {
			return new Promise((resolve, reject) => {
		        UpdateThemeColor(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	setCache('themecolor',info.themecolor)
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
		GetExtendVisitor({ commit }, info) {
			return new Promise((resolve, reject) => {
		        GetExtendVisitor(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		addExtendVisitor({ commit }, info,type) {
			return new Promise((resolve, reject) => {
		        addExtendVisitor(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	if (type === 0) {
                      Message({
	                  	message: messages['setSuccess'],
	                  	type: 'success'
	                  })
		          	} else {
		          	  Message({
	                  	message: messages['setSuccess'],
	                  	type: 'success'
	                  })
		          	}
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		updateQRcode({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateQRcode(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	setCache('qrcode', info.qrcode)
		          	setCache('qrcodeType', info.qrcodeType)
		          	setCache('qrcodeSwitch', info.qrcodeSwitch)
		          }
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		updateCardType({ commit }, info) {
			return new Promise((resolve, reject) => {
		        updateCardType(info).then(response => {
		          let { status, result } = response
		          if (status === 0) {
		          	setCache('printType', info.printType)
		          	setCache('cardType', info.cardType)
		          	setCache('cardSize', info.cardSize)
		          	setCache('cardLogo', info.cardLogo)
		          	setCache('cardText', info.cardText)
		          	setCache('cardPic', info.cardPic)
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
	}
}
export default user