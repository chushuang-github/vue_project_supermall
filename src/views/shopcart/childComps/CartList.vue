<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CartList',
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    //CartList组件被keep-alive了，所以在每次进来的时候调用refresh()
    //调用了refresh方法，scroll重新计算滚动区域，加入购物车的商品才能正常滚动
    activated(){
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 85px;
    left: 0px;
    right: 0px;
  }
</style>