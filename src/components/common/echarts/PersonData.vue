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
          <li class="fr">人口总数</li>
        </ul>
        <ul class="box-data-stat2">
          <li>常住人口<span class="chart-data">{{other_num}}</span>人</li>
          <li>流动人口<span class="chart-data">{{alarm_num}}</span>人</li>
        </ul>
      </div>
    </div>
    <div class="box-body">
      <div id="personData" class="chart"></div>
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
    name: "PersonData",
    data() {
      return {
        title: "小区人口数据",
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
        clearTime: '',
        linear_color: {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [{
            offset: 0,
            color: '#ffc800'
          }, {
            offset: 1,
            color: '#5e4c00'
          }]
        },
        linear_color1: {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [{
            offset: 0,
            color: '#1a3b0f'
          }, {
            offset: 1,
            color: '#d2e038'
          }]
        },
        linear_color2: {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [{
            offset: 0,
            color: '#ffc800'
          }, {
            offset: 1,
            color: '#5e4c00'
          }]
        },
        linear_color3: {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [{
            offset: 0,
            color: '#8aeddd'
          }, {
            offset: 1,
            color: '#243d39'
          }]
        },
        linear_color6: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#ffffff'
          }, {
            offset: 1,
            color: '#2e80b6'
          }]
        },
        linear_color7: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#f5a623'
          }, {
            offset: 1,
            color: '#ffffff'
          }]
        },

      }
    },
    mounted() {
      this.createData();
      //clearInterval(clearTime);
      this.clearTime = setInterval(() => {
        this.createData();
    }, 10 * 1000);
  },

    methods: {
      toThousands(num) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
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
        var _this = this
        let myChart = echarts.init(document.getElementById("personData"));
        myChart.clear();
        var per = '/static/IMG/yuan.png'
        var peres = new Image();
        peres.src = per;
        var labelShow = {
          show: true,
          color: '#01aeff',
          fontSize: 12,
          lineHeight: 25,
          // formatter: [
          //     '{d| {d}% }',

          //     '{b| {b} }'
          // ].join('\n'),
          formatter: function (params) {
            var a = parseInt(params.percent)
            var res = `${a}%
${params.data.name}`
            var rts = `${params.percent.toFixed(1)}%
${params.data.name}`
            if (`${params.percent}`.substr(0, 1) == 0) {
              return res
            } else {
              return rts
            }
          },
        }
        var labelShow2 = {
          show: true,
          color: '#fff',
          fontSize: 10,
          fontWeight: 500,

          formatter: function (params) {
            return `${params.percent.toFixed(1)}%`
          },
          rich: {
            d: {
              fontSize: 12,
              color: '#fff',

            },

          }
        }
        myChart.setOption({
          color: [this.linear_color, this.linear_color1, this.linear_color2, this.linear_color3],
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              var num = _this.toThousands(params.data.value)
              var res =
                `<ul>
                      <li>${params.seriesName}</li>
                      <li>${params.data.name}: ${num}人 ${params.percent.toFixed(1)}%</li></ul>`
              return res
            },
          },
          graphic: {
            elements: [{
              type: 'image',
              style: {
                image: per,
                width: 100,
                height: 100,
                // margin:30
              },
              left: 'center',
              top: '62'

            }]
          },

          grid: {
            left: '20%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },

          title: {
            text: name,
            textStyle: {
              fontWeight: 'normal', //标题颜色
              color: '#46f4f4',
              fontSize: 16
            }
          },
          series: [

            {

              color: [this.linear_color7, this.linear_color6, ],
              name: '性别比例',
              type: 'pie',
              selectedMode: 'single',
              center: ['50%', '56%'],
              radius: ['50%', '55%'],
              label: {
                normal: {
                  position: 'center',
                }
              },
              label: labelShow2,
              labelLine: {
                show: true,
                length: -20,
                length2: -10,
                normal: {
                  show: true
                }
              },
              data: this.sexData,
              animationEasing: 'bounceOut'
            },
            {
              name: '年龄比例',
              type: 'pie',
              center: ['50%', '56%'],
              radius: ['60%', '65%'],
              label: {
                normal: {
                  position: 'outside',
                  textStyle: {
                    color: '#0a76db'
                  }
                }
              },
              label: labelShow,
              itemStyle: {

                emphasis: {
                  shadowBlur: 5,
                  shadowOffsetX: 0,
                },
                normal: {
                  areaStyle: {
                    color: '#0a76db',
                    type: 'default'
                  },
                  lineStyle: {
                    color: '#0a76db'
                  },
                }
              },

              labelLine: {
                normal: {
                  length: 20,

                  length2: 20,
                  show: true,
                  lineStyle: {
                    color: '#0a76db'
                  },
                }
              },
              data: this.ageDatas,
              animationEasing: 'bounceOut'
            }
          ]
        }, true);
      },
      createChartP(data) {
        if (data) {
          this.sexData = [{
              value: data.count_female,
              name: '女'
            },
            {
              value: data.cout_male,
              name: '男'
            },

          ];
          var obj = data.age_distribution
          this.ageDatas = []
          for (var a in obj) {
            this.ageDatas.push({
              value: obj[a],
              name: a
            })
          }
          // console.info(this.ageDatas)
        }
      },

      createData() {
        PersonDara()
          .then(response => {
            //console.log(response.data.data)
            var Dates = response.data.data
            this.createChartP(Dates)
            this.other_num = this.toThousands(Dates.count_permanent)
            this.alarm_num = this.toThousands(Dates.count_flow)
            this.total_num = Dates.count
            this.total_num = this.numberReset(4, this.total_num);
            this.setChart(Dates)
          })
          .catch(function (error) {
            console.log(error);
          })
      }

    },
    beforeDestroy() {
      clearInterval(this.clearTime)
    },

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
    /* font-family: FZCSJW; */
    font-size: 26px;
    /* font-weight: normal; */
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
    float: left;
    margin-top: 10px;
    margin-bottom: 15px;
  }

  .box-data-stat2 {
    overflow: hidden;
    margin-right: 30px;
    float: right;
    margin-bottom: 25px;
    margin-top: 15px;
  }

  .box-data-stat2 li {
    margin-bottom: 6px;
    float: left;
    margin-right: 10px;
  }

  .chart {
    width: 440px;
    height: 202px;
    position: absolute;
    top: 85px;
    left: 80px;
  }

</style>
