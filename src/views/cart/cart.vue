<template>
  <div id="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{cartCount}})</div></nav-bar>
    <cart-list class="cart-list" :card-list="cartList"></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import BottomBar from './childComps/BottomBar'
  import {mapGetters} from 'vuex'
  export default {
    name:'Cart',
    components:{
      NavBar,
      CartList,
      BottomBar
    },
    computed:{
      ...mapGetters(['cartCount','cartList']),
    }
  }
</script>
<style scoped>
  #cart {
    height: 100vh;
    position: relative;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;

    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
  }
  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 93px;
    width: 100%;
    overflow: hidden;
  }
</style>