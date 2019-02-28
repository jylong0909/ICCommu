// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'mock/axios/index'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import layer from 'vue-layer'
import axios from 'axios';
Vue.prototype.$axios = axios;

Vue.use(ElementUI)









Vue.prototype.$layer = layer(Vue)
// Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
// Vue.config.productionTip = false

Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

// 获取cookie、
function getCookie(name) {
  var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr = document.cookie.match(reg)) {
    return (arr[2])
  } else {
    return null
  }
}
Vue.prototype.getCookie = getCookie

// 删除cookie
Vue.prototype.delCookie = (name) => {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}
//axios.defaults.headers.common['XCsrfToken'] = getCookie("XCsrfToken")

// axios.interceptors.request.use(
//   config => {
//     var token = this.getCookie("XCsrfToken")
//     if (token) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
//       config.headers.common['XCsrfToken']=token
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   });

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
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



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  watch: {
    '$route': 'checkLogin'
  },
  created() {
    this.checkLogin()
  },
  mounted() {
    setInterval(function () {
      this.checkLogin()
    }.bind(this), 2000)
  },
  methods: {
    checkLogin() {
      if (!this.getCookie("XCsrfToken")) {
        //this.$router.push('/login');
      } else {
        // this.$router.push('/HomePage');
        // this.$router.push('/HomePage');
      }
    }
  }
})



C:\xampp\htdocs\info_project\info_mation\dist