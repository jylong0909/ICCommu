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
          <li class="fr">今日通行(车次)</li>
        </ul>
        <ul class="box-data-stat2">
          <li class="fr">驶出<span class="chart-data">{{alarm_num}}</span>辆</li>
          <li class="fr">驶入<span class="chart-data">{{unalarm_num}}</span>辆</li>
        </ul>
      </div>
    </div>
    <div class="box-body">
      <div id="chart_car" class="chart"></div>
    </div>
    <CarTrack @carDataChange='car_data_change' v-show='false'></CarTrack>

  </div>

</template>

<script>
import echarts from "echarts";
import CarTrack from "../car/CarTrack";
import {
  carTrackData,
  carTrackChartData0,
  carTrackChartData1,
  car_list_data,
  car_num_list_data
} from "@/mock/api";
export default {
  name: "CarFlowToday",
  components: {
    CarTrack
  },
  data() {
    return {
      title: "小区车流",
      total_num: "",
      total_num_origin: "",
      alarm_num: "",
      alarm_num_origin: "",
      unalarm_num: "",
      unalarm_num_origin: "",
      chart_data_capture_ser: [],
      chart_data_alarm_ser: [],
      chart_data_capture: "",
      chart_data_alarm: "",
      xName: "时",
      xAxis: [],
      timer: ""
    };
  },
  mounted() {
    this.getData();
    this.timer = setInterval(() => {
      this.getData();
    }, 10 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    car_data_change(data) {
      this.total_num_origin = Number(this.total_num_origin) + Number(1);
      this.total_num = this.numberReset(4, this.total_num_origin);
      this.unalarm_num_orgin = Number(this.unalarm_num_orgin) + Number(data.in);
      this.unalarm_num = this.toThousands(this.unalarm_num_orgin);
      this.alarm_num_origin = Number(this.alarm_num_origin) + Number(data.out);
      this.alarm_num = this.toThousands(this.alarm_num_origin);
    },
    toThousands(num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    },
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
      var _this = this;
      let myChart = echarts.init(document.getElementById("chart_car"));
      myChart.clear();
      myChart.setOption(
        {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
            formatter: function(params) {
              var res = params[0]["axisValueLabel"];
              res = res + ":00 - " + res + ":59<br>";
              for (var i = 0; i < params.length; i++) {
                if (params[i]["marker"]) {
                  res +=
                    params[i]["marker"] +
                    params[i]["seriesName"] +
                    ":" +
                    _this.toThousands(params[i]["value"]) +
                    "辆<br>";
                } else {
                  var bgcolor = params[i]["color"]["colorStops"][1]["color"];
                  var marker =
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
                    bgcolor +
                    ';"></span>';
                  res +=
                    "<div style ='text-align:left'>" +
                    marker +
                    params[i]["seriesName"] +
                    "：" +
                    _this.toThousands(params[i]["value"]) +
                    " 辆</div>";
                }
              }
              return res;
            }
          },
          legend: {
            data: ["驶入", "驶出"],
            right: 0,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              color: "#fefefe"
            },
            itemStyle: {
              normal: {
                fontSize: "bold"
              }
            }
          },
          xAxis: {
            name: this.xName,
            nameTextStyle: {
              padding: [0, 0, -28, 0]
            },
            type: "category",
            data: this.xAxis,
            axisLine: {
              lineStyle: {
                color: "#01aeff",
                width: 2
              },
              symbol: ["none", "arrow"],
              symbolSize: [8, 12],
              symbolOffset: [0, 10]
            },
            splitLine: {
              show: false
            },
            // boundaryGap: false,
            axisLabel: {
              align: "center",
              rotate: 0,
              margin: 8
            }
          },
          grid: {
            top: "30",
            bottom: "20",
            left: "32",
            right: "27"
          },
          yAxis: {
            name: "通行车次",
            nameTextStyle: {
              padding: [0, 32, 0, 40]
            },
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                type: "dotted",
                color: "rgba(255,255,255,0.4)"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#01aeff",
                width: 2
              },
              symbol: ["none", "arrow"],
              symbolSize: [8, 12],
              symbolOffset: [0, 10]
            }
          },
          series: [
            {
              name: "驶入",
              type: "bar",
              data: this.chart_data_alarm_ser,
              animationEasing: "bounceOut",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 1,
                      color: "#05d104"
                    },
                    // { offset: 0, color: "#d8fea5" }
                    {
                      offset: 0,
                      color: "#05d104"
                    }
                  ])
                }
              }
            },
            {
              name: "驶出",
              type: "bar",
              data: this.chart_data_capture_ser,
              animationEasing: "bounceOut",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 1,
                      color: "#cd5a0c"
                    },
                    // { offset: 0, color: "#fad277" }
                    {
                      offset: 0,
                      color: "#cd5a0c"
                    }
                  ])
                }
              }
            }
          ]
        },
        true
      );
    },
    getData() {
      car_num_list_data()
        .then(response => {
          this.total_num_origin = response.data.data.count;
          this.total_num = this.numberReset(4, response.data.data.count);
          this.unalarm_num_orgin = response.data.data.in;
          this.unalarm_num = this.toThousands(response.data.data.in);
          this.alarm_num_origin = response.data.data.out;
          this.alarm_num = this.toThousands(response.data.data.out);
        })
        .catch(error => {
          console.log(error);
        });
      car_list_data({
        isOut: 1
      })
        .then(response => {
          this.chart_data_capture = response.data.data.flows;
          this.xAxis = [];
          // console.log(response.data.data)
          for (let x in this.chart_data_capture) {
            this.xAxis.push(Number(x.substr(0, 2)));
          }
          this.chart_data_capture_ser = [];
          for (let x in this.chart_data_capture) {
            this.chart_data_capture_ser.push(this.chart_data_capture[x]);
          }
          this.setChart(this.chart_data_capture);
        })
        .catch(function(error) {
          console.log(error);
        });
      car_list_data({
        isOut: 0
      })
        .then(response => {
          this.chart_data_alarm = response.data.data.flows;
          this.chart_data_alarm_ser = [];
          for (let x in this.chart_data_alarm) {
            this.chart_data_alarm_ser.push(this.chart_data_alarm[x]);
          }
          this.setChart();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
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
  margin-top: 15px;
}

.box-data-stat2 li:first-child {
  margin-left: 25px;
}

.chart {
  width: 480px;
  height: 185px;
  margin-left: 20px;
}
</style>
