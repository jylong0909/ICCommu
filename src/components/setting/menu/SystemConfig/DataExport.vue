<template>
  <div class="content_inner">
    <div class="inner_wrap">
      <div class="inner_main">
        <NumberGrow :value="5"></NumberGrow>
        <div class="camera_tree">
          <el-tree
  :data="getCameraTree_list"
  ref="tree"
  show-checkbox
  node-key="src_id"
  @check-change="handleCheckChange"
  :props="defaultProps">
</el-tree>
        </div>
        
<el-button @click="getCheckedKeys">通过 key 获取</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import NumberGrow from "./NumberGrow";
import { getCameraTree } from "@/mock/api";
export default {
  name: "DataExport",
  components: {
    NumberGrow
  },
  data() {
    return {
      getCameraTree_list: [
        {
          id: 1,
          group_name: "全部",
          cameras: []
        }
      ],
      defaultProps: {
        children: "cameras",
        label: function(data){
          return (data.group_name||data.camera_name)
        }
      },
      srcIds: []
    };
  },
  mounted() {
    getCameraTree()
      .then(response => {
        console.log(response);
        this.getCameraTree_list[0].cameras = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
        var arr = this.$refs.tree.getCheckedKeys()
        var arr2 = []
        for(var k in arr){
          if(arr[k]!=undefined){
            arr2.push(arr[k])
          }
        }       
      },
    handleCheckChange(data, checked, indeterminate) {
      if(checked == true){

      }
      console.log(data, checked, indeterminate);
    }
  }
};
</script>

<style>
.border_colos {
  border: 1px dashed #49f1e7 !important;
}

.border_colo {
  border: 1px dashed #49f1e7 !important;
}

.content_inner {
  width: 100%;
  height: 100%;
  padding: 40px;
  padding-top: 20px;
  position: relative;
}

.delete .el-button {
  padding: 0;
  color: #ff0101;
  font-size: 14px;
}

.delete .el-button {
  padding: 0;
  color: #ff0101;
  font-size: 14px;
}

.handle_box .el-button {
  padding: 0;
  font-family: SimHei;
  font-size: 14px;
  letter-spacing: 0px;
  color: #feffff;
}

.el-form-item__content > .el-select,
.el-form-item__content > .el-input {
  float: left;
  width: 85%;
}

.area-set {
  width: 70%;
  margin: 0 auto;
}

.area-set .el-form-item .el-form-item__content {
  margin-left: 0 !important;
}

.area-set .el-form-item__content > .el-input {
  width: 70%;
  margin-right: 10%;
}
</style>

<style scoped>
.form_group .table_title {
  font-size: 17px;
  position: relative;
  bottom: 15px;
}

.inner_wrap {
  width: 100%;
  height: 100%;
  position: relative;
  float: left;
  padding-top: 70px;
}

.inner_table {
  width: 1500px;
}

.inner_table {
  width: 1500px;
}

.inner_table table {
  width: 1500px;
  color: #49f1e7;
  text-align: center;
}

.inner_table td,
.inner_table th {
  font-family: SimHei;
  height: 50px;
  font-size: 16px;
}

.inner_table td:last-child,
.inner_table th:last-child {
  width: 250px;
}

.inner_table thead {
  background: rgba(7, 16, 32, 0.4);
  font-weight: bold;
  color: #01aeff;
}

.inner_table tbody tr:nth-child(odd) {
  background: rgba(1, 174, 255, 0.17);
}

.inner_table tbody tr:nth-child(even) {
  background: rgba(1, 174, 255, 0.08);
}

.operate {
  width: 162px;
  display: inline-block;
}

.operate li {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  cursor: pointer;
  font-family: SimHei;
  font-size: 14px;
}

.operate li.edit {
  background: url("/static/IMG/Icon/edit.png") no-repeat;
  background-size: 20px 20px;
  color: #01aeff;
  padding-left: 25px;
  margin-right: 35px;
  margin: 0 auto;
}

.operate li.delete {
  background: url("/static/IMG/Icon/delete.png") no-repeat;
  background-size: 15px 20px;
  color: #ff0101;
  padding-left: 20px;
}

/* searchMenu */
.search_list {
  position: absolute;
  top: 0;
  left: 0;
}

.form_group {
  float: left;
  height: 30px;
  line-height: 30px;
  font-family: SimHei;
  font-size: 14px;
  color: #01aeff;
  margin-right: 30px;
}

.form_group label {
  float: left;
}

.form_control {
  float: left;
  font-family: MicrosoftYaHei;
  font-weight: normal;
  font-stretch: normal;
  width: 124px;
  height: 30px;
  line-height: 30px;
  letter-spacing: 0px;
  color: #01aeff;
  padding-left: 12px;
  border-radius: 1px;
  border: solid 1px rgba(1, 174, 255, 0.4);
  background: rgba(1, 174, 255, 0.17);
}

.form_group select {
  font-family: MicrosoftYaHei;
  padding-right: 25px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: rgba(1, 174, 255, 0.17) url("/static/IMG/Icon/select_bg.png")
    no-repeat 98% center;
  background-size: 23px 23px;
  cursor: pointer;
}

.form_group select option {
  font-family: MicrosoftYaHei;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: #054164;
}

/* handleMenu */
.active {
  color: #49f1e7;
}

.handle_box {
  position: absolute;
  top: 0;
  right: 0;
}

.handle_box > li {
  width: 75px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  border: solid 1px rgba(217, 159, 0, 0.4);
  font-family: SimHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  background: rgba(217, 159, 0, 0.17);
  margin-right: 20px;
  cursor: pointer;
}

.handle_box > li:last-child {
  margin-right: 0;
}

.setIcon {
  float: left;
  margin: 5px -4px 4px 7px;
  width: 18px;
  height: 18px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.setIcon-add {
  background-image: url("/static/IMG/Icon/add.png");
}

.setIcon-delete {
  background-image: url("/static/IMG/Icon/delete_white.png");
  width: 13px;
}

.setIcon-search {
  background-image: url("/static/IMG/Icon/search.png");
}

.setIcon-reset {
  background-image: url("/static/IMG/Icon/reset.png");
}

.menu_details {
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  line-height: 30px;
  font-family: SimHei;
  font-size: 16px;
  color: #01aeff;
  background: url("/static/IMG/menu_details.png") no-repeat;
  background-size: 100% 100%;
  padding-left: 10px;
  padding-right: 14px;
}

.menu_details ul li {
  float: left;
}

.menu_details ul li:not(:last-child) {
  padding-right: 15px;
  background: url(/static/IMG/Icon/menuArrow.png) no-repeat 95% center;
}

.inner_main {
  position: relative;
  padding-top: 10px;
  width: 100%;
}

.areaConfig {
  float: left;
  width: 18px;
  height: 18px;
  margin-top: 6px;
  margin-left: 7px;
  cursor: pointer;
  background: url(/static/IMG/Icon/config.png) no-repeat;
  background-size: 100% 100%;
}

.delete .el-button {
  padding: 0;
  color: #ff0101;
  font-size: 14px;
}

.handle_box .el-button {
  padding: 0;
  font-family: SimHei;
  font-size: 14px;
  letter-spacing: 0px;
  color: #feffff;
}

.el-form-item__content > .el-select,
.el-form-item__content > .el-input {
  float: left;
  width: 85%;
}

.noticeStyle .el-form-item:nth-child(4) > div {
  margin-left: 0 !important;
}

.area-set {
  width: 70%;
  margin: 0 auto;
}

.area-set .el-form-item .el-form-item__content {
  margin-left: 0 !important;
}

.area-set .el-form-item__content > .el-input {
  width: 70%;
  margin-right: 10%;
}

.el-date-editor .el-range-input::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #01aeff;
}

.el-date-editor .el-range-input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #01aeff;
}

.el-date-editor .el-range-input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #01aeff;
}

.el-date-editor .el-range-input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #01aeff;
}

.el-range-separator {
  color: #01aeff !important;
  line-height: 22px !important;
}

.el-date-editor .el-range__icon {
  color: #01aeff !important;
  line-height: 23px !important;
}

.el-date-editor .el-range-input {
  color: #01aeff !important;
  background: none;
  margin-left: 15px;
}

.el-range-editor {
  border: solid 1px rgba(1, 174, 255, 0.4) !important;
  background: rgba(1, 174, 255, 0.17) !important;
  height: 30px !important;
  line-height: 30px !important;
}

.notice .el-form-item:last-child .el-form-item__content {
  margin-left: 0 !important;
}
</style>

<style scoped>
.content_inner {
  width: 100%;
  height: 100%;
  padding: 40px;
  padding-top: 20px;
  position: relative;
}

.inner_wrap {
  width: 100%;
  height: 100%;
  position: relative;
  float: left;
  padding-top: 70px;
}

.inner_table {
  width: 1500px;
}

.inner_table table {
  width: 1500px;
  color: #49f1e7;
  text-align: center;
}

.inner_table td,
.inner_table th {
  font-family: SimHei;
  height: 50px;
  font-size: 16px;
}

.inner_table td {
  font-size: 14px;
}

.inner_table thead {
  background: rgba(7, 16, 32, 0.4);
  font-weight: bold;
  color: #01aeff;
}

.inner_table tbody tr:nth-child(odd) {
  background: rgba(1, 174, 255, 0.17);
}

.inner_table tbody tr:nth-child(even) {
  background: rgba(1, 174, 255, 0.08);
}

.operate {
  width: 162px;
  display: inline-block;
}

.operate li {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  cursor: pointer;
  font-family: SimHei;
  font-size: 14px;
}

.operate li.edit {
  background: url("/static/IMG/Icon/edit.png") no-repeat;
  background-size: 20px 20px;
  color: #01aeff;
  padding-left: 25px;
  margin-right: 35px;
}

.operate li.delete {
  background: url("/static/IMG/Icon/delete.png") no-repeat;
  background-size: 15px 20px;
  color: #ff0101;
  padding-left: 20px;
}

/* searchMenu */
.search_list {
  position: absolute;
  top: 0;
  left: 0;
}

.form_group {
  float: left;
  height: 30px;
  line-height: 30px;
  font-family: SimHei;
  font-size: 14px;
  color: #01aeff;
  margin-right: 30px;
}

.form_group label {
  float: left;
}

.form_control {
  float: left;
  font-family: MicrosoftYaHei;
  font-weight: normal;
  font-stretch: normal;
  width: 124px;
  height: 30px;
  line-height: 30px;
  letter-spacing: 0px;
  color: #01aeff;
  padding-left: 12px;
  border-radius: 1px;
  border: solid 1px rgba(1, 174, 255, 0.4);
  background: rgba(1, 174, 255, 0.17);
}

.form_group select {
  font-family: MicrosoftYaHei;
  padding-right: 25px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: rgba(1, 174, 255, 0.17) url("/static/IMG/Icon/select_bg.png")
    no-repeat 98% center;
  background-size: 23px 23px;
  cursor: pointer;
}

.form_group select option {
  font-family: MicrosoftYaHei;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: #054164;
}

/* handleMenu */
.active {
  color: #49f1e7;
}

.handle_box {
  position: absolute;
  top: 0;
  right: 0;
}

.handle_box2 {
  position: absolute;
  width: 300px;
  top: 0;
  left: 500px;
}

.handle_box > li {
  width: 75px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  border: solid 1px rgba(217, 159, 0, 0.4);
  font-family: SimHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  background: rgba(217, 159, 0, 0.17);
  margin-right: 20px;
  cursor: pointer;
}

.handle_box > li:last-child {
  margin-right: 0;
}

.setIcon {
  float: left;
  margin: 5px -4px 4px 7px;
  width: 18px;
  height: 18px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.setIcon-add {
  background-image: url("/static/IMG/Icon/add.png");
}

.setIcon-delete {
  background-image: url("/static/IMG/Icon/delete_white.png");
  width: 13px;
}

.setIcon-search {
  background-image: url("/static/IMG/Icon/search.png");
}

.setIcon-reset {
  background-image: url("/static/IMG/Icon/reset.png");
}

.menu_details {
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  line-height: 30px;
  font-family: SimHei;
  font-size: 16px;
  color: #01aeff;
  background: url("/static/IMG/menu_details.png") no-repeat;
  background-size: 100% 100%;
  padding-left: 10px;
  padding-right: 14px;
}

.menu_details ul li {
  float: left;
}
.menu_details ul li:not(:last-child) {
  padding-right: 15px;
  background: url(/static/IMG/Icon/menuArrow.png) no-repeat 95% center;
}

.inner_main {
  position: relative;
  padding-top: 50px;
}

.handle_input {
  display: block;
  width: 100%;
  height: 100%;
  background: inherit;
  border: 0;
  color: #49f1e7;
  text-align: center;
}
.inner_ul {
  margin-top: 50px;
}
.inner_ul ul {
  width: 1500px;
  height: 300px;
  margin-left: 35px;
}
.inner_ul ul li {
  line-height: 80px;
  width: 1500px;
  text-align: left;
  font-family: SimHei;
  height: 50px;
  font-size: 16px;
  color: #01aeff;
}
.inner_ul ul li > input {
  width: 700px;
  height: 30px;
  line-height: 30px;
  text-align: left;
  display: inline-block;
  border: 1px solid #00ace4;
  text-indent: 12px;
  margin-left: 25px;
}
</style>
