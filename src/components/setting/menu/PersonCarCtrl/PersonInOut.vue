<template>
  <div class="content_inner" id="PersonInOut" @click="hideMenu($event)">
    <div class="inner_wrap">
    <div class="menu_details">
      <ul>
        <li>设置</li>
        <li>{{Urlstate}}</li>
        <li>{{infopeo}}</li>
      </ul>
    </div>
    <div class="inner_main personInOut">
      <ul class="handle_box handle_box2">
        <li class="fl" @click="search"><span class="setIcon setIcon-search"></span><span class="icon-content">搜索</span></li>
        <li class="fl" @click="reset"><span class="setIcon setIcon-reset"></span><span class="icon-content">重置</span></li>
      </ul>
    <div class="search_list">
      <div class="form_group">
        <label>姓&nbsp;&nbsp;名：</label>
        <input type="text" class="form_control" v-model="person_name" placeholder="请输入姓名" style="margin-right:10px;">
        <label>性&nbsp;&nbsp;别：</label>
        <select class="form_control" v-model="gender_id" @change="genderSelect($event)" style="margin-right:10px;">
          <option value="">全部</option>
          <option value="1">女</option>
          <option value="2">男</option>
        </select>
        <label>证件号码：</label>
        <input type="text" class="form_control" v-model="person_idCard" placeholder="请输入证件号码" style="margin-right:10px;width: 165px;">
        <label>人物底库：</label>
        <!-- <el-select class="form_control" v-model="person_group_ids" multiple collapse-tags placeholder="请选择" @change="groupIdsSelect" style="margin-right:10px;">
          <el-option v-for="(item, index) in personGruop_list" :key="index" :value="item.id" :label="item.name"></el-option>
        </el-select> -->
        <select class="form_control" v-model="person_group_ids" @change="groupIdsSelect($event)" style="margin-right:10px;">
          <option value="">全部</option>
          <option v-for="(item, index) in personGruop_list" :key="index" :value="item.id">{{item.name}}</option>
        </select>
        <label>门禁一体机：</label>
        <!-- <select class="form_control" v-model="person_src_ids" @change="srcIdsSelect($event)" style="margin-right:10px;">
          <option value="">全部</option>
          <option v-for="(item, index) in getCameraTree_list" :key="index" :value="item.id">{{item.camera_name}}</option>
        </select> -->
        <div class="camera_tree form_control" @click="isShow = !isShow" id="camera_tree" style="color: rgba(170,193,198,.7);">
          点击展开
          <div class="camera_tree_item" v-show="isShow" id="camera_tree_item">
            <el-tree
              :data="getCameraTree_list"
              ref="tree"
              show-checkbox
              node-key="src_id"
              :props="defaultProps">
            </el-tree>
          </div>
        </div>
      </div>
      <div class="form_group" style="margin-top: 30px;">
        <label>时间段：</label>
        <el-date-picker
          v-model="datetimeArr"
          type="datetimerange"
          start-placeholder="起始时间"
          end-placeholder="终止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change='dateChange'
          style='border-radius: 1px;float:left;margin-right:10px;'
        >
        </el-date-picker>
        <label>身份状态：</label>
        <select class="form_control" v-model="processe_id" @change="processedSelect($event)" style="margin-right:10px;">
          <option value="">全部</option>
          <option value="2">已确认</option>
          <option value="1">已注册</option>
          <option value="0">未注册</option>
        </select>
      </div>
    </div>
    <div class="inner_table">
      <table>
      <thead>
        <tr>
          <th>人物照片</th>
          <th>姓名</th>
          <th>性别</th>
          <th>年龄</th>
          <th>证件号码</th>
          <th>人物分组</th>
          <th>身份状态</th>
          <th>抓拍摄像头</th>
          <th>抓拍时间</th> 
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in parent_data_list" :key="item.id">
          <td><img :src="'http://'+src+item.image" class="Img"></td>
          <td>{{item.status?item.person_matched.name:'未知身份'}}</td>
          <td>{{item.status?(item.person_matched.gender==1?'女':(item.person_matched.gender==2?'男':'未知')):(item.gender==1?'女':(item.gender==2?'男':'未知'))}}</td>
          <td>{{item.age}}</td>
          <td>{{item.status?item.person_matched.id_card:''}}</td>
          <td>{{item.status?item.person_matched.group_name:'未知分组'}}</td>         
          <td>{{item.status==1?'已注册':(item.status==2?'已确认':'未注册')}}</td>
          <td>{{item.camera_name}}</td>
          <td>{{item.createdate}}</td>         
        </tr>
      </tbody>
      </table>    
    </div>
    <PagingMenu :owner="type" @personInOutList="parentDataList" :searchParam="search_params"></PagingMenu>
    </div>
  </div>
  </div>
</template>
<script>
import PagingMenu from "../common/PagingMenu";
import { menulist, personGruop, getCameraTree ,faceIp} from "@/mock/api";
export default {
  name: "PersonInOutInfo",
  components: {
    PagingMenu
  },
  data() {
    return {
      type: "PersonInOutInfo",
      src:faceIp,
      parent_data_list: [],
      search_params: "",
      datetimeArr: [],
      person_name: "",
      person_idCard: "",
      person_src_ids: "",
      gender_id: "",
      person_group_ids: "",
      oldOptions: [],
      processe_id: "",
      personGruop_list: [],
      infopeo: "",
      Urlstate: "",
      menu_list: [],
      getCameraTree_list: [
        {
          id: 1,
          group_name: "全部",
          cameras: []
        }
      ],
      
      defaultProps: {
        children: "cameras",
        label: function(data) {
          return data.group_name || data.camera_name;
        }
      },
      isShow: false
    };
  },
  mounted() {
    this.search();
    this.router();
    this.list_pei();
    console.log(this.src)
  },
  methods: {
    dateChange(value) {
      this.datetimeArr = value;
    },
    genderSelect(event) {
      this.gender_id = event.target.value;
    },
    // groupIdsSelect(val) {
    //   const allValues = [];
    //   for (const item of this.personGruop_list) {
    //     allValues.push(item.id);
    //   }
    //   const oldVal = this.oldOptions.length === 1 ? this.oldOptions[0] : [];
    //   if (val.includes("ALL_SELECT")) this.person_group_ids = allValues;
    //   if (oldVal.includes("ALL_SELECT") && !val.includes("ALL_SELECT"))
    //     this.person_group_ids = [];
    //   if (oldVal.includes("ALL_SELECT") && val.includes("ALL_SELECT")) {
    //     const index = val.indexOf("ALL_SELECT");
    //     val.splice(index, 1);
    //     this.person_group_ids = val;
    //   }
    //   if (!oldVal.includes("ALL_SELECT") && !val.includes("ALL_SELECT")) {
    //     if (val.length === allValues.length - 1)
    //       this.person_group_ids = ["ALL_SELECT"].concat(val);
    //   }
    //   this.oldOptions[0] = this.person_group_ids;
    //   console.log(this.person_group_ids)
    // },
    groupIdsSelect(event) {
      // this.person_group_ids = [];
      // this.person_group_ids.push(event.target.value);
      this.person_group_ids = event.target.value;
      console.log(this.person_group_ids);
    },
    srcIdsSelect(event) {
      this.person_src_ids = event.target.value;
    },
    processedSelect(event) {
      this.processe_id = event.target.value;
      console.log(this.processe_id);
    },
    parentDataList(data) {
      this.parent_data_list = data;
    },
    search() {
      this.search_params = {
        page: 1,
        is_processed: this.processe_id,
        name: this.person_name,
        id_card: this.person_idCard,
        gender: this.gender_id,
        group_ids: `[${this.person_group_ids}]`,
        src_ids: this.person_src_ids,
        number: 7,
        start_time: this.datetimeArr[0],
        end_time: this.datetimeArr[1]
      };
      // this.search_params = `page=1&is_processed=${this.processe_id}&name=${this.person_name}&id_card=${this.person_idCard}&gender=${this.gender_id}&group_ids=${this.person_group_ids}&src_ids=${this.person_src_ids}&number=7&start_time=${this.datetimeArr[0]?this.datetimeArr[0]:''}&end_time=${this.datetimeArr[1]?this.datetimeArr[1]:''}`
    },
    reset() {
      this.$refs.tree.setCheckedKeys([]);
      this.person_name = "";
      this.gender_id = "";
      this.person_idCard = "";
      this.person_src_ids = "";
      this.person_group_ids = "";
      this.datetimeArr = [];
      this.processe_id = "";
      this.search();
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
    getCheckedKeys() {
      var arr = this.$refs.tree.getCheckedKeys();
      var arr2 = [];
      for (var k in arr) {
        if (arr[k] != undefined) {
          arr2.push(arr[k]);
        }
      }
      this.person_src_ids = arr2.join(',');
    },
    hideMenu(event) {
      if(this.isShow == false){
        return
      }else if (!(event.target.id == "camera_tree")) {
        this.isShow = false
        this.getCheckedKeys()
      }
    }
  },
  created() {
    personGruop()
      .then(response => {
        // this.personGruop_list = [{id:'ALL_SELECT',name:'全部'}].concat(response.data.data.groups);
        this.personGruop_list = response.data.data.groups;
      })
      .catch(error => {
        console.log(error);
      });
    getCameraTree()
      .then(response => {
        this.getCameraTree_list[0].cameras = response.data.data;
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
.personInOut .el-form-item:last-child .el-form-item__content {
  margin-left: 0 !important;
}
.el-form-item__content > .el-textarea {
  float: left;
  width: 85%;
}
.camera_tree .camera_tree_item .el-tree {
  color: #01aeff;
  background: #054164;
}
#PersonInOut .el-tree-node__content,
#PersonInOut .el-tree-node__content:hover {
  background-color: rgba(1, 174, 255, 0.17) !important;
  padding-right: 10px
}
#PersonInOut .el-tree-node > .el-tree-node__children .el-tree-node__content {
  height: 25px;
  line-height: 25px;
  padding-right: 10px;
}
#PersonInOut .el-tree-node__label {
  font-size: 12px;
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
  width: 200px;
  top: 0;
  left: 1100px;
  z-index: 2;
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
  padding-top: 125px;
  width: 100%;
  height: 100%;
}
.Img {
  width: 70px;
  margin: 3px 0;
  height: 70px;
}
.camera_tree {
  position: relative;
  cursor: pointer;
}
.camera_tree .camera_tree_item {
  position: absolute;
  top: 30px;
  left: -1px;
  color: #01aeff;
  border-radius: 1px;
  border: solid 1px rgba(1, 174, 255, 0.4);
  background: rgba(1, 174, 255, 0.17);
}
</style>
