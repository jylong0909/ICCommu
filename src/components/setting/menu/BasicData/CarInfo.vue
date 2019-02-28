<!-- <template>
    <div class="navMenu">
  
      <template v-for="navMenu in navMenus">
          <!-- 最后一级菜单 -->
        <!-- <el-menu-item v-if="!navMenu.childs&&navMenu.entity"
                      :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name" :route="navMenu.entity.value"
                     >
          <i :class="navMenu.entity.icon"></i>
          <span slot="title">{{navMenu.entity.alias}}</span>
        </el-menu-item> -->
  
        <!-- 此菜单下还有子菜单 -->
        <!-- <el-submenu v-if="navMenu.childs&&navMenu.entity"
                    :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name">
          <template slot="title">
            <i :class="navMenu.entity.icon"></i>
            <span> {{navMenu.entity.alias}}</span>
          </template> -->
          <!-- 递归 -->
          <!-- <NavMenu :navMenus="navMenu.childs"></NavMenu>
        </el-submenu>
      </template>
  
    </div>
  </template>
  
  <script>
    export default {
      name: 'NavMenu',
      props: ['navMenus'],
      data() {
        return {}
      },
      methods: {}
    }
  </script>
  
  <style scoped>
  
  </style> -->


<!-- 
  <template>
      <div>
        <el-menu
              background-color="#F0F6F6"
              text-color="#3C3F41"
              active-text-color="black" router >
              <NavMenu :navMenus="menuData"></NavMenu>
          </el-menu>
      </div>
    
    </template> -->
    
    <!-- <script>
      import NavMenu from './NavMenu.vue'
      export default {
        components: {
          NavMenu: NavMenu
        },
        data() {
          return {
            menuData: [
                      {    //一级
                          "entity": {
                              "id": 1,
                              "name": "systemManage",
                              "icon": "el-icon-message\r\n",
                              "alias": "两级菜单",
                          },
                          //二级
                          "childs": [
                              {
                                  "entity": {
                                      "id": 3,
                                      "name": "authManage",
                                      "icon": "el-icon-loading",
                                      "alias": "权限管理",
                                      "value": {path: '/hello'},
                                  },
    
                              },
                              {
                                  "entity": {
                                      "id": 4,
                                      "name": "roleManage",
                                      "icon": "el-icon-bell",
                                      "alias": "角色管理",
                                      "value": "/system/role",
                                  },
    
                              },
                              {
                                  "entity": {
                                      "id": 2,
                                      "name": "menuManage",
                                      "icon": "el-icon-edit",
                                      "alias": "菜单管理",
                                      "value": "/system/menu",
                                  },
    
                              },
                              {
                                  "entity": {
                                      "id": 5,
                                      "name": "groupManage",
                                      "icon": "el-icon-mobile-phone\r\n",
                                      "alias": "分组管理",
                                      "value": "/system/group",
                                  },
    
                              }
                          ]
                      },
                      {
                        //一级
                          "entity": {
                              "id": 6,
                              "name": "userManage",
                              "icon": "el-icon-news",
                              "alias": "三级菜单",
                          },
                          //二级
                          "childs": [
                              {
                                  "entity": {
                                      "id": 7,
                                      "name": "accountManage",
                                      "icon": "el-icon-phone-outline\r\n",
                                      "alias": "帐号管理",
                                      "value": "",
                                  },
                                  //三级
                                  "childs": [
                                      {
                                          "entity": {
                                              "id": 14,
                                              "name": "emailManage",
                                              "icon": "el-icon-sold-out\r\n",
                                              "alias": "邮箱管理",
                                              "value": "/content/email",
                                          },
                                      },
                                      {
                                          "entity": {
                                              "id": 13,
                                              "name": "passManage",
                                              "icon": "el-icon-service\r\n",
                                              "alias": "密码管理",
                                              "value": "/content/pass",
    
                                          }
    
                                      }
                                  ]
                              },
                              {
                                  "entity": {
                                      "id": 8,
                                      "name": "integralManage",
                                      "icon": "el-icon-picture",
                                      "alias": "积分管理",
    
                                      "value": "/user/integral",
    
    
                                  },
    
                              }
                          ]
                      },
                      {//一级
                          "entity": {
                              "id": 40,
    
                              "name": "contentManage",
                              "icon": "el-icon-rank",
                              "alias":"四级菜单",
    
                          },
                          //er级
                          "childs": [
                              {
                                  "entity": {
                                      "id": 41,
                                      "name": "classifyManage2",
                                      "icon": "el-icon-printer",
                                      "alias": "分类管理",
                                  },
                                  //三级
                                  "childs": [
                                    {
                                        "entity": {
                                            "id": 42,
                                            "name": "classifyManage3",
                                            "icon": "el-icon-printer",
                                            "alias": "分类管理",
                                        },
                                        //四级
                                        "childs": [
                                            {
                                                "entity": {
                                                    "id": 43,
                                                    "name": "classifyManage4",
                                                    "icon": "el-icon-printer",
                                                    "alias": "分类管理",
                                                    "value": "/content/classify",
                                                },
    
                                            }
                                          ]
    
                                    }
                                  ]
    
                              }
                          ]
                      }
            ]
          }
        },
    
    
    
      }
    </script>
    
    <style>
    
    
    </style> -->
