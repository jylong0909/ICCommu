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
      <ul class="handle_box handle_box2">
        <li class="fl" @click="search"><span class="setIcon setIcon-search"></span><span class="icon-content">搜索</span></li>
        <li class="fl" @click="reset"><span class="setIcon setIcon-reset"></span><span class="icon-content">重置</span></li>
      </ul>
      <ul class="handle_box">
        <li class="fl" @click="dialogFormVisible = true,addItem()"><span class="setIcon setIcon-add"></span><span class="icon-content"><el-button type="text">添加</el-button></span></li>
        <li class="fl" @click="deleteList()"><span class="setIcon setIcon-delete"></span><span class="icon-content"><el-button type="text">删除</el-button></span></li>
      </ul>
   <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="35%" @close='closeDialogs'>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="small">
        <el-form-item label="摄像头名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="摄像头分组" prop="group">
          <el-select v-model="ruleForm.group" placeholder="请选择分组">
            <el-option v-for="(item, index) in cameraGroupLists" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="采集视频流" prop="rtsp">
          <el-input v-model="ruleForm.rtsp"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
     <el-dialog :title="cameraGroupDialogTitle" :visible.sync="cameraGroupDialogFormVisible" @close='closeDialog' width="25%">
      <el-form :model="cameraGroupRuleForm" ref="cameraGroupRuleForm" label-width="100px" size="small" class="area-set">
        <el-form-item
          v-for="(domain, index) in cameraGroupRuleForm.grouplists"
          :key="index"
          :prop="'grouplists.' + index + '.name'"
          :rules="{
            required: true, message: '分组名不能为空', trigger: 'blur'
          }"
        >
          <el-input v-model="domain.name"></el-input><el-button type="danger" @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addDomain">新增</el-button>
          <el-button type="primary" @click="cameraGroupSubmitForm('cameraGroupRuleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="search_list">
      <div class="form_group">
        <label>摄像头分组：</label>
        <select class="form_control" v-model="camera_group_id" @change="cameraGroupSelect($event)">
          <option value="">全部</option>
          <option v-for="(item, index) in cameraGroupLists" :key="index" :value="item.id">{{item.name}}</option>
        </select>
        <i class="cameraGroupConfig" @click="cameraGroupDialogFormVisible = true"></i>
      </div>
      <div class="form_group">
        <label>摄像头名称：</label>
        <input type="text" class="form_control" v-model="camera_name" placeholder="名称/视频流">
      </div>
    </div>
    <div class="inner_table">
      <table>
      <thead>
        <tr>
          <th><input type="checkbox" @change="checkedAll()" :checked="checkList.length === parent_data_list.length"></th>
          <th>摄像头名称</th>
          <th>摄像头分组</th>
          <!-- <th>备注</th> -->
          <th>采集视频流</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in parent_data_list" :key="item.id" :data-id="item.id">
          <td><input type="checkbox" :checked="checkList.indexOf(item.id)>=0" @change="checkedOne(item.id)"></td>
          <td>{{item.camera_name}}</td>
          <td>{{item.group_name}}</td>
          <!-- <td>{{item.remark}}</td> -->
          <td>{{item.display_url}}</td>
          <td>
            <ul class="operate">
              <li class="edit" @click="dialogFormVisible = true,editItem(item.id)">编辑</li>
              <li class="delete" @click="deleteItem(item.id)"><el-button type="text">删除</el-button></li>
            </ul>
          </td>
        </tr>
      </tbody>
      </table>
    </div>
    <PagingMenu :owner="type" @theCameraList="parentDataList" :searchParam="search_params"></PagingMenu>
    </div>
  </div>
  </div>
</template>
<script>
import PagingMenu from "../common/PagingMenu";
import {
  camerasListById,
  cameraInfoAdd,
  cameraInfoUpdate,
  cameraInfoDestroy,
  cameraGroupList,
  cameraGroupInfoAdd,
  cameraGroupInfoUpdate,
  cameraGroupInfoDestroy,
  menulist
} from "@/mock/api";
export default {
  name: "cameraInfo",
  components: {
    PagingMenu
  },
  data() {
    return {
      type: "cameraInfo",
      parent_data_list: [],
      search_params: "",
      isCheckedAll: false,
      checkList: [],
      cameraGroupLists: [],
      camera_name: "",
      camera_group_id: "",
      dialogFormVisible: false,
      dialogTitle: "添加摄像头信息",
      cameraGroupDialogFormVisible: false,
      cameraGroupDialogTitle: "摄像头分组管理",
      ruleForm: {
        name: "",
        group: "",
        remark: "",
        rtsp: ""
      },
      cameraGroupRuleForm: {
        grouplists: []
      },
      rules: {
        name: [
          { required: true, message: "请输入摄像头名称", trigger: "change" }
        ],
        group: [{ required: true, message: "请选择分组", trigger: "blur" }],
        rtsp: [{ required: true, message: "请填写视频流地址", trigger: "blur" }]
      },
      updata_id: "",
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
    closeDialogs() {
      this.resetForm("ruleForm");
    },
    parentDataList(data) {
      this.isCheckedAll = false;
      this.checkList = [];
      this.parent_data_list = data;
    },
    cameraGroupSelect(event) {
      this.camera_group_id = event.target.value;
    },
    search() {
      this.search_params = {
        search: this.camera_name,
        group_id: this.camera_group_id,
        pageno: "1"
      };
    },
    reset() {
      this.isCheckedAll = false;
      this.checkList = [];
      this.camera_name = "";
      this.camera_group_id = "";
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
      this.updata_id = "";
      this.dialogTitle = "添加摄像头信息";
      this.ruleForm.name = "";
      this.ruleForm.group = "";
      this.ruleForm.remark = "";
      this.ruleForm.rtsp = "";
    },
    editItem(item_id) {
      this.updata_id = item_id;
      this.dialogTitle = "编辑摄像头信息";
      camerasListById({ id: item_id })
        .then(response => {
          if (response.data.detail == "success") {
            this.ruleForm.name = response.data.data.camera_name;
            this.ruleForm.group = response.data.data.group_id;
            this.ruleForm.remark = response.data.data.remark;
            this.ruleForm.rtsp = response.data.data.display_url;
          } else {
            this.$message({
              type: "error",
              message: "获取摄像头信息失败!"
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
          cameraInfoDestroy({ id: item_id })
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
              console.log(error);
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
            cameraInfoDestroy({ id: this.checkList.join() })
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
                console.log(error);
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
          if (this.updata_id) {
            cameraInfoUpdate({
              id: this.updata_id,
              camera_name: this.ruleForm.name,
              camera_group_id: this.ruleForm.group,
              remark: this.ruleForm.remark,
              display_url: this.ruleForm.rtsp
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
            cameraInfoAdd({
              camera_name: this.ruleForm.name,
              camera_group_id: this.ruleForm.group,
              remark: this.ruleForm.remark,
              display_url: this.ruleForm.rtsp
            })
              .then(response => {
                if (response.data.detail == "success") {
                  this.$message({
                    type: "success",
                    message: "添加成功!"
                  });
                  this.dialogFormVisible = false;
                  this.search();
                } else {
                  this.$message({
                    type: "error",
                    message: "添加失败!"
                  });
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      if (this.updata_id) {
        this.editItem(this.updata_id);
      } else {
        this.$refs[formName].resetFields();
      }
    },
    addDomain() {
      this.cameraGroupRuleForm.grouplists.push({
        name: ""
      });
      var this_item = this.cameraGroupRuleForm.grouplists[
        this.cameraGroupRuleForm.grouplists.length - 1
      ];
      cameraGroupInfoAdd({ name: this_item.name })
        .then(response => {
          // console.log(response)
          if (response.data.detail == "success") {
            this_item.id = response.data.data.id;
            //console.info(this_item)
          } else {
            this.$message({
              type: "error",
              message: "新增失败!"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    removeDomain(item) {
      var index = this.cameraGroupRuleForm.grouplists.indexOf(item);
      if (index !== -1) {
        this.$confirm("确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.cameraGroupRuleForm.grouplists.splice(index, 1);
            cameraGroupInfoDestroy({ id: item.id })
              .then(response => {
                if (response.data.detail == "success") {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                } else {
                  this.$message({
                    type: "error",
                    message: "删除失败!"
                  });
                }
              })
              .catch(error => {
                console.log(error);
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
    cameraGroupSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var this_arr = this.cameraGroupRuleForm.grouplists;
          cameraGroupInfoUpdate(this_arr)
            .then(response => {
              if (response.data.detail == "success") {
                this.$message({
                  type: "success",
                  message: "数据更新成功!"
                });
                this.cameraGroupDialogFormVisible = false;
                this.search();
              } else {
                this.$message({
                  type: "error",
                  message: "数据更新失败!"
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
    closeDialog() {
      var this_list = this.cameraGroupRuleForm.grouplists;
      for (let k = this_list.length - 1; k >= 0; k--) {
        if (this_list[k].name == "") {
          // console.info(this_list[k].id)
          cameraGroupInfoDestroy({ id: this_list[k].id })
            .then(response => {
              if (response.data.detail == "success") {
                this_list.splice(k, 1);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
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
    cameraGroupList()
      .then(response => {
        this.cameraGroupLists = response.data.data;
        this.cameraGroupRuleForm.grouplists = this.cameraGroupLists;
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
.cameraGroupConfig {
  float: left;
  width: 18px;
  height: 18px;
  margin-top: 6px;
  margin-left: 7px;
  cursor: pointer;
  background: url(/static/IMG/Icon/config.png) no-repeat;
  background-size: 100% 100%;
}
</style>

