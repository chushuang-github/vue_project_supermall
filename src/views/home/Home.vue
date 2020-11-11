<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 轮播图 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 推荐信息 -->
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control 
        @tabClick="tabClick"
        class="tab-control" 
        :titles="['流行','新款','精选']">
    </tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getHomeMultidata, getHomeGoods} from 'network/home'

  export default {
    name: 'Home',
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList
    },
    data(){
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {page:0, list:[]},
          new: {page:0, list:[]},
          sell: {page:0, list:[]}
        },
        currentType: 'pop'
      }
    },
    created(){
      //这个发送请求的操作是异步的
      //调用methods里面的函数，methods里面的函数会发生请求
      this.getHomeMultidata()
      //请求商品数据
      //一进入到首页，需要把第一页的数据全部请求过来展示
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      getHomeMultidata(){
        //这个方法里面进行一个具体的请求
        getHomeMultidata().then(res => {
          // console.log(res)
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].page += 1
          this.goods[type].list.push(...res.data.list)
        })
      },
      tabClick(index){
        if(index === 0){
          this.currentType = 'pop'
        }else if(index === 1){
          this.currentType = 'new'
        }else{
          this.currentType = 'sell'
        }
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    }
  }
</script>
<style>
  #home{
    padding-top: 44px;
  }
  .home-nav{
    background-color: #ff8198;
    color: white;
  }
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 20;
  }
</style>