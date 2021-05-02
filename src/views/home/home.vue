<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        v-show="isTopShop"
        ref="tabControl1">
    </tab-control>
    <scroll class="content" 
            ref="scroll" 
            :pullUpLoad="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <swiper>
        <swiper-item v-for="item in banners" :key="item.acm">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="swiperimgLoad"/>
          </a>
        </swiper-item>
      </swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import { getHomeMultidata, getHomeGoods } from "network/home";
import { Swiper, SwiperItem } from "components/common/swiper/index";
import RecommendView from "./childComps/recommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/common/tabControl/TabControl";
import GoodsList from "components/content/goods/goodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";
import {debounce} from "common/utils"
export default {
  name: "Home",
  components: {
    NavBar,
    Swiper,
    SwiperItem,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      isTopShop:false,
      tabOffsetTop:0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted(){
    const refresh=debounce(this.$refs.scroll.refresh,50)
    this.$bus.$on('imageLoad',()=>{
      refresh();
    })
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;

      //2.判断TopControl是否显示
      this.isTopShop = -position.y > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperimgLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      console.log(this.tabOffsetTop);
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[this.currentType].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      });
    },
  },
};
</script>
<style scoped>
#home {
  height: 100vh;
  padding-top: 44px;
  position: relative;
}
.tab-control{
  position: relative;
  z-index: 2;
}
.nav-bar {
  background: var(--color-tint);
  color: #fff;

  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>>