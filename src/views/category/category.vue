<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <scroll id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']"
                       @tabClick="tabClick"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar';
import TabMenu from './childComps/TabMenu';
import Scroll from 'components/common/scroll/Scroll';
import TabContentCategory from './childComps/TabContentCategory';
import TabControl from 'components/common/tabControl/TabControl'
import TabContentDetail from './childComps/TabContentDetail'


import {getCategory,getSubcategory,getCategoryDetail} from 'network/category';

  export default {
    name:'Category',
    components:{
      NavBar,
      TabMenu,
      Scroll,
      TabContentCategory,
      TabControl,
      TabContentDetail
    },
    data(){
      return {
        categories: [],
        categoryData: [],
        currentIndex: 0,
        currentType: 'pop'
      }
    },
    created(){
      //请求分类数据
      this._getCategory();
      
    },
    computed:{
      showSubcategory() {
        if(this.categoryData.length === 0) return {}
        return this.categoryData[this.currentIndex].subcategories;
      },
      showCategoryDetail() {
		    if(this.categoryData.length === 0) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods:{
      _getCategory(){
        getCategory().then(res => {
          //2.获取分类数据
          this.categories = res.data.category.list
          this.categories.forEach((item,index)=>{
            this.categoryData[index] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          });
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        });
      },
      _getSubcategories(index){
        this.currentIndex = index;
        const mailkey = this.categories[index].maitKey;
        getSubcategory(mailkey).then(res => {
          this.categoryData[index].subcategories = res.data;
          this.categoryData = [...this.categoryData];
          console.log(this.categoryData[index]);
          this._getCategoryDetail('pop')
          this._getCategoryDetail('sell')
          this._getCategoryDetail('new')
        });
      },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = [...this.categoryData]
        })
      },
      selectItem(index) {
        this._getSubcategories(index)
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      }
    }  
  }
</script>
<style scoped>
  #category {
    height: 100vh;
  }
  .nav-bar {
    background: var(--color-tint);
    color: #fff;

    position: fixed;
    width: 100vw;
    z-index: 2;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }
  #tab-content {
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
</style>