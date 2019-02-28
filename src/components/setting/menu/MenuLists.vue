<template>
  <div class="first_menu">
    <div class="menu_name" :class="{ 'active':the_index == isShow }" :id="menu_id" @click="toggle_active(menu_id,the_index)">{{menu_name}}<span class="menu_arrow"></span></div>
    <div class="item_wrap" v-show="menu_change">
      <MenuItems v-for="(item,index) in menu_item.children" :one_index = 'index' :key="'menuItem'+item.id" :item_name="item.name" :item_url="item.url" :menuDetails="menu_details"></MenuItems>
    </div>
  </div>
</template>
<script>
import MenuItems from "./MenuItems";
export default {
  props: ["menu_item", "menu_name", "the_index", "menu_id"],
  components: {
    MenuItems
  },
  data() {
    return {
      menu_ids: [],
      menu_details: [],
      isShow :0,
      isShowIndex :0
      //active : this.the_index == 0?false: true
    };
  },
  mounted() {
    if (this.the_index == 0) {
      this.menu_ids.push(this.menu_id);
    }
    var menu_item_formatter = this.menu_item.children;
    for (let i = menu_item_formatter.length - 1; i >= 0; i--) {
      if (menu_item_formatter[i].is_display == Number(0)) {
        menu_item_formatter.splice(i, 1);
      }
    }
    this.menu_item.children = menu_item_formatter;
  },
  methods: {
    toggle_active(item_id,index) {
      this.isShow = index;  
      // this.isActive = !this.isActive
      let idIndex = this.menu_ids.indexOf(item_id);
      if (idIndex >= 0) {
        this.menu_ids.splice(idIndex, 1);
      } else {
        this.menu_ids = [];
        this.menu_ids.push(item_id);
      }
   
    }
  },
  computed: {
    menu_change() {
      if (this.menu_ids.indexOf(this.menu_id) >= 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    menu_name: {
      handler(newValue, oldValue) {
        this.menu_details = [];
        this.menu_details.push(this.menu_name);
      },
      the_index:{
        handler(newValue,oldValue){
          this.isShowIndex = this.the_index
        }
      }
    }
  }
};
</script>
<style scoped>
.hide {
  display: none;
}
.first_menu {
  position: relative;
}
.menu_name {
  width: 240px;
  height: 35px;
  line-height: 35px;
  font-family: AdobeHeitiStd-Regular;
  font-size: 16px;
  font-stretch: normal;
  letter-spacing: 0px;
  text-align: left;
  padding-left: 23px;
  cursor: pointer;
  background-image: linear-gradient(
    85deg,
    rgba(1, 174, 255, 0.4) 0%,
    rgba(1, 174, 255, 0.22) 50%,
    rgba(1, 174, 255, 0.05) 100%
  );
  border-bottom: 1px solid;
  border-image: -webkit-linear-gradient(
      to right,
      rgba(3, 253, 250, 0.4),
      rgba(3, 253, 250, 0)
    )
    30 30;
  border-image: -moz-linear-gradient(
      to right,
      rgba(3, 253, 250, 0.4),
      rgba(3, 253, 250, 0)
    )
    30 30;
  border-image: linear-gradient(
      to right,
      rgba(3, 253, 250, 0.4),
      rgba(3, 253, 250, 0)
    )
    30 30;
}
.menu_arrow {
  position: absolute;
  top: 12px;
  right: 23px;
  width: 7px;
  height: 11px;
  background: url("/static/IMG/Icon/menuArrow.png") no-repeat;
  background-size: 100% 100%;
  transform-origin: 50% 50%;
}
.menu_name.active .menu_arrow {
  transform: rotate(-90deg);
}
.active {
  color: #49f1e7;
}
</style>

