import { getCache } from '@/utils/auth'
import { Message } from 'element-ui'
export function uploadCommon(file, callback) {
  if (!testImgFileFormat(file.name)) {
    Message({
      message: '图片格式不正确',
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
            message: '图片上传失败',
            type: 'error'
          })
          return
        }
      }
    }
    xhr.open('post', process.env.BASE_API + "/Upload", true)
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
