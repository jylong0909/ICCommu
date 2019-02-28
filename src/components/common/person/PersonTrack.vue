<template>
  <div class="trackBox">
    <div class="trackBox-head">{{title}}</div>
    <div class="trackBox-body">
      <ul class="track-items">
        <li class="fl track-item web animated"  v-for="(item, index) in personList" v-bind:key='index'>
          <div class="img-border fl">
            <img :src="'http://'+src+(item.image?item.image:item['person_matched']['face_image'])" style="width:100%;height:100%;">
          </div>
          <ul class="item-info1 fl">
            <li>{{(item["status"]||item["type"])?item["person_matched"]["name"]:'未知身份'}}</li>
            <li class="info1-group">{{(item["status"]||item["type"])?item["person_matched"]["group_name"]:'未知分组'}}</li>
          </ul>
          <ul class="item-info2 fr">
            <li>{{item.camera_name}}</li>
            <li>{{item.createdate.substr(5)}}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  faceTrack,
  facePushIP,
  accessControlIp,
  faceSrcChecked
} from "@/mock/api";
export default {
  name: "PersonTrack",
  data() {
    return {
      title: "实时人脸抓拍",
      personList: [],
      src: accessControlIp,
      timeWe: "",
      isChange: {
        alarm_num: 0,
        in_num: 0,
        out_num: 0
      }
    };
  },
  mounted() {
    // websocket
    var _this = this;
    var ws_path = facePushIP;
    var webSocketBridge = new channels.WebSocketBridge();
    webSocketBridge.connect(ws_path);
    webSocketBridge.listen(function(data) {
      // console.log(data);
      for (var i = 0; i < _this.personList.length; i++) {
        if (data.facetrack_id == _this.personList[i].facetrack_id) {
          _this.personList.splice(i, 1, data);
          if (data.type == 1) {
            if (faceSrcChecked[data.src_id] == 0) {
              _this.isChange.in_num = 1;
              _this.isChange.out_num = 0;
            } else {
              _this.isChange.in_num = 0;
              _this.isChange.out_num = 1;
            }
            _this.isChange.alarm_num = 1;
            _this.$emit("personDataChange", _this.isChange);
          }
          return;
        }
      }
      var we = document.getElementsByClassName("web")[0];
      if (we != undefined) {
        we.className = "fl track-item web animated bounceInDown";
        clearInterval(this.timeWe);
        this.timeWe = setInterval(() => {
          we.className = "fl track-item web animated";
        }, 2000);
      }
      if (_this.personList.length > 7) {
        _this.personList.pop();
      }
      _this.personList.unshift(data);
      if (data.type == 1) {
        if (faceSrcChecked[data.src_id] == 0) {
          _this.isChange.in_num = 1;
          _this.isChange.out_num = 0;
        } else {
          _this.isChange.in_num = 0;
          _this.isChange.out_num = 1;
        }
        _this.isChange.alarm_num = 1;
        _this.$emit("personDataChange", _this.isChange);
      }
    });
    webSocketBridge.socket.onopen = function() {
      console.log("Connected to notification socket");
    };
    webSocketBridge.socket.onclose = function() {
      console.log("Disconnected to notification socket");
    };
    // websocket end
  },
  methods: {
    trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }
  },
  created() {
    var src_ids = [];
    faceTrack(`page=1&number=7&src_ids=${encodeURIComponent(src_ids)}`)
      .then(response => {
        this.personList = response.data.data.facetracks;
      })
      .catch(error => {
        console.log(error);
      });
  },
  beforeDestroy() {
    clearInterval(this.timeWe);
  }
};
</script>

<style scoped>
@import "../../../../node_modules/animate.css/animate.min.css";
.track-item {
  cursor: pointer;
}
</style>
