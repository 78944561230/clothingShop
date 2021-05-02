<template>
  <div class="icon-selector" :class="{'selector-active':isCheck}" @click="checkClick">
    <img src="~/assets/img/cart/tick.svg"/>
  </div>
</template>
<script>
  export default {
    name:'CheckedButton',
    props:{
      isCheck:{
        type:Boolean,
        default:true
      }
    },
    methods:{
      checkClick(){
        
        this.$emit('checkBtnClick');
      }
    }
  }
</script>
<style scoped>
.icon-selector img {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
}
.selector-active img{
  background-color: #ff8198;
  border-color: #ff8198;
}
</style>