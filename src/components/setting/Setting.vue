<template>
  <div id="Setting">
    <Pheader mesFather="智慧社区数据平台"></Pheader>
    <div class='content_wrap'>
      <div class="setting_menus">
        <div id='menus_title'>{{menus_title}}</div>
        <div class='menus_warp'>
          <!-- <MenuLists v-for="(item, index) in menu_list" :key="'menu'+item.id" :menu_id="item.id" :menu_item="item"
            :menu_name="item.name" :the_index="index"></MenuLists> -->
          <el-tree :data="menu_list" :props="defaultProps" accordion @node-click="handleNodeClick" highlight-current>
          </el-tree>
        </div>
      </div>
      <div id='content_main'>
        <router-view />
      </div>
    </div>
    <Pfooter></Pfooter>

  </div>
</template>
<script>
  import Pheader from "../common/header/Pheader";
  import Pfooter from "../common/footer/Pfooter";

  import {
    menulist,
    logOut
  } from "@/mock/api";
  import MenuLists from "./menu/MenuLists";
  import Vue from 'vue';
  import router from '@/router/index'
  import layer from 'vue-layer'
  Vue.prototype.$layer = layer(Vue);
  export default {
    name: "Setting",
     inject:['reload'],
    components: {
      Pheader,
      Pfooter,
      MenuLists,
     
    },
    data() {
      return {
        menus_title: "设置列表",
        menu_list: [],
        isShow: 0,
        id_data:0,
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      };
    },
    mounted() {

      menulist()
        .then(response => {
          var menu_list_formatter = response.data.data;
          for (let i = menu_list_formatter.length - 1; i >= 0; i--) {
            if (menu_list_formatter[i].is_display == Number(0)) {
              menu_list_formatter.splice(i, 1);
            }
            for (let k = menu_list_formatter[i].children.length - 1; k >= 0; k--) {
              if (menu_list_formatter[i].children[k].is_display == Number(0)) {
                menu_list_formatter[i].children.splice(k, 1);

              }
            }
          }
          this.menu_list = menu_list_formatter;
        })
        .catch(error => {
          console.log(error);
        });
    },
    methods: {
      handleNodeClick(params, index) {
        // console.log(params)
        // console.log(url)
        if (params.children.length > 0) {
          return
        } else {
          if (params.url == 'Logout') {
            
            logOut().then(
                response => {
                  router.push({
                    'name': 'Login'
                  })
                  this.$layer.msg('登出成功!', {
                    icon: 1,
                  });
                  return false;
                }
              )
              .catch(error => {
                console.log(error)
              })
          } else {
            router.push({
              name: params.url
            })

          }
        }
      }
    }
  };

</script>
<style>
  .el-dialog {
    background: url("/static/IMG/main_right_bg.png") no-repeat !important;
    background-size: 100% 100% !important;
  }

  .el-form-item__label,
  .el-dialog__title {
    color: #feffff !important;
  }
  #Setting .el-tree-node__label {
    font-size: 15px;
  }
  #Setting .el-tree-node>.el-tree-node__children .el-tree-node__content {
    height: 40px;
    line-height: 40px;
  }
  .menus_warp .el-tree-node__content {
    width: 240px;
    height: 50px;
    line-height: 50px;
    /* font-family: AdobeHeitiStd-Regular; */
    font-size: 16px;
    font-stretch: normal;
    letter-spacing: 0px;
    text-align: left;
    padding-left: 23px;
    cursor: pointer;
    /* background: rgba(0, 174, 255, 0.17); */
    /* background-image: linear-gradient(85deg,
      rgba(1, 174, 255, 0.4) 0%,
      rgba(1, 174, 255, 0.22) 50%,
      rgba(1, 174, 255, 0.05) 100%); */
    border-bottom: 1px solid;
    border-image: -webkit-linear-gradient(to right,
      rgba(3, 253, 250, 0.4),
      rgba(3, 253, 250, 0)) 30 30;
    border-image: -moz-linear-gradient(to right,
      rgba(3, 253, 250, 0.4),
      rgba(3, 253, 250, 0)) 30 30;
    border-image: linear-gradient(to right,
      rgba(3, 253, 250, 0.4),
      rgba(3, 253, 250, 0)) 30 30;
  }

  .menus_warp .el-tree {
    background: none;
    color: #fff;
  }

  .menus_warp .el-tree-node__content:hover {
    /* background-color: transparent; */
    background: rgba(0, 174, 255, 0.17);
    background-image: linear-gradient(85deg,
      rgba(1, 174, 255, 0.4) 0%,
      rgba(1, 174, 255, 0.22) 50%,
      rgba(1, 174, 255, 0.05) 100%);
  }

  .menus_warp .el-tree-node:focus>.el-tree-node__content {
    /* background-color: transparent; */
    background: rgba(0, 174, 255, 0.17);
    background-image: linear-gradient(85deg,
      rgba(1, 174, 255, 0.4) 0%,
      rgba(1, 174, 255, 0.22) 50%,
      rgba(1, 174, 255, 0.05) 100%);
    color: #49f1e7;
  }
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background: rgba(0, 174, 255, 0.17) !important;
    background-image: linear-gradient(85deg,
      rgba(1, 174, 255, 0.4) 0%,
      rgba(1, 174, 255, 0.22) 50%,
      rgba(1, 174, 255, 0.05) 100%) !important;
    color: #49f1e7 !important;
  }

</style>

<style scoped>
  #Setting {
    position: relative;
    height: 1079px;
    padding-bottom: 47px;
    background: url("/static/IMG/bg.jpg") no-repeat;
  }

  .content_wrap {
    margin-top: 10px;
  }

  .setting_menus {
    float: left;
    margin-left: 40px;
    /* background: url("/static/IMG/camears_bg.png") no-repeat; */
    background-size: 100%;
    width: 240px;
    height: 920px;
    position: relative;
  }

  .menus_warp {
    width: 100%;
    height: 880px;
    background: rgba(0, 174, 255, 0.17);
    border: 1px solid rgba(0, 174, 255, 0.4);
    border-top: 0;
  }

  #menus_title {
    height: 40px;
    line-height: 40px;
    background: url("/static/IMG/menu_title.png") no-repeat;
    background-size: 100%;
    /* font-family: SourceHanSansCN-Regular; */
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    text-align: left;
    padding-left: 20px;
  }

  #content_main {
    width: 1580px;
    height: 920px;
    margin-left: 300px;
    background: url("/static/IMG/main_right_bg.png") no-repeat center center;
    background-size: 100% 100%;
  }

  .hide {
    display: none;
  }

  .active {
    color: #49f1e7;
  }

</style>
