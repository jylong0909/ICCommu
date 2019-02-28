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
    <div class="inner_main building">
      <ul class="handle_box handle_box2">
        <li class="fl" @click="search"><span class="setIcon setIcon-search"></span><span class="icon-content">搜索</span></li>
        <li class="fl" @click="reset"><span class="setIcon setIcon-reset"></span><span class="icon-content">重置</span></li>
      </ul>
      <ul class="handle_box">
        <li class="fl" @click="addItem()"><span class="setIcon setIcon-add"></span><span class="icon-content"><el-button type="text">添加</el-button></span></li>
        <li class="fl" @click="deleteList()"><span class="setIcon setIcon-delete"></span><span class="icon-content"><el-button type="text">删除</el-button></span></li>
      </ul>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="50%" class="buildingStyle">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="small">
        <el-form-item label="房屋编号" prop="name" class="fl">
          <div style="color:#01aeff;">{{ruleForm.name}}</div>
          <!-- <el-input v-model="ruleForm.name" :disabled="true"></el-input> -->
        </el-form-item>
        <el-form-item label="使用类型" prop="usetype" class="fl">
          <el-select v-model="ruleForm.usetype" placeholder="请选择使用类型">
            <el-option v-for="(item, index) in typeList" :key="index" :label="item.use_type" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        
          <ul class="detail_position">
            <li class="fl">{{house_infos.area}}></li>
            <li class="fl">{{house_infos.building}}></li>
            <li class="fl">{{house_infos.unit}}</li>
          </ul>
        
        <el-form-item label="成员信息" style="clear:both">
          <div class="dialog_table">
            <table>
              <thead>
                <tr>
                  <th>照片</th>
                  <th>姓名</th>
                  <th>性别</th>
                  <th>证件号码</th>
                  <th>联系方式</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in ruleForm.personList" :key="item.id">
                    <!-- http://'+imgSrc+' -->
                  <td><img class="person_img" :src="'./'+item.image"></td>
                  <td>{{item.name}}</td>
                  <td>{{item.gender==1?'女':'男'}}</td>
                  <td>{{item.card_no}}</td>
                  <td>{{item.phone}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="search_list">
      <div class="form_group">
        <select class="form_control" v-model="area_id" @change="areaSelect($event)">
          <option value="">全部区域</option>
          <option v-for="(item, index) in areaList" :key="index" :value="item.id">{{item.name}}</option>
        </select>
        <select class="form_control" v-model="building_id" @change="buildingSelect($event)" style="margin: 0 10px;">
          <option value="">全部楼号</option>
          <option v-for="(item, index) in building_list" :key="index" :value="item.id">{{item.name}}</option>
        </select>
        <select class="form_control" v-model="unit_id" @change="unitSelect($event)">
          <option value="">全部单元</option>
          <option v-for="(item, index) in unit_list" :key="index" :value="item.id">{{item.name}}</option>
        </select>
      </div>
      <div class="form_group">
        <input type="text" class="form_control" v-model="gate_no" placeholder="房屋编号">
      </div>
      <div class="form_group">
        <select class="form_control" v-model="type_id" @change="typeSelect($event)">
          <option value="">使用类型</option>
          <option v-for="(item, index) in typeList" :key="index" :value="item.id">{{item.use_type}}</option>
        </select>
      </div>
    </div>
    <div class="inner_table">
      <table>
      <thead>
        <tr>
          <th><input type="checkbox" @change="checkedAll()" :checked="checkList.length === parent_data_list.length"></th>
          <th>区域</th>
          <th>楼号</th>
          <th>单元</th>
          <th>房屋编号</th>
          <th>使用类型</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in parent_data_list" :key="item.id">
          <td><input type="checkbox" :checked="checkList.indexOf(item.id)>=0" @change="checkedOne(item.id)"></td>
          <td>{{item.area_info.name}}</td>
          <td>{{item.building_info.name}}</td>
          <td>{{item.unit_info.name}}</td>
          <td>{{item.gate_no}}</td>
          <td>{{final_type_list[index]}}</td>
          <td>
            <ul class="operate">
              <li ref="edit" class="edit" @click="dialogFormVisible = true,editItem(item.id,index)">编辑</li>
              <li class="delete" @click="deleteItem(item.id)"><el-button type="text">删除</el-button></li>
            </ul>
          </td>
        </tr>
      </tbody>
      </table>
    </div>
    <PagingMenu :owner="type" @dataList="parentDataList" :searchParam="search_params"></PagingMenu>
    </div>
  </div>
  </div>
</template>
<script>
import PagingMenu from "../common/PagingMenu";
import router from "@/router/index";
import {
  buildinglistById,
  houseInfoUpdate,
  houseInfoDestroy,
  houseUseTypeList,
  houseAreaInfoList,
  buildingNumberList,
  unitList,
  menulist,
  dis_play
} from "@/mock/api";
export default {
  name: "BuildingInfo",
  components: {
    PagingMenu
  },
  data() {
    return {
      type: "BuildingInfo",
      parent_data_list: [],
      areaList: [],
      building_list: [],
      unit_list: [],
      typeList: [],
      final_type_list: [],
      area_id: "",
      building_id: "",
      unit_id: "",
      type_id: "",
      gate_no: "",
      search_params: "",
      isCheckedAll: false,
      checkList: [],
      update_id: "",
      dialogFormVisible: false,
      dialogTitle: "编辑住房详细信息",
      ruleForm: {
        name: "",
        usetype: "",
        personList: []
      },
      house_infos: {
        area: "",
        building: "",
        unit: ""
      },
      rules: {
        name: [{ required: true, message: "请输入房屋编号", trigger: "blur" }],
        usetype: [
          { required: true, message: "请选择使用类型", trigger: "change" }
        ]
      },
      infopeo: "",
      Urlstate: "",
      menu_list: [],
      imgSrc: dis_play
    };
  },
  mounted() {
    this.search();
    this.router();
    this.list_pei();
  },
  methods: {
    parentDataList(data) {
      this.isCheckedAll = false;
      this.checkList = [];
      this.parent_data_list = data;
      this.final_type_list = [];
      for (let i = 0; i < this.parent_data_list.length; i++) {
        for (let m = 0; m < this.typeList.length; m++) {
          if (
            this.parent_data_list[i].house_use_type_id == this.typeList[m].id
          ) {
            this.final_type_list.push(this.typeList[m].use_type);
          }
        }
      }
    },
    areaSelect(event) {
      this.area_id = event.target.value;
      buildingNumberList({ area_info_id: this.area_id, pagesize: 100 })
        .then(response => {
          this.building_list = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    buildingSelect(event) {
      this.building_id = event.target.value;
      if (this.building_id) {
        unitList({ building_info_id: this.building_id, pagesize: 100 })
          .then(response => {
            this.unit_list = response.data.data;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.unit_list = [];
      }
    },
    unitSelect(event) {
      this.unit_id = event.target.value;
    },
    typeSelect(event) {
      this.type_id = event.target.value;
    },
    search() {
      this.search_params = {
        area_info_id: this.area_id,
        building_info_id: this.building_id,
        unit_info_id: this.unit_id,
        house_use_type_id: this.type_id,
        gate_no: this.gate_no,
        pageno: "1"
      };
    },
    reset() {
      buildingNumberList({ pagesize: 100 })
        .then(response => {
          this.building_list = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
      this.area_id = "";
      this.building_id = "";
      this.unit_id = "";
      this.type_id = "";
      this.gate_no = "";
      this.isCheckedAll = false;
      this.checkList = [];
      this.unit_list = [];
      this.search();
    },
    checkedAll() {
      this.isCheckedAll = !this.isCheckedAll;
      if (this.isCheckedAll) {
        this.checkList = [];
        this.parent_data_list.forEach(item => {
          this.checkList.push(item.id);
        });
      } else {
        this.checkList = [];
      }
    },
    checkedOne(item_id) {
      let idIndex = this.checkList.indexOf(item_id);
      if (idIndex >= 0) {
        this.checkList.splice(idIndex, 1);
      } else {
        this.checkList.push(item_id);
      }
    },
    addItem() {
      router.push({ name: "Regional" });
    },
    editItem(item_id,refIndex) {
      if(refIndex!='reset'){
        // this.$refs['edit'][refIndex].style.color = 'grey'
        this.$refs['edit'][refIndex].className = 'edit editActive'
      }
      this.update_id = item_id;
      buildinglistById({ id: item_id })
        .then(response => {
          if (response.data.detail == "success") {
            this.ruleForm.name = response.data.data.gate_no;
            this.ruleForm.usetype = response.data.data.house_use_type_id;
            this.ruleForm.personList = response.data.data.person_list;
            this.house_infos = response.data.data.house_infos;
          } else {
            this.$message({
              type: "error",
              message: "获取住房详细信息失败!"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteItem(item_id) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          houseInfoDestroy({ id: item_id })
            .then(response => {
              if (response.data.detail == "success") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.search();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!"
                });
              }
            })
            .catch(error => {
              // console.log(error);
              this.$message({
                type: "error",
                message: error.response.data.detail
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteList() {
      if (this.checkList.length == 0) {
        this.$message({
          message: "未选择数据",
          type: "warning"
        });
      } else {
        this.$confirm("确认批量删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            houseInfoDestroy({ id: this.checkList.join() })
              .then(response => {
                if (response.data.detail == "success") {
                  this.isCheckedAll = false;
                  this.checkList = [];
                  this.search();
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                }
              })
              .catch(error => {
                this.$message({
                  type: "error",
                  message: error.response.data.detail
                });
                // console.log(error);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          houseInfoUpdate({
            id: this.update_id,
            gate_no: this.ruleForm.name,
            house_use_type_id: this.ruleForm.usetype
          })
            .then(response => {
              if (response.data.detail == "success") {
                this.$message({
                  type: "success",
                  message: "修改成功!"
                });
                this.dialogFormVisible = false;
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.editItem(this.update_id,'reset');
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
  },
  created() {
    houseAreaInfoList()
      .then(response => {
        this.areaList = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
    buildingNumberList({ pagesize: 100 })
      .then(response => {
        this.building_list = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
    // unitList({ pagesize: 100 })
    //   .then(response => {
    //     this.unit_list = response.data.data;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    houseUseTypeList()
      .then(response => {
        this.typeList = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
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
.el-form-item__content > .el-select,
.el-form-item__content > .el-input {
  float: left;
  width: 85%;
}
/* .buildingStyle .el-form-item:nth-child(4) > div {
  margin-left: 0 !important;
} */
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
.areaStyle .el-dialog {
  height: 650px;
  overflow: auto;
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
.inner_table td:first-child,
.inner_table th:first-child {
  width: 100px;
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
.dialog_table {
  width: 90%;
}
.dialog_table table {
  width: 100%;
  color: #49f1e7;
  text-align: center;
}
.dialog_table td,
.dialog_table th {
  font-family: SimHei;
  height: 30px;
  font-size: 14px;
}
.dialog_table thead {
  background: rgba(7, 16, 32, 0.4);
  font-weight: bold;
  color: #01aeff;
}
.dialog_table tbody tr:nth-child(odd) {
  background: rgba(1, 174, 255, 0.17);
}
.dialog_table tbody tr:nth-child(even) {
  background: rgba(1, 174, 255, 0.08);
}
.dialog_table .person_img {
  width: 60px;
  height: 60px;
  margin: 5px 0;
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
  top: 0;
  left: 770px;
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
.detail_position {
  position: absolute;
  top: 94px;
  right: 103px;
  color: #01aeff;
}
.editActive {
  color: grey!important;
}
</style>

