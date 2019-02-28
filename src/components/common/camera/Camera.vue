<template>
    <li class="camera" 
    @mousedown="mouseDown"
    v-bind:title="camera_name">
      {{ camera_name }}
    </li>
</template>
<script>
import "jquery";
export default {
  //draggable="true"
  //  @dragstart="drag"
  props: ["camera_name", "rtsp_url"],
  methods: {
    drag: function(ev) {
      let trans_data = {
        camera_name: this.camera_name,
        display_url: this.rtsp_url
      };
      ev.dataTransfer.setData("text", JSON.stringify(trans_data));
    },
    mouseDown: function(ev) {
      ev.preventDefault();
      let text =
        '<span id="drag" style="color:#01aeff; position:absolute;top:' +
        ev.clientY +
        "px;left:" +
        ev.clientX +
        'px;">' +
        this.camera_name +
        "</span>";
      $("#VedioScreen").append(text);
      let rangArr = [];
      let box = $(".monitoring_rtsp_content .monitoring_vlc");
      for (var i = 0; i < box.length; i++) {
        let tmp = box[i]
        var offset = $(tmp).offset();
        var rang = {
          top: offset.top,
          left: offset.left,
          bottom: offset.top + $(tmp).height(),
          right: offset.left + $(tmp).width()
        };
        rangArr.push(rang);
      }
      let _this = this
      document.onmousemove = function(ev) {
        if ($("#drag").length) {
          ev.preventDefault();
          ev.returnValue = false;
          $("#drag").css({
            left: ev.clientX + "px",
            top: ev.clientY + "px"
          });
        }
      };
      document.onmouseup = function(ev) {
        var x = ev.clientX,
          y = ev.clientY;
        console.info(rangArr)
        for(var i = 0; i < rangArr.length; i++) {
          if(ev.clientX >= rangArr[i].left && ev.clientX <= rangArr[i].right && y >= rangArr[i].top && y <= rangArr[i].bottom) {
            let tmp = {'index': i, 'display_url': _this.rtsp_url, 'camera_name': _this.camera_name}
            _this.$emit('emit_camerainfo', tmp)
            break;
          }
        }
        $("#drag").remove();
        document.onmouseup = null;
        document.onmousemove = null;
      };
    }
  }
};
</script>
<style scoped>
.camera {
  height: 27px;
  line-height: 27px;
  text-align: left;
  padding-left: 42px;
  font-size: 12px;
  background: url("/static/IMG/camera_icon.png") no-repeat 16px 6px;
  color: white;
  cursor: move;
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>

