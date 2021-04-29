<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="" />
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in title"
        :key="index"
        class="title-item"
        :class="{ active: index === currentIndex }"
        @click="titleClick(index)">
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  props:{
    currentIndex:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
    };
  },
  methods: {
    titleClick(index) {
      this.$emit('itemClick', index)
    },
    backClick(){
      this.$router.back();
    }
  },
};
</script>
<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title .title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}

.back img {
  margin-top: 12px;
}
</style>