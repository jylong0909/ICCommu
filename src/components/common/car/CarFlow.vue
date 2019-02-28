<template>
    <div class="flowBox">
      <div class="flowBox-head">{{title}}</div>
      <div class="flowBox-body">
        <div class="subtitle">
          <span class="subtitle-item1">今日驶入</span>
          <span class="subtitle-item2">今日驶出</span>
        </div>
        <div class="statistics-top">
          <ul class="fl">
            <li class="fl" v-for="(item, index) in car_in" v-bind:key="index">{{item}}</li>
          </ul>
          <ul class="fr">
            <li class="fl" v-for="(item, index) in car_out" v-bind:key="index">{{item}}</li>
          </ul>
          <!-- {{carIn}} -->
        </div>
        <ul class="statistics-bottom">
          <li class="fl">
            <div class="subtitle2">社区总车位(个)</div>
            <div class="subtitle2-number">{{total_cap}}</div>
            <!-- <div class="subtitle2-info">社区总车位<span class="number-style">1000</span></div> -->
          </li>
          <li class="fl">
            <div class="subtitle2">已使用车位(个)</div>
            <div class="subtitle2-number">{{is_parking}}</div>
            <!-- <div class="subtitle2-info">比前一小时<i class="arrowdown"></i></div> -->
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
      export default {
        name: "CarFlow",
        props: ["car_in","car_out","total_cap","is_parking"],
        data() {
          return {
            title: "实时车流量",
          };
        }
      };
      </script>
      
      <style scoped>
      </style>