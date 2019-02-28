<template>
  <div class="echartsBox">
    <div class="box-head">
      <div class="box-title">{{title}}</div>
   
    </div>
    <div class="box-body">
      <div id="SmokeTemperaData" class="chart"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { flowPersonToday, personFlowDay, personAlarmDay ,PersonDara} from "@/mock/api";
export default {
  name: "PersonFlowToday",
  data() {
    return {
      title: "室外消防栓",
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
      sexData:[],
      ageDatas:[],
      xname:'时',
      clearTime:''
    }
  },
mounted(){
  this.setChart()
  setTimeout(()=>{
      this.setChart();
    },0)
  this.clearTime = setInterval(() => {
      this.setChart();
    }, 30 * 1000);
},
  methods: {
    setChart() {
      let myChart = echarts.init(document.getElementById("SmokeTemperaData"));
          myChart.clear();
      var datas =[0.2,0.22,0.23,0.25,0.27,0.28,0.29,0.34,0.36,0.33,0.34,0.32,0.34,0.3,0.32,0.28,0.3,0.29,0.34,0.33,0.25,0.22,0.28,0.29]
      let hour = Number(new Date().getHours())
      let xArr = []
      for(let i = 0; i<hour; i++) {
        xArr.push(i+1)
      }
      datas = datas.slice(0, hour + 1)
      var datas_last = datas[datas.length-2]
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
           formatter: function (params){
        // 	console.log(params)
         	var res =params[0].axisValue
          res = res + ":00 - " + res + ":59<br>";           
          var mak = params[0].marker

          var e =params[0].data
               var res = `<ul>
                      <li> ${res}</li>
                      <li>${mak}水压 : ${e} Mpa</li>
                      </ul>`
             return res
          }
        },

        legend: {
        	
          data: ["实时水压"+ datas_last +"Mpa"],
          right: 10,
          top:10,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "#3dcccd"
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
          top: "30",
          bottom: "20",
          left: "32",
          right: "27"
        },
        yAxis: {
          name: "水压 (Mpa)",
          nameTextStyle: {
            padding: [0, 32, 0, 40]
          },
          interval: 0.2,
          max:1,
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
        name:["实时水压"+ datas_last +"Mpa"],
        type: 'line',
        smooth: false,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0.5,
                    color: 'rgba(82, 191, 255, 0.3)'
                }, {
                    offset: 1,
                    color: 'rgba(82, 191, 255, 0)'
                }], false),
                shadowColor: 'rgba(228, 139, 76, 0.1)',
                shadowBlur: 10
            }
        },
        symbolSize:4,  
        itemStyle: {
            normal: {
                color: 'rgb(82, 191, 255)',
                borderColor:'#e48b4c'
            },
        },
        data: datas,
    }
 ]
      },true);
    },
 },
 beforeDestroy () {
clearInterval(this.clearTime)
},
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
.box-body{
  margin-top: 10px;
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
.box-data-stat2 li{
  width: 100px;
  height: 22px;
  display: block;
}

.chart {
  width:417px;
  height: 252px;
  margin-left: 10px;
 }
</style>
