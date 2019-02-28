import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/Login/Login";
import HomePage from "@/components/homePage/HomePage";
import PersonAcar from "@/components/personAcar/PersonAcar";
import VedioScreen from "@/components/VedioScreen/VedioScreen";
import Setting from "@/components/setting/Setting";
import SettingIndex from "@/components/setting/SettingIndex";
import BasicData from "@/components/setting/menu/BasicData/BasicData";
import CarInfo from "@/components/setting/menu/BasicData/CarInfo";

import PersonInfo from "@/components/setting/menu/BasicData/PersonInfo";
import BuildingInfo from "@/components/setting/menu/BasicData/BuildingInfo";
import CarportInfo from "@/components/setting/menu/BasicData/CarportInfo";
import Regional from "@/components/setting/menu/BasicData/Regional";

import Notice from '@/components/setting/menu/Notice/Notice'
import NoticeInfo from '@/components/setting/menu/Notice/NoticeInfo'
import Policesituation from '@/components/setting/menu/Notice/Policesituation'
import Facility from '@/components/setting/menu/Facility/Facility'
import Cameras from '@/components/setting/menu/Facility/Cameras'
import PersonCarCtrl from '@/components/setting/menu/PersonCarCtrl/PersonCarCtrl'
import PersonInOut from '@/components/setting/menu/PersonCarCtrl/PersonInOut'
import CarInOut from '@/components/setting/menu/PersonCarCtrl/CarInOut'
import MonitorConfig from '@/components/setting/menu/PersonCarCtrl/MonitorConfig'
import SystemConfig from "@/components/setting/menu/SystemConfig/SystemConfig";
import SystemSetting from "@/components/setting/menu/SystemConfig/SystemSetting";
import DataExport from "@/components/setting/menu/SystemConfig/DataExport";
import DefaultCamera from "@/components/setting/menu/SystemConfig/DefaultCamera";

import MenuConfig from "@/components/setting/menu/SystemConfig/MenuConfig";
import supplierAllBack from "@/components/common/footer/supplierAllBack";

import PersonRelation from "@/components/setting/menu/BasicData/PersonRelation";

Vue.use(Router);
export default new Router({
  routes: [{
      name: "Login",
      path: "/Login",
      component: Login
    },
    {
      name: "HomePage",
      path: "/HomePage",
      components: {
        default: HomePage
      }
    },
    {
      name: "supplierAllBack",
      path: "/supplierAllBack",
      component: supplierAllBack
    },
    {
      name: "PersonAcar",
      path: "/PersonAcar",
      components: {
        default: PersonAcar
      }
    },
    {
      name: "VedioScreen",
      path: "/VedioScreen",
      components: {
        default: VedioScreen
      }
    },
    {
      name: "Setting",
      path: "/Setting",
      component: Setting,
      children: [{
          name: "SettingIndex",
          path: "SettingIndex",
          component: SettingIndex
        },
        {
          name: "BasicData",
          path: "BasicData",
          component: BasicData,
          children: [{
              name: "PersonInfo",
              path: "PersonInfo",
              component: PersonInfo
            }, {
              name: "PersonRelation",
              path: "PersonRelation/:id",
              component: PersonRelation
            },
            // {
            //   name: 'CarInfo',
            //   path: 'CarInfo',
            //   component: CarInfo
            // },
            {
              name: "BuildingInfo",
              path: "BuildingInfo",
              component: BuildingInfo
            },
            {
              name: "CarportInfo",
              path: "CarportInfo",
              component: CarportInfo
            },
            {
              name: "Regional",
              path: "Regional",
              component: Regional
            },
            {
              path: "/",
              component: PersonInfo
            }
          ]
        },
        {
          name: "Notice",
          path: "Notice",
          component: Notice,
          children: [{
              name: "NoticeInfo",
              path: "NoticeInfo",
              component: NoticeInfo
            },
            {
              name: "Policesituation",
              path: "Policesituation",
              component: Policesituation
            }
          ]
        },
        {
          name: "PersonCarCtrl",
          path: "PersonCarCtrl",
          component: PersonCarCtrl,
          children: [{
              name: 'PersonInOut',
              path: 'PersonInOut',
              component: PersonInOut
            },
            {
              name: 'CarInOut',
              path: 'CarInOut',
              component: CarInOut
            },
            {
              name: "MonitorConfig",
              path: "MonitorConfig",
              component: MonitorConfig
            }
          ]
        },
        {
          name: "Facility",
          path: "Facility",
          component: Facility,
          children: [{
            name: "Cameras",
            path: "Cameras",
            component: Cameras
          }]
        },
        {
          name: "SystemConfig",
          path: "SystemConfig",
          component: SystemConfig,
          children: [{
              name: "SystemSetting",
              path: "SystemSetting",
              component: SystemSetting
            },
            {
              name: "DataExport",
              path: "DataExport",
              component: DataExport
            },
            {
              name: "DefaultCamera",
              path: "DefaultCamera",
              component: DefaultCamera
            },
            {
              name: "MenuConfig",
              path: "MenuConfig",
              component: MenuConfig
            }
          ]
        }
      ]
      /*children: [
        {
          name: 'BasicData',
          path: 'BasicData',
          component: BasicData,
          children: [
            {
              name: 'PersonInfo',
              path: 'PersonInfo',
              component: PersonInfo
            },
            {
              name: 'BuildingInfo',
              path: 'BuildingInfo',
              component: BuildingInfo
            },
            {
              name: 'CarInfo',
              path: 'CarInfo',
              component: CarInfo
            },
            {
              name: 'CarportInfo',
              path: 'CarportInfo',
              component: CarportInfo
            }
          ]
        },
        {
          name: 'Notice',
          path: 'Notice',
          component: Notice,
          children: [
            {
              name: 'NoticeInfo',
              path: 'NoticeInfo',
              component: NoticeInfo
            }
          ]
        },
        {
          name: 'PersonCarCtrl',
          path: 'PersonCarCtrl',
          component: PersonCarCtrl,
          children: [
            {
              name: 'PersonInOut',
              path: 'PersonInOut',
              component: PersonInOut
            },
            {
              name: 'CarInOut',
              path: 'CarInOut',
              component: CarInOut
            },
            {
              name: 'MonitorConfig',
              path: 'MonitorConfig',
              component: MonitorConfig
            }
          ]
        },
        {
          name: 'Facility',
          path: 'Facility',
          component: Facility,
          children: [
            {
              name: 'Cameras',
              path: 'Cameras',
              component: Cameras
            }
          ]
        },
        {
          name: 'SystemConfig',
          path: 'SystemConfig',
          component: SystemConfig,
          children: [
            {
              name: 'SystemSetting',
              path: 'SystemSetting',
              component: SystemSetting
            },
            {
              name: 'DataExport',
              path: 'DataExport',
              component: DataExport
            },
            {
              name: 'DefaultCamera',
              path: 'DefaultCamera',
              component: DefaultCamera
            },
            {
              name: 'Logout',
              path: 'Logout',
              component: Logout
            }
          ]
        }
      ]*/
    },
    {
      path: "/",
      redirect: "/Login"
    }
  ]
});
