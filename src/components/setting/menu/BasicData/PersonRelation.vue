<template>
  <div class="content_inner">
    <div class="inner_wrap" id="personrelation">
      <div class="menu_details">
        <ul>
          <!-- <li>设置</li>
          <li>{{Urlstate}}</li>
          <li>{{infopeo}}</li> -->
          <li>{{this_person_name}}的人物关系</li>
        </ul>
      </div>
      <div class="inner_main">
        <ul class="handle_box handle_box3">
          <li class="fl" style="width:150px;" @click="cameraGroupDialogFormVisible = true,initRelationParam()"><i class="el-icon-setting"
              style="font-size: 17px;margin-right: 3px;"></i><span class="icon-content">人物关系类型管理</span></li>
        </ul>
        <ul class="handle_box">
          <li class="fl" @click="dialogFormVisible = true,addItem()"><span class="setIcon setIcon-add"></span><span
              class="icon-content">
              <el-button type="text">添加</el-button>
            </span></li>
          <li class="fl" @click="deleteList()"><span class="setIcon setIcon-delete"></span><span class="icon-content">
              <el-button type="text">删除</el-button>
            </span></li>
          <li class="fl" @click="relationBack()"><i class="el-icon-back" style="margin-right: 5px;"></i><span class="icon-content">
              <el-button type="text">返回</el-button>
            </span></li>
        </ul>
        <!-- 弹框-->

        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%" class="dialog" @close='closeDialog'>
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size='small'>

            <el-form-item label="关系姓名"  prop="Num_name" v-show='name_guanxi'>
              <el-input v-model="Num_name" placeholder="请搜索关系姓名或房屋编号" @focus='chnange_input'></el-input>

              <br />
              <ul class="ul_list" v-if='ul_lists'>
                <li class="ul_list_li" v-for='(item_name,index) in Arrays' :key='index' v-if='chese' @click='li_name(index)'>{{item_name.name}}
                  -- {{item_name.gate_no}}</li>
                <!-- <li class="ul_list_li" v-for='(item_name,index) in Arrays' :key='index' v-if='num' @click ='li_gate_to(index)' >{{item_name.gate_no}}</li> -->
              </ul>
            </el-form-item>
            <div class="inner_table inn_tab">
              <table>
                <thead>
                  <tr>
                    <th>人物照片</th>
                    <th>姓名</th>
                    <th>房屋</th>
                    <th>人物关系</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(k,i) in person_list" :key="i">

                    <td style="height:80px">
                      <el-popover placement="right" title="" trigger="hover">
                        <img :src="'/'+k.image" class="Img masg" v-show="k.image" />
                        <img slot="reference" :src="'/'+k.image" style="height: 70px;width: 70px">
                      </el-popover>
                      <div v-show="!k.image" style="text-align:center;">暂无照片</div>
                    </td>
                    <td>{{k.name}}</td>
                    <td>{{k.gate_no}}</td>

                    <td>
                      <ul class="operate">
                        <li>
                          <el-form-item label="" prop="name" class="name_labe">
                            <select class="form_control delta" v-model="ruleForm.figure_id" :key='i' style="margin-right:10px;">
                              <option value="">选择人物关系</option>
                              <option v-for="(item, index) in areaList" :key="index" :value="item.id">{{item.relation_type}}</option>
                            </select>
                          </el-form-item>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <el-form-item class="tian">
              <el-button type="primary" @click="submitForm('ruleForm')" size='small'>{{subtit}}</el-button>
              <el-button @click="resetForm('ruleForm')" type='warning' size='small'>重置</el-button>
            </el-form-item>
          </el-form>

        </el-dialog>
        <el-dialog :title="cameraGroupDialogTitle" :visible.sync="cameraGroupDialogFormVisible" @close='closeDialog2'
          width="25%">
          <el-form :model="cameraGroupRuleForm" ref="cameraGroupRuleForm" label-width="100px" size="small" class="area-set">
            <el-form-item style="border-bottom: 1px dashed #fff;padding-bottom: 20px;">
              <label class="fl" style="color:#fff;">关系名称：</label>
              <!-- <i class="el-icon-search" @click="search_relation" style="color:#409EFF;font-size:17px;position:relative;left:-40px;cursor:pointer;"></i> -->
              <el-input v-model="relation_name" style="width:145px;" placeholder="输入搜索"></el-input>
              <el-button type="warning" @click="initRelationParam()">重置</el-button>
            </el-form-item>
            <el-form-item v-for="(domain, index) in cameraGroupRuleForm.grouplists" :key="index" :prop="'grouplists.' + index + '.relation_type'"
              :rules="{
            required: true, message: '关系名不能为空', trigger: 'blur'
          }">
              <el-input v-model="domain.relation_type"></el-input>
              <el-button type="danger" @click.prevent="removeDomain(domain)">删除</el-button>
            </el-form-item>
            <el-form-item v-show="total_count>page_size">
              <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :total="total_count"
                :current-page.sync="currentPage" :page-size="page_size" :pager-count="5">
              </el-pagination>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addDomain">新增</el-button>
              <el-button type="primary" @click="cameraGroupSubmitForm('cameraGroupRuleForm')">提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <!--搜索条件-->
        <div class="search_list">

        </div>
        <div class="inner_table">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" @change="checkedAll()" :checked="checkList.length === list_data.length"></th>
                <th>人物照片</th>
                <th>姓名</th>
                <th>关系</th>
                <th>性别</th>
                <th>出生日期</th>
                <th>证件号码</th>
                <th>联系方式</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in list_data" :key="index">
                <td><input type="checkbox" :checked='checkList.indexOf(item.person.id)>=0' @change="checkedOne(item.person.id)"></td>
                <!-- <td>{{item.area_info_id}}</td> -->
                <td style="height:80px">
                  <el-popover placement="right" title="" trigger="hover">
                    <img :src="item.person.image" class="Img masg" v-show="item.person.image" />
                    <img slot="reference" :src="item.person.image" style="height: 70px;width: 70px">
                  </el-popover>
                  <div v-show="!item.person.image" style="text-align:center;">暂无照片</div>
                </td>
                <td>{{item.person.name}}</td>
                <td>{{item.relation.relation_type?item.relation.relation_type:'无'}}</td>
                <td>{{item.person.gender==0?'男':'女'}}</td>
                <td>{{item.person.birthday=='None'?'无':item.person.birthday}}</td>
                <td>{{item.person.card_no==""?'无':item.person.card_no}}</td>
                <td>{{item.person.phone==""?'无':item.person.phone}}</td>
                <td>
                  <ul class="operate">
                    <li class="edit" @click="dialogFormVisible = true, editor(item.person.id,item.relation.id)">编辑</li>
                    <li class="delete" @click="deleteItem(item.person.id)">
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
  import PagingMenu from "../common/PagingMenu";
  import router from "@/router/index";

  import {
    menulist,
    car_list,
    Car_list_del,
    create_cal,
    place_data,
    detail_data,
    rela_list,
    dis_play,
    create_figure,
    person_type,
    addition,
    search_list,
    detail_list,
    partial_list,
    del_list,
    relationTypeList,
    relationTypeAdd,
    relationTypeDestroy,
    relationTypeUpdate,

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
        src: dis_play,
        type: "CarportInfo",
        search_params: "",
        isCheckedAll: false,
        dialogFormVisible: false,
        dialogTitle: "添加人物关系信息",
        updata_id: "",
        infopeo: '',
        Urlstate: '',
        menu_list: [],
        subtit: '添加',
        list_data: [],
        checkList: [],
        ruleForm: {
          name: '',
         
          figure_id: '',
          gate_to: []
        },
        Num_name: '',
        update_id: 0,
        is_data: 0,
        router_list: [],
        areaList: [],
        Arrays: [],
        chese: false,
        ul_lists: false,
        person_list: [],
        name_guanxi: true,
        shuzi: [],
        cameraGroupDialogFormVisible: false,
        cameraGroupDialogTitle: "人物关系类型管理",
        cameraGroupRuleForm: {
          grouplists: []
        },
        currentPage: 1,
        total_count: 0,
        page_size: 8,
        relation_name: "",
        this_person_name: "",
        search_true:true
      };
    },

    mounted() {
      // this.Car_list_data()
      // this.router()
      // this.list_pei()
      this.one()
      this.list_relation()
      this.relations_type()
      this.getThisPersonInfo();
      this.initRelation({
        pagesize: this.page_size,
        pageno: 1,
        search: this.relation_name
      });
    },
    watch: {
      searchParam: {
        handler(newValue, oldValue) {
          // this.Car_list_data()
        }
      },
      relation_name: {
        handler(newValue, oldValue) {
          this.initRelation({
            pagesize: this.page_size,
            pageno: 1,
            search: this.relation_name
          });
        }
      },
      Num_name: {
        handler(newValue, oldValue) {
         this.searchss(this.Num_name)
        }
      }
    },
    methods: {
      chnange_input(){
        this.search_true = true
        console.log( this.search_true)
      },
      li_name(index) {
        for (var i = 0; i < this.list_data.length; i++) {
         // console.log(this.list_data[i].person.id)
          if (this.list_data[i].person.id == this.Arrays[index].id) {
            this.$message({
              message: "该人物已添加人物关系",
              type: "warning"
            })
            this.Num_name = this.Arrays[index].name
            this.search_true = false
            this.chese=false
            this.ul_lists = false
            this.Arrays=[]
            return false
          }
        }
        this.person_list = []
        this.person_list.push(this.Arrays[index])
        this.Num_name = this.Arrays[index].name
        this.search_true = false
        this.chese=false
        this.ul_lists = false
        this.Arrays=[]
      },
      li_gate_to(index) {
        for (var i = 0; i < this.list_data.length; i++) {
          //console.log(this.list_data[i].person.id)
          if (this.list_data[i].person.id == this.Arrays[index].id) {
            this.$message({
              message: "该人物已添加人物关系",
              type: "warning"
            })
            this.Num_name = this.Arrays[index].name
            this.search_true = false
            this.chese=false
            this.ul_lists = false
            this.Arrays=[]
            return false
          }
        }
        this.person_list = []
        this.person_list.push(this.Arrays[index])
        this.Num_name = this.Arrays[index].gate_no
        this.search_true = false
        this.chese=false
        this.ul_lists = false
        this.Arrays=[]
      },
      searchss(Num_name) {
        this.ul_lists = true
        this.chese = true
        if(this.search_true == true){
          search_list({
          'search': Num_name
          }).then(response => {
         // console.log(response.data)
          this.Arrays = response.data.data
        }).catch(response => {
          console.log(err)
        })
        }else{
        this.chese=false
        this.ul_lists = false
        this.Arrays=[]
        }
        
      },

      one() {
        this.is_data = this.$route.params.id
      },
      relations_type() {
        person_type({pagesize:100})
          .then(response => {
           // console.log(response.data.data)
            this.areaList = response.data.data
          })
          .catch(error => {
            console.log(error);
          });
        addition({
            'id': Number(this.is_data)
          }).then(response => {
          //  console.log(response.data.data)
            this.ruleForm.name = response.data.data.name
          })
          .catch(error => {
            console.log(err)
          })
      },
      list_relation() {
        rela_list({
            'id': Number(this.is_data),
          })
          .then(response => {
         //   console.log(response.data)
            this.list_data = response.data.data
          })
          .catch(error => {
            console.log(error);
          });


      },
      closeDialog() {
        this.resetForm("ruleForm");
      },
      deleteList() {
        //console.log(this.checkList)
        for (var g = 0; g < this.checkList.length; g++) {
          this.shuzi.push(`{${this.is_data}:${this.checkList[g]}}`)
        }
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

              del_list({
                  data: this.shuzi.join()
                })
                .then(response => {
                  if (response.data.detail == "success") {
                    this.isCheckedAll = false;
                    this.checkList = [];
                    this.$message({
                      type: "success",
                      message: "删除成功!"
                    });
                    this.list_relation()
                  }
                })
                .catch(error => {
                  console.log(error);
                });

            })
        }
      },

      editor(item_id, relation_id) {
        this.dialogTitle = '修改' + this.ruleForm.name + '的人物关系'
        this.subtit = '修改'
        this.name_guanxi = false
        this.update_id = item_id
        detail_list({
          'id': relation_id
        }).then((response) => {
          if (response.data.detail == "success") {
            //console.log(response.data)
            this.ruleForm.figure_id = response.data.data.id
           // console.log(this.ruleForm.figure_id)
          } else {
            this.$message({
              type: "error",
              message: "获取住房详细信息失败!"
            });
          }

        }).catch((err) => {
          console.log(err)
        })
        addition({
          'id': this.update_id
        }).then((response) => {
          if (response.data.detail == "success") {
           // console.log(response.data)
            this.person_list = [{
              name: response.data.data.name,
              image: response.data.data.image,
              gate_no: response.data.data.house.house_info.name,
            }]
           // console.log(this.person_list)
          } else {
            this.$message({
              type: "error",
              message: "获取住房详细信息失败!"
            });
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.updata_id)
            if (this.update_id) {
              partial_list({
                  'id': Number(this.is_data),
                  'person_info_id': this.update_id,
                  'relation_type_id': this.ruleForm.figure_id
                })
                .then(response => {
                  if (response.data.detail == "success") {
                    this.$message({
                      type: "success",
                      message: "修改成功!"
                    });
                    this.dialogFormVisible = false;
                    this.list_relation()
                    this.name_guanxi = true
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
              for (var o = 0; o < this.person_list.length; o++) {
                if( this.ruleForm.figure_id == ''){
                  this.$message({
                      message: '请选择人物关系',
                      type: 'success',
                    });
                }
              try{
               if(Number(this.is_data) ==  this.person_list[o].id){
                this.$message({
                      message: '添加失败，添加人物不能添加自己',
                      type: 'error',
                    });
               }else{
                create_figure([{
                    'id': Number(this.is_data),
                    'person_info_id': this.person_list[o].id,
                    'relation_type_id': this.ruleForm.figure_id
                  }])
                  .then((response) => {
                    this.$message({
                      message: '添加成功',
                      type: 'success',
                    });
                    this.dialogFormVisible = false
                    this.list_relation()
                  }).catch((err) => {
                      console.log(err)
                  })
               }
              }
              catch(err){
                console.log(err)
              }
              }

            }
          } else {
            if (
              Number(this.ruleForm.cal_name) <= Number(this.Num_name)
            ) {
              create_cal({
                  name: this.ruleForm.name,
                  cap: this.Num_name,
                  cap_used: this.ruleForm.cal_name
                })
                .then(response => {
                  this.$message({
                    message: "添加成功",
                    type: "success"
                  });
                  this.dialogFormVisible = false;
                  this.Car_list_data();
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              this.$message({
                message: "内容有错误，请重新填写",
                type: "success"
              });
            }
          }
        });
      },
      resetForm(formName) {
        // this.$refs[formName].resetFields();

        this.Num_name = ''
        this.ruleForm.cal_name = ''
      },
      deleteItem(item_id) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del_list({
              data: `{${this.is_data}:${item_id}}`
            }).then((response) => {
              this.list_relation()
            }).catch((err) => {
              console.log(err)
            })
            .then(response => {
              this.Car_list_data();
            })
            .catch(err => {
              console.log(err);
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.list_relation()
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      },
      addItem() {
        this.resetForm('ruleForm')
        this.subtit = '添加'
        this.Arrays = []
        this.person_list = []
        this.ul_lists= false
        this.ruleForm.figure_id = ''
        this.name_guanxi = true
        this.update_id = ''
        this.dialogTitle = '添加' + this.ruleForm.name + '的人物关系'
      },
      checkedOne(item_id) {
        let idIndex = this.checkList.indexOf(item_id);
        if (idIndex >= 0) {
          this.checkList.splice(idIndex, 1);
        } else {
          console.log("error submit!!");
          return false;
        }
      },
      checkedAll() {
        this.isCheckedAll = !this.isCheckedAll;
        if (this.isCheckedAll) {
          this.checkList = [];
          this.list_data.forEach(item => {
            // `{${this.is_data}:${item.person.id}}`
            this.checkList.push(item.person.id);
            //console.log(this.checkList)

          });
        } else {
          this.checkList = [];
        }
      },
      addDomain() {
      if (
        this.total_count > this.page_size &&
        this.currentPage != Math.ceil(this.total_count / this.page_size)
      ) {
        this.currentPage = Math.ceil(this.total_count / this.page_size);
        this.initRelation({
          pagesize: this.page_size,
          pageno: this.currentPage,
          search: ""
        });
        setTimeout(() => {
          this.addDomain_item();
        }, 300);
      } else {
        this.addDomain_item();
      }
    },
    addDomain_item() {
      var old_item = this.cameraGroupRuleForm.grouplists[
        this.cameraGroupRuleForm.grouplists.length - 1
      ];
      if (old_item.relation_type == "") {
        this.$message({
          type: "warning",
          message: "请填写新增关系名称再继续操作"
        });
        return;
      }
      this.cameraGroupRuleForm.grouplists.push({
        relation_type: ""
      });
      var this_item = this.cameraGroupRuleForm.grouplists[
        this.cameraGroupRuleForm.grouplists.length - 1
      ];
      relationTypeAdd({ relation_type: this_item.relation_type })
        .then(response => {
          if (response.data.detail == "success") {
            this_item.id = response.data.data.id;
          } else {
            this.$message({
              type: "error",
              message: "新增失败!"
            });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.response.data.detail
          });
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
            relationTypeDestroy({ id: item.id })
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
          relationTypeUpdate(this_arr)
            .then(response => {
              if (response.data.detail == "success") {
                this.$message({
                  type: "success",
                  message: "数据更新成功!"
                });
                this.list_relation();
                this.cameraGroupDialogFormVisible = false;
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

    initRelation(param) {
      relationTypeList(param)
        .then(response => {
          this.total_count = response.data.count;
          this.cameraGroupRuleForm.grouplists = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCurrentChange(cpage) {
      this.initRelation({
        pagesize: this.page_size,
        pageno: cpage,
        search: this.relation_name
      });
    },
    initRelationParam() {
      this.currentPage = 1;
      this.relation_name = "";
      this.initRelation({
        pagesize: this.page_size,
        pageno: this.currentPage,
        search: this.relation_name
      });
    },
    relationBack() {
      this.$router.push({
        name: "PersonInfo"
      });
    },
    getThisPersonInfo() {
      addition({ id: this.is_data })
        .then(response => {
          this.this_person_name = response.data.data.name;
         // console.log(this.this_person_name);
        })
        .catch(error => {
          console.log(error);
        });
    },
    closeDialog2() {
      relationTypeList({ pagesize: 1000 })
        .then(response => {
          var arr = response.data.data;
          if (arr[arr.length - 1].relation_type == "") {
            relationTypeDestroy({ id: arr[arr.length - 1].id })
              .then(response => {
                //console.log(response.data.detail);
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }

  }
  }

</script>

<style>
  .content_inner {
    width: 100%;
    height: 100%;
    padding: 40px;
    padding-top: 20px;
    position: relative;
  }

  .name_labe .el-form-item__content {
    margin-left: 0 !important;
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

  .dialog .el-form-item__content>.el-select,
  .el-form-item__content>.el-input {
    float: left;
    width: 85%;
  }

  .tian .el-form-item__content {
    margin-left: 0 !important;
  }

  .dialog .el-form-item:nth-child(4)>div {
    margin-left: 0 !important;
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

  .dialog .el-form-item__label {
    width: 120px !important;
  }

  .dialog .area-set .el-form-item .el-form-item__content {
    margin-left: 0 !important;
  }

  .dialog .area-set .el-form-item__content>.el-input {
    width: 70%;
    margin-right: 10%;
  }

  .dialog .el-form-item__label {
    width: 120px !important;
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

  #personrelation .el-pagination {
    color: #fff;
  }

  #personrelation .el-pagination button:disabled {
    background-color: transparent;
  }

  #personrelation .el-pager li {
    background: transparent;
  }

  #personrelation .el-pagination .btn-next,
  #personrelation .el-pagination .btn-prev {
    background: transparent;
    color: #fff;
  }

  #personrelation .el-pagination .btn-next:hover,
  #personrelation .el-pagination .btn-prev:hover {
    color: #409EFF;
  }

</style>

<style scoped>
  .delta {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: rgba(1, 174, 255, 0.17) url(/static/IMG/Icon/select_bg.png) no-repeat 98% !important;
    background-size: 23px 23px !important;
    padding-right: 14px;
  }

  .form_control {
    float: left;
    font-family: MicrosoftYaHei;
    font-size: 14px;
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

  .Img {
    width: 70px;
    margin: 3px 0;
    height: 70px;
  }

  .masg {
    width: 648px !important;
    height: 432px !important;
    margin: 1px 1px !important;
  }

  .inner_wrap {
    width: 100%;
    height: 100%;
    position: relative;
    float: left;
    padding-top: 70px;
  }

  .Img {
    width: 70px;
    margin: 3px 0;
    height: 70px;
  }

  .masg {
    width: 648px !important;
    height: 432px !important;
    margin: 1px 1px !important;
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
  .inn_tab{
    width: 500px;
  }
  .inn_tab table{
    width: 500px;
    margin-left: 30px;
    margin-bottom: 20px;
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

  .ul_list {
    height: 300px;
    overflow: auto;
    margin-top: 5px;
    border: 1px solid #cccccc;
    position: absolute;
    width: 370px;
    margin-left: 20px;
    background: white;
    z-index: 10000;
  }

  .ul_list_li {
    clear: both;
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

  .handle_box3 {
    position: absolute;
    top: 0;
    left: 0px;
  }

</style>
