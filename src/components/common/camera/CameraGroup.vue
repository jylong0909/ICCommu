<template>
    <div class="camera_group">
        <div class='group_name' v-on:click="toggle_hide">{{ group_name }}
            <span v-bind:class="{cl: clActive}"></span>
        </div>
        <div class='item_wrap' v-bind:class="{ hide: isActive }">
            <Camera v-for="(item) in group_info.cameras"
                :key="item.src_id"
                :camera_name="item.camera_name"
                :rtsp_url = "item.display_url"
                @emit_camerainfo = "emit_camerainfo"
            >
            </Camera>
        </div>
    </div>
</template>
<script>
import Camera from "./Camera"
export default {
  props: ["group_info", "index_g"],
  components: {
    Camera
  },
  data() {
      return {
          isActive: (this.index_g === 0) ? false : true,
          clActive: (this.index_g === 0) ? true : false
      }
  },
  computed: {
      group_name: function() {
          return this.group_info.group_name
      }
  },

  methods: {
      toggle_hide: function() {
          this.isActive = !this.isActive
          this.clActive = !this.clActive
      },
      emit_camerainfo: function(data) {
          this.$emit('emit_camerainfo', data)
      }
  }
}
</script>

<style scoped>
.hide {
    display: none;
}
.group_name {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  font-family: AdobeHeitiStd-Regular;
  text-align: left;
  padding-left:15px;
  background-image: linear-gradient(90deg, 
		rgba(3, 253, 250, 0.05) 0%, 
		rgba(1, 174, 255, 0.29) 52%, 
		rgba(1, 177, 255, 0.3) 54%, 
		rgba(2, 216, 253, 0.18) 77%, 
		rgba(3, 253, 250, 0.05) 100%);
  width: 90%;
  display: inline-block;
  margin: 5px 0px;
  color: #49f1e7;
  cursor: pointer;
}
.item_wrap {
  text-align: center;
}
.group_name span{
    float: right;
    width: 16px;
    height: 100%;
    margin-right: 30px;
    cursor: pointer;
    background: url('/static/IMG/Icon/openList.png') no-repeat center;
    background-size: 16px;
}
.group_name .cl{
    background: url('/static/IMG/Icon/closeList.png') no-repeat center;
    background-size: 16px;
}
</style>


