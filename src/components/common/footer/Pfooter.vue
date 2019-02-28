<template>
    <div id='footer' class="clearfix">
      <div id="main-bottom"><div>{{technology_support}}</div></div>
      <div id='move_interaction' @mouseleave="mouseleave($event)"  @mouseenter="mouseenter($event)">
        <div class='wrap animated' id="wrap_utem" v-bind:class="{ hide: hide }">
          <div class='wrap2'>
              <li class="navigation" @click="handleClick('footer_homepage')">
                  <div class="icon_wrap footer_homepage">
                  </div>
                  <span> 首页 </span>
              </li>
              
              <li class="navigation" @click="handleClick('footer_realdata')">
                  <div class="icon_wrap footer_realdata">
                  </div>
                  <span> 人车监控 </span>
              </li>
              <li class="navigation" @click="handleClick('footer_vedio')">
                  <div class="icon_wrap footer_vedio">
                  </div>
                  <span> 实时视频 </span>
              </li>
              <li class="navigation" @click="link_jump()">
                  <div class="icon_wrap footer_accessControl">
                  </div>
                  <span> 门禁系统 </span>
              </li>
              <li class="navigation" @click="handleClick('footer_setting')">
                  <div class="icon_wrap footer_setting">
                  </div>
                  <span> 设置 </span>
              </li>
              <li class="navigation" @click="handleClick('footer_fullscreen')">
                  <div class="icon_wrap footer_fullscreen" v-bind:class="{footer_existscreen:screenfull}">
                  </div>
                  <span> {{fullscreen_text}} </span>
              </li>
          </div>
          
      </div>
      </div>
      
    </div>
</template>
<script>
import router from "@/router/index";
import * as screenfull from "screenfull";
import { logOut, CopyRight, accessControlIp } from "@/mock/api";
export default {
  data() {
    return {
      hide: true,
      setIn: "",
      timer: null,
      technology_support: "技术支持：清控智能丨云识图",
      screenfull: false,
      fullscreen_text: "全屏",
      jump_src: accessControlIp
    };
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  mounted() {
    CopyRight()
      .then(response => {
        if (response.status == 200) {
          this.technology_support = "技术支持：" + response.data.data.support;
        }
      })
      .catch(error => {
        console.error("CopyRight network error");
      });
  },
  methods: {
    mouseleave: function() {
      //鼠标移出div
      clearTimeout(this.timer); //清理定时器
      wrap_utem.className = "wrap animated fadeOutDown";
    },
    mouseenter: function() {
      //鼠标移入div
      this.timer = setTimeout(function() {
        //不用var声明是要timer为全局变量，为下面鼠标移出时间清理定时器
        wrap_utem.className = "wrap animated fadeInUp";
      }, 150);
    },
    handleClick: function(type) {
      this.$router.replace({
        path: "/supplierAllBack",
        name: "supplierAllBack"
      });
      setTimeout(() => {
        this.changePage(type);
      }, 300);
    },
    changePage(type) {
      switch (type) {
        case "footer_homepage":
          router.push({ name: "HomePage" });
          break;
        case "footer_fullscreen":
          screenfull.toggle();
          this.screenfull = !this.screenfull;
          if (this.screenfull) {
            this.fullscreen_text = "窗口";
          } else {
            this.fullscreen_text = "全屏";
          }
          break;
        case "footer_realdata":
          router.push({ name: "PersonAcar" });
          break;
        case "footer_vedio":
          router.push({ name: "VedioScreen" });
          break;
        case "footer_setting":
          router.push("/Setting/SettingIndex");
          break;
        default:
          break;
      }
    },
    link_jump() {
      window.open(`http://${this.jump_src}`);
    }
  }
};
</script>
<style scoped>
@import "../../../../node_modules/animate.css/animate.min.css";
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
#move_interaction {
  height: 50%;
  width: 100%;
  position: absolute;
  bottom: 0px;
}
#main-bottom {
  position: absolute;
  width: 100%;
  bottom: 13px;
}
#main-bottom div {
  position: relative;
  font-family: AdobeHeitiStd-Regular;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #01aeff;
  opacity: 0.5;
}
.login_out {
  background: url("/static/IMG/footer_loginout.png") no-repeat center;
}
.footer_homepage {
  background: url("/static/IMG/footer_homepage.png") no-repeat center;
}
.footer_recognise {
  background: url("/static/IMG/footer_recognise.png") no-repeat center;
}
.footer_fullscreen {
  background: url("/static/IMG/fullscreen.png") no-repeat center;
}
.footer_existscreen {
  background: url("/static/IMG/exitScreen.png") no-repeat center;
}
.footer_realdata {
  background: url("/static/IMG/footer_realdata.png") no-repeat center;
}
.footer_vedio {
  background: url("/static/IMG/footer_vedio.png") no-repeat center;
}
.footer_setting {
  background: url("/static/IMG/footer_setting.png") no-repeat center;
}
.footer_accessControl {
  background: url("/static/IMG/footer_accessControl.png") no-repeat center;
}
.hide {
  display: none !important;
}
.wrap2 {
  position: absolute;
  bottom: 20px;
  /* animation: rise 1s; */
}
@keyframes rise {
  0% {
    transform: scale(0.6);
  }
  100% {
    transform: scale(1);
  }
}
.icon_wrap {
  height: 59px;
  width: 59px;
  background-color: #04113a;
  border: solid 1px #e49f3a;
  border-radius: 30px;
  margin-bottom: 10px;
}

.img_top {
  margin-top: 11px;
}
.navigation {
  width: 59px;
  height: 84px;
  color: white;
  font-size: 14px;
  margin: 0px 24px;
  float: left;
  bottom: 20px;
  cursor: pointer;
}
.wrap {
  margin: -15px 400px 0px;
  padding: 0px 31px;
  display: inline-block;
  height: 69px;
  background-image: linear-gradient(
    0deg,
    rgba(217, 159, 0, 0.3) 0%,
    rgba(217, 159, 0, 0.6) 100%
  );
  border-radius: 15px;
  width: 702px;
  padding-bottom: 11px;
}

#footer {
  height: 110px;
  width: 100%;
  position: absolute;
  bottom: 0px;
  z-index: 10;
  overflow-y: hidden;
}
</style>
