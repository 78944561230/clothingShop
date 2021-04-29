<template>
  <div class="recommend-info" v-if="Object.keys(recommendList)">
    <div class="info-header">热门推荐</div>
    <goods-list :goods="recommendList"></goods-list>
  </div>
</template>

<script>
  import GoodsList from 'components/content/goods/goodsList'

	export default {
		name: "DetailRecommendInfo",
    components: {
		  GoodsList
    },
    props: {
		  recommendList: {
		    type: Array
      }
    },
	}
</script>

<style scoped>
  .recommend-info {
    padding: 5px;
    text-align: center;
  }

  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
</style>