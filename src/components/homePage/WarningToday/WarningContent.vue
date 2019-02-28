<template>
    <tr>
        <td class="warning_date">{{warning_date}}</td>
        <td class="warning_content" style="cursor:pointer;">
          <el-popover
            placement="top"
            :title="warning_title"
            width="400"
            trigger="hover"
            >
            <el-input type="textarea" rows="6" v-model="warning_content" class="the_textarea"></el-input>
            <span slot="reference">{{warning_title}}</span>
          </el-popover>
        </td>
    </tr>
</template>
<script>
export default {
  props: ["warning_date", "warning_content", "warning_title"],
  methods: {}
};
</script>

<style>
.el-popover__title {
  color: #fff !important;
  font-weight: bold !important;
}
.el-popover {
  background: rgba(6, 38, 113, 0.9) !important;
  border: 1px solid rgba(0, 174, 255, 0.4) !important;
  font-size: 12px !important;
  color: #fff !important;
}
.the_textarea .el-textarea__inner {
  background: transparent !important;
  font-size: 12px !important;
  color: #fff !important;
  padding: none;
  border: none;
}
</style>

<style scoped>
.warning_date {
  width: 120px;
  height: 41px;
}
.warning_content {
  text-align: left;
  padding-left: 35px;
  max-width: 140px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.the_textarea {
  background: rgba(6, 38, 113, 0.9) !important;
  font-size: 12px !important;
  color: #fff !important;
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
</style>
