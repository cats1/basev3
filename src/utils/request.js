import axios from 'axios'
import { Message } from 'element-ui'
import i18n from '@/lang'
import {getLanguage} from '@/utils/i18n'
import store from '@/store'
import { getCache,clearCookie } from '@/utils/auth'
const LocationHost = window.location.host
const LocationProtocol = window.location.protocol
var baseURL = process.env.BASE_API
if (LocationHost.indexOf('localhost') > -1 || LocationHost.indexOf('172.16.109.55') > -1) {
  baseURL = process.env.BASE_API
} else {
  baseURL = LocationProtocol + '//' + LocationHost + '/qcvisit'
}
// create an axios instance
const service = axios.create({
  baseURL: baseURL, // api的base_url
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['X-COOLVISIT-TOKEN'] = getCache('token') // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    if (response.status == 200) {
      let {status,reason} = response.data
      if (status == 0) {
        return response.data
      } else if (status == 28) {
        const noticeMessages = i18n.messages[getLanguage()].responseNote
        let messages = ''
        if (getLanguage() === 'zh') {
          if (noticeMessages[status]) {
            messages = noticeMessages[status]
          }
        } else {
          messages = response.data.reason
        }
        Message({
          message: messages,
          type: 'error',
          duration: 4 * 1000,
          onClose: function () {
            clearCookie()
            window.location.href = 'signin.html'
          }
        })
      } else {
        const noticeMessages = i18n.messages[getLanguage()].responseNote
        let messages = ''
        if (getLanguage() === 'zh') {
          if (noticeMessages[status]) {
            messages = noticeMessages[status]
          }
        } else {
          messages = response.data.reason
        }
        Message({
          message: messages,
          type: 'error',
          duration: 5 * 1000
        })
        //window.location.href = 'signin.html'
        return response.data
      }      
    } else {
      console.log(response.status)
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    // window.location.href = 'signin.html'
    return Promise.reject(error)
  })

export default service
