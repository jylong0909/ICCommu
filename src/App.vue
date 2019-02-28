<template>
  <div id="app">
   <!-- enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutLeft" -->
    <transition name="transitionName">
      <router-view v-if='isRouterAlive'/>
    </transition>
  </div>
</template>
<script>
import { fullScreenCompatibility } from "@/util/util";

export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
      id_data:0
    };
  },
  components:{
  },

  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },

  mounted() {
    fullScreenCompatibility();
  }
};
</script>

<style>
#app {
  height: initial;
  /* background: url(/static/IMG/bg.jpg) no-repeat; */
  width: 1920px;
}
</style>
