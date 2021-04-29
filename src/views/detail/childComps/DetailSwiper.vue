<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages" :key="item">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>
<script>
  import Swiper from 'components/common/swiper/Swiper'
  import SwiperItem from 'components/common/swiper/SwiperItem'
  export default {
    name:'DetailSwiper',
    props:{
      topImages:{
        type:Array,
        default(){
          return [];
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>
<style scoped>
  .detail-swiper{
    height: 300px;
    
  }
</style>