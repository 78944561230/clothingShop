<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default:3,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
    data:{
      type:Array,
      default:()=>{
        return []
      }
    }
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    setTimeout(() => {
       //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        // observeDOM:true
      });
      // 2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        });
      }
      //3.监听scroll滚动到底部
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      }
    },20);
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
        this.scroll && this.scroll.refresh()
    },
  },
  watch:{
    data(){
      setTimeout(this.refresh,20)
    }
  }
};
</script>
<style scoped>
 
</style>