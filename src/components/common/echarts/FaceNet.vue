<template>
    <div class="faceNet">
        <p>人脸图谱</p>
        <div class="face">
            <li id='smile' class="face_item lay_2" enter-active-class="pulse" 
             v-bind:class="{'hide': smile.hide}" >{{smile.content}}</li>
            <li class="face_item lay_3" ref='nation' v-bind:class="{'hide':nation.hide}">{{nation.content}}</li>
            <li class="face_item lay_4"  ref='glasses' v-bind:class="{'hide': glasses.hide}">{{glasses.content}}</li>
            <li id='camera_name' ref='camera_name' class="face_item lay_5"  enter-active-class="pulse" >{{camera_name}}</li>
            <li id='age_1' ref='age_1' class="face_item lay_6" 
             v-bind:class="{'hide': age.hide}"
            >{{age.content}}</li>
            <li class="face_item lay_7" ref="gender">{{gender}}</li>
            <li id='person_name' ref='person_name' class="face_item lay_8" >{{person_name.content}}</li>
            <li id='group_name' ref='group_name' class="face_item lay_9">{{group_name.content}}</li>
            <div id='face_img_wrap' class='face_img'>
            </div>
            <img ref='face_img' id='face_img'>
        </div>
    </div>
</template>
<script>
import { faceIp, initFaceTrack } from "@/mock/api";
export default {
  name: "face_push",
  data() {
    return {
      face_img_src: "",
      age: {
        hide: true,
        content: "30岁"
      },
      person_name: {
        hide: false,
        content: "未知身份"
      },
      group_name: {
        hide: false,
        content: "未知分组"
      },
      camera_name: "25号楼",
      ghs: {
        hide: true,
        content: "高富帅"
      },
      smile: {
        hide: true,
        content: "似笑非笑"
      },
      gender: "男",
      glasses: {
        hide: true,
        content: ""
      },
      nation: {
        hide: true,
        content: ""
      }
    };
  },
  mounted() {
    var ip = faceIp;
    var _this = this;
    var ws_path = `ws://${ip}/facetrack/websocket`;
    var webSocketBridge = new channels.WebSocketBridge();
    webSocketBridge.connect(ws_path);
    webSocketBridge.listen(function(data) {
      let nation = data.person_matched ? data.person_matched.nation : "";
      if (nation) {
        _this.nation.content = nation;
        _this.nation.hide = false;
      } else {
        _this.nation.hide = true;
      }
      //gender 1为女 0 为男
      _this.gender = data.sex ? "女" : "男";
      //glasses
      let glassesValue = data.glasses;
      if (glassesValue === 1) {
        _this.glasses.content = "戴眼镜";
        _this.glasses.hide = false;
      } else if (glassesValue === 2) {
        _this.glasses.content = "未戴眼镜";
        _this.glasses.hide = false;
      } else {
        _this.glasses.hide = true;
      }
      let src = data.image;
      if (_this.$refs.face_img !== undefined) {
        _this.$refs.face_img.src = `http://${ip}` + src;
      }
      let age = data.age;
      if (age) {
        _this.age.hide = false;
      } else {
        _this.age.hide = true;
      }

      let personT = "";
      if (age <= 20) {
        personT = "青春年少";
      } else if (age <= 35) {
        personT = "风华正茂";
      } else if (age < 70) {
        personT = "成熟稳重";
      } else {
        personT = "花甲之年";
      }
      _this.age.content = personT;

      _this.camera_name = data.camera_name;
      _this.person_name.content = data.person_matched
        ? data.person_matched.name
        : "未知身份";
      _this.group_name.content = data.person_matched
        ? data.person_matched.group_name
        : "未知分组";
      _this.ghs.hide = false;
      try {
        if (_this.$refs.nation && _this.nation.hide == false) {
          _this.$refs.nation.className = "face_item lay_3 animated tada";
        }
        if (_this.$refs.age_1 && _this.age.hide == false) {
          _this.$refs.age_1.className = "face_item lay_6 animated tada";
        }
        if (_this.$refs.person_name && _this.person_name.hide == false) {
          _this.$refs.person_name.className = "face_item lay_8 animated tada";
        }
        if (_this.$refs.camera_name && _this.camera_name.hide == false) {
          _this.$refs.camera_name.className = "face_item lay_5 animated tada";
        }
        if (_this.$refs.group_name && _this.group_name.hide == false) {
          _this.$refs.group_name.className = "face_item lay_9 animated tada";
        }
        if (_this.$refs.glasses && _this.glasses.hide == false) {
          _this.$refs.glasses.className = "face_item lay_4 animated tada";
        }
        if (_this.$refs.gender && _this.gender.hide == false) {
          _this.$refs.gender.className = "face_item lay_7 animated tada";
        }
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        try {
          if (_this.nation.hide == false) {
            _this.$refs.nation.className = "face_item lay_3 animated";
          }
          _this.$refs.gender.className = "face_item lay_7 animated";
          if (_this.glasses.hide == false) {
            _this.$refs.glasses.className = "face_item lay_4 animated";
          }
          if (_this.age.hide == false) {
            _this.$refs.age_1.className = "face_item lay_6 animated";
          }
          if (_this.person_name.hide == false) {
            _this.$refs.person_name.className = "face_item lay_8 animated";
          }
          if (_this.camera_name.hide == false) {
            _this.$refs.camera_name.className = "face_item lay_5 animated";
          }
          if (_this.group_name.hide == false) {
            _this.$refs.group_name.className = "face_item lay_9 animated";
          }
        } catch (error) {
          console.log(error);
        }
      }, 1000);
    });

    webSocketBridge.socket.onopen = function() {
      console.log("Connected to notification socket");
    };
    webSocketBridge.socket.onclose = function() {
      console.log("Disconnected to notification socket");
    };

    //初始化facetrack的内容
    initFaceTrack({ page: 1, group_ids: [], number: 8, sort: 1 })
      .then(response => {
        let facetrackInfos = response.data.data.facetracks;
        if (facetrackInfos.length == 0) {
          return;
        }
        let facetrackInfo = facetrackInfos[0];
        this.age.content = facetrackInfo.age;
        this.age.hide = true;

        this.camera_name = facetrackInfo.camera_name;
        this.gender = facetrackInfo.gender === 1 ? "女" : "男";
        if (facetrackInfo.glasses) {
          this.glasses.content =
            facetrackInfo.glasses == 2 ? "未戴眼镜" : "戴眼镜";
          this.glasses.hide = false;
        } else {
          this.glasses.hide = true;
        }
        this.$refs.face_img.src = `http://${ip}` + facetrackInfo.image;
        let matched = facetrackInfo.person_matched;
        if (matched) {
          this.person_name.content = matched.name;
          this.person_name.hide = false;

          this.group_name.content = matched.group_name;
          this.group_name.hide = false;

          this.gender = matched.gender == 1 ? "女" : "男";
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  }
};
</script>
<style scoped>
@import "../../../../node_modules/animate.css/animate.min.css";
.hide {
  display: none !important;
}
.face_img {
  background: url("/static/IMG/face_bg_img.png") no-repeat center;
  position: absolute;
  width: 115px;
  top: 94px;
  left: 134px;
  height: 114px;
  z-index: 10;
  /* animation: clock 5s infinite linear; */
  transform: rotate(360deg);
  animation: rotation 10s linear infinite;
}
@keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes clock {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
#face_img {
  width: 64px;
  height: 64px;
  border-radius: 33px;
  margin-top: 27px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -36px;
  margin-top: -32px;
}
.lay_1 {
  top: 39px;
  left: 86px;
}
.lay_2 {
  top: 42px;
  left: 210px;
}
.lay_3 {
  top: 79px;
  left: 112px;
}
.lay_4 {
  top: 102px;
  right: 30px;
}
.lay_5 {
  bottom: 127px;
  left: 35px;
}
.lay_6 {
  bottom: 55px;
  left: 67px;
}
.lay_7 {
  bottom: 130px;
  right: 50px;
}
.lay_8 {
  bottom: 28px;
  right: 130px;
}
.lay_9 {
  top: 47px;
  right: 211px;
}
p {
  height: 16px;
  font-size: 16px;
  font-family: AdobeHeitiStd-Regular;
  margin-left: 20px;
  color: #42eaea;
  text-align: left;
  padding-top: 10px;
}
.faceNet {
  height: 100%;
  background: url("/static/IMG/face_net.png") no-repeat center;
  position: relative;
}
.face_item {
  color: #00f3f3;
  font-size: 12px;
  height: 22px;
  line-height: 22px;
  display: inline-block;
  font-family: SimHei;
  padding: 0px 10px;
  border: solid 1px rgba(73, 241, 231, 0.4);
  border-radius: 4px;
  position: absolute;
  background-color: rgba(7, 16, 31, 0.4);
}
</style>
