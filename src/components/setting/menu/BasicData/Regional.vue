<template>
  <div class="content_inner">
    <div class="inner_wrap">
      <div class="menu_details">
        <ul>
          <li>设置</li>
          <li>{{Urlstate}}</li>
          <li @click='set_list' style="cursor: pointer;">{{infopeo}}</li>
          <li v-show = 'menu_set' @click='set_list' style="cursor: pointer;">{{set}}</li>
          <li v-show = 'menu_set'  @click='buid_list' style="cursor: pointer;">{{buid}}</li>
          <li v-show = 'menu_set'  @click='u_int_list' :value='int_id' style="cursor: pointer;">{{u_int}}</li>
        </ul>
      </div>
      
      <div class="inner_main notice">
        <ul class="handle_box" >
          <li class="fl" @click="dialogFormVisible = true,addItem()"><span class="setIcon setIcon-add"></span><span
              class="icon-content">
              <el-button type="text">添加</el-button>
            </span></li>
          <li class="fl" @click="deleteList()"><span class="setIcon setIcon-delete"></span><span class="icon-content">
              <el-button type="text">删除</el-button>
            </span></li>
          <!-- <li class="fl" @click="returns()"><i class="el-icon-back"></i>　<span class="icon-content">
              <el-button type="text">返回</el-button>
            </span></li> -->
        </ul>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="25%">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="small">

            <el-form-item :label="titLeb" prop="noticeDetails">
              <el-input v-model="ruleForm.noticeDetails"></el-input>
            </el-form-item>
          <el-form-item label='房屋类型' prop='house_use' v-show = 'house_show'>
            <select class="form_control" v-model="ruleForm.house_use" @change="typeSelect($event)">
              <option v-for="(item, index) in typelist" :key="index" :value="item.id">{{item.use_type}}</option>
            </select>
          </el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" size='small'>保存</el-button>
            <el-button type="warning" @click="resetForm('ruleForm')" size='small'>重置</el-button>

          </el-form>
        </el-dialog>
        <div class="inner_table" style="overflow:auto">
         <table>
            <thead>
              <tr style="display:block">
                <th><input type="checkbox" @change="checkedAll()" :checked="checkList.length === parent_data_list.length"></th>
                <th>{{tit_th}}</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody style="display:block;height:650px;overflow:auto">
              <tr v-for="(item,index) in parent_data_list" :key="item.id" :data-id="item.id">
                <td><input type="checkbox" :checked="checkList.indexOf(item.id)>=0" @change="checkedOne(item.id)"></td>
                <td style="cursor: pointer;">{{item.name}}</td>
                <td>
                  <ul class="operate">
                    <li class="edit" @click="dialogFormVisible = true,editItem(item.id)">编辑</li>
                    <li class="delete" @click='childname(index,item.buildings,item.units,item.houses)' style="position:relative">
                      <el-button type="text"><i class="el-icon-edit-outline" v-show='icon_menu'  style="font-size:20px; position: absolute; left: -20px; top: 1px;"></i>{{tit_menu}}</el-button>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <PagingMenu :owner="type" @houseList="parentDataList" :searchParam="search_params" @housebuilding = 'houseData' :house = 'houstlist' :houseunits = houstunt></PagingMenu> -->
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
    houseAreaInfoDestroy,
    houseall,
    houseAreaInfo,
    houseAreaInfoList,
    houseAreaInfoUpdate,
    houseAreaInfoAdd,
    gate_list,
    building_list,
    building_add,
    building_update,
    building_del,
    unit_list,
    unit_update,
    unit_add,
    unit_del,
 
    buildinglistById,
    houseUpdate,
    houseInfoAdd,
    houseUseTypeList,
    houseInfoDestroy,
    house_detaill
  } from "@/mock/api";
  export default {
    inject: ['reload'],
    name: "NoticeInfo",
    components: {
      PagingMenu
    },
    data() {
      return {
        type: "Regional",
        typelist:[],
        parent_data_list: [],
        search_params: "",
        menu_set:false,
        isCheckedAll: false,
        checkList: [],
        icon_menu:true,
        datetimeArr: [],
        tit_th: '区域名称',
        dialogFormVisible: false,
        dialogTitle: "添加区域信息",
        ruleForm: {
          noticeDetails: "",
          pid: 1,
          house_use:''
        },
        rules: {
          noticeDetails: [{
            required: true,
            message: "请填写该名称",
            trigger: "blur"
          }],
         
        },
        updata_id: "",
        infopeo: "",
        Urlstate: "",
        menu_list: [],
        children_data: [],
        houst_build: [],
        build: '',
        un: '',
        gate: '',
        inx: 0,
        types: '',
        area_id : 0,
        house_id :0,
        house_show:false,
        titLeb:'区域',
        tit_menu:'楼号',
        set:' ',
        buid:'',
        u_int:'',
        int_id:0,
        err_flag:false,
        err_unit:false,
        err_house:false
      };
    },
    mounted() {
      this.search();
      this.router();
      this.list_pei();
    },
    methods: {
      // closeDialog(){
      //     this.resetForm("ruleForm");
      //   },
      typeSelect(event) {
      this.house_id = event.target.value;
       },
      set_list(){
           this.search()        
          this.tit_menu = '楼号'
          this.icon_menu = true;
          this.set='',
          this.buid='',
          this.u_int='',
          this.titLeb = '区域',
          this.dialogTitle = "添加区域信息";
          this.menu_set = false
          this.tit_th = '区域名称'
      },
      buid_list(){

        this.tit_th = '楼号'
        this.tit_menu = '单元号'
        this.u_int=''
        houseall().then((response) => {
         var data_list = response.data.data.areas
            for(var k=0;k<data_list.length;k++){
              if(this.set == data_list[k].name){
                this.parent_data_list = data_list[k].buildings
              }
            }
           }).catch((err) => {
                console.log(err)
          })  
      },
      u_int_list(){
        this.tit_th = '单元号'
        this.tit_menu = '门牌号'
            houseall().then((response) => {
            var data_list = response.data.data.areas
            for(var k=0;k<data_list.length;k++){
              if(this.set == data_list[k].name){
               for(var l = 0;l<data_list[k].buildings.length;l++){
                if(this.int_id ==  data_list[k].buildings[l].id){
                  this.parent_data_list = data_list[k].buildings[l].units
                }
               }
              }
            }
           }).catch((err) => {
                console.log(err)
          })  
      },
      childname(index, x, y, z) {
        this.inx = index
        this.build = x;
        this.un = y;
        this.gate = z;
        if (x == undefined && y == undefined) {
         
         if(this.parent_data_list[index].houses == undefined){
          
           console.log(this.parent_data_list[index])
          console.log(1)
          this.$message({
                  type: "error",
                  message: "暂无数据，请添加！",
                  duration:700
              });
         setTimeout(() =>{
          if(this.parent_data_list[index].flag == 'area'){
            this.updata_id = "";
            this.ruleForm.noticeDetails = "";
            this.dialogFormVisible = true;
            this.titLeb = '楼号'
            this.dialogTitle = "添加楼号信息";
            this.err_flag = true
            this.area_id = this.parent_data_list[index].id
           
          }else if(this.parent_data_list[index].flag == 'building'){
            this.updata_id = "";
            this.ruleForm.noticeDetails = "";
            this.dialogFormVisible = true;
            this.titLeb = '单元'
            this.dialogTitle = "添加单元信息";
            this.err_unit = true
            this.area_id = this.parent_data_list[index].id
            console.log(this.area_id)
          }else if(this.parent_data_list[index].flag == 'unit'){
            this.ruleForm.noticeDetails= "";
            this.area_id= "";
            this.dialogFormVisible = true;
            this.titLeb = '门牌号'
            this.dialogTitle = "添加门牌号信息";
            this.err_house = true
            this.area_id = this.parent_data_list[index].id
            this.house_show = true
            houseUseTypeList().then((response)=>{
            this.typelist = response.data.data
              }).catch((err)=>{
                console.log(err)
              })
          }
         },800)
         }else{
          this.tit_th = '门牌号'
          this.tit_menu = ''
          this.menu_set = true
          this.icon_menu = false;
          this.house_show = true
          this.u_int = this.parent_data_list[index].name
          
          this.area_id = this.parent_data_list[index].id
         
          this.parent_data_list = this.parent_data_list[index].houses
          
          this.types =this.parent_data_list[0].flag
          houseUseTypeList().then((response)=>{
        //    console.log(response)
         this.typelist = response.data.data
          }).catch((err)=>{
            console.log(err)
          })
         }   
        
        } else if (y == undefined) {
          this.tit_th = '楼号'
          this.tit_menu = '单元号'
          this.menu_set = true
          this.set = this.parent_data_list[index].name
          this.area_id = this.parent_data_list[index].id
          this.parent_data_list = this.parent_data_list[index].buildings
          this.types = this.parent_data_list[index].flag


        } else if (x == undefined) {
          this.tit_th = '单元号'
          this.tit_menu = '门牌号'
          this.menu_set = true
          this.int_id = this.parent_data_list[index].id
          this.buid = this.parent_data_list[index].name
          this.area_id = this.parent_data_list[index].id
          this.parent_data_list = this.parent_data_list[index].units
          this.types = this.parent_data_list[index].flag

        }
      },
      returns() {
        // this.search()        
        // this.tit_menu = '楼号'
        // this.icon_menu = true;
        // this.set='',
        // this.buid='',
        // this.u_int='',
        // this.titLeb = '区域',
        // this.dialogTitle = "添加区域信息";
        // this.menu_set = false
        // this.tit_th = '区域名称'
        this.$message({
                  type: "success",
                  message: "点击导航进行返回"
                });
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
        this.tit_menu = '楼号'
         this.icon_menu = true
        this.house_show = false
        houseall().then((response) => {
         // console.log(response)
          this.parent_data_list = response.data.data.areas
          this.types = this.parent_data_list[0].flag
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
      addItem(index) {
        this.updata_id = "";
        this.ruleForm.noticeDetails = "";
        if(this.types == 'area'){
          this.titLeb = '区域'
          this.dialogTitle = "添加区域信息";
        }else if(this.types == 'building'){
                this.titLeb = '楼号'
                this.dialogTitle = "添加楼号信息";
        }else if(this.types == 'unit'){
                this.titLeb = '单元'
                this.dialogTitle = "添加单元信息";
        }else if(this.types == 'house'){
                this.titLeb = '门牌号'
                this.dialogTitle = "添加门牌号信息";
        }
      },
      editItem(item_id) {
        this.updata_id = item_id;
        if (this.types == "area") {
          this.titLeb = '区域'
          this.dialogTitle = "编辑区域信息";
          houseAreaInfo({
              'id': item_id
            })
            .then(response => {
              if (response.data.detail == "success") {
                this.ruleForm.noticeDetails = response.data.data.name;
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
        } else if (this.types == 'building') {
          this.titLeb = '楼号'
          this.dialogTitle = "编辑楼号信息";
          building_list({
              'id': item_id
            })
            .then(response => {
              if (response.data.detail == "success") {
                this.ruleForm.noticeDetails = response.data.data.name;
                this.area_id = response.data.data.area_info_id

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
        }else if(this.types == 'unit'){
          this.titLeb = '单元'
          this.dialogTitle = "编辑单元信息";
          unit_list({
              'id': item_id
            })
            .then(response => {
              if (response.data.detail == "success") {
                this.ruleForm.noticeDetails = response.data.data.name;
                this.area_id = response.data.data.building_info_id
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
        }else if(this.types == 'house'){
          console.log(this.types)
          this.titLeb = '门牌号'
          this.dialogTitle = "编辑门牌号信息";
          buildinglistById({
              'id': item_id
            })
            .then(response => {
              if (response.data.detail == "success") {
                this.ruleForm.noticeDetails = response.data.data.gate_no;
                this.ruleForm.house_use = response.data.data.house_use_type_id
                // house_detaill({id:this.house_id}).then((response)=>{
                //   console.log(response.data.data)
                //   this.ruleForm.house_use = response.data.data.use_type
                //   console.log(this.ruleForm.house_use)
                // }).catch((err)=>{
                //   console.log(err)
                // })
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
        }


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

              if (this.types == 'area') {
                houseAreaInfoDestroy({
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
                      //this.reload()
                    }else{
                      this.$message({
                      type: "error",
                      message: "如需删除，请删除下一级!"
                    });
                    }
                    
                  })
                  .catch(error => {
                    console.log(error)
                  });
               
              }else if(this.types == 'building'){
                building_del({
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
                      //this.reload()
                    }else{
                      this.$message({
                      type: "error",
                      message: "如需删除，请删除下一级!"
                    });
                    }
                  })
                  .catch(error => {
                    console.log(error)
                  });
              }else if(this.types == 'unit'){
                unit_del({
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
                      //this.reload()
                    }else{
                      this.$message({
                      type: "error",
                      message: "如需删除，请删除下一级!"
                    });
                    }
                  })
                  .catch(error => {
                    console.log(error)
                  });
              }else if(this.types == 'house'){
                houseInfoDestroy({
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
                      //this.reload()
                    }else{
                      this.$message({
                      type: "error",
                      message: "如需删除，请删除下一级!"
                    });
                    }
                  })
                  .catch(error => {
                    console.log(error)
                  });
              }
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.updata_id) {
              if (this.types == "area") {
                houseAreaInfoUpdate([{
                    "id": this.updata_id,
                    "zoom_name": this.ruleForm.noticeDetails,
                  }])
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
              } else if (this.types == 'building') {
                building_update([{
                    "id": this.updata_id,
                    "name": this.ruleForm.noticeDetails,
                     "area_info_id":this.area_id
                  }])
                  .then(response => {
                    if (response.data.detail == "success") {
                      this.$message({
                        type: "success",
                        message: "修改成功!"
                      });
                      this.dialogFormVisible = false;
                 this.search()
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
              }else if(this.types == 'unit'){
                unit_update([{
                    "id": this.updata_id,
                    "name": this.ruleForm.noticeDetails,
                     "building_info_id":this.area_id
                  }])
                  .then(response => {
                    if (response.data.detail == "success") {
                      this.$message({
                        type: "success",
                        message: "修改成功!"
                      });
                      this.dialogFormVisible = false;
                 this.search()
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
              }else if(this.types == 'house'){
                houseUpdate([{
                    "id": this.updata_id,
                    "gate_no": this.ruleForm.noticeDetails,
                    "unit_info_id":this.area_id,
                    'house_use_type_id':this.house_id
                  }])
                  .then(response => {
                    if (response.data.detail == "success") {
                      this.$message({
                        type: "success",
                        message: "修改成功!"
                      });
                      this.dialogFormVisible = false;
                 this.search()
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
              }

            } else {
              if (this.types == 'area'&&this.err_flag==false&&this.err_unit==false&&this.err_house==false){
                console.log('雀跃')
                houseAreaInfoAdd({
                    "zoom_name": this.ruleForm.noticeDetails,
                  })
                  .then(response => {
                    if (response.data.detail == "success") {
                      this.$message({
                        type: "success",
                        message: "添加成功!"
                      });
                      this.dialogFormVisible = false;
                      this.search();
                      //this.reload()
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
              }else if(this.err_flag == true){
                building_add({
                    "name": this.ruleForm.noticeDetails,
                    "area_info_id":this.area_id
                  })
                  .then(response => {
                    if (response.data.detail == "success") {
                      this.$message({
                        type: "success",
                        message: "添加成功!"
                      });
                      this.dialogFormVisible = false;
                      this.search();
                      this.err_flag = false
                      //this.reload()
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
              else if(this.types == 'building'&&this.err_flag==false&&this.err_unit==false&&this.err_house==false){
                building_add({
                    "name": this.ruleForm.noticeDetails,
                    "area_info_id":this.area_id
                  })
                  .then(response => {
                    if (response.data.detail == "success") {
                      this.$message({
                        type: "success",
                        message: "添加成功!"
                      });
                      this.dialogFormVisible = false;
                      this.search();
                      //this.reload()
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
              }else if(this.err_unit == true){
                console.log('one')
                unit_add({
                    "name": this.ruleForm.noticeDetails,
                    "building_info_id":this.area_id
                  })
                  .then(response => {
                    if (response.data.detail == "success") {
                      this.$message({
                        type: "success",
                        message: "添加成功!"
                      });
                      this.dialogFormVisible = false;
                      this.err_unit = false
                      this.search();
                      //this.reload()
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
              }else if(this.types == 'unit'&&this.err_flag==false&&this.err_unit==false&&this.err_house==false){
                console.log('two')               
                console.log(this.err_house)
                unit_add({
                    "name": this.ruleForm.noticeDetails,
                    "building_info_id":this.area_id
                  })
                  .then(response => {
                    if (response.data.detail == "success") {
                      this.$message({
                        type: "success",
                        message: "添加成功!"
                      });
                      this.dialogFormVisible = false;
                      this.search();
                      //this.reload()
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
              }else if(this.err_house == true){
                this.ruleForm.house_use = ''
                houseInfoAdd({
                    "gate_no": this.ruleForm.noticeDetails,
                    "unit_info_id":this.area_id,
                    "house_use_type_id":this.house_id
                  })
                  .then(response => {
                    if (response.data.detail == "success") {
                      this.$message({
                        type: "success",
                        message: "添加成功!"
                      });
                      this.dialogFormVisible = false;
                      this.search();
                      //this.reload()
                      this.err_house = false
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
              }else if(this.types == 'house'){
                this.ruleForm.house_use = ''
                houseInfoAdd({
                    "gate_no": this.ruleForm.noticeDetails,
                    "unit_info_id":this.area_id,
                    "house_use_type_id":this.house_id
                  })
                  .then(response => {
                    if (response.data.detail == "success") {
                      this.$message({
                        type: "success",
                        message: "添加成功!"
                      });
                      this.dialogFormVisible = false;
                      this.search();
                      //this.reload()
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
  .show+.el-form-item__error {
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
    width: 1500px;
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

  .menu_details{
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
    overflow: auto;
  }
  ::-webkit-scrollbar {/*隐藏滚轮*/
    display: none;
    }
</style>
