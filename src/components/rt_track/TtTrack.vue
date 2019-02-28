<template>
  <div class="rtspBox">
    <object type='application/x-vlc-plugin' pluginspage="http://www.videola.org" id='vlc' events="false"  width="416px" height="241px">
      <param name='mrl' value='rtsp://admin:Yunshitubest123@192.168.2.48' />
      <param name='volume' value='50' />
      <param name='autoplay' value='true' />
      <param name='play' value='true' />
      <param name='loop' value='false' />
      <param name='allowfullscreen' value='true'/>
      <param name='controls' value='false' />
      <param name='bgcolor' value='black' />
    </object>
  </div>
</template>

<script>
import {flowPersonToday} from '@/mock/api'

export default {
  name: 'CarFlow',
  data () {
    return {
      title: '实时车流量',
      flow_person: ''
    }
  },
  mounted () {
    // this.datatime = `${year}年 ${month}月${day}日${this.nbsp}${week} ${hours}:${minutes}`
  },
  created () {
    flowPersonToday()
      .then((response) => {
        this.flow_person = (response.data.count)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
