<template>
  <div class="echartsBox">
    <div class="box-head">
      <div class="box-title">人脸图谱</div>
    </div>
    <div class="box-body face">
      <div class="img-borderStyle"></div>
      <img :src="'http://'+src+personItem.img_src" id="face_img" @error="img_error">
      <!-- <img :src="personItem.img_src" id="face_img" @error="img_error"> -->
      <div id="face_img_content">{{personItem.name}}</div>
      <ul>
        <li class="face_relation" v-for="(item,index) in personList" :key="index">
          <div class="line"></div>
          <div class="face_relation_img">
            <img :src="item.image">
            <!-- <img :src="item.image"> -->
          </div>
          <div class="face_relation_content">{{item.name}}</div>
          <div class="relation_name">{{item.relation}}</div>
        </li>
        <!-- <li class="face_relation">
          <div class="line"></div>
          <div class="face_relation_img"></div>
          <div class="face_relation_content">张佳宇</div>
        </li>
        <li class="face_relation">
          <div class="line"></div>
          <div class="face_relation_img"></div>
          <div class="face_relation_content">张佳宇</div>
        </li>
        <li class="face_relation">
          <div class="line"></div>
          <div class="face_relation_img"></div>
          <div class="face_relation_content">张佳宇</div>
        </li>
        <li class="face_relation">
          <div class="line"></div>
          <div class="face_relation_img"></div>
          <div class="face_relation_content">张佳宇</div>
        </li>
        <li class="face_relation">
          <div class="line"></div>
          <div class="face_relation_img"></div>
          <div class="face_relation_content">张佳宇</div>
        </li>
        <li class="face_relation">
          <div class="line"></div>
          <div class="face_relation_img"></div>
          <div class="face_relation_content">张佳宇</div>
        </li>
        <li class="face_relation">
          <div class="line"></div>
          <div class="face_relation_img"></div>
          <div class="face_relation_content">张佳宇</div>
        </li> -->
      </ul>
    </div>
  </div>
</template>
<script>
import {
  faceAlarmTrack,
  facePushIP,
  accessControlIp,
  personRelations,
  dis_play
} from "@/mock/api";
export default {
  name: "face_push",
  data() {
    return {
      personItem: {
        name: '',
        img_src: ''
      },
      personList: [],
      src: accessControlIp,
      isChange: {
        today_pass: 0
      },
      src_display:dis_play
    };
  },
  methods: {
    img_error() {
      this.personItem.img_src = "/static/IMG/error_img.png";
    }
  },
  mounted() {
    // websocket
    var _this = this;
    var ws_path = facePushIP;
    var webSocketBridge = new channels.WebSocketBridge();
    webSocketBridge.connect(ws_path);
    webSocketBridge.listen(function(data) {
      if (data.type == 1) {
        _this.personItem.name = data["person_matched"]["name"];
        _this.personItem.img_src = data["image"];
        personRelations({ name: data["person_matched"]["name"] })
          .then(response => {
            _this.personList = response.data.data;
            _this.isChange.today_pass = 1;
            _this.$emit("personDataChange", _this.isChange);
          })
          .catch(error => {
            console.log(error);
          });
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
  created() {
    faceAlarmTrack(`page=1&number=1`)
      .then(response => {
        var facetrackInfos = response.data.data.facetracks;
        if (facetrackInfos.length == 0) {
          return;
        }
        this.personItem.name = facetrackInfos[0]["person_matched"]["name"]
        this.personItem.img_src = facetrackInfos[0]["image"]
        personRelations({ name: facetrackInfos[0]["person_matched"]["name"] })
        // personRelations({ name: '李霞' })
          .then(response => {
            this.personList = response.data.data;
          })
          .catch(error => { 
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style scoped>
.echartsBox {
  position: relative;
  padding: 20px;
  color: #49fffe;
  font-family: SimHei;
  font-size: 14px;
  line-height: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
}
.box-title {
  text-align: left;
  font-family: SimHei;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 18px;
  letter-spacing: 0px;
  color: #42eaea;
  margin-bottom: 9px;
}
.img-borderStyle {
  position: absolute;
  top: 112px;
  left: 255px;
  width: 90px;
  height: 90px;
  background: url("/static/IMG/img_border.png") no-repeat;
  background-size: 100% 100%;
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
#face_img {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  position: absolute;
  top: 125px;
  left: 268px;
}
#face_img_content {
  position: absolute;
  top: 176px;
  left: 273px;
  width: 56px;
  height: 21px;
  line-height: 21px;
  border: solid 1px #adeafc;
  background-color: rgba(2,9,83,.7);
  font-size: 12px;
  color: #f3f4f9;
}
.face_relation {
  position: absolute;
  top: 80px;
  left: 287px;
  width: 25px;
  height: 25px;
  line-height: 25px;
  border-radius: 50%;
  box-shadow: 0 0 10px #fff;
  transform-origin: 15px 75px 0px;
  background-color: rgba(9,187,13,.4);
}
.face_relation .line {
  position: absolute;
  top: -10px;
  left: 49%;
  border: 1px solid rgb(1, 174, 255);
  width: 1px;
  height: 10px;
}
.face_relation .face_relation_img {
  box-shadow: 0 0 10px #fff;
  position: absolute;
  top: -60px;
  left: -11px;
  background-color: #00dfe8;
  border: solid 1px #adeafc;
  width: 49px;
  height: 49px;
  border-radius: 50%;
}
.face_relation:nth-child(2) {
  transform: rotatez(270deg);
  background-color: rgba(25,56,114,.4);
}
.face_relation:nth-child(3) {
  transform: rotatez(90deg);
  background-color: rgba(25,56,114,.4);
}
.face_relation:nth-child(4) {
  transform: rotatez(180deg);
  background-color: rgba(9,187,13,.4);
}
.face_relation:nth-child(5) {
  transform: rotatez(315deg);
  background-color: rgba(207,205,11,.4);
}
.face_relation:nth-child(6) {
  transform: rotatez(45deg);
  background-color: rgba(187,9,177,.4);
}
.face_relation:nth-child(7) {
  transform: rotatez(225deg);
  background-color: rgba(187,9,177,.4);;
}
.face_relation:nth-child(8) {
  transform: rotatez(135deg);
  background-color: rgba(207,205,11,.4);
}
.face_relation:nth-child(2) .face_relation_content{
  transform: rotatez(-270deg) scale(0.75) translate(-27px,30px);
}
.face_relation:nth-child(3) .face_relation_content{
  transform: rotatez(-90deg) scale(0.75)  translate(27px,30px);
}
.face_relation:nth-child(4) .face_relation_content{
  transform: rotatez(-180deg) scale(0.75) translate(0,55px);
}
.face_relation:nth-child(5) .face_relation_content{
  transform: rotatez(-315deg) scale(0.75) translate(-20px,17px);
}
.face_relation:nth-child(6) .face_relation_content{
  transform: rotatez(-45deg) scale(0.75) translate(20px,17px);
}
.face_relation:nth-child(7) .face_relation_content{
  transform: rotatez(-225deg) scale(0.75) translate(-20px,50px);
}
.face_relation:nth-child(8) .face_relation_content{
  transform: rotatez(-135deg) scale(0.75) translate(20px,50px);
}
.face_relation .relation_name {
	font-size: 12px;	
	color: #ffffff;
}
.face_relation:nth-child(2) .relation_name{
  transform: rotatez(-270deg);
}
.face_relation:nth-child(3) .relation_name{
  transform: rotatez(-90deg);
}
.face_relation:nth-child(4) .relation_name{
  transform: rotatez(-180deg);
}
.face_relation:nth-child(5) .relation_name{
  transform: rotatez(-315deg);
}
.face_relation:nth-child(6) .relation_name{
  transform: rotatez(-45deg);
}
.face_relation:nth-child(7) .relation_name{
  transform: rotatez(-225deg);
}
.face_relation:nth-child(8) .relation_name{
  transform: rotatez(-135deg);
}

.face_relation:nth-child(2) .face_relation_img img{
  transform: rotatez(-270deg);
}
.face_relation:nth-child(3) .face_relation_img img{
  transform: rotatez(-90deg);
}
.face_relation:nth-child(4) .face_relation_img img{
  transform: rotatez(-180deg);
}
.face_relation:nth-child(5) .face_relation_img img{
  transform: rotatez(-315deg);
}
.face_relation:nth-child(6) .face_relation_img img{
  transform: rotatez(-45deg);
}
.face_relation:nth-child(7) .face_relation_img img{
  transform: rotatez(-225deg);
}
.face_relation:nth-child(8) .face_relation_img img{
  transform: rotatez(-135deg);
}

.face_relation:nth-child(2) .line,.face_relation:nth-child(3) .line {
  height: 50px;
  top: -50px;
}


.face_relation:nth-child(2) .face_relation_img,.face_relation:nth-child(3) .face_relation_img {
  top: -100px;
}

.face_relation_content {
  width: 40px;
  height: 15px;
  line-height: 16px;
  border-radius: 2px;
  font-size: 12px;
  transform: scale(0.75);
  color: #f3f4f9;
  background-color: #09bb0d;
  position: absolute;
  top: -24px;
  left: -7px;
}

.face_relation:nth-child(2) .face_relation_content,.face_relation:nth-child(3) .face_relation_content {
  top: -64px;
  background-color: #0072ab;
}
.face_relation:nth-child(5) .face_relation_content,.face_relation:nth-child(8) .face_relation_content {
  background-color: #96950d;
}
.face_relation:nth-child(6) .face_relation_content,.face_relation:nth-child(7) .face_relation_content {
  background-color: #bb09b1;
}

.face_item {
  color: #f3f4f9;
  font-size: 12px;
  height: 24px;
  line-height: 22px;
  display: inline-block;
  font-family: MicrosoftYaHei;
  padding: 0px 10px;
  /* border: solid 1px rgba(73, 241, 231, 0.4); */
  border: solid 1px #adeafc;
  outline: -webkit-focus-ring-color auto 6px;
  border-radius: 4px;
  position: absolute;
  background-color: rgba(7, 16, 31, 0.4);
}

.face_relation_img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
