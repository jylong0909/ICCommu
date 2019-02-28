<template>
    <div class="VedioShow">
        <div class="title">{{camera_name}}</div>
        <div class="vedio">
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
    </div>
</template>
<script>
import { cameraSolutionGet } from "@/mock/api";
export default {
  data() {
    return {
        camera_name:'',
        display_url:''
        };
  },
  mounted() {
    let _this = this
    cameraSolutionGet({ solution: 2 })
      .then(response => {
        let config_info = response.data.data;
        let camera_play_list = config_info[0].camera_list
        if(!camera_play_list || camera_play_list.length == 0){
            return
        }
        _this.camera_name = camera_play_list[0].camera_name
        _this.display_url = camera_play_list[0].display_url
        let vlc = this.$refs.vlc.playlist
        try {
            let vlcid = vlc.add(camera_play_list[0].display_url)
            vlc.playItem(vlcid)
        } catch (error) {
            console.info('type catch vlc_vedio is not supported')
        }
      })
      .catch(function(error) {
        console.error(error);
      })
  }
};
</script>
<style scoped>
.hide{
    display:none;
}
.title {
  height: 30px;
  text-align: left;
  line-height: 30px;
  font-size: 16px;
  padding: 0px 0px 0px 20px;
}
.vedio{
    width: 423px;
	height: 249px;
    margin:10px;
    padding:2px;
    background: url('/static/IMG/vedioshow_bg.png') no-repeat center;
    background-size:100% 100%;
}
</style>
