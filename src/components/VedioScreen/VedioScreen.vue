<template>
    <div id="VedioScreen">
        <Pheader mesFather="实时视频监控"></Pheader>
        <div class='content_wrap'>
          <div id="open_set" @click="vedio_open_click">
            <img v-bind:src="vedio_open_img">
          </div>
          <transition name='custom-classes-transition'
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated fadeOutLeft"
          >
            <div class="setting_cameras" v-if="cameras_show">
              <div id='cameras_wrap'>
                
                <div id='camera_title'>摄像头列表</div>
                <div id='cameras_container'>
                  <CameraGroup v-for="(item, index) in group_info"
                      :key = "'camera_group_' + item.group_id"
                      :group_info = "item"
                      :index_g = "index"
                      @emit_camerainfo = "emit_camerainfo"
                  ></CameraGroup>
                </div>
                  
              </div>
              <div id="set_content">
                <li>
                  <span id="screen1" v-on:click="switchLayout(1, true)"></span>
                </li>
                <li>
                  <span id="screen3" v-on:click="switchLayout(3, true)"></span>
                </li>
                
                <li>
                  <span id="screen4" v-on:click="switchLayout(4, true)"></span>
                </li>
                <br>
                <li>
                  <span id="screen6" v-on:click="switchLayout(6, true)"></span>
                </li>
                <li>
                  <span id="screen9" v-on:click="switchLayout(9, true)"></span>
                </li>
                <!-- <li>
                  <span id="screen_full" ></span>
                </li> -->
              </div>
            </div>
          </transition>
          <div id='vedios' v-bind:class="{'vedio_smile':vedio_smile, 'vedio_big':vedio_big}">
              <div class="monitoring_rtsp_content">
                  <div class="inner_wrap" v-bind:id="layout_id">
                      <CameraPlay v-for="(item, index) in camera_play_list"
                          :key= "'camera_list' + index"
                          :camera_name = "item.camera_name"
                          :display_url = "item.display_url"
                          :index = "index"
                          @drag_display="drag_display"
                      ></CameraPlay>
                  </div>
              </div>
          </div>
        </div>
        <Pfooter></Pfooter>
    </div>
</template>
<script>
import Pheader from "../common/header/Pheader";
import CameraGroup from "../common/camera/CameraGroup";
import { cameraGroupInfo } from "@/mock/api";
import { cameraSolutionSave } from "@/mock/api";
import { cameraSolutionGet } from "@/mock/api";
import CameraPlay from "../common/camera/CameraPlay";
import Pfooter from "../common/footer/Pfooter";
import animate from "animate.css";
import { fullScreenCompatibility } from "@/util/util";
export default {
  name: "VedioScreen",
  components: {
    Pheader,
    CameraGroup,
    CameraPlay,
    Pfooter
  },
  data() {
    return {
      solution_id: 0,
      cameras_show: false,
      vedio_big: true,
      vedio_smile: false,
      vedio_open_img: "/static/IMG/vedio_open.png",
      solution_type: 1,
      group_info: {},
      layout_id: "rtsp_layout1",
      camera_play_list: []
    };
  },
  methods: {
    emit_camerainfo: function(data) {
      let index = data.index;
      let display_url = data.display_url;
      let copy = JSON.parse(JSON.stringify(this.camera_play_list));
      copy[index] = data;
      this.camera_play_list = copy;
      this.saveSolution();
    },
    vedio_open_click: function() {
      if (this.vedio_smile) {
        setTimeout(() => {
          this.vedio_big = !this.vedio_big;
          this.vedio_smile = !this.vedio_smile;
        }, 1000);
      } else {
        this.vedio_big = !this.vedio_big;
        this.vedio_smile = !this.vedio_smile;
      }

      this.cameras_show = !this.cameras_show;
      if (this.vedio_open_img === "/static/IMG/vedio_open.png") {
        this.vedio_open_img = "/static/IMG/vedio_close.png";
      } else {
        this.vedio_open_img = "/static/IMG/vedio_open.png";
      }
    },
    drag_display: function(data) {
      let switch_data = [];
      let index = data.index;
      let camera_name = data.camera_name;
      let display_url = data.display_url;
      if (typeof index == "undefined") {
        return;
      }
      let layout_index = Number(this.layout_id.substr(11));
      for (let i = 0; i < layout_index; i++) {
        if (i != index) {
          switch_data.push(this.camera_play_list[i]);
        } else {
          let tmp = {
            camera_name: camera_name,
            display_url: display_url
          };
          switch_data.push(tmp);
        }
      }
      this.camera_play_list = switch_data;
      this.saveSolution();
    },
    switchLayout: function(layout_index, set_device = true) {
      let switch_data = [];
      let tmp_data = { camera_name: "", display_url: "" };
      for (let i = 0; i < layout_index; i++) {
        if (this.camera_play_list[i]) {
          switch_data.push(this.camera_play_list[i]);
        } else {
          switch_data.push(tmp_data);
        }
      }
      this.camera_play_list = switch_data;
      this.layout_id = "rtsp_layout" + layout_index;
      if (set_device) {
        this.saveSolution();
      }
    },
    saveSolution: function() {
      if (this.solution_id === 0) {
        return;
      }
      let num = Number(this.layout_id.substr(11));
      let param = {
        id: this.solution_id,
        solution: 1,
        num: num,
        cameras: JSON.stringify(this.camera_play_list)
      };
      cameraSolutionSave(param).then(response => {
        let res = response.data;
        console.info(response);
      });
    }
  },
  mounted() {
    fullScreenCompatibility();
    cameraGroupInfo()
      .then(response => {
        this.group_info = response.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    cameraSolutionGet({ solution: 1 })
      .then(response => {
        let config_info = response.data.data;
        console.info(config_info);
        if (!config_info.length) return;
        this.solution_id = config_info[0].id;
        this.switchLayout(config_info[0].num, false);
        this.camera_play_list = config_info[0].camera_list;
      })
      .catch(function(error) {
        console.error(error);
      });
  }
};
</script>
<style scoped>
#open_set {
  position: absolute;
  width: 16px;
  height: 492px;
  left: 0px;
  top: 224px;
  cursor: pointer;
}
.setting_cameras {
  float: left;
  margin-left: 40px;
  background: url(/static/IMG/camears_bg.png) no-repeat;
  position: relative;
}
#VedioScreen {
  position: relative;
  height: 1079px;
  padding-bottom: 47px;
  background: url(/static/IMG/bg.jpg) no-repeat;
}
.monitoring_vlc {
  margin: 0px 0px;
  width: 100%;
  height: 100%;
  float: left;
  border: 1px solid #00ace4;
  position: relative;
}
#rtsp_layout3 .monitoring_vlc:nth-of-type(1) {
  width: 65%;
  height: 100%;
  float: left;
  box-sizing: border-box;
  padding: 2px 2px 2px 2px;
  position: relative;
}
#rtsp_layout3 .monitoring_vlc {
  width: 35%;
  height: 50%;
}
#rtsp_layout4 .monitoring_vlc {
  width: 50%;
  height: 50%;
}
#rtsp_layout6 .monitoring_vlc {
  width: 33.3%;
  height: 50%;
}
#rtsp_layout9 .monitoring_vlc {
  width: 33.3%;
  height: 33.3%;
}
.inner_wrap {
  width: 100%;
  height: 100%;
  /* border: 1px solid #01aeff; */
  position: relative;
  float: left;
}
.filler {
  background: black;
  width: 100%;
  height: 100%;
}
.monitoring_rtsp_content {
  padding: 10px;
  position: relative;
  width: 100%;
  height: 100%;
}
.monitoring_vlc_title {
  position: absolute;
  bottom: 5px;
  right: 20px;
  font-size: 12px;
  line-height: 20px;
}

.hide {
  display: none;
}
#set_content {
  font-size: 20px;
  text-align: left;
  height: 125px;
  width: 200px;
  position: absolute;
  bottom: 24px;
  left: 25px;
  z-index: 10;
}
#set_content li {
  display: inline-block;
  /* float: right; */
  margin: 3px 4px 3px 5px;
  width: 50px;
  height: 50px;
  background: rgba(1, 174, 255, 0.2);
  cursor: pointer;
}
#set_content li span {
  display: inline-block;
  width: 100%;
  height: 100%;
  background-position: center center;
}
#screen_full {
  background: url("/static/IMG/fullscreen.png") no-repeat;
}
#screen1 {
  background: url("/static/IMG/layout1.png") no-repeat;
}
#screen3 {
  background: url("/static/IMG/layout3.png") no-repeat;
}
#screen4 {
  background: url("/static/IMG/layout4.png") no-repeat;
}
#screen6 {
  background: url("/static/IMG/layout6.png") no-repeat;
}
#screen9 {
  background: url("/static/IMG/layout9.png") no-repeat;
}
.content_wrap {
  margin-top: 10px;
}
#camera_title {
  margin-top: 3px;
  height: 37px;
  line-height: 31px;
  font-size: 16px;
  color: #ffffff;
  /* font-family: SourceHanSansCN-Regular; */
}
#vedios {
  height: 921px;
  background: url("/static/IMG/vedio_bg.png") no-repeat center center;
  background-size: 100% 100%;
  /* transition: all 1s; */
}
.vedio_smile {
  width: 1580px;
  margin-left: 300px;
}
.vedio_big {
  width: 1830px;
  margin-left: 50px;
}
#cameras_wrap {
  width: 240px;
  height: 920px;
  background: url(/static/IMG/camears_bg.png) no-repeat 100% 100%;
  position: relative;
  overflow: hidden;
}
#cameras_container {
  width: 258px;
  height: 700px;
  left: 0;
  top: 47px;
  right: -35px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
}
/* #cameras_container::-webkit-scrollbar {
  width: 0 !important;
} */
/* #cameras_container{ overflow: -moz-scrollbars-none; } */
</style>

