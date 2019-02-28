<template>
  <div class="echartsBox">
    <div class="box-head">
      <div class="box-title">{{title}}</div>
      <div class="box-data">
        <ul class="box-data-stat1">
          <li class="fr">
            <ul class="number-style">
              <li class="fl" v-for="(item, index) in total_num" v-bind:key="index">{{item}}</li>
            </ul>
          </li>
          <li class="fr">房屋总数</li>
        </ul>
        <ul class="box-data-stat2">
          <li class="fr">入住率<span class="chart-data">{{occupancyRate}}</span></li>
        </ul>
      </div>
    </div>
    <div class="box-body">
      <div id="chart_building" class="chart chart-pie"></div>
      <ul class="building-data">
        <!-- <li class="chart-data" v-for="(item, index) in buildingDatas" v-bind:key="index">{{item + '%'}}</li> -->
        <li class="chart-data" v-for="(item, index) in buildingDatas" v-bind:key="index">{{item}} 套</li>
      </ul>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { buildingInfo } from "@/mock/api";

export default {
  name: "Building",
  data() {
    return {
      title: "小区房屋",
      total_num: "",
      total_num_origin: "",
      occupancyRate: 0,
      chart_data: [],
      legendData: ["自住房屋", "商用房屋", "出租房屋", "其他"],
      buildingDatas: [],
      timer: "",
      linear_color: {
        type: "linear",
        x: 1,
        y: 0,
        x2: 0,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: "#2e80b6"
          },
          {
            offset: 1,
            color: "#ffffff"
          }
        ]
      },
      linear_color1: {
        type: "linear",
        x: 1,
        y: 0,
        x2: 0,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: "#f5a623"
          },
          {
            offset: 1,
            color: "#ffffff"
          }
        ]
      },
      linear_color6: {
        type: "linear",
        x: 1,
        y: 0,
        x2: 0,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: "#1aff0f"
          },
          {
            offset: 1,
            color: "#1a400f"
          }
        ]
      },
      linear_color7: {
        type: "linear",
        x: 1,
        y: 0,
        x2: 0,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: "#5e4c00"
          },
          {
            offset: 1,
            color: "#ffc800"
          }
        ]
      }
    };
  },
  mounted() {
    this.getData();
    this.timer = setInterval(() => {
      this.getData();
    }, 10 * 1000);
  },
  methods: {
    numberReset(len, num) {
      var substitute = len - String(num).length;
      var numStart = "";
      for (var i = 0; i < substitute; i++) {
        numStart += "0";
      }
      num = (numStart + num).split("");
      return num;
    },
    setChart() {
      let myChart = echarts.init(document.getElementById("chart_building"));
      myChart.clear();
      myChart.setOption(
        {
          color: [
            this.linear_color7,
            this.linear_color6,
            this.linear_color1,
            this.linear_color
          ],
          tooltip: {
            trigger: "item"
          },
          legend: {
            orient: "vertical",
            data: this.legendData,
            right: 50,
            top: 40,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              color: "#49fffe"
            },
            itemStyle: {
              normal: {
                fontSize: "bold"
              }
            }
          },
          grid: {
            top: "30",
            bottom: "20",
            left: "32",
            right: "27"
          },
          series: [
            {
              name: "使用类型",
              type: "pie",
              radius: [20, 70],
              center: ["30%", "50%"],
              roseType: "radius",
              data: this.chart_data.sort(function(a, b) {
                return a.value - b.value;
              }),
              label: {
                normal: {
                  show: false
                }
              },
              animationEasing: "bounceOut",
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        },
        true
      );
    },
    getData() {
      buildingInfo()
        .then(response => {
          this.total_num_origin = response.data.data.count
            ? response.data.data.count
            : 0;
          this.total_num = this.numberReset(4, this.total_num_origin);
          var type_distribution = response.data.data.type_distribution;
          this.chart_data = [];
          this.buildingDatas = [];
          for (var i = 0; i < this.legendData.length; i++) {
            let tmp_d = type_distribution[this.legendData[i]]
              ? type_distribution[this.legendData[i]]
              : 0;
            this.chart_data.push({ value: tmp_d, name: this.legendData[i] });
            this.buildingDatas.push(
              // Math.round(tmp_d / this.total_num_origin * 100)
              tmp_d
            );
          }
          var buildingUse = this.buildingDatas;
          var buildingUseNum = 0;
          buildingUse.length = buildingUse.length - 1;
          buildingUse.forEach(function(value) {
            buildingUseNum += value;
          });
          if (this.total_num_origin) {
            this.occupancyRate =
              Math.round(buildingUseNum / this.total_num_origin * 100) + "%";
          } else {
            this.occupancyRate = "0%";
          }

          buildingUse.push(this.total_num_origin - buildingUseNum);
          this.buildingDatas = buildingUse;
          this.setChart();
        })
        .catch(function(error) {
          // this.buildingDatas = [0, 0, 0, 0];
          console.log(error);
        });
    }
  },

  beforeDestroy() {
    clearInterval(this.timer);
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
.number-style {
  margin-left: 18px;
}
.number-style li {
  width: 30px;
  height: 30px;
  text-align: center;
  background-color: #07101f;
  border-radius: 4px;
  border: solid 1px rgba(73, 241, 231, 0.4);
  font-family: FZCSJW;
  font-size: 26px;
  font-weight: normal;
  font-stretch: normal;
  color: #fffd34;
  margin-right: 3px;
  font-family: Arial;
  font-weight: bold;
}
.number-style li:last-child {
  margin-right: 0;
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
.chart-data {
  font-family: Arial-BoldMT;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #edbb01;
  margin: 0 6px;
}
.box-data-stat1 {
  overflow: hidden;
  line-height: 30px;
  margin-right: 10px;
  margin-bottom: 15px;
  float: left;
  margin-top: 10px;
}
.box-data-stat2 {
  overflow: hidden;
  margin-right: 10px;
  margin-bottom: 25px;
  float: right;
  margin-top: 20px;
}
.box-data-stat2 li:first-child {
  margin-left: 25px;
  margin-right: 20px;
}
.chart {
  width: 347px;
  height: 155px;
}
.chart-pie {
  height: 170px;
  position: relative;
  top: 0px;
  left: 80px;
}
.building-data {
  position: absolute;
  top: 147px;
  right: 145px;
}
.building-data li {
  margin-bottom: 6px;
}
</style>
