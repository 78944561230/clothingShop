<template>
  <scroll ref="scroll">
    <div>
      <cart-list-item v-for="item in cardList" :key="item.iid" :itemInfo="item"></cart-list-item>
    </div>
  </scroll>
</template>
<script>
  import Scroll from 'components/common/scroll/Scroll';
  import CartListItem from './CartListItem'
  export default {
    name:'CartList',
    props:{
      cardList:{
        type: Array,
        default() {
		      return []
        }
      }
    },
    components:{
      Scroll,
      CartListItem
    },
    activated(){
      this.$refs.scroll.refresh();
    }
  }
</script>
<style scoped>

</style>