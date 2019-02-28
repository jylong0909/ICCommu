<template>
  <div class="content_inner">
    <div class="inner_wrap personInfo">
      <!-- <HandleMenu></HandleMenu>-->
      <!--<SearchMenu></SearchMenu>-->
      <div class="menu_details">
        <ul>
          <li>设置</li>
          <li>{{Urlstate}}</li>
          <li>{{infopeo}}</li>
        </ul>
      </div>
      <div class="inner_main">
        <div class="search_list">
          <div class="form_group">
            <label style="font-size:14px;float: left;">姓名：</label>
            <el-input v-model="data_json.name_input" clearable class="nameIput" style="width:124px" @keyup.enter.native='search'></el-input>

            <div class="gender" style="float: left;display: inline-block;height: 30px;">
              <label style="font-size:14px;float: left;margin-left: 20px">性　　别：</label>
              <select class="form_control" v-model="data_json.type_id" @change="typeSelect($event)" style="width:124px ;">
                <option value="">全部</option>
                <option v-for="(item, index) in areaList_contal" :key="index" :value="item.value">{{item.name}}</option>
              </select>
            </div>
            <label style="font-size:14px;float: left;margin-left: 20px">证件号码：</label>
            <el-input v-model="data_json.sfz" clearable class="nameIput" style="width:197px"></el-input>　　
          </div>
          <br />
          <div class="form_group">




            <div class="gender" style="float: left;display: inline-block;height: 30px;">
              <label style="float: left;line-height: 30px;font-size:14px">业主：</label>
              <select class="form_control" v-model="data_json.change_Select" @change="change_Select($event)" style="width:124px;">
                <option value="">全部</option>
                <option v-for="(item, index) in owner" :key="index" :value="item.value">{{item.name}}</option>
              </select>
            </div>

            <label style="font-size:14px;float: left;margin-left: 20px">人员类型：</label>
            <select class="form_control" v-model="data_json.peopSelect" @change="peopSelect($event)" style="width:124px">
              <option value="">全部</option>
              <option v-for="(item, index) in types" :key="index" :value="item.value">{{item.name}}</option>
            </select>
          </div>
          <br />


        </div>
        <ul class="handle_box">
          <li class="fl" @click="dialogVisible = true,addItem()">
            <i class="el-icon-circle-plus-outline" style="font-size: 17px; line-height: 30px;"></i>
            <el-button type="text" class='add'>添加</el-button>
          </li>
          <li class="fl" @click="deleteList()"><span class="setIcon setIcon-delete"></span><span class="icon-content">
              <el-button type="text" class='shan' style="margin-right: 6px;">删除</el-button>
            </span></li>
        </ul>
        <ul class="handle_box handle_box2">
          <li class="fl" @click='search'><i class="el-icon-search" style="margin-right:6px; font-size: 17px;line-height: 30px;"></i><span>搜索</span></li>
          <li class="fl" @click="reset"><span class="setIcon setIcon-reset" style="background-size: 85% 85%; background-repeat: no-repeat;margin-left: 13px;
                 margin-top: 7px;"></span><span>重置</span></li>
        </ul>

        <el-dialog class="el_da" :model="ruleForm" ref="ruleForm" :title="dialogTitle" :visible.sync="dialogVisible"
          width="40%" @close='closeDialog'>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size='small'>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请填写名字" style="width: 40%; float: left;"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender_data">
              <el-radio-group v-model="ruleForm.gender_data">
                <el-radio label="0">男</el-radio>
                <el-radio label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="出生日期" required>
              <el-col :span="11">
                <el-form-item prop="date1">
                  <div class="block">
                    <el-date-picker v-model="ruleForm.dataTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                      style='width: 247px;'>
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="证件号码" prop="sfz_name">
              <el-input v-model="ruleForm.sfz_name" placeholder="请填写证件号码" style="width: 247px; float: left;"></el-input>
            </el-form-item>
            <el-form-item label="人员类型" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择人员类型" style='width: 247px;'>
                <el-option label="常住人口" value="0"></el-option>
                <el-option label="流动人口" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="业主" prop="owner_data" class='owener_style'>
              <el-radio-group v-model="ruleForm.owner_data">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="房屋信息">
              <!-- <el-select v-model="ruleForm.housing" filterable placeholder="请选择 (支持模糊查询)" style='width: 247px;'>
                  <el-option v-for="(home,homekey) in Arrays" :key='homekey' :label="home[0]" :value="home[1]">
                  </el-option>
                </el-select> -->
              <select class="form_control delta" v-model="ruleForm.area_id" @change="areaSelect($event)" style="margin-right:10px;">
                <option value="">选择区域</option>
                <option v-for="(item, index) in areaList" :key="index" :value="item.id">{{item.name}}</option>
              </select>
              <select class="form_control delta" v-model="ruleForm.building_id" @change="buildingSelect($event)" style="margin-right:10px;">
                <option value="">选择楼号</option>
                <option v-for="(item, index) in building_list" :key="index" :value="item.id">{{item.name}}</option>
              </select>
              <select class="form_control delta" v-model="ruleForm.unit_id" @change="unitSelect($event)" style="margin-right:10px;">
                <option value="">选择单元</option>
                <option v-for="(item, index) in unit_list" :key="index" :value="item.id">{{item.name}}</option>
              </select>
              <select class="form_control delta" v-model="ruleForm.hosues_id" @change="houseSelect($event)">
                <option value="">选择门牌号</option>
                <option v-for="(item, index) in house_list_data" :key="index" :value="item.id" >{{item.gate_no}}</option>
              </select>
            </el-form-item>
            <el-form-item label="照片信息" prop="descz">
              <!--图片地址给不了没有ip-->
              <img src="" alt="" style="position: absolute;width: 150px; height: 150px;" id='show' v-show='show_one'>
              <img :src="'./'+newImgUrl" id="show_two" alt="" style="position: absolute;width: 150px; height: 150px;"
                v-show='show_three' />
              <i class="el-icon-plus" style="font-size: 72px;
                  height: 150px;
                  border: 1px dashed;
                  width: 150px;
                  position: absolute;"></i>

              <input type="file" @change="onfilechange" id="fil" style="width:150px;opacity: 0; height: 150px;position: absolute; top: 0;left: 3px;" />
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model.number="ruleForm.phone" style="width: 247px; float: left;" placeholder="请输入手机号码" />
            </el-form-item>
            <el-form-item label="教育程度" prop="culture">
              <el-select v-model="ruleForm.culture" placeholder="请选择文化程度" style='width: 247px;'>
                <el-option :label="k.degree==0?'无':k.degree" :value="i+1" v-for='(k,i) in green' :key="i"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item v-for="(domain, index) in ruleForm.domains" :label="'车牌号码 ' + (index+1)" :key="domain.key"
              :prop="'domains.' + index + '.value'">
              <el-input class='che' v-model="domain.value" placeholder="车牌号可填可不填" style='width: 247px;float: left;'></el-input>
              <el-button @click.prevent="removeDomain(domain)" class="del_shaa" style="position: absolute; left: 45%;height: 33px;width:45px;font-size: 20px;padding:9px 9px"
                type="danger"><i class='el-icon-minus add_icon'></i></el-button>
            </el-form-item>
            <el-button @click="addDomain" style='top: 514px; position: absolute;left: 400px;height: 33px;width:45px;padding:9px 9px;font-size: 20px;'
               type='success' class="button_jia"><i class="el-icon-circle-plus-outline add_icon"></i></el-button>
            <br />
            <el-form-item style='margin-left: 0;margin-top: 10px;' class="btn_calss">
              <el-button type="primary" @click="submitForm('ruleForm')" size='small'>保存</el-button>
              <el-button @click="resetForm('ruleForm')" type='warning' size='small'>重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <PagingMenu v-on:listStaic='tabLIst' :searchParam='data_search' :owner='type'></PagingMenu>
        <div class="inner_table">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" @change="checkedAll()" :checked="checkList.length === tdStaic.length" /></th>
                <th>人物照片</th>
                <th>姓名</th>
                <th>性别</th>
                <th>出生日期</th>
                <th>证件号码</th>
                <th>区域</th>
                <th>楼号</th>
                <th>单元号</th>
                <th>门牌号</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tdStaic" :key="index">
                <td><input type="checkbox" :checked="checkList.indexOf(item.id)>=0" @change="checkedOne(item.id)" /></td>
                <td style="height:80px">
                  <el-popover placement="right" title="" trigger="hover">
                    <img :src="'/'+item.image" class="Img masg" v-show="item.image" />
                    <img slot="reference" :src="'/'+item.image" style="height: 70px;width: 70px">
                  </el-popover>
                  <div v-show="!item.image" style="text-align:center;">暂无照片</div>
                </td>
                <td>{{item.name}}</td>
                <td>{{item.gender==0?'男':'女'}}</td>
                <td>{{item.birthday=='None'?'无':item.birthday}}</td>
                <td>{{item.card_no==""?'无':item.card_no}}</td>
                <td>{{item.area==""?'无':item.area}}</td>
                <td>{{item.building==""?'无':item.building}}</td>
                <td>{{item.unit==""?'无':item.unit}}</td>
                <td>{{item.gate_no==""?'无':item.gate_no}}</td>
                <td>
                  <ul class="operate">
                    <li class="edit" @click="dialogVisible = true,editItem(item.id)">编辑</li>
                    <el-button type="text" @click="del(item.id)">
                      <li class="delete">删除</li>
                    </el-button>
                    <el-button type="text" class="guanxi" @click="between(item.id)">
                        <i class="el-icon-share ic"></i> <li class="between">关系</li>
                    </el-button>
                

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
  import HandleMenu from "../common/HandleMenu";
  import SearchMenu from "../common/SearchMenu";
  import PagingMenu from "../common/PagingMenu";
  import router from "@/router/index";
  import {
    dis_play,
    menulist,
    degree,
    delte,
    all,
    update,
    createPerson,
    addition,
    destroy_person,
    partial_update,
    buildinglistById,
    houseAreaInfoList,
    buildingNumberList,
    unitList,
    buildinglist
  } from "@/mock/api";
  export default {
    name: "PersonInfo",

    components: {
      HandleMenu,
      SearchMenu,
      PagingMenu,
    },
    data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("手机号不能为空"));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
          //console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error("请输入正确的手机号"));
          }
        }
      };
      return {
        owner: [{
            name: "是",
            value: "1"
          },
          {
            name: "否",
            value: "0"
          }
        ],
        types: [{
            name: "常住人口",
            value: "0"
          },
          {
            name: "流动人口",
            value: "1"
          }
        ],
        areaList_contal: [{
            name: "男",
            value: "0"
          },
          {
            name: "女",
            value: "1"
          }
        ],

        show_one: true,
        show_three: false,
        src: dis_play,
        type: "PersonInfo",
        infopeo: "",
        Urlstate: "",
        infoUrl: "",
        checkList: [],
        isCheckedAll: false,
        dialogTitle: "添加人员详细信息",
        newImgUrl: "",
        updata_id: "",
        imageUrl: "",
        Arrays: [],
        searchVal: "",
        dialogVisible: false,
        tdStaic: [],
        green: [],
        culture: [],
        radio: "",
        gender: "",
        data_json: {
          sfz: "",
          name_input: "",
          type_id: "",
          change_Select: "",
          peopSelect: ""
        },
        data_search: "",
        ruleForm: {
          name: "",
          region: "0",
          culture: "",
          area_id: "",
          building_id: "",
          unit_id: "",
          hosues_id: "",
          phone: "",
          domains: [{
            value: " "
          }],
          dataTime: "",
          delivery: false,
          type: [],
          owner_data: "1",
          gender_data: "0",
          desc: "",
          sfz_name: ""
        },
        rules: {
          name: [{
              required: true,
              message: "请输入名字",
              trigger: "blur"
            },
            {
              min: 2,
              max: 4,
              message: "长度在 2 到 4 个字符",
              trigger: "blur"
            }
          ],
          region: [{
            required: true,
            message: "请选择人员类型",
            trigger: "change"
          }],
          dataTime: [{
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }],

          type: [{
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }],
          owner_data: [{
            required: true,
            message: "请选择业主",
            trigger: "change"
          }],
          sfz_name: [{
              required: true,
              message: "请填写证件号码",
              trigger: "blur"
            },
            {
              message: "长度必须18位",
              trigger: "blur"
            }
          ],
          gender_data: [{
            required: true,
            message: "请选择性别",
            trigger: "change"
          }],
          imageUrl: [{
            required: true,
            message: "请上传图片",
            trigger: "blur"
          }],
          phone: [{
            validator: checkPhone,
            trigger: "blur",
            required: true
          }],

          culture: [{
            required: true,
            message: "请填写文化程度",
            trigger: "blur"
          }
        ]
      },
      numArray: [],
      menu_list: [],
      areaList: [],
      building_list: [],
      unit_list: [],
      house_list_data: [],
      item_id_betw:0,
    };
  },
    mounted() {
      this.deg();
      this.allhouse();
      this.router();
      this.list_pei();
      this.search();
      this.house_list_display();
    },

    methods: {
      between(id) {
      this.item_id_betw = id
     // this.$emit('item_id_list',this.item_id_betw)
    //     this.$router.push({path:'PersonRelation',query:{id:this.item_id_betw}})
    //  router.push({ name: "PersonRelation" });
        this.$router.push({
          path: `PersonRelation/${id}`,
        })
        // this.$router.push({
        //   path: '/PersonRelation',
        //   query: {
        //     id: id
        //   }
        // })
    },
      house_list_display() {
        houseAreaInfoList()
          .then(response => {
            this.areaList = response.data.data;
          })
          .catch(error => {
            console.log(error);
          });
        buildingNumberList({
            pagesize: 10000
          })
          .then(response => {
            this.building_list = response.data.data;

          })
          .catch(error => {
            console.log(error);
          });
        // unitList({
        //     pagesize: 10000
        //   })
        //   .then(response => {
        //     this.unit_list = response.data.data;
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
        // buildinglist({
        //     pagesize: 10000
        //   })
        //   .then(response => {
        //     this.house_list_data = response.data.data;
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
      },
      areaSelect(event) {
        this.ruleForm.area_id = event.target.value;
        buildingNumberList({
            area_info_id: this.ruleForm.area_id,
            pagesize: 10000
          })
          .then(response => {
            this.building_list = response.data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      buildingSelect(event) {
        this.ruleForm.building_id = event.target.value;
        if (this.ruleForm.building_id) {
          unitList({
              building_info_id: this.ruleForm.building_id,
              pagesize: 10000
            })
            .then(response => {
              this.unit_list = response.data.data;
              this.house_list_data = []
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.unit_list = [];
        }
      },
      unitSelect(event) {
        this.ruleForm.unit_id = event.target.value;
        if (this.ruleForm.unit_id) {
          buildinglist({
              unit_info_id: this.ruleForm.unit_id,
              pagesize: 10000
            })
            .then(response => {
              this.house_list_data = response.data.data;
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.house_list_data = [];
        }
      },
      houseSelect(event) {
        this.ruleForm.hosues_id = event.target.value;
      },

      removeDomain(item) {
        var index = this.ruleForm.domains.indexOf(item);
        if (index !== -1) {
          this.ruleForm.domains.splice(index, 1);
        }
      },
      peopSelect(event) {
        this.data_json.peopSelect = event.target.value;
      },
      change_Select(event) {
        this.data_json.change_Select = event.target.value;
      },
      typeSelect(event) {
        this.data_json.type_id = event.target.value;
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
              destroy_person({
                  id: this.checkList.join()
                })
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
      checkedAll() {
        this.isCheckedAll = !this.isCheckedAll;
        if (this.isCheckedAll) {
          this.checkList = [];
          this.tdStaic.forEach(item => {
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
        try{
          this.updata_id = "";
        this.show_one = true;
        this.show_three = false;
        this.ruleForm.area_id = "";
        this.imageUrl = ''
        this.ruleForm.building_id = "";
        this.ruleForm.unit_id = "";
        this.ruleForm.hosues_id = "";
        this.resetForm("ruleForm");
        document.getElementById('show').src = ''
        this.unit_list = []
        this.house_list_data = []
        this.building_list = []
        }
        catch(err){
          console.log(err)
        }
      },
      editItem(item_id) {
        this.show_one = false;
        this.show_three = true;
        this.updata_id = item_id;
        this.dialogTitle = "编辑人员详细信息";
        addition({
            id: this.updata_id
          })
          .then(response => {
            var updata_data = response.data.data;
            if (response.data.detail == "success") {
              this.ruleForm.name = updata_data.name;
              this.ruleForm.region = updata_data.type ? "流动人口" : "常住人口";
              this.ruleForm.dataTime = updata_data.birthday;
              this.ruleForm.culture = updata_data.degree_id;
              // if( updata_data.degree_id == Number(0)){
              //        this.ruleForm.culture = '无'
              // }else{
              //   this.ruleForm.culture = updata_data.degree_id;
              // }
              this.ruleForm.owner_data = String(updata_data.is_owner);
              this.newImgUrl = updata_data.image;
              this.ruleForm.gender_data = String(updata_data.gender);
              this.ruleForm.phone = updata_data.phone;
              this.ruleForm.area_id = updata_data.house.area_info.id;
              if (this.ruleForm.area_id) {
              buildingNumberList({
            area_info_id: this.ruleForm.area_id,
            pagesize: 10000
          })
          .then(response => {
            this.building_list = response.data.data;
          })
          .catch(error => {
            console.log(error);
          });}else {
              this.building_list = []
              this.unit_list = [];
              this.house_list_data = [];
            }
              this.ruleForm.building_id = updata_data.house.building_info.id;
              if (this.ruleForm.building_id) {
              unitList({
                building_info_id: this.ruleForm.building_id,
                pagesize: 10000
              })
                .then(response => {
                  this.unit_list = response.data.data;
                })
                .catch(error => {
                  console.log(error);
                });
            } else {
              this.unit_list = [];
              this.house_list_data = [];
            }
              this.ruleForm.unit_id = updata_data.house.unit_info.id;
              if (this.ruleForm.unit_id) {
              buildinglist({
                unit_info_id: this.ruleForm.unit_id,
                pagesize: 10000
              })
                .then(response => {
                  this.house_list_data = response.data.data;
                })
                .catch(error => {
                  console.log(error);
                });
            } else {
              this.house_list_data = [];
            }
              this.ruleForm.hosues_id = updata_data.house.house_info.id;
              this.ruleForm.sfz_name = updata_data.card_no;
              if (updata_data.plate == "") {} else {
                this.ruleForm.domains = [];
                for (var i = 0; i < updata_data.plate.length; i++) {
                  this.ruleForm.domains.push({
                    value: updata_data.plate[i].plate
                  });
                }
              }
            } else {
              this.$message({
                type: "error",
                message: "获取住房详细信息失败!"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      addDomain() {
        this.ruleForm.domains.push({
          value: "",
          key: Date.now()
        });
      },
      submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //console.log('submit!')
          if (this.updata_id) {
            this.numArray = [];
            for (var i = 0; i < this.ruleForm.domains.length; i++) {
              this.numArray.push(this.ruleForm.domains[i].value);
            }
            partial_update({
              id: this.updata_id,
              name: this.ruleForm.name,
              type: Number(this.ruleForm.region == "流动人口" ? 1 : 0),
              birthday: this.ruleForm.dataTime,

              house_info_id: this.ruleForm.hosues_id,

              is_owner: Number(this.ruleForm.owner_data),
              gender: Number(this.ruleForm.gender_data),
              image: this.newImgUrl,
              card_no: this.ruleForm.sfz_name,
              degree_id: this.ruleForm.culture,
              plate_number: this.numArray,
              phone: String(this.ruleForm.phone)
            })
              .then(response => {
                if (response.data.detail == "success") {
                  this.$message({
                    type: "success",
                    message: "修改成功!"
                  });

                  this.dialogVisible = false;
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
            this.numArray = [];
            this.show_one = true;
            this.show_three = false;
            for (var i = 0; i < this.ruleForm.domains.length; i++) {
              this.numArray.push(this.ruleForm.domains[i].value);
            }
            createPerson({
              name: this.ruleForm.name,
              type: Number(this.ruleForm.region),
              birthday: this.ruleForm.dataTime,
              house_info_id: this.ruleForm.hosues_id,
              is_owner: Number(this.ruleForm.owner_data),
              gender: Number(this.ruleForm.gender_data),
              image: this.newImgUrl,
              card_no: this.ruleForm.sfz_name,
              degree_id: this.ruleForm.culture,
              plate_number: this.numArray,
              phone: this.ruleForm.phone
            })
              .then(response => {
                // console.log(response)
                  this.$message({
                    message: "添加成功",
                    type: "success"
                  });
                  this.dialogVisible = false;
                  this.resetForm("ruleForm");
                  this.search();
                
              })
              .catch(err => {
                console.log(err);
                this.$message({
                  message: err.response.data.detail,
                  type: "error"
                });
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
      onfilechange() {
        var _this = this;
        var reads = new FileReader();
        const f = document.getElementById("fil").files[0];
        reads.readAsDataURL(f);
        //console.log(reads)
        var newImg = "";
        reads.onload = function (e) {
          document.getElementById("show").src = this.result;
          _this.imageUrl = reads.result.split(",")[1];
          update({
              image: _this.imageUrl
            })
            .then(response => {
              _this.newImgUrl = response.data.data.path;
            })
            .catch(error => {
              console.log(error);
            });
        };
      },
      allhouse() {
        all()
          .then(response => {
            var obj = response.data.data;
            for (var i in obj) {
              this.Arrays.push([i, obj[i]]);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm.dataTime = "";
        this.ruleForm.sfz_name = "";
        this.ruleForm.domains = [{
          value: ""
        }];
      },
      del(id) {
        this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            delte({
                id: id
              })
              .then(response => {
                this.search();
              })
              .catch(err => {
                console.log(err);
              });
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      closeDialog() {
        this.resetForm("ruleForm");
      },
      //重置

      reset() {
        this.data_json.type_id = "";
        this.data_json.change_Select = "";
        this.data_json.peopSelect = "";
        this.newImgUrl = "";
        this.data_json.sfz = "";
        this.data_json.name_input = "";

        this.house_list_display();
        this.search();
      },
      tabLIst(data) {
        this.tdStaic = data;
        // console.log(data);
        this.culture = [];
        for (var i = 0; i < this.tdStaic.length; i++) {
          for (var j = 0; j < this.green.length; j++) {
            if (this.tdStaic[i].degree_id == this.green[j].id) {
              this.culture.push(this.green[j].degree);
            }
          }
        }
      },
      deg() {
        degree()
          .then(response => {
            //  console.log(response.data.data)
            this.green = response.data.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      search() {
        this.data_search = {
          type: this.data_json.peopSelect,
          is_owner: this.data_json.change_Select,
          gender: this.data_json.type_id,
          pageno: "1",
          card_no: this.data_json.sfz,
          name: this.data_json.name_input
        };
        // console.log(this.data_search);
      }
    }
  };

</script>
<style>
  .delta {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: rgba(1, 174, 255, 0.17) url(/static/IMG/Icon/select_bg.png) no-repeat 98% !important;
    background-size: 23px 23px !important;
    padding-right: 14px;
  }

  .masg {
    width: 648px !important;
    height: 432px !important;
    margin: 1px 1px !important;
  }

  /* .delta{
      background: rgba(1,174,255,.17) url(/static/IMG/Icon/select_bg.png) no-repeat 98% !important;
    }
    .delta::-ms-expand { display: none !important; } */
  .personInfo .el-form-item:nth-child(11) .del_shaa {
    display: none;
  }

  .shan {
    line-height: 0;
    font-size: 15px;
    color: #ffffff !important;
  }

  .el-form-item__content .el-icon-plus:before {
    position: absolute;
    top: 25%;
    left: 40px;
  }

  .el-scrollbar__view>button {
    float: left;
    display: inline-block;
    height: 30px;
    line-height: 5px;
  }

  .fangwu {
    width: 80%;
    float: left;
  }

  .fangwu>input {
    width: 100%;
    height: 30px;
    margin-left: 10px;
  }

  /*.personInfo .owener_style .el-form-item__error{
        margin-left: 100px;
      }*/
      .personInfo .el-form-item:last-child>div {
    margin-left: 0 !important;
  }

  .personInfo .el-form-item:nth-child(8) {
    position: absolute;
    top: 30px;
    left: 51%;
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

  .block {
    float: left;
  }

  .add_icon {
    display: block !important;
    margin-top: -3px;
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

  .gender {
    padding-left: -10px;
  }

  .el_da .el-radio {
    display: inline-block;
    line-height: 30px;
    padding-left: 10px;
    color: #01aeff;
  }

  .el_da .el-radio+.el-radio {
    margin-left: 0;
  }

  .el-radio__input.is-checked+.el-radio__label {
    color: #49f1e7;
  }

  .el_da .el-dialog__body {
    position: relative;
  }

  .el-radio__input.is-checked .el-radio__inner {
    border-color: #49f1e7;
    background-color: #49f1e7;
  }

  .el_da .el-radio-group {
    line-height: 30px !important;
    float: left;
    padding-top: 3px;
  }

  .nameIput>.el-input__inner {
    font-family: MicrosoftYaHei;
    font-weight: normal;
    font-stretch: normal;
    height: 30px;
    line-height: 30px;
    letter-spacing: 0px;
    color: #01aeff;
    padding-left: 12px;
    border-radius: 1px;
    border: solid 1px rgba(1, 174, 255, 0.4);
    background: rgba(1, 174, 255, 0.17);
  }

</style>
<style scoped>
  .nameIput {
    width: 20%;
    height: 30px;
    float: left;
  }

  .Img {
    width: 70px;
    margin: 3px 0;
    height: 70px;
  }

  .content_inner {
    width: 100%;
    height: 100%;
    padding: 40px;
    padding-top: 20px;
    position: relative;
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  /*   
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
     */
  .el-select {
    float: left;
  }

  .el-range-editor {
    border: solid 1px rgba(1, 174, 255, 0.4) !important;
    background: rgba(1, 174, 255, 0.17) !important;
    height: 30px !important;
    line-height: 30px !important;
  }

  .add {
    font-size: 15px;
    line-height: 4px;
    color: #ffffff;
  }

  .search_list {
    position: absolute;
    top: -20px;
    left: 0;
  }

  .form_group {
    float: left;
    height: 30px;
    line-height: 30px;
    font-family: SimHei;
    font-size: 18px;
    color: #01aeff;
    margin-top: 20px;
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

  .form_group select {
    padding-right: 25px;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: rgba(1, 174, 255, 0.17) url("/static/IMG/Icon/select_bg.png") no-repeat 98% center;
    background-size: 23px 23px;
    cursor: pointer;
  }

  .form_group select option {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: #054164;
  }

  .menu_details ul li {
    float: left;
  }

  .menu_details ul li:not(:last-child) {
    padding-right: 15px;
    background: url(/static/IMG/Icon/menuArrow.png) no-repeat 95% center;
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
    margin-top: 30px;
  }

  .inner_table table {
    width: 1500px;
    color: #49f1e7;
    text-align: center;
  }
  .btn_calss button:nth-child(2){
    margin-left: 10px;
  }

  .inner_table td {
    height: 81.3px !important;
  }

  .inner_table td,
  .inner_table th {
    font-family: SimHei;
    height: 50px;
    font-size: 14px;
  }

  .inner_table td,
  .inner_table th:last-child {
    width: 150px;
  }

  .inner_table thead {
    background: rgba(7, 16, 32, 0.4);
    font-weight: bold;
    color: #01aeff;
  }

  .inner_table tr td:first-child {
    width: 90px;
  }

  .inner_table tbody tr:nth-child(odd) {
    background: rgba(1, 174, 255, 0.17);
  }

  .inner_table tbody tr:nth-child(even) {
    background: rgba(1, 174, 255, 0.08);
  }

  .operate {
    width: 175px;
    display: inline-block;
  }

  .operate li {
    display: inline-block;
    height: 22px;
    line-height: 22px;
    font-size: 14px;
    cursor: pointer;
  }

  .operate li.edit {
    background: url("/static/IMG/Icon/edit.png") no-repeat;
    background-size: 20px 20px;
    color: #01aeff;
    padding-left: 22px
  }
  
  .operate li.delete {
    background: url("/static/IMG/Icon/delete.png") no-repeat;
    background-size: 15px 20px;
    color: #ff0101;
    padding-left: 18px;
  }
  .ic{
    font-size: 20px !important;
    margin-top: 5px;
  }
  .active {
    color: #49f1e7;
  }

  .handle_box {
    position: absolute;
    top: 0;
    right: 0;
  }

  .handle_box2 {
    width: 300px;
    position: absolute;
    top: 0;
    left: 720px;
  }

  .handle_box>li {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 1px;
    border: solid 1px rgba(217, 159, 0, 0.4);
    font-family: SimHei;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    background: rgba(217, 159, 0, 0.17);
    margin-right: 20px;
    cursor: pointer;
    border-radius: 5px;
  }

  .setIcon {
    float: left;
    margin: 5px -4px 4px 7px;
    width: 18px;
    height: 18px;
    background-repeat: no-repeat;
  }

  .inner_main {
    position: relative;
    width: 100%;
    padding-top: 70px;
    height: 100%;
  }

  .handle_box>li:last-child {
    margin-right: 0;
  }

  .setIcon-delete {
    background-image: url("/static/IMG/Icon/delete_white.png");
  }

  .setIcon-add {
    background: url("/static/IMG/Icon/add.png");
  }

  .setIcon-search {
    background: url("/static/IMG/Icon/search.png");
  }

  .setIcon-reset {
    background: url("/static/IMG/Icon/reset.png");
  }
.guanxi{
  margin-left: -3px !important;
}
.button_jia > span,.del_shaa > span{
     display: block !important;
    margin-top: -2px;
}
</style>
