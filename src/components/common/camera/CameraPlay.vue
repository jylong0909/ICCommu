<template>
    <!-- <div id="CameraPlay_l"> -->
    <div class="monitoring_vlc" @dragover="allowDrop" @drop="drop">
        <div v-bind:class="{ 'hide': true, 'filler': true }"></div>
        <div id="obj_wrap"  v-bind:class="{ 'hide': false }">
            <object type="application/x-vlc-plugin" 
                ref="vlc"
                pluginspage="http://www.videola.org" 
                events="false" width="100%" height="100%" >
                <param name="mrl" :value="display_url">
                <param name="volume" value="50">
                <param name="autoplay" value="true">
                <param name="loop" value="false">
                <param name="fullscreen" value="true">
                <param name="controls" value="false">
                <param name="branding" value="false">
                <param name="bgcolor" value="black">
            </object>
        </div>
        
        <!-- <div class="monitoring_vlc_title">{{ camera_name }}</div> -->
    </div>
    <!-- </div> -->
    
</template>
<script>
export default {
    name: 'CameraPlay_l',
    props: ["camera_name", "display_url", "index"],
    data() {
        return {
            show_fil: this.display_url ? false : true,
            show_vlc: !this.show_fil
        }
    },
    methods: {
        allowDrop: function(ev) {
            ev.preventDefault()
        },
        drop: function(ev) {
            ev.preventDefault()
            let data=ev.dataTransfer.getData("text")
            data = JSON.parse(data)
            data['index'] = this.index
            this.$emit('drag_display', data)
            // let vlc = this.$refs.vlc.playlist
            // let vlcid = vlc.add(data.display_url)
            // vlc.playItem(vlcid)
        }
    },
    watch:{
        display_url:function(val, oldVal) {
            let vlc = this.$refs.vlc.playlist
            let vlcid = vlc.add(this.display_url)
            vlc.playItem(vlcid)
        }
    }
}
</script>

<style scoped>
.show_fil {
  background-color: black;
}
#obj_wrap {
  height: calc(100% - 10px);
  margin: 4px;
  margin-bottom: 20px;
}
.hide {
  display: none;
}
.monitoring_vlc {
  margin: 0px 0px;
  width: 100%;
  height: 100%;
  float: left;
  border: 1px solid #00ace4;
  position: relative;
}
.filler {
  background: black;
  width: 100%;
  height: 100%;
}
.monitoring_vlc_title {
  position: absolute;
  bottom: 5px;
  right: 20px;
  font-size: 12px;
  line-height: 20px;
}
</style>
