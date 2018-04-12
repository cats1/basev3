import request from '@/utils/request'
//获取签到访客
export function SearchVisitByCondition(data) {
  return request({
    url: '/SearchVisitByCondition',
    method: 'post',
    data
  })
}