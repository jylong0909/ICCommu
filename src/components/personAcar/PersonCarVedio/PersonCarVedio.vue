<template>
    <div id="PersonCarVedio">
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
</template>
<script>
import CameraPlay from "../../common/camera/CameraPlay";
import { cameraSolutionGet } from "@/mock/api";
export default {
  name: "PersonCarVedio",
  components: {
    CameraPlay
  },
  data() {
    return {
      solution_type: 1,
      layout_id: "rtsp_layout1",
      camera_play_list: []
    };
  },
  methods: {
    drag_display: function(data) {
      let switch_data = [];
      let index = data.index;
      let camera_name = data.camera_name;
      let display_url = data.display_url;
      if (typeof index == "undefined") {
        return;
      }
      let layout_index = Number(this.layout_id.substr(11));
      console.info("layout_index " + layout_index);
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
    }
  },
  mounted() {
    cameraSolutionGet({ solution: 3 })
      .then(response => {
        let code = response.data.code;
        let config_info = response.data.data;
        this.camera_play_list = config_info[0].camera_list;
        this.layout_id = "rtsp_layout" + this.camera_play_list.length;
      })
      .catch(function(error) {
        console.error(error);
      });
  }
};
</script>
<style scoped>
.hide {
  display: none;
}
#PersonCarVedio {
  width: 100%;
  height: 100%;
}
.monitoring_rtsp_content {
  padding: 10px;
  position: relative;
  width: 100%;
  height: 100%;
}
.inner_wrap {
  width: 100%;
  height: 100%;
  /* border: 1px solid #01aeff; */
  position: relative;
  float: left;
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
</style>



