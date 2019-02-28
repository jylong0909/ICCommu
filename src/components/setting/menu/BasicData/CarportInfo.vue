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
        <ul class="handle_box">
          <li class="fl" @click="dialogFormVisible = true,addItem()"><span class="setIcon setIcon-add"></span><span
              class="icon-content">
              <el-button type="text">添加</el-button>
            </span></li>

          <li class="fl" @click="deleteList()"><span class="setIcon setIcon-delete"></span><span class="icon-content">
              <el-button type="text">删除</el-button>
            </span></li>

        </ul>
        <!-- 弹框-->

        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%" class="dialog" @close='closeDialog' >
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size='small'>
            <el-form-item label="车位区域" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="车位总数" prop="name">
              <el-input v-model="ruleForm.Num_name"></el-input>
            </el-form-item>
            <el-form-item label="已用使用车位" prop="name">
              <el-input v-model="ruleForm.cal_name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" size='small'>{{subtit}}</el-button>
              <el-button @click="resetForm('ruleForm')" type='warning' size='small'>重置</el-button>
            </el-form-item>
          </el-form>

        </el-dialog>

        <!--搜索条件-->
        <div class="search_list">

        </div>
        <div class="inner_table" >
          <table >
            <thead>
              <tr >
                <th><input type="checkbox" @change="checkedAll()" :checked="checkList.length === Car_data.length"></th>
                <th>车位区域</th>
                <th>车位总数(个)</th>
                <th>已用使用车位(个)</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in Car_data" :key="item.id" :data-id="item.id">
                <td><input type="checkbox" :checked="checkList.indexOf(item.id)>=0" @change="checkedOne(item.id)"></td>
                <!-- <td>{{item.area_info_id}}</td> -->
                <td>{{item.name}}</td>
                <td>{{item.cap}}</td>

                <td>{{item.cap_used}}</td>

                <td>
                  <ul class="operate">
                    <li class="edit" @click="dialogFormVisible = true, editor(item.id)">编辑</li>
                    <li class="delete" @click="deleteItem(item.id)">
                      <el-button type="text">删除</el-button>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  // import HandleMenu from "../common/HandleMenu";
  // import SearchMenu from "../common/SearchMenu";
  import PagingMenu from "../common/PagingMenu";
  import {
    menulist,
    car_list,
    Car_list_del,
    create_cal,
    place_data,
    detail_data
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
        type: "CarportInfo",
        search_params: "",
        isCheckedAll: false,
        dialogFormVisible: false,
        dialogTitle: "添加车位详细信息",
        updata_id: "",
        infopeo: '',
        Urlstate: '',
        menu_list: [],
        subtit: '添加',
        Car_data: [],
        checkList: [],
        ruleForm: {
          name: '',
          Num_name: '',
          cal_name: ''
        },
        rules: {
          name: [{
              required: true,
              message: '请输入车位信息',
              trigger: 'blur'
            },
            {
              min: 2,
              message: '长度最低2位',
              trigger: 'blur'
            }
          ],
          Num_name: [{
              required: true,
              message: '请输入车辆数量',
              trigger: 'blur'
            },
            {
              min: 2,
              message: '长度最低1位',
              trigger: 'blur'
            }
          ],
          cal_name: [{
              required: true,
              message: '请输入已用车位数息',
              trigger: 'blur'
            },
            //          { min: 3, max: 5, message: '长度最低1位', trigger: 'blur' }
          ],
        },
        update_id: 0

      };
    },
    mounted() {
      this.Car_list_data()
      this.router()
      this.list_pei()
    },
    watch: {
      searchParam: {
        handler(newValue, oldValue) {
          this.Car_list_data()
        }
      }
    },
    methods: {
      closeDialog(){
          this.resetForm("ruleForm");
        },
      deleteList() {
        //console.log(this.checkList)
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

              Car_list_del({
                  'id': this.checkList.join()
                })
                .then(response => {
                  if (response.data.detail == "success") {
                    this.isCheckedAll = false;
                    this.checkList = [];
                    this.$message({
                      type: "success",
                      message: "删除成功!"
                    });
                    this.Car_list_data()
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(() => {
              console.log(this.checkList.join())
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        }
      },
      //没有根据ID获取停车场信息
      editor(item_id) {
        this.dialogTitle = '车位信息管理'
        this.subtit = '修改'
        this.update_id = item_id
        detail_data({
          'id': this.update_id
        }).then((response) => {
          if (response.data.detail == "success") {
            this.ruleForm.name = response.data.data.name
            this.ruleForm.Num_name = response.data.data.cap
            this.ruleForm.cal_name = response.data.data.cap_used
          } else {
            this.$message({
              type: "error",
              message: "获取住房详细信息失败!"
            });
          }

        }).catch((err) => {
          console.log(err)
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.update_id) {
             
              if(Number(this.ruleForm.cal_name) <= Number(this.ruleForm.Num_name)){
                place_data({
                  'id': this.update_id,
                  'name': this.ruleForm.name,
                  'cap': this.ruleForm.Num_name,
                  'cap_used': this.ruleForm.cal_name
                })
                .then(response => {
                  if (response.data.detail == "success") {
                    this.$message({
                      type: "success",
                      message: "修改成功!"
                    });
                    this.dialogFormVisible = false;
                    this.Car_list_data();
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
              }else{
                this.$message({
                  message: '内容有错误，请重新填写',
                  type: 'success',
                });
              }  
            } else {
              if (Number(this.ruleForm.cal_name) <= Number(this.ruleForm.Num_name)) {
                create_cal({
                    'name': this.ruleForm.name,
                    'cap': this.ruleForm.Num_name,
                    'cap_used': this.ruleForm.cal_name
                  })
                  .then((response) => {
                    this.$message({
                      message: '添加成功',
                      type: 'success',
                    });
                    this.dialogFormVisible = false
                    this.Car_list_data()
                  }).catch((err) => {
                    console.log(err)
                  })
              } else {
                this.$message({
                  message: '内容有错误，请重新填写',
                  type: 'success',
                });
              }
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm.name = ''
        this.ruleForm.Num_name = ''
        this.ruleForm.cal_name = ''
      },
      deleteItem(item_id) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Car_list_del({
            "id": item_id
          }).then((response) => {
            this.Car_list_data()
          }).catch((err) => {
            console.log(err)
          })
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          this.Car_list_data()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      addItem() {
        this.resetForm('ruleForm')
        this.subtit = '添加'
        this.dialogTitle = '添加车位详细信息'
      },
      checkedOne(item_id) {
        let idIndex = this.checkList.indexOf(item_id);
        if (idIndex >= 0) {
          this.checkList.splice(idIndex, 1);
        } else {
          this.checkList.push(item_id);
        }
      },
      checkedAll() {
        this.isCheckedAll = !this.isCheckedAll;
        if (this.isCheckedAll) {
          this.checkList = [];
          this.Car_data.forEach(item => {
            this.checkList.push(item.id);
          });
        } else {
          this.checkList = [];
        }
      },
      Car_list_data() {
        car_list().then((response) => {
          this.Car_data = response.data.data
          console.log(this.Car_data)
        }).catch((err) => {
          console.log(err)
        })
      },


      list_pei() {
        menulist()
          .then(response => {
            this.menu_list = response.data.data;
            for (var i = 0; i < this.menu_list.length; i++) {
              if (this.infoUrl[2] == this.menu_list[i].url) {
                this.Urlstate = this.menu_list[i].name
              }
              for (var j = 0; j < this.menu_list[i].children.length; j++) {
                if (this.infoUrl[3] == this.menu_list[i].children[j].url) {
                  this.infopeo = this.menu_list[i].children[j].name
                }
              }
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      router() {
        this.infoUrl = this.$route.path.split('/')
      },

    }
  };

</script>

<style>
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

  .handle_box .el-button {
    padding: 0;
    font-family: SimHei;
    font-size: 14px;
    letter-spacing: 0px;
    color: #feffff;
  }

.dialog .el-form-item__content>.el-select,
  .el-form-item__content>.el-input {
    float: left;
    width: 85%;
  }

 .dialog .el-form-item:nth-child(4)>div {
    margin-left: 0 !important;
  }

  .dialog .area-set {
    width: 70%;
    margin: 0 auto;
  }

 .dialog .area-set .el-form-item .el-form-item__content {
    margin-left: 0 !important;
  }

  .dialog .area-set .el-form-item__content>.el-input {
    width: 70%;
    margin-right: 10%;
  }
 .dialog .el-form-item__label{
    width: 120px !important;
  }

</style>

<style scoped>
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

</style>
