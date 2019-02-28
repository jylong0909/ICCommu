<template>
  <div id="Login">
    <h1>
    <img src="/static/IMG/images/login_head2.png"/>
    </h1>
<div class="main-box">
    <div class="login_wrap">
        <div class="title-change" style="top:70px;">欢迎登录</div>
        <div class="userName input-box" style="margin-top: 100px;">
            <img src="/static/IMG/images/user.png" />
            <input type="text" name="username" id="username" v-model.trim.lazy='user' ref="inputUser"/>
        </div>
        <div class="password input-box" style="margin-top: 20px;">
            <img src="/static/IMG/images/password.png" />
            <input type="password" name="password" id="password" v-model.trim.lazy='pass'  @keyup.enter="Login()"/>
        </div>
        <input id="login" type="button" style="margin-top: 30px;" value="登 录" @click="Login()" ref='inputPass'  @keyup.enter="Login()"/>
    </div>
</div>
<div class="copy">
        {{copyright}}
</div>
  </div>
</template>

<script>
import Vue from 'vue';
import layer from 'vue-layer'


import { login ,CopyRight } from '@/mock/api'

Vue.prototype.$layer = layer(Vue);
export default {
  name: 'Login',
 data () {
    return {
        user:'',
        pass:'',
        isLoging:false,
        copyright:''
    }
  },
  created() {
    this.checkLogins();
  },
  mounted(){
        this.Copy()
        this.checkLogins()
  },
  methods:{
      checkLogins () {
        function getCookie(name) {
        var arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if ((arr = document.cookie.match(reg))) {
            return arr[2];
        } else {
            return null;
        }
        }
        Vue.prototype.getCookie = getCookie;
            // if (!this.getCookie("XCsrfToken")) {
            // this.$router.push('/login');
            // } else {
            // this.$router.push('/HomePage');
            // }
    },
    Copy(){
        CopyRight()
      .then(function (response) {
          //console.log(response.data.data);
         this.copyright = response.data.data.copyright
        }.bind(this)).catch(function (error) {
          console.log(error)
      })
    },
    Login(){
         if(this.user == ''){
            this.$layer.msg('用户名不能为空!', {
                    icon: 1,
                });
            return false;
         }else if(this.pass == ''){
          this.$layer.msg('密码不能为空!', {
                    icon: 1,
                });
          return false;
         }else{
              this.toLogin();
         }
        
      },
      toLogin(){
      //设置在登录状态
      this.isLoging = true;
      // var Url = 'http://192.168.1.33:4399/user/login'
      // axios.post(`${Url}`,{
      //      "username": this.user,
      //     "password": this.pass
      //   })
		
      login({ "username": this.user,
          "password": this.pass})
      .then(function (response) {
          console.log(response);
           this.$layer.msg(`${response.data.detail}`, {
                    icon: 1,
            })
           this.user='';
           this.pass=''
          this.$router.push('/HomePage');
         
        }.bind(this)).catch(function (error) {
          console.log(error.response.data.detail)
          this.$layer.msg(`${error.response.data.detail}`, {
                    icon: 1,
            })
           this.user='';
           this.pass=''
      }.bind(this))
      },
  }
}
</script>

<style scoped>

#Login{
    width: 100%;
    height: 1075px;
    overflow: hidden;
	background:url(/static/IMG/images/login_bg.png) no-repeat;
	background-size: 100% 100%；
}

h1 { 
    width: 1024px;
    text-align: center;
   margin: 145px auto 90px;
}
.login_wrap,.register_wrap{
    width: 1024px;
    margin: auto;
    height: 332px; 
    box-sizing: border-box;
    background: url(/static/IMG/images/login.png) no-repeat center top;
    padding: 10px;
    position: relative;

}
/*登录*/
.login_wrap .input-box{
    margin: 82px 0 10px 354px;
    height: 30px;
    line-height: 30px;
}
.login_wrap>div *{
    display: block;
    float: left;
}
.login_wrap>div>img{
    position: relative;
    top: 5px;
    left: 32px;
}
.login_wrap>div input{
    width: 264px;
    height: 32px;
    line-height: 32px;
    background-color: #0a2a43;
    border: solid 1px #00ace4;
    border-radius: 3px;
    color: #ffffff;
    box-sizing: border-box;
    padding-left: 40px;
}
.login_wrap>.password{
    margin: 12px 0 0px 354px;
    height: 30px;
    line-height: 30px;
}
#login,#register{
      display: block;
    width: 121px;
    height: 31px;
    line-height: 31px;
    background-color: #00ace4;
    border-radius: 5px;
    border: solid 1px #25afe4;
    text-align: center;
    font-size: 18px;
    font-family: SimHei;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    margin-left: 444px;
    cursor: pointer;
}
.title-change{
    position: absolute;
    top: 64px;
    left: 383px;
    width: 65px;
    height: 16px;
    font-family: SimHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
}
.content-change{
    position: absolute;
    top: 257px;
    left: 600px;
    font-family: SimHei;
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    cursor: pointer;
    transform: scale(0.83);
    -webkit-transform: scale(0.83);
    -moz-transform: scale(0.83);
    -o-transform: scale(0.83);
}
.captcha-img{
    width: 100px;
    height: 29px;
}
.captcha-img2{
    width: 118px;
    height: 24px;
}
.login_wrap .captcha_key{
    margin: 11px 0 11px 372px;
}
#captcha_key{
    padding-left: 8px;
    width: 150px;
    height: 28px;
    line-height: 28px;
    margin-right: 13px;
}
/*注册*/
.register_wrap .input-box{
    margin: 0 0 5px 373px;
    height: 24px;
    line-height: 24px;
}
.register_wrap .input-box.first{
    margin-top: 80px;
}
.register_wrap>div *{
    display: block;
    float: left;
}
.register_wrap>div>img{
    position: relative;
    top: 5px;
    left: 32px;
}
.register_wrap>div input{
    width: 264px;
    height: 24px;
    line-height: 24px;
    background-color: #0a2a43;
    border: solid 1px #00ace4;
    border-radius: 3px;
    color: #ffffff;
    box-sizing: border-box;
    padding-left: 14px;
}
#captcha_key.register-key{
    padding-left: 14px;
    width: 134px;
    height: 24px;
    line-height: 24px;
    margin-right: 11px;
}
#register{
    height: 24px;
    line-height: 23px;
    font-size: 14px;
    width: 100px;
    margin-top: 5px;
    margin-left: 455px;
}
/*placeholder*/
::-webkit-input-placeholder {
    color:#03587a;
}
:-moz-placeholder {
    color:#03587a;
}
::-moz-placeholder {
    color:#03587a;
}
:-ms-input-placeholder {
    color:#03587a;
}
.copy{
    width: 700px;
    color: #808080;
    text-align: center;
    position: absolute;
    bottom: 30px;
    left: calc(50% - 350px);
}
.copy a{
    color: #808080;
    text-decoration: none;
}
.copy a:active,.copy a:focus,.copy a:hover {
    text-decoration: none;
    border-bottom: 1px #0099CC dotted;
    color: #f40;
}

</style>
