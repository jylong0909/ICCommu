<template>
  <div id="homePage">
    <Pheader mes-father="智慧平安小区数据平台" title-style='true'></Pheader>
    <div id="main">
      <div id="main-top">
        <ul>
          <li class="fl">
            <div class="chart-box1 fl">
              <PersonData></PersonData>
            </div>
          </li>
          <li class="fl">
            <div class="chart-box1 fl">
              <PersonFlowToday></PersonFlowToday>
            </div>
          </li>
          <li class="fl">
            <div class="chart-box1 fl">
              <Building></Building>
            </div>
          </li>
          <li class="fl">
            <div class="chart-box1 fl">
              <CarData></CarData>
            </div>
          </li>
          <li class="fl">
            <div class="chart-box1 fl">
              <CarFlowToday></CarFlowToday>
            </div>
          </li>
          <li class="fl">
            <div class="chart-box3 fl">
              <FaceNetTree></FaceNetTree>
            </div>
          </li>
        </ul>
      </div>
      <div id="main-middle">
        <ul>
          <li class="chart-box2 fl">
            <SmokeTemperaData></SmokeTemperaData>.
          </li>
          <li class="chart-box2 fl">
            <wares></wares>
          </li>
          <li class="chart-box2 fl">
            <WarningToday title='通知公告'></WarningToday>
          </li>
          <li class="chart-box2 fl">
            <VedioShow></VedioShow>
          </li>
        </ul>
      </div>

    </div>
    <Pfooter></Pfooter>
    
  </div>
  </div>
</template>

<script>
import Pheader from "../common/header/Pheader";
import WarningToday from "./WarningToday/WarningToday";
import VedioShow from "./VedioShow/VedioShow";
import Map from "../common/echarts/Map";
import FaceNet from "../common/echarts/FaceNet";
import FaceNetTree from "../common/echarts/FaceNetTree";
import CarData from "../common/echarts/CarData";
import PersonData from "../common/echarts/PersonData";
import Pfooter from "../common/footer/Pfooter";
import SmokeTemperaData from "../common/echarts/SmokeTemperaData";
import wares from "../common/echarts/wares";
import Building from "../common/echarts/Building";
import CarFlowToday from "../common/echarts/CarFlowToday";
import PersonFlowToday from "../common/echarts/PersonFlowToday";
import animate from "animate.css";
export default {
  name: "personAcar",
  components: {
    Pheader,
    WarningToday,
    VedioShow,
    Map,
    FaceNetTree,
    CarData,
    PersonData,
    Pfooter,
    SmokeTemperaData,
    wares,
    PersonFlowToday,
    CarFlowToday,
    Building
  }
};
</script>

<style scoped>
#homePage {
  width: 1920px;
  height: initial;
  position: relative;
}

#main {
  padding: 20px 41px 39px 40px;
  z-index: 10;
}

#main-top {
  height: 642px;
}

#main-middle {
  height: 300px;
}

#main-top .chart-box1 {
  width: 599px;
  height: 301px;
  margin-right: 20px;
  margin-bottom: 20px;
  background: url("/static/IMG/chart_box1.png") no-repeat;
  background-size: 100% 100%;
  background-position: center;
}

#main-top .map-bg {
  width: 602px;
  height: 622px;
  margin-right: 20px;
  margin-bottom: 20px;
  background: url("/static/IMG/map_bg.png") no-repeat;
  background-position: center;
  position: relative;
}

/* #main-top ul li:first-child {
    width: 826px;
  }

  #main-top ul li:nth-child(2) {
    width: 622px;
  }

  #main-top ul li:last-child {
    width: 390px;
  } */
#main-top ul li:nth-child(3) > div,
#main-top ul li:nth-child(6) > div {
  margin-right: 0;
}

#main-middle .chart-box2 {
  width: 444px;
  height: 300px;
  margin-right: 20px;
  margin-bottom: 20px;
  background: url("/static/IMG/chart_box2.png") no-repeat;
  background-position: center;
}

#main-middle ul li:last-child {
  margin-right: 0;
  margin-left: 3px;
}

#main-top .chart-box3 {
  width: 599px;
  height: 301px;
  margin-bottom: 20px;
  background: url("/static/IMG/chart_box3.png") no-repeat;
  background-size: 100% 100%;
  background-position: center;
}

</style>
