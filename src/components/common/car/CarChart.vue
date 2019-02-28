<template>
  <div class="personchart_wrap">
      <div class="chart_header">{{ title }}</div>
      <div class="scope_switch">
        <span id="car_day_s" @click="handleClick('car_day_s')" v-bind:class="{active:click_state[1]}">今日</span>|
        <span id="car_week_s" @click="handleClick('car_week_s')" v-bind:class="{active:click_state[0]}">最近七天</span>
      </div>
      <div id="car_chart"></div>
  </div>
  </template>
  <script>
  import echarts from "echarts";
  import { car_flows } from "@/mock/api";
  export default {
    name: "chart",
    data() {
      return {
        title: "车流量统计图",
        click_state: [0, 1],
        color: ["rgba(126,252,58,0.8)", "rgba(241,9,118,0.8)"],
        xName: "时",
        xAxis: [],
        chart_data_in: "",
        chart_data_in_ser: [],
        chart_data_out: "",
        chart_data_out_ser: [],
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
        if (key === "car_week_s") {
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
        let myChart = echarts.init(document.getElementById("car_chart"));
        myChart.clear();
        let _this = this;
        myChart.setOption(
          {
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
                  "辆</div>";
                res +=
                  '<div style ="text-align:left">' +
                  params[1].marker +
                  params[1].seriesName +
                  " " +
                  _this.toThousands(params[1].value) +
                  "辆</div>";
                return res;
              }
            },
            legend: {
              data: ["今日驶入", "今日驶出"],
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
              name: "车流量(辆)",
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
                name: "今日驶入",
                type: "line",
                data: this.chart_data_in_ser,
                stack: "总量",
                areaStyle: {},
                animationEasing: "bounceOut"
              },
              {
                name: "今日驶出",
                type: "line",
                data: this.chart_data_out_ser,
                stack: "总量",
                areaStyle: {},
                animationEasing: "bounceOut"
              }
            ]
          },
          true
        );
      },
      getData() {
        if (this.click_state[0] === 0) {
          car_flows({ isToday: 1, isOut: 1 })
            .then(response => {
              this.chart_data_out = response.data.data;
              this.xAxis = [];
              this.chart_data_out_ser = [];
              for (let x in this.chart_data_out) {
                this.xAxis.push(Number(x.substr(0, 2)));
                this.chart_data_out_ser.push(this.chart_data_out[x]);
              }
              this.setChart();
            })
            .catch(error => {
              console.log(error);
            });
          car_flows({ isToday: 1, isOut: 0 })
            .then(response => {
              this.chart_data_in = response.data.data;
              this.chart_data_in_ser = [];
              for (let x in this.chart_data_in) {
                this.chart_data_in_ser.push(this.chart_data_in[x]);
              }
              this.setChart();
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          car_flows({ isToday: 0, isOut: 1 })
            .then(response => {
              this.chart_data_out = response.data.data;
              this.xAxis = [];
              this.chart_data_out_ser = [];
              for (let x in this.chart_data_out) {
                this.xAxis.push(x.substr(5));
                this.chart_data_out_ser.push(this.chart_data_out[x]);
              }
              this.setChart();
            })
            .catch(error => {
              console.log(error);
            });
          car_flows({ isToday: 0, isOut: 0 })
            .then(response => {
              this.chart_data_in = response.data.data;
              this.chart_data_in_ser = [];
              for (let x in this.chart_data_in) {
                this.chart_data_in_ser.push(this.chart_data_in[x]);
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
  #car_chart {
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
  #car_week_s,
  #car_day_s {
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
  