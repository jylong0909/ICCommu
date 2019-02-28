<template>
  <div class="content_inner">
    <div class="inner_wrap">
    <div class="menu_details">
      <ul>
        <li>设置</li>
        <li>{{Urlstate}}</li>
        <li>{{infopeo}}</li>
      </ul>
    </div>
    <div class="inner_main notice">
      <ul class="handle_box">
        <li class="fl" @click="editItem()"><i class="el-icon-edit"></i> 编辑</li>
        <li class="fl" @click="submitItem()"><i class="el-icon-tickets"></i> 保存</li>
      </ul>
    <div class="inner_table">
      <table>
      <thead>
        <tr>
          <th>摄像头名称</th>
          <th>采集视频流</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in parent_data_list" :key="index">
          <td><input class="handle_input" type="text" v-model="item.camera_name" :disabled="isDisabled" :class="{ isActive: isActive }"></td>
          <td><input class="handle_input" type="text" v-model="item.display_url" :disabled="isDisabled" :class="{ isActive: isActive }"></td>
        </tr>
      </tbody>
      </table>
    </div>
    </div>
  </div>
  </div>
</template>
<script>
import { cameraConfigList, cameraConfigInfoUpdate, menulist } from "@/mock/api";
export default {
  name: "MonitorConfig",
  data() {
    return {
      submitParam: "",
      parent_data_list: [],
      the_id:0,
      num: 0,
      solution: 0,
      isDisabled: true,
      isActive: false,
      infopeo: "",
      Urlstate: "",
      menu_list: []
    };
  },
  mounted() {
    this.search();
    this.router();
    this.list_pei();
  },
  methods: {
    search() {
      cameraConfigList({ solution: 3 })
        .then(response => {
          console.info(response);
          if (response.data.detail == "success") {
            this.parent_data_list = response.data.data[0].camera_list;
            this.the_id = response.data.data[0].id;
            this.num = response.data.data[0].num;
            this.solution = response.data.data[0].solution;
          } else {
            this.$message({
              type: "error",
              message: "获取方案失败!"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    editItem() {
      this.isDisabled = false;
      this.isActive = true;
    },
    submitItem() {
      this.submitParam = {
        id: this.the_id,
        solution: this.solution,
        num: this.num,
        cameras: this.parent_data_list
      };
      cameraConfigInfoUpdate(this.submitParam)
        .then(response => {
          if (response.data.detail == "success") {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.isDisabled = true;
            this.isActive = false;
            this.search();
          } else {
            this.$message({
              type: "error",
              message: "修改失败!"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    list_pei() {
      menulist()
        .then(response => {
          this.menu_list = response.data.data;
          for (var i = 0; i < this.menu_list.length; i++) {
            if (this.infoUrl[2] == this.menu_list[i].url) {
              this.Urlstate = this.menu_list[i].name;
            }
            for (var j = 0; j < this.menu_list[i].children.length; j++) {
              if (this.infoUrl[3] == this.menu_list[i].children[j].url) {
                this.infopeo = this.menu_list[i].children[j].name;
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    router() {
      this.infoUrl = this.$route.path.split("/");
    }
  }
};
</script>

<style>
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
.area-set .el-form-item__content > .el-select,
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
  padding-top: 70px;
  width: 100%;
  height: 100%;
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
.isActive {
  border: 1px dashed;
}
</style>

