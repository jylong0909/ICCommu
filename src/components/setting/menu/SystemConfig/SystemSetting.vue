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

      <div class="inner_main">

        <!-- 弹框-->


        <!--搜索条件-->
        <div class="search_list">

        </div>
        <div class="form_group">
          <label class="table_title">系统信息设置：</label>
          <div style="border:1px solid #01aeff;width: 1200px;height: 1px;margin-left: 0px;margin-top: 20px;"></div>
        </div>
        <div class="inner_table inner_ul">
          <ul>
            <li>　　　站点名称:<input class="handle_input" type="text" v-model="System.site_name" :class="{border_colos:border_colos}"></li>
            <li>　　　　　版本:<input class="handle_input" type="text" v-model="System.version"  :class="{border_colos:border_colos}"></li>
         
            <li>　　　网站信息:<input class="handle_input" type="text" v-model="System.copyright":class="{border_colos:border_colos}"></li>

            <li>　　　技术支持:<input class="handle_input" type="text" v-model="technology"  :class="{border_colos:border_colos}"></li>
            <li style="margin-top:20px;"><el-button type="primary"   @click="submitItems()" size='small' style="cursor: pointer;margin-left:350px;width: 200px;"><i class="el-icon-tickets"></i> 保存</el-button></li>
          </ul>
        </div>
        <div class="inner_main notice">
          <div class="form_group">
            <label class="table_title" >首页摄像头设置：</label>
          <div style="border:1px solid #01aeff;width: 1200px;height: 1px;margin-left: 0px;margin-top: 20px;"></div>

          </div>
          <div class="inner_table inner_ul" >
              <ul v-for = 'item in parent_data_list'>
                  <li>默认摄像头名称:<input class="handle_input" type="text" v-model="item.camera_name" :class="{border_colo:border_colo}"></li>
                  <li>　　采集视频流:<input class="handle_input" type="text" v-model="item.display_url"  :class="{border_colo:border_colo}"></li>
                  <li  style="margin-top:20px;">　　　　<el-button type="primary"   @click="submitItem()" size='small' style=" cursor: pointer;margin-left:350px;width: 200px;"><i class="el-icon-tickets"></i> 保存</el-button></li>
                </ul>
               
              
          </div>
        </div>

      

      </div>
    </div>
  </div>
</template>

<script>
import PagingMenu from "../common/PagingMenu";
import {
  menulist,
  menu_list,
  creat_Sytem,
  cameraConfigList,
  cameraConfigInfoUpdate
} from "@/mock/api";
export default {
  name: "CarportInfo",
  components: {
    // HandleMenu,
    // SearchMenu,
    PagingMenu
  },
  data() {
    return {
      parent_data_list: [],
      num: 0,
      solution: 0,
      ruleForm: {
        cameras: []
      },
      rules: {
        cameraItem: [
          {
            required: true,
            message: "请输入摄像头名称",
            trigger: "change"
          }
        ]
      },
      infopeo: "",
      Urlstate: "",
      menu_list: [],
      subtit: "添加",
      type: "CarportInfo",
      search_params: "",
      dialogFormVisible: false,
      updata_id: "",
      infopeo: "",
      Urlstate: "",
      border_colos: false,
      border_colo: false,

      menu_list: [],
      System: {},
      technology: "",
      ruleForm: {
        name: "",
        version: "",
        site: "",
        technology: ""
      },
      del: "",
      the_id: 0
    };
  },
  mounted() {
    this.sytem_list();
    this.router();
    this.list_pei();
    this.search();
  },
  methods: {
    submitItems() {
      this.submitParam = {
        id: this.updata_id,
        site_name: this.System.site_name,
        version: this.System.version,
        copyright: this.System.copyright,
        support: this.technology
      };
      console.log(  this.submitParam )
      creat_Sytem(this.submitParam)
        .then(response => {
          if (response.data.detail == "success") {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
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
    resetForm(formName) {
      if (this.updata_id) {
        this.edit(this.updata_id);
      } else {
        this.$refs[formName].resetFields();
      }
    },
    search() {
      cameraConfigList({
        solution: 2
      })
        .then(response => {
          console.info(response);
          if (response.data.detail == "success") {
            this.parent_data_list = response.data.data[0].camera_list;
            this.cameras = this.num = response.data.data[0].num;
            this.solution = response.data.data[0].solution;
            this.the_id = response.data.data[0].id;
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

    sytem_list() {
      menu_list()
        .then(response => {
          //console.log(response.data);
          if (response.data.detail == "success") {
           // console.log(response.data);
            this.System = response.data.data;
            this.technology = this.System.support;
            this.updata_id = this.System.id;
          } else {
            this.$message({
              type: "error",
              message: "获取系统设置信息失败!"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    Carnum_data_list(data) {
      console.log(data);
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
    },

    editItem() {
      // menu_list().then((response)=>{
      //     if(response.data.detail == 'success'){
      //         console.log(response.data.data)
      //         this.updata_id = response.data.data.id
      //        this.ruleForm.name = response.data.data.site_name
      //        this.ruleForm.version =  response.data.data.version
      //        this.ruleForm.site =  response.data.data.copyright
      //        this.ruleForm.technology =  response.data.data.support
      //        console.log(this.ruleForm.name)
      //     }else{
      //         this.$message({
      //             type: "error",
      //             message: "获取系统设置信息失败!"
      //             });
      //     }
      // }).catch((err)=>{

      //     console.log(err)
      // })
      this.isDisableds = false;
      this.border_colos = true;
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
.inner_ul{
  margin-top: 50px;
}
.inner_ul ul{
    width: 1500px;
    height: 300px;
    margin-left:35px;
}
.inner_ul ul li{
  line-height: 80px;
  width: 1500px;
  text-align: left;
  font-family: SimHei;
  height: 50px;
  font-size: 16px;
  color: #01aeff;
}
.inner_ul ul li >input{
  width:700px;
  height: 30px;
  line-height: 30px;
  text-align:left;
  display:inline-block;
  border:1px solid #00ace4;
  text-indent: 12px;
  margin-left: 25px;
}

</style>
