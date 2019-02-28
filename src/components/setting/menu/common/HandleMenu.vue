<template>
  <ul class="handle_box">
    <li class="fl"><span class="setIcon setIcon-add"></span><span>添加</span></li>
    <li class="fl"><span class="setIcon setIcon-delete"></span><span>删除</span></li>
    <li class="fl"><span class="setIcon setIcon-search"></span><span>搜索</span></li>
    <li class="fl"><span class="setIcon setIcon-reset"></span><span>重置</span></li>
  </ul>  
</template>
<script>
export default {
  name: "HandleMenu",
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {}
};
</script>
<style scoped>
.active {
  color: #49f1e7;
}
.handle_box {
  position: absolute;
  top: 0;
  right: 0;
}
.handle_box > li {
  width: 75px;
  height: 30px;
  line-height: 30px;
  border-radius: 1px;
  border: solid 1px rgba(217, 159, 0, 0.4);
  font-family: SimHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  background: rgba(217, 159, 0, 0.17);
  margin-right: 28px;
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
}
.setIcon-search {
  background-image: url("/static/IMG/Icon/search.png");
}
.setIcon-reset {
  background-image: url("/static/IMG/Icon/reset.png");
}
</style>

