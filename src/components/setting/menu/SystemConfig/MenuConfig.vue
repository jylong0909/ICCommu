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
      <div class="inner_main notice menuconfig">
        <ul class="handle_box">
          <li class="fl" @click="dialogFormVisible = true,addItem()"><span class="setIcon setIcon-add"></span><span
              class="icon-content">
              <el-button type="text">添加</el-button>
            </span></li>
          <li class="fl" @click="deleteList()"><span class="setIcon setIcon-delete"></span><span class="icon-content">
              <el-button type="text">删除</el-button>
            </span></li>
          <li class="fl" @click="returns()"><i class="el-icon-back"></i>　<span class="icon-content">
              <el-button type="text">返回</el-button>
            </span></li>
        </ul>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="25%" @close='closeDialog'>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="small">

            <el-form-item label="菜单名称" prop="noticeDetails">
              <el-input v-model="ruleForm.noticeDetails"></el-input>
            </el-form-item>
            <el-form-item label="菜单地址" prop="menu_url">
              <el-input v-model="ruleForm.menu_url"></el-input>
            </el-form-item>
           
              <el-form-item label="排序" prop="menu_pop">
                <el-input v-model="ruleForm.menu_pop" style="width: 289px;"></el-input>
              </el-form-item>
              <el-form-item label="显示/隐藏" prop="resource">
                    <el-radio-group v-model="ruleForm.resource" style="margin-left:-225px;" class="show" >
                      <el-radio label="1" style="color:#ffffff">显示</el-radio>
                      <el-radio label="0" style="margin-left:10px;color:#ffffff">隐藏</el-radio>
                    </el-radio-group>
                  </el-form-item>
 
              <el-button type="primary" @click="submitForm('ruleForm')" size='small'>保存</el-button>
              <el-button type="warning" @click="resetForm('ruleForm')" size='small'>重置</el-button>
           
          </el-form>
        </el-dialog>
        <div class="inner_table">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" @change="checkedAll()" :checked="checkList.length === parent_data_list.length"></th>
                <th>菜单名称</th>
                <th>菜单地址</th>
                <th>显示/隐藏</th>
                <th>排序</th>
                <th>编辑</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in parent_data_list" :key="item.id" :data-id="item.id">
                <td><input type="checkbox" :checked="checkList.indexOf(item.id)>=0" @change="checkedOne(item.id)"></td>
                <td style="cursor: pointer;">{{item.name}}</td>

                <td>{{item.url}}</td>
                <th>{{item.is_display?'显示':'隐藏'}}</th>
                <td>{{item.order}}</td>
                <td>
                  <ul class="operate">
                    <li class="edit" @click="dialogFormVisible = true,editItem(item.id)">编辑</li>
                    <li class="delete" @click='childname(index)' style="position:relative">
                      <el-button type="text"><i class="el-icon-edit-outline" style="font-size:20px; position: absolute; left: -20px; top: 1px;"></i>子菜单</el-button>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <PagingMenu :owner="type" @MenuList="parentDataList" :searchParam="search_params"></PagingMenu>
      </div>
    </div>
  </div>
</template>
<script>
  import PagingMenu from "../common/PagingMenu";
  import {
    partial_menu,
    NoticeInfoAdd,
    NoticeInfoUpdate,
    NoticeInfoDestroy,
    menulist,
    detail_id,
    create_menu,
    del_menu,
    system_menu
  } from "@/mock/api";
  export default {
    inject:['reload'],
    name: "MenuConfig",
    components: {
      PagingMenu
    },
    data() {
      return {
        type: "MenuConfig",
        parent_data_list: [],
        search_params: "",
        isCheckedAll: false,
        checkList: [],
        datetimeArr: [],
        dialogFormVisible: false,
        dialogTitle: "添加公告信息",
        ruleForm: {
          noticeDetails: "",
          menu_url: "",
          menu_pop: '',
          resource:'',  
          pid:0
        },
        rules: {
          noticeDetails: [{
            required: true,
            message: "请选择菜单名称",
            trigger: "blur"
          }],
          menu_url: [{
            required: true,
            message: "请填写菜单地址",
            trigger: "blur"
          }],
          menu_pop: [{
            required: true,
            message: "请填写排序",
            trigger: "blur"
          }],
          resource: [
            { required: true, message: '请选择是否显示或隐藏', trigger: 'blur' }
          ],
        },
        updata_id: "",
        infopeo: "",
        Urlstate: "",
        menu_list: [],
        children_data: []
      };
    },
    mounted() {
      this.search();
      this.router();
      this.list_pei();
    },
    methods: {
      closeDialog(){
          this.resetForm("ruleForm");
        },
      childname(index) {
        console.log(index)
        this.parent_data_list = this.parent_data_list[index].children
        this.ruleForm.pid = this.parent_data_list[index].pid
      },
      returns() {
       this.search()
      },
      dateChange(value) {
        this.search()
      },
      parentDataList(data) {
        this.isCheckedAll = false;
        this.checkList = [];
        this.parent_data_list = data;
      },
      search() {
        system_menu().then((response) => {
          console.log(response)
          this.parent_data_list = response.data.data
          this.ruleForm.pid = response.data.data.pid
        }).catch((err) => {
          console.log(err)
        })
        this.search_params = ''
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
        this.dialogTitle = "添加菜单管理信息";
        this.ruleForm.noticeDetails = "";
        this.ruleForm.menu_url=''
        this.ruleForm.menu_pop = ''
        this.ruleForm.pid = this.parent_data_list[0].pid
        this.ruleForm.resource = ''
      },
      editItem(item_id) {
          console.log(this.ruleForm.resource)
        this.updata_id = item_id;
        this.dialogTitle = "编辑菜单管理信息";
        detail_id({
            'id': item_id
          })
          .then(response => {
            if (response.data.detail == "success") {
              console.log(response.data.data)

              this.ruleForm.menu_pop = response.data.data.order
              this.ruleForm.menu_url = response.data.data.url;
              this.ruleForm.noticeDetails = response.data.data.name;
              this.ruleForm.pid = response.data.data.pid
              this.ruleForm.resource = String(response.data.data.is_display)
            } else {
              this.$message({
                type: "error",
                message: "获取公告信息失败!"
              });
            }
          })
          .catch(error => {
            console.log(error);
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

              del_menu({
                  id: this.checkList.join()
                })
                .then(response => {
                  if (response.data.detail == "success") {
                    this.isCheckedAll = false;
                    this.checkList = [];
                    this.$message({
                      type: "success",
                      message: "删除成功!"
                    });
                    this.search();
                    this.reload()
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
              partial_menu({
                  id: this.updata_id,
                  pid:this.ruleForm.pid,
                  url: this.ruleForm.menu_url,
                  name: this.ruleForm.noticeDetails,
                  order: this.ruleForm.menu_pop,
                  is_display: Number(this.ruleForm.resource)
                })
                .then(response => {
                  if (response.data.detail == "success") {
                    this.$message({
                      type: "success",
                      message: "修改成功!"
                    });
                    this.dialogFormVisible = false;
                    this.search();           
                    this.reload()
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
              create_menu({
                  pid: this.ruleForm.pid,
                  url: this.ruleForm.menu_url,
                  name: this.ruleForm.noticeDetails,
                  order: this.ruleForm.menu_pop,
                  is_display: Number(this.ruleForm.resource)
                })
                .then(response => {
                  if (response.data.detail == "success") {
                    this.$message({
                      type: "success",
                      message: "添加成功!"
                    });
                    this.dialogFormVisible = false;
                    this.search();
                    this.reload()
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
   .show + .el-form-item__error{
        margin-left: 100px;
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

    .area-set .el-form-item__content>.el-select,
  .el-form-item__content>.el-input {
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

  .area-set .el-form-item__content>.el-input {
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
    color: #ff0101;
    cursor: pointer;
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
    background: rgba(1, 174, 255, 0.17) url("/static/IMG/Icon/select_bg.png") no-repeat 98% center;
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

  .handle_box>li {
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

  .handle_box>li:last-child {
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

</style>
