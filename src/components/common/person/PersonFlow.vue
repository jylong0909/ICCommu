<template>
  <div class="flowBox">
    <div class="flowBox-head">{{title}}</div>
    <div class="flowBox-body">
      <div  class="subtitle">
        <span class="subtitle-item1">今日进出(次)</span>
        <span class="subtitle-item3">今日活跃(人)</span>
      </div>
      <div class="statistics-top">
        <ul class="fl">
          <li class="fl" v-for="(item, index) in alarmNum" v-bind:key="index">{{item}}</li>
        </ul>
        <ul class="fr">
          <li class="fl" v-for="(item, index) in personNum" v-bind:key="index">{{item}}</li>
        </ul>
      </div>
      <ul class="statistics-bottom">
        <li class="fl">
          <div class="subtitle2">今日进入(次)</div>
          <div class="subtitle2-number">{{inNum}}</div>
          <!-- <div class="subtitle2-info">比前一小时<i class="arrowUp"></i><span class="percent-style">20%</span></div> -->
        </li>
        <li class="fl">
          <div class="subtitle2">今日离开(次)</div>
          <div class="subtitle2-number">{{outNum}}</div>
          <!-- <div class="subtitle2-info">比前一小时<i class="arrowdown"></i><span class="percent-style">30%</span></div> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonFlow',
  props: ["alarmNum","personNum","inNum","outNum"],
  data () {
    return {
      title: '实时人流量',
    }
  },
  mounted () {
  },
  methods : { 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* .flowBox {
    width: 373px;
    height: 255px;
    background: url('/static/IMG/flowBoxBj.png') no-repeat;
    overflow: hidden;
    padding: 20px;
    padding-top: 0;
    margin-bottom: 20px;
  }
  .flowBox-head {
    font-family: SourceHanSansCN-Regular;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    margin-top: 4px;
  }
  .subtitle {
    font-family: SimHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    text-align: left;
    margin: 31px 0px 10px 17px;
  }
  .statistics-top {
    height: 50px;
    background-color:rgba(7, 16, 31, .4);
    text-align: center;
    margin-bottom: 10px;
  }
  .statistics-top ul {
    display: inline-block;
  }
  .statistics-top ul li {
    width: 33px;
    height: 33px;
    line-height: 1;
    text-align: center;
    background-color: #07101f;
    border-radius: 4px;
    border: solid 1px #49f1e7;
    font-family: MyriadPro-Bold;
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    color: #FFFD34;
    margin-right: 5px;
    margin-top: 9px;
  }
  .statistics-bottom li {
    width: 162px;
    height: 90px;
    border: solid 1px rgba(73, 241, 231, 0.2);
    background: #072442;
    padding: 10px;
  }
  .statistics-bottom li:first-child {
    margin-right: 9px;
  }
  .subtitle2 {
    font-family: SimHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    text-align: left;
  }
  .subtitle2-number {
    font-family: Arial-BoldMT;
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #01aeff;
  }
  .subtitle2-info {
    font-family: SourceHanSansCN-Regular;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    transform: scale(0.714);
  }
  .percent-style {
    color: #e49f3a;
  }
  .arrowUp {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url('/static/IMG/arrowUp.png') no-repeat;
    background-size: 100% 100%;
    margin: 0 5px;
  }
  .arrowdown {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url('/static/IMG/arrowDown.png') no-repeat;
    background-size: 100% 100%;
    margin: 0 5px;
  } */
</style>
