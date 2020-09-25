import axios from 'axios'
import { MessageBox, Message } from 'element-ui';
import store from '@/store';
import { refreshToken} from '@/api/user';
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url '/api'
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
      //config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
      //return res.response
    }
  },
  error => {
    if (error.response) {
      if (error.response.status == 401 && getToken()) {
        var curTime = new Date()
        var refreshtime = new Date(Date.parse(window.localStorage.refreshtime))
        // 在用户操作的活跃期内
        if (window.localStorage.refreshtime && (curTime <= refreshtime)) {
          // 直接将整个请求 return 出去，不然的话，请求会晚于当前请求，无法达到刷新操作
          return  refreshToken({token: getToken()}).then((res) => {
            if (res.success) {
              store.commit("SET_TOKEN", res.token);

              let curTime = new Date();
              let expiredate = new Date(curTime.setSeconds(curTime.getSeconds() + res.expires_in));
              store.commit("SaveTokenExpire", expiredate);
              error.config.baseURL=''
              error.config.__isRetryRequest = true;
              error.config.headers.Authorization = 'Bearer ' + res.token;
              // error.config 包含了当前请求的所有信息
              return axios(error.config);
            } else {
              // 刷新token失败 清除token信息并跳转到登录页面
              store.dispatch('user/resetToken').then(() => {
                location.reload()
              })
            }
          });
        } else {
          // 返回 401，并且不知用户操作活跃期内 清除token信息并跳转到登录页面
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        }

      }
      // 403 无权限
      if (error.response.status == 403) {
        Message({
          message: error.msg,
          type: 'error',
          duration: 5 * 1000
        })
        return null;
      }
    }
    console.log(error.response) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
