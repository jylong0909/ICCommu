<template>
  <div class="setting-index">
    <div class="content_inner">
      <div class="inner_wrap">
        <div class="inner_head">
          <ul class="synopsis animated bounceInLeft">
            <li class="fl">
              <div class="synopsis-item">智慧管理模式  打造小区平安</div>
              <div class="synopsis-item line">人员动态管理  洞察人口势态</div>
            </li>
            <li class="fr">
              <div class="synopsis-item">人脸门禁系统  安全快捷有效</div>
              <div class="synopsis-item line">信息全面采集  刻画清晰轨迹</div>
            </li>
          </ul>
        </div>
        <div class="inner_body">
          <ul class="quick-entry-list">
            <li>
              <div class="quick-entry-list-icon">
                <div class="list-title">人员出入<br>管理</div>
              </div>
              <div class="list-subtitle list-subtitle1">身份识别</div>
              <div class="list-subtitle list-subtitle2">黑名单管理</div>
              <div class="list-subtitle list-subtitle3">人员信息采集</div>
              <div class="list-icon list-icon-identify"></div>
              <div class="list-icon list-icon-blmanage"></div>
              <div class="list-icon list-icon-pic"></div>
            </li>
            <li>
              <div class="quick-entry-list-icon">
                <div class="list-subtitle list-title">车辆出入<br>管理</div>
              </div>
              <div class="list-subtitle list-subtitle1">车牌辨别</div>
              <div class="list-subtitle list-subtitle2">车辆进出管理</div>
              <div class="list-subtitle list-subtitle3">车辆据点</div>
              <div class="list-icon list-icon-platedisting"></div>
              <div class="list-icon list-icon-carInOutManage"></div>
              <div class="list-icon list-icon-vehicleStronghold"></div>
            </li>
            <li>
              <div class="quick-entry-list-icon">
                <div class="list-subtitle list-title few">数据采集</div>
              </div>
              <div class="list-subtitle list-subtitle1">人员进出数据</div>
              <div class="list-subtitle list-subtitle2">车辆进出数据</div>
              <div class="list-subtitle list-subtitle3">设备设施管理</div>
              <div class="list-icon list-icon-personInOutData"></div>
              <div class="list-icon list-icon-carInOutData"></div>
              <div class="list-icon list-icon-equipmentManage"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SettingIndex",
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.setting-index {
  width: 100%;
  height: 100%;
  background: url("/static/IMG/config_bg.png") no-repeat;
  background-size: 100% 100%;
}
.content_inner {
  width: 100%;
  height: 100%;
  padding: 185px 55px 203px 55px;
  position: relative;
}
.inner_wrap {
  width: 100%;
  height: 100%;
  position: relative;
}
.inner_head {
  width: 100%;
  position: absolute;
  top: 0;
}
.inner_body {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.synopsis {
  width: 865px;
  height: 115px;
  margin: 0 auto;
}
.synopsis > li {
  width: 410px;
  height: 100%;
}
.synopsis > li:first-child {
  margin-right: 45px;
}
.synopsis-item {
  /* font-family: SourceHanSansCN-Medium; */
  font-size: 30px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 3px;
  color: #ffffff;
  height: 50%;
  line-height: 1;
}
.synopsis-item.line {
  line-height: 2.5;
}
.quick-entry-list {
  width: 100%;
  height: 212px;
}
.quick-entry-list > li {
  width: 33.3%;
  height: 100%;
  float: left;
  position: relative;
}
.quick-entry-list .quick-entry-list-icon {
  width: 357px;
  height: 212px;
  background: url("/static/IMG/config_box.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.list-title {
  /* font-family: HYk2gj; */
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #ffffff;
  position: absolute;
  top: 78px;
  left: 83px;
}
.list-title.few {
  top: 90px;
}
.list-subtitle {
  font-family: SourceHanSansCN-Regular;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #ffffff;
  font-family: SimHei;
}
.list-subtitle.list-subtitle1 {
  position: absolute;
  top: 12px;
  left: 320px;
}
.list-subtitle.list-subtitle2 {
  position: absolute;
  top: 96px;
  left: 326px;
}
.list-subtitle.list-subtitle3 {
  position: absolute;
  top: 179px;
  left: 313px;
}
.list-icon {
  position: absolute;
  width: 25px;
  height: 21px;
}
.list-icon-identify {
  top: 17.5px;
  left: 283px;
  background: url("/static/IMG/Icon/identification.png") no-repeat;
}
.list-icon-blmanage {
  top: 182px;
  left: 277px;
  background: url("/static/IMG/Icon/blacklistManage.png") no-repeat;
}
.list-icon-pic {
  top: 100px;
  left: 288px;
  background: url("/static/IMG/Icon/personInfoCollect.png") no-repeat;
}
.list-icon-platedisting {
  top: 16px;
  left: 283px;
  background: url("/static/IMG/Icon/platedisting.png") no-repeat;
}
.list-icon-carInOutManage {
  top: 102px;
  left: 288px;
  background: url("/static/IMG/Icon/carInOutManage.png") no-repeat;
}
.list-icon-vehicleStronghold {
  top: 182px;
  left: 277px;
  background: url("/static/IMG/Icon/vehicleBase.png") no-repeat;
}
.list-icon-personInOutData {
  top: 16px;
  left: 285px;
  background: url("/static/IMG/Icon/personInOutData.png") no-repeat;
}
.list-icon-carInOutData {
  top: 101px;
  left: 290px;
  background: url("/static/IMG/Icon/carInOutData.png") no-repeat;
}
.list-icon-equipmentManage {
  top: 182px;
  left: 275px;
  background: url("/static/IMG/Icon/equipmentManage.png") no-repeat;
}
</style>

