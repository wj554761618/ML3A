import request from '@/utils/request'
export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}
/*export function login(data) {
  return request({
    url: '/Login/JWTToken3.0',
    method: 'get',
    params: {name:'test',pass:'test'}
  })
}*/
export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
//以旧的token换取新的token
export function refreshToken(token) {
  return request({
    url: '/Login/RefreshToken',
    method: 'get',
    params: token
  })
}

