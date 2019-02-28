<template>
  <div id="header">
    <!-- <div id="datatime">{{datatime}}</div> -->
    <div class="date">
      <div class="now_date fl">
        <div id="now_day">{{now_day}}</div>
        <div id="now_date">{{now_date}}</div>
      </div>
      <div id="now_time" class="fl">{{now_time}}</div>
    </div>
    <div id="title" :class="{ long: titleStyle}">{{ mesFather }}</div>
    <div id="weather_wrap">
      <div class="other_city_weather" >
          <div id="tmp_d">
              <div id="other_city_continer">
                <p v-for="(item, index) in other_weather" :class= "index === 1?'weather_act':'weather_not_act'"
                 :key="'other_weather' + index" >
                  <span>{{item.week}}</span>
                  <span>·</span>
                  <span>{{item.weather}}</span>
                  <span>{{item.temperature}}</span>
                </p>
              </div>
          </div>
          
      </div>
      <div class="weather">
          <span id="weather_t">{{location}} {{temperatureValue}}</span>
          <img :src="weather_img">
      </div>
    </div>
  </div>
</template>

<script>
import { weatherInfo } from "@/mock/api";
import "jquery";
export default {
  name: "Pheader",
  props: ["mesFather", "titleStyle"],
  data() {
    return {
      datatime: "",
      now_day: "",
      now_date: "",
      now_time: "",
      nbsp: "　",
      clickInterval: "",
      weatherInterval: "",
      location: "",
      temperatureValue: "",
      weather_img: "/static/IMG/weather/mh_rain.png",
      other_weather: [],
      weather_num: 0,
      offset_num: 0,
      getWeatherInfoInterval: ""
    };
  },
  beforeDestroy() {
    clearInterval(this.clickInterval);
    clearInterval(this.weatherInterval);
    clearInterval(this.getWeatherInfoInterval);
    this.offset_num = 0;
  },
  mounted() {
    this.clickInterval = setInterval(() => {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;
      var day = date.getDate();
      day = day < 10 ? `0${day}` : day;
      var hours = date.getHours();
      hours = hours < 10 ? `0${hours}` : hours;
      var minutes = date.getMinutes();
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      var seconds = date.getSeconds();
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      var week = date.getDay();
      switch (week) {
        case 0:
          week = "星期日";
          break;
        case 1:
          week = "星期一";
          break;
        case 2:
          week = "星期二";
          break;
        case 3:
          week = "星期三";
          break;
        case 4:
          week = "星期四";
          break;
        case 5:
          week = "星期五";
          break;
        case 6:
          week = "星期六";
          break;
      }
      this.now_day = week;
      this.now_date = `${year}年 ${month}月${day}日`;
      this.now_time = `${hours}:${minutes}:${seconds}`;
    }, 1000);
    this.getWeatherInfo();
    this.getWeatherInfoInterval = setInterval(() => {
      this.getWeatherInfo();
    }, 30 * 1000);
  },
  methods: {
    getWeatherInfo: function() {
      weatherInfo()
        .then(response => {
          if (response.data.data.detail === "错误信息") {
            return;
          }
          this.weather_num = response.data.data.other_weather_info.length;
          let DT_weather_info = response.data.data.DT_weather_info;
          this.other_weather = response.data.data.other_weather_info;
          this.other_weather.unshift(
            this.other_weather[this.other_weather.length - 1]
          );

          this.location = DT_weather_info.name;
          this.temperatureValue = DT_weather_info.temperature;
          let w_er = DT_weather_info.weather;
          if (w_er.indexOf("雪") > -1) {
            this.weather_img = "/static/IMG/weather/mh_snow.png";
          } else if (w_er.indexOf("雨") > -1) {
            this.weather_img = "/static/IMG/weather/mh_rain.png";
          } else if (w_er.indexOf("阴") > -1) {
            this.weather_img = "/static/IMG/weather/mh_cloudy.png";
          } else {
            this.weather_img = "/static/IMG/weather/mh_sunny.png";
          }

          clearInterval(this.weatherInterval);
          this.weatherInterval = setInterval(() => {
            this.moveWrap();
          }, 5000);
        })
        .catch(error => {
          console.error(error);
        });
    },
    moveWrap: function() {
      this.offset_num = this.offset_num + 1;
      let children = other_city_continer.childNodes;
      for (let i = 0; i < children.length; i++) {
        children[i].className = "weather_not_act";
      }
      if (this.offset_num == 6) {
        this.offset_num = 0;
        $(other_city_continer).css("transition", "width 1.5s linear");
        $(other_city_continer).css("top", "0px");
        setTimeout(function() {
          $(other_city_continer).css("transition", "top 1.5s linear");
        }, 1.5 * 1000);
      } else {
        $(other_city_continer).css("top", "-" + this.offset_num * 19 + "px");
      }
      $($("#other_city_continer p")[this.offset_num + 1])
        .removeClass("weather_not_act")
        .addClass("weather_act");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#weather_t {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  font-size: 19px;
  position: absolute;
  right: 88px;
  width: 116px;
}
#weather_wrap {
  position: absolute;
  right: 0px;
  top: 0px;
}
.other_city_weather p {
  margin-top: 4px;
}
.weather_not_act {
  opacity: 0.7;
  margin-left: 8px;
  height: 15px;
  animation: weather_not_act 1s;
  animation-timing-function: ease-in-out;
}
.weather_act {
  font-size: 16px;
  height: 22px;
  line-height: 22px;
  animation: weather_act 1.5s;
  animation-timing-function: ease-in-out;
}
@keyframes weather_act {
  0% {
    margin-left: 8px;
    font-size: 13px;
    opacity: 0.7;
  }
  100% {
    margin-left: 0px;
    font-size: 16px;
    opacity: 1;
  }
}
@keyframes weather_not_act {
  0% {
    margin-left: 0px;
    font-size: 16px;
    opacity: 1;
  }
  100% {
    margin-left: 8px;
    font-size: 13px;
    opacity: 0.7;
  }
}
#other_city_continer {
  position: relative;
  transition: top 1.5s linear;
  white-space: nowrap;
}
.other_city_weather {
  right: 20px;
  margin: 13px 24px 0px 0px;
  width: 250px;
  height: 63px;
  float: right;
  color: #ffffff;
  /* overflow: hidden; */
  font-family: SimHei;
  font-size: 13px;
  overflow: hidden;
}
.weather {
  float: right;
  margin-top: 20px;
  color: #ffffff;
  font-size: 24px;
  margin-right: 20px;
  /* font-family: FranklinGothic; */
  position: relative;
}

.weather img {
  vertical-align: bottom;
  margin-left: 5px;
}
#header {
  width: 1917px;
  height: 78px;
  background-color: #101826;
  position: relative;
}
#title {
  display: inline-block;
  width: 561px;
  height: 47px;
  line-height: 47px;
  margin-top: 17px;
  background: url("/static/IMG/bigTitle.png") no-repeat;
  background-size: 100% 100%;
  /* font-family: SourceHanSansCN-Regular; */
  font-size: 30px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  font-family: SimHei;
}
#title.long {
  width: 770px;
}
#datatime {
  position: absolute;
  top: 33px;
  left: 45px;
}
.date {
  position: absolute;
  top: 30px;
  left: 45px;
  font-family: "Arial Narrow";
}
.now_date {
  margin-left: 20px;
  text-align: right;
  font-size: 12px;
}
#now_time {
  font-size: 30px;
  font-weight: bold;
  margin-left: 15px;
}
#now_day {
  font-weight: bold;
}
</style>
