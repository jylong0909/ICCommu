<template>
    <div class="warning_today" @mouseenter="cleartimer" @mouseleave="starttimer">
        <div class="title">{{title}}</div>
        <div class="table_wrap">
            <table class="warning_table animated flipInX">
                <tbody>
                    <WarningContent v-for="(item) in warning_data"
                      :key = "item.key"
                      :warning_date = "item.warning_date"
                      :warning_content = "item.warning_content"
                      :warning_title = "item.warging_title"
                    ></WarningContent>
                </tbody>
            </table>
        </div>
    </div>
    
</template>
<script>
import WarningContent from "./WarningContent";
import { GetWarningData } from "@/mock/api";
export default {
  name: "warning_today",
  props: ["title"],
  components: {
    WarningContent
  },
  data() {
    return {
      warning_data: [],
      interval: "",
      intervalFlag: true
    };
  },
  methods: {
    cleartimer() {
      clearInterval(this.interval);
      this.interval = null;
    },
    starttimer() {
      this.interval = setInterval(() => {
        var thisDom = document.getElementsByClassName("warning_table")[0];
        thisDom.className = "warning_table";
        var params;
        if (this.intervalFlag) {
          params = {
            pageno: 1,
            pagesize: 6
          };
        } else {
          params = {
            pageno: 2,
            pagesize: 6
          };
        }
        this.getData(params);
      }, 5 * 1000);
    },
    getData(params) {
      GetWarningData(params).then(response => {
        // let code = response.data.code;
        // if (code != 0) {
        //   return;
        // }
        let data = response.data.data;
        let tmp_warning_data = [];
        for (let i = 0; i < 6; i++) {
          if (i < data.length) {
            let record_date = data[i].record_date;
            let title = data[i].title;
            let remark = data[i].remark;
            record_date = record_date
              .slice(5, record_date.lastIndexOf(":"))
              .replace("-", "/");
            tmp_warning_data.push({
              warning_date: record_date,
              warning_content: remark,
              warging_title: title,
              key: data[i].id
            });
          } else {
            let default_data = {
              warning_date: "",
              warning_content: "",
              warging_title: ""
              // key: ""
            };
            tmp_warning_data.push(default_data);
          }
        }
        this.warning_data = tmp_warning_data;
        var thisDom = document.getElementsByClassName("warning_table")[0];
        thisDom.className = "warning_table animated flipInX";
        this.intervalFlag = !this.intervalFlag;
      });
    }
  },
  mounted() {
    this.getData();
    this.interval = setInterval(() => {
      var thisDom = document.getElementsByClassName("warning_table")[0];
      thisDom.className = "warning_table";
      var params;
      if (this.intervalFlag) {
        params = {
          pageno: 1,
          pagesize: 6
        };
      } else {
        params = {
          pageno: 2,
          pagesize: 6
        };
      }
      this.getData(params);
    }, 5 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
.title {
  height: 30px;
  text-align: left;
  line-height: 30px;
  font-size: 16px;
  padding: 0px 0px 0px 20px;
}
.table_wrap {
  width: 444px;
  height: 271px;
  padding: 16px 20px;
  color: #42eaea;
}
.warning_table {
  width: 100%;
  height: 100%;
  background: url("/static/IMG/warning_split_line.png") no-repeat center;
}
</style>

