import { getPermissionRecordByLink, updatePermissionByLink} from '@/api/e'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import i18n from '@/lang'
const user = {
  state: {},
  mutations: {},
  actions: {
    getPermissionRecordByLink({ commit }, info) {
      return new Promise((resolve, reject) => {
        getPermissionRecordByLink(info).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updatePermissionByLink({ commit }, info) {
      return new Promise((resolve, reject) => {
        updatePermissionByLink(info).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default user
