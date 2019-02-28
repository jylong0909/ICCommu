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
          <li class="fr">车位总数</li>
        </ul>
        <ul class="progress-data">
          <li><progress id="pg" max="100" :value="noParking"></progress></li>
          <li>车位使用率&nbsp;<span class="chart-data">{{noParking+'%'}}</span></li>
        </ul>
      </div>
    </div>
    <div class="box-body">
      <div id="chart_carData" class="chart chart-pie chart-pie2"></div>
      <ul class="car-data">
        <li class="chart-data" v-for="(item, index) in chart_data_arr" v-bind:key="index">{{item}}<span class="unit">个</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { parkingSpot } from "@/mock/api";

export default {
  name: "CarData",
  data() {
    return {
      title: "小区停车位",
      total_num: "",
      total_num_origin: "",
      isParking: "",
      occupancyRate: "",
      chart_data: [],
      chart_data_rate: [],
      chart_data_arr: [],
      legendData: ["使用车位", "闲置车位"],
      color: ["#d8edf6", "#09aaff", "#00b3ea", "#7a9198"],
      intervalVal: ""
    };
  },
  mounted() {
    this.getData();
    this.intervalVal = setInterval(() => {
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
    toThousands(num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    },
    setChart() {
      var _this = this;
      let myChart = echarts.init(document.getElementById("chart_carData"));
      myChart.clear();
      myChart.setOption(
        {
          color: this.color,
          tooltip: {
            trigger: "item",
            formatter: function(params) {
              return `${params.seriesName}<br>${params.marker}${
                params.name
              }：${_this.toThousands(params.value)} 个`;
            }
          },
          legend: {
            orient: "vertical",
            data: this.legendData,
            // align: "right",
            right: 63,
            top: 0,
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
              name: "车位数据",
              type: "pie",
              radius: ["55%", "80%"],
              center: ["30%", "50%"],
              avoidLabelOverlap: false,
              data: this.chart_data,
              label: {
                normal: {
                  show: false,
                  position: "center"
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontWeight: "bold"
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              animationEasing: "bounceOut"
            },
            {
              name: "车位使用率",
              type: "pie",
              startAngle: 270,
              radius: ["83%", "87%"],
              center: ["30%", "50%"],
              avoidLabelOverlap: false,
              data: this.chart_data_rate,
              label: {
                normal: {
                  show: false,
                  position: "center"
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontWeight: "bold"
                  }
                }
              },
              tooltip: {
                formatter: "{b0}: {d0}%"
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              animationEasing: "bounceOut"
            }
          ]
        },
        true
      );
    },
    getData() {
      parkingSpot()
        .then(response => {
          this.total_num_origin = response.data.data.cap;
          this.total_num = this.numberReset(4, this.total_num_origin);
          this.isParking = response.data.data.cap_used;
          this.chart_data = [];
          this.chart_data.push(
            { value: this.isParking, name: this.legendData[0] },
            {
              value: this.total_num_origin - this.isParking,
              name: this.legendData[1]
            }
          );
          this.chart_data_arr = [];
          this.chart_data_rate = [];
          this.chart_data_arr.push(
            this.toThousands(this.isParking),
            this.toThousands(this.total_num_origin - this.isParking)
          );
          this.chart_data_rate.push(
            { value: this.chart_data_arr[0], name: "使用率" },
            { value: this.chart_data_arr[1], name: "未使用率" }
          );
          this.setChart();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    noParking: function() {
      let process_c = 0;
      if (!this.total_num_origin || !this.isParking) {
        process_c = 0;
      } else {
        process_c = Number(this.isParking) / Number(this.total_num_origin);
        process_c = process_c.toFixed(2) * 100;
      }
      return process_c;
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalVal);
  }
};
</script>


<style scoped>
.echartsBox {
  position: relative;
  height: 100%;
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
}
.box-data-stat2 li:first-child {
  margin-left: 25px;
}
.chart {
  width: 347px;
  height: 155px;
}
.chart-pie {
  height: 170px;
  position: relative;
  top: -30px;
}
.chart-pie2 {
  top: 0;
  left: 80px;
}
progress {
  width: 119px;
  height: 8px;
  border: 0;
  background-color: #7a9198;
  color: #00b3ea;
  margin-bottom: 11px;
} /*IE9以上*/
progress::-moz-progress-bar {
  background: #00b3ea;
}
progress::-webkit-progress-bar {
  background: #7a9198;
}
progress::-webkit-progress-value {
  background: #00b3ea;
}
.progress-data {
  position: absolute;
  right: 50px;
  bottom: 25px;
}
.car-data {
  position: absolute;
  top: 105px;
  left: 380px;
  text-align: left;
}
.car-data li {
  margin-bottom: 6px;
}
</style>
