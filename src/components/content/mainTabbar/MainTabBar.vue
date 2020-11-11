<template>
  <tar-bar>
    <tar-bar-item path="/home">
      <img src="~assets/img/tabbar/home.svg" slot="item-icon">
      <img src="~assets/img/tabbar/home_active.svg" slot="item-icon-active">
      <div slot="item-text">首页</div>
    </tar-bar-item>
    <tar-bar-item path="/category">
      <img src="~assets/img/tabbar/category.svg" slot="item-icon">
      <img src="~assets/img/tabbar/category_active.svg" slot="item-icon-active">
      <div slot="item-text">分类</div>
    </tar-bar-item>
    <tar-bar-item path="/shopcart">
      <img src="~assets/img/tabbar/shopcart.svg" slot="item-icon">
      <img src="~assets/img/tabbar/shopcart_active.svg" slot="item-icon-active">
      <div slot="item-text">购物车</div>
    </tar-bar-item>
    <tar-bar-item path="/profile">
      <img src="~assets/img/tabbar/profile.svg" slot="item-icon">
      <img src="~assets/img/tabbar/profile_active.svg" slot="item-icon-active">
      <div slot="item-text">我的</div>
    </tar-bar-item>
  </tar-bar>
</template>

<script>
  import TarBar from 'components/common/tabbar/TabBar'
  import TarBarItem from 'components/common/tabbar/TabBarItem' 
  export default {
    name: 'MainTabBar',
    components: {
      TarBar,
      TarBarItem
    }
  }
</script>
<style scoped></style>