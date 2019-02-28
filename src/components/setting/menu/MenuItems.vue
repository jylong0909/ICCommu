<template>
  <div class="sub_menu" :class="{'active':item_url == link_ul}" @click="changeRoute(item_url)" >{{item_name}}</div>
</template>
<script>
import Vue from 'vue';
import router from '@/router/index'
import {logOut} from '@/mock/api'
import layer from 'vue-layer'

Vue.prototype.$layer = layer(Vue);
export default {
  props: ["item_name","item_url" ,"one_index"],
  data() {
    return {
      isActive: false,
      link_ul:''
    }
  },
  mounted(){
      //console.log(this.item_name)
  },
  methods: {
    changeRoute: function(url) {
      this.link_ul = url
      this.isActive = true
      // console.log(url)
      if(url == 'Logout'){
       router.push({'name':'Login'})
        logOut().then(
            response =>{
              this.$layer.msg('登出成功!', {
                    icon: 1,
                });
            return false;
            }
          )
          .catch(error => {
            console.log(error)
          })
      }else{
        router.push({ name: url})
      }
    },
  }
}
</script>
<style scoped>
.sub_menu {
  width: 240px;
  height: 30px;
  line-height: 30px;
  font-family: SimHei;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 1px;
  background-image: linear-gradient(
    90deg,
    rgba(3, 253, 250, 0.05) 0%,
    rgba(1, 174, 255, 0.16) 52%,
    rgba(1, 176, 255, 0.17) 53%,
    rgba(3, 253, 250, 0.05) 100%
  );
  text-align: left;
  padding-left: 31px;
}
.active {
  color: #49f1e7;
}
</style>

