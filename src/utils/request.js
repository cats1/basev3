import axios from 'axios'
import { Message } from 'element-ui'
import i18n from '../lang'
const noticeMessages = i18n.messages[i18n.locale].responseNote
import store from '@/store'
import { getCache } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
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
        Message({
          message: noticeMessages[status],
          type: 'error',
          duration: 5 * 1000,
          onClose: function () {
            window.location.href = 'signin.html'
          }
        })
      } else {
        Message({
          message: noticeMessages[status],
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
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
   // window.location.href = 'signin.html'
    return Promise.reject(error)
  })

export default service
