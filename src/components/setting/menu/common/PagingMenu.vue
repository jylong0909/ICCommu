<template>
    <div class="paging pagingStyle">
      <div class="paging_item" @click="firstPage">首页</div>
                  <el-pagination
              class='el_item'
              @current-change="handleCurrentChange"
              :total="total_count"
              @size-change="handleSizeChange"
                :current-page.sync="currentPage"
                :page-size="page_size"
                :pager-count="5"
                layout="total,  prev, pager, next, jumper"
                >
              >
            </el-pagination>
            
      <div class="paging_item pucho_item" @click="puchoPage">尾页</div>
            
    </div>
  </template>
  <script>
import {
  buildinglist,
  list,
  alarmList,
  PolicesituationList,
  car_list,
  carnum_list,
  person_data,
  camerasList,
  system_menu,
  houseall,
  houseAreaInfoList,
  car_track,
  faceTrack
} from "@/mock/api";
export default {
  name: "PagingMenu",
  props: ["owner", "searchParam", "house"],
  data() {
    return {
      currentPage: 1,
      total_count: 0,
      page_size: 12,
      data_list: [],
      data_list_buildinglist: [],
      houses: "",
      data_list_untis: []
    };
  },
  mounted() {
    this.getDataInfolist(this.searchParam);
  },
  methods: {
    handleSizeChange(psize) {
      // this.page_size = psize;
      // console.log(`每页 ${psize} 条`);
    },
    handleCurrentChange(cpage) {
      // this.currentPage = cpage;
      //console.log(`当前页: ${cpage}`);
      if (this.owner == "PersonInOutInfo") {
        this.searchParam.page = cpage;
      } else {
        this.searchParam.pageno = cpage;
      }
      this.getDataInfolist(this.searchParam);
    },
    firstPage() {
      if (this.owner == "PersonInOutInfo") {
        this.searchParam.page = 1;
      } else {
        this.searchParam.pageno = 1;
      }
      this.getDataInfolist(this.searchParam);
      this.currentPage = 1;
    },
    getDataInfolist(param) {
      if (param == "") {
        return;
      }
      if (this.owner == "BuildingInfo") {
        buildinglist(param)
          .then(response => {
            this.total_count = response.data.count;
            this.data_list = response.data.data;
            this.$emit("dataList", this.data_list);
          })
          .catch(error => {
            console.log(error);
          });
      } else if (this.owner == "PersonInfo") {
        this.page_size = 7;
        list(param)
          .then(response => {
            this.data_list = response.data.data;
            //console.log(this.data_list)
            //console.log(this.listDapagingta.plate)
            this.$emit("listStaic", this.data_list);
            this.total_count = response.data.count;
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.owner == "NoticeInfo") {
        alarmList(param)
          .then(response => {
            this.total_count = response.data.count;
            this.data_list = response.data.data;
            this.$emit("noticeList", this.data_list);
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.owner == "policesituation") {
        PolicesituationList(param)
          .then(response => {
            this.total_count = response.data.count;
            this.data_list = response.data.data;
            this.$emit("noticeList", this.data_list);
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.owner == "PersonFlow") {
        person_data(param)
          .then(response => {
            this.data_list = response.data.data.facetracks;
            //console.log(this.data_list)
            //console.log(this.listDapagingta.plate)
            this.$emit("person_list", this.data_list);
            this.total_count = response.data.data.facetracks_total;
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.owner == "cameraInfo") {
        camerasList(param)
          .then(response => {
            this.total_count = response.data.count;
            this.data_list = response.data.data;
            this.$emit("theCameraList", this.data_list);
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.owner == "MenuConfig") {
        system_menu(param)
          .then(response => {
            this.data_list = response.data.data;
            // console.log(this.data_list);
            //console.log(this.listDapagingta.plate)
            this.$emit("MenuList", this.data_list);
            this.total_count = response.data.data.length;
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.owner == "CarInOutInfo") {
        // this.page_size = 8;
        car_track(param)
          .then(response => {
            this.total_count = response.data.count;
            this.data_list = response.data.data;
            this.$emit("carInOutList", this.data_list);
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.owner == "PersonInOutInfo") {
        this.page_size = 7;
        faceTrack(this.$qs.stringify(param))
          .then(response => {
            this.total_count = response.data.data.facetracks_total;
            this.data_list = response.data.data.facetracks;
            this.$emit("personInOutList", this.data_list);
          })
          .catch(err => {
            console.log(err);
          });
      }

      // else if(this.owner == 'Regional'){
      //   houseall(param)
      //     .then(response => {
      //       this.data_list = response.data.data.areas;
      //       console.log(this.data_list)
      //       //console.log(this.listDapagingta.plate)
      //       this.$emit("houseList", this.data_list);
      //       this.total_count = response.data.data.areas.length;
      //       for(var i=0;i<this.data_list.length;i++){
      //       this.data_list_buildinglist.push(this.data_list[i].buildings)
      //       console.log(this.data_list_buildinglist)
      //       this.$emit('housebuilding',this.data_list_buildinglist)
      //       console.log(this.data_list_buildinglist[i])
      //        for(var j=0;j<this.data_list_buildinglist.length;j++){
      //           this.data_list_untis.push(this.data_list_buildinglist[j][j].units)

      //           this.$emit('houseunits',this.data_list_untis)
      //           console.log(this.data_list_untis)
      //         }
      //     }

      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });

      // }
    },
    puchoPage() {
      if (this.owner == "PersonInOutInfo") {
        this.searchParam.page = Math.ceil(this.total_count / this.page_size);
      } else {
        this.searchParam.pageno = Math.ceil(this.total_count / this.page_size);
      }
      this.getDataInfolist(this.searchParam);
      this.currentPage = this.total_count;
    }
  },
  watch: {
    searchParam: {
      handler(newValue, oldValue) {
        this.getDataInfolist(this.searchParam);
        this.currentPage = 1;
      }
    }
    // house:{
    //   handler(newValue,oldValue){
    //    this.houses =  this.house
    //    this.total_count = Number(this.houses)
    //    console.log( Number(this.houses))
    //    console.log(this.house)
    //   }
    // }
  }
};
</script>
  <style>
      .paging .el-input__inner {
        width: 50px;
        text-align: center;
        height: 30px !important;
        line-height: 30px !important;
        border-radius: 1px !important;
        border: solid 1px rgba(1, 174, 255, 0.4) !important;
        background: rgba(1, 174, 255, 0.17) !important;
        font-family: MicrosoftYaHei !important;
        font-size: 14px !important;
        font-weight: normal !important;
        font-stretch: normal !important;
        letter-spacing: 0px !important;
        color: #ffffff !important;
      
        cursor: auto !important;
      }
      .paging .el-input {
        margin-left: 15px;
        margin-right: 15px;
      }
      .paging .el-pagination__jump {
        width: 150px;
        color: #fff !important;
        float: left;
        margin-right: 10px !important;
        margin-left: 60px !important;
      }
      .paging .el-pagination__total {
        height: 30px !important;
        line-height: 30px !important;
        color: #fff !important;
      }
      .paging .el-icon-arrow-left {
        display: none !important;
      }
      .paging .el-icon-arrow-right {
        display: none !important;
      }
      .paging .btn-prev:before {
        content: "上一页";
        cursor: pointer;
      }
      
      .paging .btn-next:before {
        content: "下一页";
        cursor: pointer ;
      }
      .paging .btn-next {
        float: left !important;
        height: 30px !important;
        line-height: 30px !important;
        border-radius: 1px !important;
        border: solid 1px rgba(1, 174, 255, 0.4) !important;
        background: rgba(1, 174, 255, 0.17) !important;
        font-family: MicrosoftYaHei !important;
        font-size: 14px !important;
        font-weight: normal !important;
        font-stretch: normal !important;
        letter-spacing: 0px !important;
        margin-right: 14px !important;
        padding: 0 10px !important;
        cursor: pointer;
        color: #fff !important ;
      }
      
      .paging .btn-prev {
        float: left !important;
        height: 30px !important;
        line-height: 30px !important;
        border-radius: 1px !important;
        border: solid 1px rgba(1, 174, 255, 0.4) !important;
        background: rgba(1, 174, 255, 0.17) !important;
        font-family: MicrosoftYaHei !important;
        font-size: 14px !important;
        font-weight: normal !important;
        font-stretch: normal !important;
        letter-spacing: 0px !important;
        margin-right: 14px !important;
        padding: 0 10px !important;
        cursor: pointer;
        color: #fff !important;
      }
      .paging .btn-prev:hover,
      .btn-next:hover {
        border-color: rgba(217, 159, 0, 0.4);
        background-color: rgba(217, 159, 0, 0.17);
        color: #49f1e7;
        cursor: pointer;
      }
      
      .paging .el-pagination {
        padding: 0;
      }
      
      .paging .el-pager {
        float: left;
      }
      .paging .el_item {
        float: left;
        cursor: pointer;
      }
      .paging .el_item li {
        float: left;
        height: 30px;
        line-height: 30px;
        border-radius: 1px;
        border: solid 1px rgba(1, 174, 255, 0.4);
        background: rgba(1, 174, 255, 0.17);
        font-family: MicrosoftYaHei;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        margin-right: 14px;
        padding: 0 10px;
        cursor: pointer !important;
        color: #fff !important;
      }
      .paging .el-pager li.active {
        border-color: rgba(217, 159, 0, 0.4);
        background-color: rgba(217, 159, 0, 0.17);
        color: #49f1e7 !important;
        cursor: default;
      }
      .paging .el-pager li:hover {
        border-color: rgba(217, 159, 0, 0.4);
        border-left: 1px solid rgba(217, 159, 0, 0.4);
        background-color: rgba(217, 159, 0, 0.17);
        color: #49f1e7 !important;
        cursor: default;
      }
      .paging .el-pager li.active + li {
        border-left: 1px solid rgba(1, 174, 255, 0.4);
      }
      /*.el-pager li:hover+li{
              border-left: 1px solid rgba(1, 174, 255, 0.4);
          }*/
      .paging .el-pagination__total {
        float: right;
      }
      .paging .el-pagination button:disabled {
        background: rgba(1, 174, 255, 0.17);
        border: solid 1px rgba(1, 174, 255, 0.4);
        color: #fff;
        /* cursor: not-allowed; */
        cursor: pointer;
      }
      </style>
        <style scoped>
      .pucho_item {
        position: absolute;
        right: 232px;
      }
      .paging {
        position: absolute;
        right: 0;
        bottom: 0px;
      }
      .paging .paging_item {
        float: left;
        height: 30px;
        line-height: 30px;
        border-radius: 1px;
        border: solid 1px rgba(1, 174, 255, 0.4);
        background: rgba(1, 174, 255, 0.17);
        font-family: MicrosoftYaHei;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        margin-right: 14px;
        padding: 0 12px;
        cursor: pointer;
        color: #fff;
      }
      .paging .paging_item:last-child {
        margin-right: 0;
      }
      .paging .paging_item.active,
      .paging .paging_item:hover {
        border-color: rgba(217, 159, 0, 0.4);
        background-color: rgba(217, 159, 0, 0.17);
        color: #49f1e7;
      }
      .paging .this_page {
        width: 80px;
        cursor: auto;
        text-align: center;
      }
      .paging .noBorder {
        border: 0;
        background: transparent;
        letter-spacing: 8px;
        padding: 0;
        margin-right: 5px;
      }
      </style>
  
  
