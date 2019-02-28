<template>
  <div class="echartsBox">
    <div class="box-head">
      <div class="box-title">{{title}}</div>
      <div class="box-data">
        <ul class="box-data-stat1">
          <li class="fr">
            <ul class="number-style">
              <li class="fl" v-for="(item, index) in total_num" 
               v-bind:key="index" :id="'pft'+index">{{item}}</li>
            </ul>
          </li>
          <li class="fr">今日通行(人次)</li>
        </ul>
        <ul class="box-data-stat2">
          <li class="fr">活跃人员<span class="chart-data">{{other_num}}</span>人</li>
          <li class="fr">社区人员<span class="chart-data">{{alarm_num}}</span>人</li>
        </ul>
      </div>
    </div>
    <div class="box-body">
      <div id="chart_person" class="chart"></div>
    </div>
    <FaceNetTree @personDataChange='person_data_change' v-show='false'></FaceNetTree>
  </div>
</template>

<script>
import echarts from "echarts";
import FaceNetTree from "./FaceNetTree";
import {
  flowPersonToday,
  personFlowDay,
  personAlarmDay,
  people_get
} from "@/mock/api";

export default {
  name: "PersonFlowToday",
  components: {
    FaceNetTree
  },
  data() {
    return {
      title: "小区人流",
      total_num_origin: "",
      total_num: "",
      alarm_num: "",
      other_num: "",
      chart_data_capture_ser: [],
      chart_data_alarm_ser: [],
      chart_data_capture: "",
      chart_data_alarm: "",
      xName: "时",
      xAxis: [],
      getDataInterval: ""
    };
  },
  beforeDestroy() {
    clearInterval(this.getDataInterval);
  },
  mounted() {
    this.getData();
    // this.getDataInterval = setInterval(() => {
    //   this.getData();
    // }, 10 * 1000);
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
      let myChart = echarts.init(document.getElementById("chart_person"));
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
                if (params[i]["marker"] != "") {
                  res +=
                    params[i]["marker"] +
                    // params[i]["seriesName"] +
                    "进出人次:" +
                    _this.toThousands(params[i]["value"]) +
                    "<br>";
                } else {
                  var bgcolor = params[i]["color"]["colorStops"][1]["color"];
                  var marker =
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
                    bgcolor +
                    ';"></span>';
                  res +=
                    "<div style ='text-align:left'>" +
                    marker +
                    // params[i]["seriesName"] +
                    "进出人次：" +
                    _this.toThousands(params[i]["value"]) +
                    "</div>";
                }
              }
              return res;
            }
          },
          legend: {
            data: ["进出人次"],
            show: false,
            right: 0,
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 20,
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
                width: 1
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
            name: "进出人次",
            nameTextStyle: {
              padding: [0, 32, 0, 40]
            },
            type: "value",
            splitLine: {
              show: true,

              lineStyle: {
                color: "rgba(255,255,255,0.4)",
                type: "dotted"
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
              name: "进出人次",
              type: "bar",
              data: this.chart_data_alarm_ser,
              animationEasing: "bounceOut",
              barMaxWidth: '50%',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 1, color: "#007fd0" },
                    { offset: 0, color: "#1bffe6" }
                  ])
                }
              }
            },
            {
              name: "",
              type: "line",
              data: this.chart_data_alarm_ser,
              animationEasing: "quarticOut",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 1, color: "rgba(255,253,52,.7)" },
                    { offset: 1, color: "rgba(255,253,52,.7)" }
                  ])
                }
              }
            }
            // {
            //   name: "访客",
            //   type: "bar",
            //   data: this.chart_data_capture_ser,
            //   animationEasing: "bounceOut",
            //   itemStyle: {
            //     normal: {
            //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //         { offset: 1, color: "#cb0851" },
            //         { offset: 0, color: "#fc7cb5" }
            //       ])
            //     }
            //   }
            // }
          ]
        },
        true
      );
    },
    getData() {
      people_get()
        .then(response => {
          this.total_num_list = response.data.data.time_data;
          this.total_num_origin = response.data.data.today_pass;
          this.total_num = this.numberReset(5, response.data.data.today_pass);
          this.alarm_num = this.toThousands(response.data.data.person_total);
          this.other_num = this.toThousands(
            // response.data.data.total_num - response.data.data.alarm_num
            response.data.data.person_active
          );
          this.xAxis = [];
          for (let x in this.total_num_list) {
            this.xAxis.push(Number(x.substr(0, 2)));
          }
          this.chart_data_alarm_ser = [];
          for (let x in this.total_num_list) {
            this.chart_data_alarm_ser.push(this.total_num_list[x]);
          }
          this.setChart();
          // this.total_num = this.numberReset(5, this.total_num);
        })
        .catch(error => {
          console.log(error);
        });
    },
    person_data_change (data) {
      this.total_num_origin = Number(this.total_num_origin) + Number(1);
      this.total_num = this.numberReset(5, this.total_num_origin);
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
