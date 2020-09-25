import request from '@/utils/request'

export function getAreaList(data) {
  return request({
    url: '/vue-admin-template/getAreaList',
    method: 'post',
    data
  })
}
export function getTotalAndRate() {
  return request({
    url: '/vue-admin-template/statistic/getTotalAndRate',
    method: 'get'
  })
}
/*export function getTotalAndRate() {
  return request({
    url: '/Module/Get',
    method: 'get'
  })
}*/
export function getResourceRunStatisticData() {
  return request({
    url: '/vue-admin-template/statistic/getResourceRunData',
    method: 'get'
  })
}
export function getMonitorDetectList(data) {
  return request({
    url: '/vue-admin-template/monitorDetect/list',
    method: 'get',
    params: { data }
  })
}
export function getAreaTreeList() {
  return request({
    url: '/vue-admin-template/getAreaTreeList',
    method: 'get'
  })
}

