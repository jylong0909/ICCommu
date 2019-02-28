import axios from 'axios'

// Vue.prototype.setCookie = (c_name, value, expiredays) => {
//   var exdate = new Date()
//   exdate.setDate(exdate.getDate() + expiredays)
//   document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
// }

// 获取cookie、
function getCookie(name) {
  var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr = document.cookie.match(reg)) {
    return (arr[2])
  } else {
    return null
  }
}

// http request 拦截器 
axios.interceptors.request.use(
  config => {
    if (this.getCookie("XCsrfToken")) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `token ${this.getCookie("XCsrfToken")}`
  }
    return config;
  },
  err => {
    Indicator.close()
    return Promise.reject(err);
  })

// var instance = axios.create();
// instance.interceptors.request.use(function () {

// });
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      console.log(1)
      console.log(error.response)
      switch (error.response.status) {
        case 403:
          delCookie(XCsrfToken)
          router.replace({
            path: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            } // 登录成功后跳入浏览的当前页面
          })
          console.log('请重新登录')
          // alert('您没有该操作权限');
          break
        case 500:
          console.log('服务器错误')
          // alert('服务器错误');
      }
    }
    return Promise.reject(error.response)
  })
export default axios
