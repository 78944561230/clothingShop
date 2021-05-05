<template>
 <div>
   <goods-list :goods="categoryDetail"></goods-list>
 </div>
</template>

<script>
import GoodsList from "components/content/goods/goodsList";

  export default {
    name: "TabContentDetail",
    components: {
      GoodsList
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>
