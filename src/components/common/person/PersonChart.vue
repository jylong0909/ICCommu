<template>
  <div class="personchart_wrap">
      <div class="chart_header">{{ title }}</div>
      <div class="scope_switch">
        <span id="day_s" @click="handleClick('day_s')" v-bind:class="{active:click_state[1]}">今日</span>|
        <span id="week_s" @click="handleClick('week_s')" v-bind:class="{active:click_state[0]}">最近七天</span>
      </div>
      <div id="chart"></div>
  </div>
  </template>
  <script>
  import echarts from "echarts";
  import {
    personFlowDay,
    personAlarmDay,
    personFlowWeek,
    personAlarmWeek
  } from "@/mock/api";
  export default {
    name: "chart",
    data() {
      return {
        title: "人流量统计图",
        chart_data_capture_ser: [],
        chart_data_alarm_ser: [],
        chart_data_capture: "",
        chart_data_alarm: "",
        click_state: [0, 1],
        xName: "时",
        xAxis: [],
        color: ["rgba(159,250,61,0.8)", "rgba(255,138,0,0.8)"],
        intervalVal: ""
      };
    },
    mounted() {
      this.getData();
      this.intervalVal = setInterval(() => {
        this.getData();
      }, 30 * 1000);
    },
    beforeDestroy() {
      clearInterval(this.intervalVal);
    },
    methods: {
      handleClick(key) {
        if (key === "week_s") {
          this.click_state = [1, 0];
          this.xName = "日期";
          this.getData();
        } else {
          this.click_state = [0, 1];
          this.xName = "时";
          this.getData();
        }
      },
      toThousands(num) {
        var num = (num || 0).toString(),
          result = "";
        while (num.length > 3) {
          result = "," + num.slice(-3) + result;
          num = num.slice(0, num.length - 3);
        }
        if (num) {
          result = num + result;
        }
        return result;
      },
      setChart() {
        let myChart = echarts.init(document.getElementById("chart"));
        myChart.clear();
        let _this = this;
        myChart.setOption({
          color: this.color,
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            },
            formatter: function(params) {
              let res = "";
              let label = params[0]["axisValueLabel"];
              res += label + ":00 - " + label + ":59<br>";
              res +=
                '<div style ="text-align:left">' +
                params[0].marker +
                params[0].seriesName +
                " " +
                _this.toThousands(params[0].value) +
                "人</div>";
              res +=
                '<div style ="text-align:left">' +
                params[1].marker +
                params[1].seriesName +
                " " +
                _this.toThousands(params[1].value) +
                "人</div>";
              return res;
            }
          },
          legend: {
            data: ["社区人员", "抓拍人员"],
            right: 10,
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
            boundaryGap: false,
            axisLabel: {
              interval: 0,
              align: "center",
              rotate: 0,
              margin: 8
            }
          },
          grid: {
            top: "30",
            bottom: "20",
            left: "50",
            right: "40"
          },
          yAxis: {
            name: "人流量(人次)",
            nameTextStyle: {
              padding: [0, 32, 0, 0]
            },
            type: "value",
            splitLine: {
              show: false
            },
            axisLine: {
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
              name: "社区人员",
              type: "line",
              data: this.chart_data_alarm_ser,
              stack: "总量",
              areaStyle: {},
              animationEasing: "bounceOut"
            },
            {
              name: "抓拍人员",
              type: "line",
              data: this.chart_data_capture_ser,
              stack: "总量",
              areaStyle: {},
              animationEasing: "bounceOut"
            }
          ]
        });
      },
      getData() {
        if (this.click_state[0] === 0) {
          personFlowDay()
            .then(response => {
              this.chart_data_capture = response.data.data;
              this.xAxis = [];
              this.chart_data_capture_ser = [];
              for (let x in this.chart_data_capture) {
                this.xAxis.push(Number(x.substr(0, 2)));
                this.chart_data_capture_ser.push(this.chart_data_capture[x]);
              }
              this.setChart();
            })
            .catch(error => {
              console.log(error);
            }),
            personAlarmDay()
              .then(response => {
                this.chart_data_alarm = response.data.data;
                this.chart_data_alarm_ser = [];
                for (let x in this.chart_data_alarm) {
                  this.chart_data_alarm_ser.push(this.chart_data_alarm[x]);
                }
                this.setChart();
              })
              .catch(error => {
                console.log(error);
              });
        } else {
          personFlowWeek()
            .then(response => {
              this.chart_data_capture = response.data.data;
  
              this.xAxis = [];
              this.chart_data_capture_ser = [];
              for (let x in this.chart_data_capture) {
                this.xAxis.push(x.substr(5));
                this.chart_data_capture_ser.push(this.chart_data_capture[x]);
              }
              this.setChart();
            })
            .catch(error => {
              console.log(error);
            }),
            personAlarmWeek()
              .then(response => {
                this.chart_data_alarm = response.data.data;
                this.chart_data_alarm_ser = [];
                for (let x in this.chart_data_alarm) {
                  this.chart_data_alarm_ser.push(this.chart_data_alarm[x]);
                }
                this.setChart();
              })
              .catch(error => {
                console.log(error);
              });
        }
      }
    }
  };
  </script>
  <style scoped>
  #chart {
    width: 474px;
    height: 248px;
    margin-left: 10px;
  }
  .scope_switch {
    z-index: 10;
    position: absolute;
    left: 60px;
    top: 75px;
    color: #01aeff;
    font-size: 10px;
    margin-left: 20px;
  }
  #week_s,
  #day_s {
    cursor: pointer;
    display: inline-block;
    margin: 0px 4px;
  }
  .active {
    color: #49f1e7;
  }
  .personchart_wrap {
    width: 515px;
    height: 329px;
    background: url("/static/IMG/person_flow_bg.png");
    position: relative;
  }
  .chart_header {
    height: 55px;
    line-height: 55px;
    background: url("/static/IMG/littleTitle.png") no-repeat;
    background-position: center;
    font-family: AdobeHeitiStd-Regular;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
  }
  </style>
  