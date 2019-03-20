import { addTag,delTag,getTags } from '@/api/tag'
import { getToken, setToken, setCache, getCache } from '@/utils/auth'
import i18n from '@/lang'
import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()
const user = {
	state: {},
	mutations: {},
	actions: {
		addTag({ commit }, info) {
			return new Promise((resolve, reject) => {
		        addTag(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		delTag({ commit }, info) {
			return new Promise((resolve, reject) => {
		        delTag(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		},
		getTags({ commit }, info) {
			return new Promise((resolve, reject) => {
		        getTags(info).then(response => {
		          resolve(response)
		        }).catch(error => {
		          reject(error)
		        })
		    })
		}
	}
}
export default user