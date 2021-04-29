<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @itemClick="titleClick" :current-index="currentIndex"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll">
      <detail-swiper ref="base" :topImages="topImage"></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :paramInfo='paramInfo'></detail-param-info>
      <detail-comment-info  ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>

  </div>
</template>
<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailRecommendInfo from './childComps/DetailRecommendInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail';
  export default {
    name:'Detail',
    components:{
      DetailNavBar,
      Scroll,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      DetailBottomBar
    },
    data(){
      return {
        iid:null,
        topImage:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommendList:[],
        themeTops:[],
        currentIndex:0
      }
    },
    created(){
      //1.保存传入的iid
      this.iid = this.$route.params.iid;
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res=>{
        //1.获取顶部的图片轮播图数据
        console.log(res);
        const data = res.result;
        this.topImage = data.itemInfo.topImages;

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);

        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo);

        //4.保存商品的详细数据
        this.detailInfo = data.detailInfo;

        //5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        //6.保存评论信息
        if(data.rate.list){
          this.commentInfo = data.rate.list[0];
        }
      });
      //3.获取热门推荐
      getRecommend().then((res,error)=>{
        if(error) return
        this.recommendList = res.data.list
      })
    },

    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getOffsetTops();
      },
      titleClick(index){
        console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTops[index],200);
      },
      getOffsetTops(){
        this.themeTops=[];
        this.themeTops.push(this.$refs.base.$el.offsetTop);
        this.themeTops.push(this.$refs.param.$el.offsetTop);
        this.themeTops.push(this.$refs.comment.$el.offsetTop);
        this.themeTops.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTops)
      },
      contentScroll(position){
        //监听滚动到哪一个主题
        for(let i = 0;i<this.themeTops.length;i++){
          let top=this.themeTops[i];
          if(-position.y >= top){
            if(this.currentIndex !== i){
              this.currentIndex = i;
            }
          }
        }
      },
      addToCart(){
        console.log('加入购物车');
        //1.获取购物车需由展示的信息
        const product = {}
        product.image = this.topImage[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        
        console.log(product);
      }
    },
  }
</script>
<style scoped>
  .detail{
    position: relative;
    height: 100vh;
    background: #fff;
    z-index: 2;
  }
  .detail-nav {
    position: relative;
    z-index: 2;
    background-color: #fff;
  }
  .content{
    position: relative;
    height: calc(100% - 43px);
  }
</style>