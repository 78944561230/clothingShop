<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goods" :goodsItem="item" :key="item.acm"></goods-list-item>
  </div>
</template>
<script>

import GoodsListItem from './goodsListItem';

export default {
  name:'GoodsList',
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    GoodsListItem
  }

}
</script>
<style scoped>
  .goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>