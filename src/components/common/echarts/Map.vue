<template>
    <div class="map_box">
        <!-- <p id="title">{{title}}</p> -->
        <img src="/static/IMG/community_map.png">
        <div class="time_box">
            <div class="time_box_title">
              <span>连续零发案</span>
            </div>
            <!-- <span class="time_box_line"></span> -->
            <ul class="time_signal">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div class="time_box_content">
                <span>第</span>
                <ul>
                    <li v-for="(item,index) in datetime.days" :key="index">{{item}}</li>
                </ul>
                <span>天</span>
                <ul>
                    <li v-for="(item,index) in datetime.hours" :key="index">{{item}}</li>
                </ul>
                <span>时</span>
                <ul>
                    <li v-for="(item,index) in datetime.minutes" :key="index">{{item}}</li>
                </ul>
                <span>分</span>
                <ul>
                    <li v-for="(item,index) in datetime.seconds" :key="index">{{item}}</li>
                </ul>
                <span>秒</span>
            </div>
        </div>
    </div>
</template>
<script>
import { PolicesituationList } from "@/mock/api";
export default {
  name: "map_kaixuan",
  props: ["title"],
  data() {
    return {
      lastDateTime: "",
      timer: "",
      timer2: "",
      timer3: "",
      datetime: {
        days: [],
        hours: [],
        minutes: [],
        seconds: []
      }
    };
  },
  mounted() {
    this.getPoliceFirst();
    this.timer3 = setInterval(() => {
      this.getPoliceFirst();
    }, 600 * 1000);
    if (this.lastDateTime) {
      this.getData();
    }
    this.timer = setInterval(() => {
      this.getData();
    }, 1000);
    this.time_signal_change();
    this.timer2 = setInterval(() => {
      this.time_signal_change();
    }, 300);
  },
  methods: {
    getPoliceFirst() {
      PolicesituationList()
        .then(response => {
          if (response.data.data[0].record_date) {
            this.lastDateTime = response.data.data[0].record_date;
          } else {
            this.$message({
              type: "error",
              message: "案情时间数据存在问题!"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getData() {
      if (!this.lastDateTime) {
        this.datetime.days = ["0", "0"];
        this.datetime.hours = ["0", "0"];
        this.datetime.minutes = ["0", "0"];
        this.datetime.seconds = ["0", "0"];
        return;
      }
      let date = new Date(this.lastDateTime.replace(/-/g, "/"));
      let timestamp = date.getTime();
      let today_timestamp = new Date().getTime();
      let time_difference = today_timestamp - timestamp;
      let days = Math.floor(time_difference / (24 * 60 * 60 * 1000));
      if(days<10){
        days = "00"+days;
      }else if(days<100){
        days = "0"+days;
      }
      // days = days < 10 ? "0" + days : days;
      this.datetime.days = String(days).split("");
      let leave1 = time_difference % (24 * 60 * 60 * 1000);
      let hours = Math.floor(leave1 / (60 * 60 * 1000));
      hours = hours < 10 ? "0" + hours : hours;
      this.datetime.hours = String(hours).split("");
      let leave2 = leave1 % (3600 * 1000);
      let minutes = Math.floor(leave2 / (60 * 1000));
      minutes = minutes < 10 ? "0" + minutes : minutes;
      this.datetime.minutes = String(minutes).split("");
      let leave3 = leave2 % (60 * 1000);
      let seconds = Math.floor(leave3 / 1000);
      seconds = seconds < 10 ? "0" + seconds : seconds;
      this.datetime.seconds = String(seconds).split("");
    },
    time_signal_change() {
      let li_list = document.getElementsByClassName("time_signal")[0];
      li_list = li_list.getElementsByTagName("li");
      for (let i = 0; i < 40; i++) {
        li_list[i].style.height = Math.random() * 15 + 1 + "px";
      }
    }
  },
  computed: {},
  created() {},
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
    clearInterval(this.timer3);
  }
};
</script>
<style scoped>
p {
  height: 16px;
  font-family: SimHei;
  font-size: 16px;
  color: #42eaea;
  text-align: center;
  margin-top: 20px;
}
.map_box img {
  width: 598px;
  height: 400px;
  /* background-color: #062b45; */
  position: absolute;
  bottom: 0;
  left: 0;
}
.time_box {
  width: 575px;
  height: 84px;
  position: absolute;
  top: 20px;
  left: 15px;
  /* background: url("/static/IMG/time_box.png") no-repeat;
  background-size: 100% 100%; */
}
.time_box_title {
  position: absolute;
  top: 0;
  left: 200px;
  width: 143px;
  height: 123px;
  background: url("/static/IMG/time_circle.png") no-repeat;
  background-size: 100% 100%;
  font-family: SourceHanSansCN-Bold;
  font-size: 23px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #42eaea;
}
.time_box_title span {
  position: absolute;
  top: 47px;
  left: 22px;
  font-size: 23px;
}
.time_box_line {
  width: 96px;
  height: 3px;
  position: absolute;
  top: 11px;
  right: 21px;
  background: url("/static/IMG/time_line.png") no-repeat;
  background-size: 100% 100%;
}
.time_box_content {
  position: absolute;
  top: 150px;
  left: 45px;
  line-height: 47px;
}
.time_box_content span,
.time_box_content ul,
.time_box_content ul li {
  float: left;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
}
.time_box_content ul li {
  font-family: FZCSJW;
  color: #fffd34;
  width: 36px;
  height: 47px;
  line-height: 47px;
  background: url("/static/IMG/time_number.png") no-repeat;
  background-size: 100% 100%;
  margin-right: 3px;
}
.time_box_content ul {
  margin-right: 2px;
}
.time_box_content span {
  font-size: 20px;
  color: #42eaea;
  margin: 0 3px;
}
.time_signal {
  position: absolute;
  top: 131px;
  right: 70px;
  transform: rotateX(180deg);
}
.time_signal li {
  float: left;
  background: #1eb0dc;
  width: 1px;
  height: 13px;
  margin-right: 3px;
}
.map_box {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
