<template>
  <div id="shop-item">
    <div class="item-selector" @click="checkedChange">
      <checked-button :isCheck="itemInfo.checked"></checked-button>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">商品描述: {{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ itemInfo.price }}</div>
        <div class="item-count right">x{{ itemInfo.count }}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import CheckedButton from './CheckedButton'
  export default {
    name: "CartListItem",
    props: {
      itemInfo: {
        type: Object,
        default: {},
      },
    },
    components:{
      CheckedButton
    },
    methods:{
      checkedChange(){
        this.itemInfo.checked = !this.itemInfo.checked;
      }
    }
  };
</script>
<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width:20px;
  display: flex;
  margin-right: 5px;
  justify-content: center;
  align-items: center;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 8px;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-title, .item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}

</style>