import { getCache } from '@/utils/auth'
import { getBaseUrl } from '@/utils/common'
import { Message } from 'element-ui'
import i18n from '@/lang'
import {getLanguage} from '@/utils/i18n'
export function formUpload(formid, file, callback) {
  let mform = document.getElementById(formid)
  let form = new FormData(mform)
  let responseJSON
  form.enctype = "multipart/form-data"
  form.append('action', 'upload')
  form.append('filename', file)
  let xhr = new XMLHttpRequest()
  xhr.onload = function() {
    if (xhr.status == 200) {
      responseJSON = JSON.parse(xhr.responseText)
      if (responseJSON.status == 0) {
        let result = responseJSON.result
        callback && callback(result)
      } else {
        Message({
          message: i18n.messages[getLanguage()].uploadPicError,
          type: 'error'
        })
        return
      }
    }
  }
  xhr.open('post', getBaseUrl() + "/Upload", true)
  xhr.setRequestHeader("X-COOLVISIT-TOKEN", getCache('token'))
  xhr.send(form)
}
export function uploadCommon(file, callback) {
  if (!testImgFileFormat(file.name)) {
    Message({
      message: i18n.messages[getLanguage()].picFormatError,
      type: 'error'
    })
  } else {
    let form = new FormData()
    let responseJSON
    form.enctype = "multipart/form-data"
    form.append('action', 'upload')
    form.append('filename', file)
    let xhr = new XMLHttpRequest()
    xhr.onload = function() {
      if (xhr.status == 200) {
        responseJSON = JSON.parse(xhr.responseText)
        if (responseJSON.status == 0) {
          let result = responseJSON.result
          callback && callback(result)
        } else {
          Message({
            message: i18n.messages[getLanguage()].uploadPicError,
            type: 'error'
          })
          return
        }
      }
    }
    xhr.open('post', getBaseUrl() + "/Upload", true)
    xhr.setRequestHeader("X-COOLVISIT-TOKEN", getCache('token'))
    xhr.send(form)
  }

}

function testImgFileFormat(filename) {
  var reg = /(\.png)|(\.jpg)|(\.jpeg)|(\.gif)$/
  var image = new Image()
  var low = filename.toLowerCase()
  if (reg.test(low) == true) {
    return true;
  } else
    return false;
}

function testFileFormat(filename) {
  var reg = /(\.xls)|(\.xlsx)|(\.csv)$/
  var low = filename.toLowerCase()
  if (reg.test(low) == true) {
    return true
  } else
    return false
}
export function UploadSubAccount(file, callback) {
  if (!testFileFormat(file.name)) {
    Message({
      message: i18n.messages[getLanguage()].fileFormatError,
      type: 'error'
    })
  } else {
    let form = new FormData()
    let responseJSON
    form.enctype = "multipart/form-data"
    form.append('action', 'upload')
    form.append('filename', file)
    form.append('user', getCache('userid'))
    let xhr = new XMLHttpRequest()
    xhr.onload = function() {
      if (xhr.status == 200) {
        responseJSON = JSON.parse(xhr.responseText)
        if (responseJSON.status == 0) {
          let result = responseJSON.result
          Message({
            message: i18n.messages[getLanguage()].uploadFileSuccess,
            type: 'success'
          })
          callback && callback(result)
        } else {
          Message({
            message: i18n.messages[getLanguage()].uploadFileError,
            type: 'error'
          })
          return
        }
      }
    }
    xhr.open('post', getBaseUrl() + "/UploadSubAccount", true)
    xhr.setRequestHeader("x-coolvisit-token", getCache('token'))
    xhr.send(form)
  }

}
export function UploadApponintment(file, callback) {
  if (!testFileFormat(file.name)) {
    Message({
      message: i18n.messages[getLanguage()].fileFormatError,
      type: 'error'
    })
  } else {
    let form = new FormData()
    let responseJSON
    form.enctype = "multipart/form-data"
    form.append('action', 'upload')
    form.append('filename', file)
    form.append('user', getCache('userid'))
    let xhr = new XMLHttpRequest()
    xhr.onload = function() {
      if (xhr.status == 200) {
        responseJSON = JSON.parse(xhr.responseText)
        if (responseJSON.status == 0) {
          let result = responseJSON.result
          Message({
            message: i18n.messages[getLanguage()].uploadFileSuccess,
            type: 'success'
          })
          callback && callback(result)
        } else {
          Message({
            message: i18n.messages[getLanguage()].uploadFileError,
            type: 'error'
          })
          return
        }
      }
    }
    xhr.open('post', getBaseUrl() + "/UploadApponintment", true)
    xhr.setRequestHeader("X-COOLVISIT-TOKEN", getCache('token'))
    xhr.send(form)
  }

}
export function NewUploadAB(file, callback) {
  if (!testFileFormat(file.name)) {
    Message({
      message: i18n.messages[getLanguage()].fileFormatError,
      type: 'error'
    })
  } else {
    let form = new FormData()
    let responseJSON
    form.enctype = "multipart/form-data"
    form.append('action', 'upload')
    form.append('filename', file)
    form.append('user', getCache('userid'))
    let xhr = new XMLHttpRequest()
    xhr.onload = function() {
      if (xhr.status == 200) {
        responseJSON = JSON.parse(xhr.responseText)
        if (responseJSON.status == 0) {
          let result = responseJSON.result
          Message({
            message: i18n.messages[getLanguage()].uploadFileSuccess,
            type: 'success'
          })
          callback && callback(result)
        } else {
          Message({
            message: i18n.messages[getLanguage()].uploadFileError,
            type: 'error'
          })
          return
        }
      }
    }
    xhr.open('post', getBaseUrl() + "/NewUploadAB", true)
    xhr.setRequestHeader("x-coolvisit-token", getCache('token'))
    xhr.send(form)
  }
}
export function UploadAB(file, callback) {
  if (!testFileFormat(file.name)) {
    Message({
      message: i18n.messages[getLanguage()].fileFormatError,
      type: 'error'
    })
  } else {
    let form = new FormData()
    let responseJSON
    form.enctype = "multipart/form-data"
    form.append('action', 'upload')
    form.append('filename', file)
    form.append('user', getCache('userid'))
    let xhr = new XMLHttpRequest()
    xhr.onload = function() {
      if (xhr.status == 200) {
        responseJSON = JSON.parse(xhr.responseText)
        if (responseJSON.status == 0) {
          let result = responseJSON.result
          Message({
            message: i18n.messages[getLanguage()].uploadFileSuccess,
            type: 'success'
          })
          callback && callback(result)
        } else {
          Message({
            message: i18n.messages[getLanguage()].uploadFileError,
            type: 'error'
          })
          return
        }
      }
    }
    xhr.open('post', getBaseUrl() + "/UploadAB", true)
    xhr.setRequestHeader("x-coolvisit-token", getCache('token'))
    xhr.send(form)
  }
}
