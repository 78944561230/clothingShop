<template>
  <div class="tab_bar_Item" @click="clickItem">
    <div v-if="isCheck"><slot name="item-icon-active"></slot></div>
    <div v-else><slot name="item-icon"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>
<script>
export default {
  name: "tabbarItem",
  props: {
    path: {
      type: String,
      require: true,
    },
    activeColor:{
      type:String,
      default:'#F00'
    }
  },
  data() {
    return {};
  },
  computed: {
    isCheck() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
      return this.isCheck ?{'color':this.activeColor}:{}
    }
  },
  methods: {
    clickItem() {
      console.log(this.path);
      if(this.isCheck) return
      this.$router.replace(this.path);
      
    },
  },
};
</script>
<style>
.tab_bar_Item {
  flex: 1;
  text-align: center;
}
.tab_bar_Item img {
  height: 24px;
  width: 24px;
}

</style>