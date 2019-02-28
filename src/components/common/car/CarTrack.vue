<template>
  <div class="trackBox">
    <div class="trackBox-head">{{title}}</div>
    <div class="trackBox-body">
      <ul class="track-items">
        <li class="fl track-item web_item animated" v-for="(item, index) in personList" v-bind:key='index'>
          <div class="img-border fl">
            <!-- <img :src="'http://'+src+'/'+item.closeup_pic" style="width:100%;height:100%;"> -->
            <img src="/static/IMG/car.png" style="width:100%;height:100%;">
          </div>
          <ul class="item-info1 fl">
            <li>{{item.car_plate?item.car_plate:'未知'}}</li>
            <li class="info1-group">{{item.VehicleType?item.VehicleType:'未知'}}</li>
          </ul>
          <ul class="item-info2 fr">
            <li>{{item.camera_name}}</li>
            <li>{{item.start_time&&(item.start_time.substr(5).replace('T','&nbsp'))}}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { carPushIP, dis_play, car_track } from "@/mock/api";
export default {
  name: "CarTrack",
  data() {
    return {
      title: "实时车辆抓拍",
      personList: [],
      src: dis_play,
      timeWes: "",
      isChange: {
        in: 0,
        out: 0
      }
    };
  },
  beforeDestroy() {
    clearInterval(this.timeWes);
  },
  mounted() {
    // websocket
    var _this = this;
    var ws_path = `ws://${window.location.host}/car/notify`;
    // var ws_path = carPushIP;
    var webSocketBridge = new channels.WebSocketBridge();
    webSocketBridge.connect(ws_path);
    webSocketBridge.listen(function(data) {
      var we_item = document.getElementsByClassName("web_item")[0];
      if (we_item != undefined) {
        we_item.className = "fl track-item web_item animated bounceInDown";
        clearInterval(_this.timeWes);
        _this.timeWes = setInterval(() => {
          we_item.className = "fl track-item web_item animated";
        }, 2000);
      }
      if (_this.personList.length > 7) {
        _this.personList.pop();
      }
      _this.personList.unshift(data);
      if (data.bayonets_type == 0) {
        _this.isChange.in = 1;
        _this.isChange.out = 0;
      } else {
         _this.isChange.in = 0;
        _this.isChange.out = 1;
      }
      _this.$emit("carDataChange", _this.isChange);
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
    car_track({ pageno: 1, pagesize: 7 })
      .then(response => {
        this.personList = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
@import "../../../../node_modules/animate.css/animate.min.css";
.track-item {
  cursor: pointer;
}
</style>
