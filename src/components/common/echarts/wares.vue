<template>
  <div class="echartsBox">
    <div class="box-head">
      <div class="box-title">{{title}}</div>
   
    </div>
    <div class="box-body">
      <div id="WarningToday" class="chart"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import {
  flowPersonToday,
  personFlowDay,
  personAlarmDay,
  PersonDara
} from "@/mock/api";
export default {
  name: "WarningToday",
  data() {
    return {
      title: "烟感",
      total_num: "",
      alarm_num: "",
      other_num: "",
      chart_data_capture_ser: [],
      chart_data_alarm_ser: [],
      chart_data_capture: "",
      chart_data_alarm: "",
      click_state: [0, 1],
      xName: "时",
      xAxis: [],
      sexData: [],
      ageDatas: [],
      clearTime: ""
    };
  },
  mounted() {
    this.setChart();
    setTimeout(()=>{
      this.setChart();
    },0)
    this.clearTime = setInterval(() => {
      this.setChart();
    }, 10 * 1000);
  },
  methods: {
    setChart() {
      let myChart = echarts.init(document.getElementById("WarningToday"));
      myChart.clear();
      let yArr = [
       10,12,12,13,13.5,13.8,14,14.2,14.5,14.6,15.5,16,16.2,16.5,16.7,15.5,13.5,14,13.5,13.7,13.9,13.5,13.2,
      ];
      let hour = Number(new Date().getHours());
      let xArr = [];
      for (let i = 0; i < hour; i++) {
        xArr.push(i + 1);
      }
      yArr = yArr.slice(0, hour + 1)
      var yArrs_list  = yArr[yArr.length-2]
      myChart.setOption(
        {
          color: ["#00ffff", "#00ffa2", "#f0e750"],
          tooltip: {
            trigger: "axis",
            textStyle: {
              fontSize: 15,
              color: "#fff"
            },
            formatter: function(params) {
              var res = params[0].axisValue;
              res = res + ":00 - " + res + ":59<br>";
              var mak = params[0].marker;

              var e = params[0].data;
              var res = `<ul>
                      <li>  ${res} </li>
                      <li>${mak}浓度  :  ${e} %FT</li>
                      </ul>`;
              return res;
            }
          },
          legend: {
            orient: "horizontal",
            right: "4%",
            top: 10,
            itemGap: 20,
            data: ["实时浓度"+yArrs_list+" %FT"],
            textStyle: {
              color: "rgba(0,255,162, 0.8)"
            },
            itemWidth: 10,
            itemHeight: 10
          },
          xAxis: {
            name: this.xName,
            nameTextStyle: {
              padding: [0, 0, -28, 0]
            },
            boundaryGap: false,
            type: "category",
            data: xArr,
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
            show: true,
            left: 60,
            top: 34,
            right: 28,
            bottom: 42,
            borderWidth: 0
            // borderColor: 'rgba(170,172,178,0.33)',
            // backgroundColor: 'rgba(17, 34, 69, 0.24)',
          },
          yAxis: {
            name: "烟感浓度 (%FT)",
            nameTextStyle: {
              padding: [0, 32, 0, 40]
            },
            min: 0,
            max: 50,
            type: "value",
            splitLine: {
              show: false
            },
            axisLine: {
              show:true,
              lineStyle: {
                color: "#01aeff",
                width: 1
              },
              symbol: ["none", "arrow"],
              symbolSize: [8, 12],
              symbolOffset: [0, 10]
            }
          },
          series: [
            {
              name: "实时浓度"+yArrs_list+" %FT",
              type: "line",
              smooth: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              itemStyle: {
                normal: {
                  color: "rgb(0,255,162)"
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "rgba(0,255,162, 0.8)"
                      },
                      {
                        offset: 0.6,
                        color: "rgba(0,255,162, 0.4)"
                      }
                    ],
                    false
                  ),
                  shadowColor: "rgba(0, 0, 0, 0.9)",
                  shadowBlur: 10
                }
              },
              data: yArr
            }
          ]
        },
        true
      );
    }
  },
  beforeDestroy() {
    clearInterval(this.clearTime);
  }
};
</script>


<style scoped>
.echartsBox {
  position: relative;

  color: #ffffff;
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
  line-height: 1;
  text-align: center;
  background-color: #07101f;
  border-radius: 4px;
  border: solid 1px rgba(73, 241, 231, 0.4);
  font-family: MyriadPro-Bold;
  font-size: 26px;
  font-weight: normal;
  font-stretch: normal;
  color: #fffd34;
  margin-right: 3px;
}
.number-style li:last-child {
  margin-right: 0;
}
.box-title {
  height: 30px;
  text-align: left;
  line-height: 30px;
  font-size: 16px;
  padding: 0px 0px 0px 20px;
}
.box-body {
  margin-top: 6px;
  left: 3px;
  position: relative;
}
.chart-data {
  font-family: Arial-BoldMT;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fffd34;
  margin: 0 6px;
}
.box-data-stat1 {
  overflow: hidden;
  line-height: 30px;
  margin-right: 10px;
  margin-bottom: 15px;
}
.box-data-stat2 {
  overflow: hidden;
  margin-right: 10px;
  width: 100px;
  height: 45px;
  float: right;
  margin-bottom: 25px;
}
.box-data-stat2 li {
  width: 100px;
  height: 22px;
  display: block;
}

.chart {
  width: 447px;
  height: 279px;
  left: -18px;
}
</style>
