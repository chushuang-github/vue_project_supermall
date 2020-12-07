<template>
  <div class="cart">
    <!-- 1.导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 2.商品列表 -->
    <cart-list/>
    <!-- 3.底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'
  import {mapGetters} from 'vuex'
  export default {
    name: 'Shopcart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
    position: relative;
  }
  .nav-bar{
    background-color: #ff8198;
    color: white;
  }
</style>