<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!--这里的TabControl显示，固定在吸顶的位置，下面的TabControl继续滚动上去-->
    <tab-control 
        @tabClick="tabClick"
        class="fixed"
        ref="tabControl1"
        :titles="['流行','新款','精选']"
        v-show="isTabFixed"  
    >
    </tab-control>
    <!-- scroll是做滚动条的 -->
    <scroll class="content" ref="scroll" 
      :probe-type="3" :pull-up-load="true" 
      @scroll="contentScroll" @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!-- 推荐信息 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <!--当滚动到要吸顶的距离的时候，显示上面的TabControl组件-->
      <tab-control 
          @tabClick="tabClick"
          :titles="['流行','新款','精选']"
          ref="tabControl"    
      >
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!--组件是不能直接监听点击的，要想监听组件的点击，必须添加.native-->
    <!-- .native是一个修饰符，监听组件根元素的原生事件-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import debounce from 'common/utils'

  export default {
    name: 'Home',
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
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
        currentType: 'pop',
        isShowBackTop: false, 
        taboffsetTop: 0,
        isTabFixed: false,     //是否吸顶
        saveY: 0
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
    mounted(){
      //获取图片加载完成的事件监听
      const newRefresh = debounce(this.$refs.scroll.refresh, 50)
      //在mounted里面监听GoodsListItem组件里面图片是否加载完成
      this.$bus.$on('homeItemImageLoad', () => {
        //上拉加载完毕是，调用refresh方法，重新刷新dom元素的高度
        //如果不调用此方法，会出现上拉不上去的情况
        //拿到Scroll组件里面的data里面的scroll，调用scroll身上的refresh方法
        // this.$refs.scroll.refresh()
        newRefresh()
      })
    },
    deactivated(){
      //scroll上面有一个属性y，可以获得当前滚动的y的大小
      this.saveY = this.$refs.scroll.scroll.y
      //取消全局事件的监听

    }, 
    activated(){
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
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
          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
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
        this.$refs.tabControl.currentIndex = index
        this.$refs.tabControl1.currentIndex = index
      },
      //回到顶部
      backClick(){
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      //滚动的距离，回到顶部图片的显示和隐藏
      contentScroll(position){
        //向下滚动，position.y是负数
        //判断BackTop组件是否显示
        this.isShowBackTop = (-position.y) > 1000
        //判断TabControl组件是否吸顶
        this.isTabFixed = (-position.y) > this.taboffsetTop
      },
      //上拉加载跟多，不同类型加载不同的数据
      //之前封装过了getHomeGoods方法，这里可以直接使用，封装的好处体现出来了
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      //轮播图图片加载完成后调用
      swiperImageLoad(){
        //获取tabControl的offsetTop，组件没有这个属性，只有元素有这个属性
        //所有的组件都有一个属性叫$el：用于获取组件中的元素
        //this.$el: Vue实例使用的根 DOM 元素
        this.taboffsetTop = this.$refs.tabControl.$el.offsetTop
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list 
      }
    }
  }
</script>
<style scoped>
  #home{
    /* 高度为当前视口的100% */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: #ff8198;
    color: white;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
  .fixed{
    position: relative;
    z-index: 9;
  }
</style>