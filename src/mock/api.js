// import axios from 'mock/axios/index'
import Vue from 'vue'
import Promise from 'es6-promise'
Promise.polyfill()
import axios from 'axios'

Vue.prototype.$axios = axios
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
// axios.defaults.headers.common['XCsrfToken'] = getCookie("XCsrfToken")
// axios.interceptors.request.use(
//   config => {
//     var token = getCookie("XCsrfToken")
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
let display = ipConfigDefault
var ipFace = ipConfigFace
var ipCar = ipConfigCar
var ipAccessControl = ipConfigAccessControl


var instance3 = axios.create({
  baseURL: 'http://' + display
})
var FaceService = axios.create({
  baseURL: 'http://' + ipFace
})
var CarService = axios.create({
  baseURL: 'http://' + ipCar
})
var AccessService = axios.create({
  baseURL: 'http://' + ipAccessControl
})

export const faceIp = ipFace
export const carIp = ipCar
export const dis_play = display
export const accessControlIp = ipAccessControl
export const facePushIP = `ws://${ipAccessControl}/facetrack/websocket`
export const carPushIP = `ws://${ipConfigDefault}/car/notify`
export const faceSrcChecked = faceSrcIdList

// 在实例已创建后修改默认值
export const flowPersonToday = params => {
  return AccessService.get(`/analysis/getstatsdata${faceSrcIdParams}`)
}
export const flowCarToday = params => {
  return CarService.get(`/analysis/facetracktotalstats?option=1`)
}
export const PersonDara = params => {
  return instance3.get(`/addition/person/statistic`)
}
export const cameraGroupInfo = parmas => {
  return instance3.get(`/system/camera/list`)
}
export const personFlowDay = params => {
  return FaceService.get(`/analysis/facetrackstats/?option=1`)
}
export const personAlarmDay = params => {
  return FaceService.get(`/analysis/facetrackalarmstats/?option=1`)
}
export const personFlowWeek = params => {
  return FaceService.get(`/analysis/facetrackstats/?option=3&time_type=2`)
}
export const personAlarmWeek = params => {
  return FaceService.get(`/analysis/facetrackpersonstats/?option=3&time_type=2`)
}
export const carFlowDay = params => {
  return CarService.get(`/analysis/tracking/day?isAlarm=0`)
}
export const carAlarmDay = params => {
  return CarService.get(`/analysis/tracking/day?isAlarm=1`)
}
export const carFlowWeek = params => {
  return CarService.get(`/analysis/tracking/week?isAlarm=0`)
}
export const carAlarmWeek = params => {
  return CarService.get(`/analysis/tracking/week?isAlarm=1`)
}
export const cameraSolutionSave = params => {
  return instance3.patch(`/system/camera/config/partial`, params)
}
export const cameraSolutionGet = params => {
  return instance3.get(`/system/camera/config/list`, {
    'params': params
  })
}
export const GetWarningData = params => {
  return instance3.get(`/addition/alarm/list`, {
    'params': params
  })
}
export const parkingSpot = params => {
  return instance3.get(`/addition/parkingplace/statistic`)
}
export const searchvehicletrack = params => {
  return CarService.post(`/analysis/searchvehicletrack`, params)
}
export const login = params => {
  return instance3.post(`/user/login`, params)
}

export const carTrackData = params => {
  return CarService.get(`/analysis/cartracked/today`)
}
export const carTrackChartData0 = params => {
  return CarService.get(`/analysis/tracked/day?isAlarm=0`)
}
export const carTrackChartData1 = params => {
  return CarService.get(`/analysis/tracked/day?isAlarm=1`)
}
export const buildingInfo = params => {
  return instance3.get(`/addition/house/statistic`)
}

// person and car

export const carStayedTody = params => {
  return CarService.get(`/analysis/carstayed/today`)
}
export const faceTrack = params => {
  return AccessService.post(`/deepface/facetrack`, params)
}
export const faceAlarmTrack = params => {
  return AccessService.post(`/deepface/facetrack/alarm`, params)
}
export const faceTrackCamera = params => {
  return instance3.get(`/system/camera/list?group=1`)
}
export const carTrack = params => {
  return CarService.post(`/deepface/facetrack`, params)
}
export const getIp = params => {
  return instance3.get(`/system/outerip`)
}

// 系统配置CopyRight
export const CopyRight = params => {
  return instance3.get(`/system/system/config/first/list`)
}

// 登出
export const logOut = params => {
  return instance3.post(`/user/logout`)
}
export const weatherInfo = params => {
  return instance3.get('/addition/weather/last')
}
export const initFaceTrack = params => {
  return FaceService.post('/deepface/facetrack', params)
}

// Setting
// 1.获取系统设置menu
export const menulist = params => {
  return instance3.get(`/system/menu/list`)
}
// building-------------------------------------------------------------------------------------------------------------------------
// 获取住房详细信息
export const buildinglist = params => {
  return instance3.get(`/addition/house/detail/list`, {
    'params': params
  })
}
// 根据ID获取住房详细信息
export const buildinglistById = params => {
  return instance3.get(`/addition/house/detail/detail`, {
    'params': params
  })
}
// 根据ID获取住房使用类型
export const houseUseType = params => {
  return instance3.get(`/addition/house/usetype/detail`, {
    'params': params
  })
}

//更新门牌号



export const houseUpdate = params => {
  return instance3.patch(`/addition/house/detail/partial`, params)
}
// 根据ID获取小区区域信息
export const houseAreaInfo = params => {
  return instance3.get(`/addition/area/detail`, {
    'params': params
  })
}
// 获取小区区域列表
export const houseAreaInfoList = params => {
  return instance3.get(`/addition/area/list?pagesize=50`)
}

// 添加小区区域
export const houseAreaInfoAdd = params => {
  return instance3.post(`/addition/area/create`, params)
}
// 更新小区区域信息
export const houseAreaInfoUpdate = params => {
  return instance3.patch(`/addition/area/partial`, params)
}
// 删除区域
export const houseAreaInfoDestroy = params => {
  return instance3.delete(`/addition/area/destroy`, {
    'params': params
  })
}
// 获取门牌号
export const gate_list = params => {
  return instance3.get(`/addition/house/detail/list`)
}

// 获取区域、单元、楼号
export const houseall = params => {
  return instance3.get(`/addition/house/type/all`)
}
//根据ID获取楼号信息

export const building_list = params => {
  return instance3.get(`/addition/building/detail`, {
    'params': params
  })
}

//更新楼号信息
export const building_update = params => {
  return instance3.patch(`/addition/building/partial`, params)
}
//添加楼号信息

export const building_add = params => {
  return instance3.post(`/addition/building/create`, params)
}

//删除楼号

export const building_del = params => {
  return instance3.delete(`/addition/building/destroy`, {
    'params': params
  })
}

//根据ID获取单元信息
export const unit_list = params => {
  return instance3.get(`/addition/unit/detail`, {
    'params': params
  })
}
//更新单元信息

export const unit_update = params => {
  return instance3.patch(`/addition/unit/partial`, params)
}

//删除单元信息
export const unit_del = params => {
  return instance3.delete(`/addition/unit/destroy`, {
    'params': params
  })
}
//添加单元信息
export const unit_add = params => {
  return instance3.post(`/addition/unit/create`, params)
}


// 获取住房使用类型
export const houseUseTypeList = params => {
  return instance3.get(`/addition/house/usetype/list`)
}
// 删除住房详细信息
export const houseInfoDestroy = params => {
  return instance3.delete(`/addition/house/detail/destroy`, {
    'params': params
  })
}




//根据ID获取住房使用类型
export const house_detaill = params => {
  return instance3.get(`/addition/house/usetype/detail`, {
    'params': params
  })
}
// 更新住房详细信息
export const houseInfoUpdate = params => {
  return instance3.patch(`/addition/house/detail/partial`, params)
}
// 添加住房详细
export const houseInfoAdd = params => {
  return instance3.post(`/addition/house/detail/create`, params)
}
// 获取楼号列表
export const buildingNumberList = params => {
  return instance3.get(`/addition/building/list`, {
    'params': params
  })
}
// 根据id获取楼号列表
export const buildingNumberListById = params => {
  return instance3.get(`/addition/building/detail`, {
    'params': params
  })
}
// 获取单元列表
export const unitList = params => {
  return instance3.get(`/addition/unit/list`, {
    'params': params
  })
}
// 根据id获取单元列表
export const unitListById = params => {
  return instance3.get(`/addition/unit/detail`, {
    'params': params
  })
}
// building end-------------------------------------------------------------------------------------------------------------------
// personinfo
// 获取人员列表
export const list = params => {
  return instance3.get(`/addition/person/list`, {
    'params': params
  })
}
export const degree = params => {
  return instance3.get(`/addition/degree/list`, {
    'params': params
  })
}
// export const degree = params => {
//   return zz.get(`/addition/degree/list`, {
//     'params': params
//   })
// }
export const delte = params => {
  return instance3.delete(`/addition/person/destroy`, {
    'params': params
  })
}
// 住房信息
export const all = params => {
  return instance3.get(`/addition/house/detail/all`)
}
// 上传图片
export const update = params => {
  return instance3.post(`/addition/image/upload`, params)
}
// 添加居民信息
export const createPerson = params => {
  return instance3.post(`/addition/person/create`, params)
}
// 根据ID获取居民信息
export const addition = params => {
  return instance3.get(`/addition/person/detail`, {
    'params': params
  })
}
// 根据iD删除居民信息
export const destroy_person = params => {
  return instance3.delete(`/addition/person/destroy`, {
    'params': params
  })
}
// 更新居民信息
export const partial_update = params => {
  return instance3.patch(`/addition/person/partial`, params)
}
// 获取车位信息
export const car_list = params => {
  return instance3.get(`/addition/parkingplace/list`)
}
// 删除车位数量信息
export const Car_list_del = params => {
  return instance3.delete(`/addition/parkingplace/destroy`, {
    'params': params
  })
}
// 添加车辆信息
export const create_cal = params => {
  return instance3.post(`/addition/parkingplace/create`, params)
}
// 更新车辆信息
export const place_data = params => {
  return instance3.patch(`/addition/parkingplace/partial`, params)
}
// 根据ID获取停车场信息
export const detail_data = params => {
  return instance3.get(`/addition/parkingplace/detail`, {
    'params': params
  })
}
// NoticeInfo-------------------------------------------------------------------------------------------------------------------------
// 获取报警信息
export const alarmList = params => {
  return instance3.get(`/addition/alarm/list`, {
    'params': params
  })
}
// 根据ID获取报警信息
export const alarmListById = params => {
  return instance3.get(`/addition/alarm/detail`, {
    'params': params
  })
}
// 添加报警信息
export const NoticeInfoAdd = params => {
  return instance3.post(`/addition/alarm/create`, params)
}
// 更新报警信息
export const NoticeInfoUpdate = params => {
  return instance3.patch(`/addition/alarm/partial`, params)
}
// 删除报警信息
export const NoticeInfoDestroy = params => {
  return instance3.delete(`/addition/alarm/destroy`, {
    'params': params
  })
}
// NoticeInfo end-------------------------------------------------------------------------------------------------------------------------
// PolicesituationInfo-------------------------------------------------------------------------------------------------------------------------
// 获取警情信息
export const PolicesituationList = params => {
  return instance3.get(`/addition/policesituation/list`, {
    'params': params
  })
}
// 根据ID获取警情信息
export const PolicesituationListById = params => {
  return instance3.get(`/addition/policesituation/detail`, {
    'params': params
  })
}
// 添加警情信息
export const PolicesituationAdd = params => {
  return instance3.post(`/addition/policesituation/create`, params)
}
// 更新警情信息
export const PolicesituationUpdate = params => {
  return instance3.patch(`/addition/policesituation/partial`, params)
}
// 删除警情信息
export const PolicesituationDestroy = params => {
  return instance3.delete(`/addition/policesituation/destroy`, {
    'params': params
  })
}
// PolicesituationInfo end-------------------------------------------------------------------------------------------------------------------------
export const person_data = params => {
  return FaceService.post(`/deepface/facetrack`, params)
}
// camera start-------------------------------------------------------------------------------------------------------------------------
// cameras
// 获取摄像头信息
export const camerasList = params => {
  return instance3.get(`/system/camera/all`, {
    'params': params
  })
}
// 根据ID获取摄像头信息
export const camerasListById = params => {
  return instance3.get(`/system/camera/detail`, {
    'params': params
  })
}
// 添加摄像头信息
export const cameraInfoAdd = params => {
  return instance3.post(`/system/camera/create`, params)
}
// 更新摄像头信息
export const cameraInfoUpdate = params => {
  return instance3.patch(`/system/camera/partial`, params)
}
// 删除摄像头信息
export const cameraInfoDestroy = params => {
  return instance3.delete(`/system/camera/destroy`, {
    'params': params
  })
}
// cameraGroup
// 获取摄像头分组信息
export const cameraGroupList = params => {
  return instance3.get(`/system/camera/group/list`, {
    'params': params
  })
}
// 添加摄像头分组信息
export const cameraGroupInfoAdd = params => {
  return instance3.post(`/system/camera/group/create`, params)
}
// 更新摄像头分组信息
export const cameraGroupInfoUpdate = params => {
  return instance3.patch(`/system/camera/group/partial`, params)
}
// 删除摄像头分组信息
export const cameraGroupInfoDestroy = params => {
  return instance3.delete(`/system/camera/group/destroy`, {
    'params': params
  })
}
// 获取系统设置
export const menu_list = params => {
  return instance3.get(`/system/system/config/first/list`)
}
// 修改系统配置
export const creat_Sytem = params => {
  return instance3.patch(`/system/system/config/partial`, params)
}
// 获取系统菜单设置
export const system_menu = params => {
  return instance3.get(`/system/menu/list`)
}
// 修改菜单
export const partial_menu = params => {
  return instance3.patch(`/system/menu/partial
  `, params)
}
// 跟据ID 获取 系统菜单
export const detail_id = params => {
  return instance3.get(`/system/menu/detail`, {
    'params': params
  })
}
// 添加菜单
export const create_menu = params => {
  return instance3.post(`/system/menu/create`,
    params
  )
}
// 删除菜单
export const del_menu = params => {
  return instance3.delete(`/system/menu/destroy`, {
    'params': params
  })
}
// cameraConfig
// 获取摄像头配置信息
export const cameraConfigList = params => {
  return instance3.get(`/system/camera/config/list`, {
    'params': params
  })
}
// 更新摄像头配置信息
export const cameraConfigInfoUpdate = params => {
  return instance3.patch(`/system/camera/config/partial`, params)
}

//今日车流量
export const car_list_data = params => {
  return instance3.get(`/car/cartrack/today`, {
    'params': params
  })
}
//今日车流辆总数
// export const car_num_list_data = params => {
//   return zz.get(`/car/carflows/today`, {
//     'params': params
//   })
// }
export const car_num_list_data = params => {
  return instance3.get(`/car/carflows/today`, {
    'params': params
  })
}
//今日车流量统计图

export const car_flows = params => {
  return instance3.get(`/car/car/flows`, {
    'params': params
  })
}

//今日人流量
export const people_get = params => {
  return AccessService.get(`/analysis/getdata`, {
    'params': params
  })
}

// camera end---------------------------------------------------------------------------------------------------------------------------

// 默认摄像头   DefaultCamera 5

// carInOut start---------------------------------------------------------------------------------------------------------------------------
// 获取车辆抓拍列表
export const car_track = params => {
  return instance3.get(`/car/car/track`, {
    'params': params
  })
}
// 获取摄像头分组列表
export const carCameraGroupList = params => {
  return instance3.get(`/car/camera/group/list`, {
    'params': params
  })
}
// 获取摄像头列表
export const carCameraList = params => {
  return instance3.get(`/car/camera/list`, {
    'params': params
  })
}
// 获取人物底库
export const personGruop = params => {
  return AccessService.get(`/deepface/person/group?_=${new Date().getTime()}`)
}
// 获取人物底库
export const getCameraTree = params => {
  return AccessService.get(`/deepface/camerainfo?TagName=getCameraTree&_=${new Date().getTime()}`)
}

// carInOut end-----------------------------------------------------------------------------------------------------------------------------
// 人脸关系图谱
export const personRelations = params => {
  return instance3.post(`/addition/person/relations/search`,
    params
  )
}




export const rela_list = params => {
  return instance3.get(`/addition/person/relations/list`, {
    'params': params
  })
}

export const create_figure = params => {
  return instance3.post(`/addition/person/relations/create`,
    params
  )
}


export const person_type = params => {
  return instance3.get(`/addition/person/relations/type/list`, {
    'params': params
  })
}


export const search_list = params => {
  return instance3.get(`/addition/person/search`, {
    'params': params
  })
}



export const detail_list = params => {
  return instance3.get(`/addition/person/relations/type/detail`, {
    'params': params
  })
}

export const partial_list = params => {
  return instance3.patch(`/addition/person/relations/partial`, params)
}

export const del_list = params => {
  return instance3.delete(`/addition/person/relations/destroy`, {
    'params': params
  })
}
// 人物关系类型管理---------------------------------------------------------------------------------------------------------------------------
// 获取人物关系类型列表
export const relationTypeList = params => {
  return instance3.get(`/addition/person/relations/type/list`, {
    'params': params
  })
}
// 添加人物关系类型
export const relationTypeAdd = params => {
  return instance3.post(`/addition/person/relations/type/create`, params)
}
// 删除人物关系类型
export const relationTypeDestroy = params => {
  return instance3.delete(`/addition/person/relations/type/destroy`, {
    'params': params
  })
}
// 更新人物关系类型
export const relationTypeUpdate = params => {
  return instance3.patch(`/addition/person/relations/type/partial`, params)
}
// 人物关系类型管理 end-----------------------------------------------------------------------------------------------------------------------------
