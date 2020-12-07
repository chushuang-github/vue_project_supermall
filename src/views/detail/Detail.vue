<template>
  <div id="detail">
    <detail-nav class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo" ref="params"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/> 
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNav from './childComps/DetailNav'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail.js'
  import debounce from 'common/utils'
  import {backTop} from '../../common/mixin'
  import {mapActions} from 'vuex'

  export default {
    name: 'Detail',
    mixins: [backTop],
    components: {
      DetailNav,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    data(){
      return {
        iid: '',
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        //点击导航，分别滚动到什么位置，用数组封装起来
        themeTopYs: [],
        currentIndex: 0
      }
    },
    created(){
      //1、保存传入的iid
      this.iid = this.$route.params.iid
      //2、根据iid发送请求，获取商品数据
      getDetail(this.iid).then((res) => {
        const data = res.result
        //1.获取顶部的图片轮播数据
        this.topImages = res.result.itemInfo.topImages
        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //3.店铺信息
        this.shop = new Shop(data.shopInfo)
        //4.保存商品详情数据
        this.detailInfo = data.detailInfo
        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //6.获取评论信息
        if(data.rate.cRate !=0){
          this.commentInfo = data.rate.list[0]
        }
        //this.$nextTick()，这里面是dom已经被渲染了，但是图片依然是没有加载完的
        //在这个写，获取到的offsetTop是不包含全部的图片的
        //offsetTop值不对的问题，都是因为图片异步加载的问题，图片问题要注意
        // this.$nextTick(() => {
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // })
      }),
      //请求商品推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    mounted(){
      const newRefresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('detailItemImageLoad', () => {
        newRefresh()
      })
    },
    // updated(){   //这里写也是有bug的
      //页面会更新很多次，updated调用很多次，我们只需要最后一次的数据就可以了
      //之前的数据，我们先清空，只拿最后一次的数据放入数组中
    //   this.themeTopYs = [] 
    //   this.themeTopYs.push(0)
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // },
    methods: {
      ...mapActions(['addCart']),
      imageLoad(){
        this.$refs.scroll.refresh()
        //图片加载完之后获取高度
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs)
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },
      contentScroll(position){
        //1.获取y值
        const positionY = -position.y
        this.isShowBackTop = positionY > 1000
        //2.positionY值和themeTopYs对比，显示对应的导航
        // if(positionY >= this.themeTopYs[0] && positionY < this.themeTopYs[1]){
        //   this.$refs.nav.currentIndex = 0
        // }else if(positionY >= this.themeTopYs[1] && positionY < this.themeTopYs[2]){
        //   this.$refs.nav.currentIndex = 1
        // }else if(positionY >= this.themeTopYs[2] && positionY < this.themeTopYs[3]){
        //   this.$refs.nav.currentIndex = 2
        // }else if(positionY >= this.themeTopYs[3]){
        //   this.$refs.nav.currentIndex = 3
        // }
        let length = this.themeTopYs.length
        for(let i=0; i<length; i++){
          if(this.currentIndex != i && ((i<length-1 && positionY >= this.themeTopYs[i] && 
          positionY < this.themeTopYs[i+1]) || (i===length-1 && positionY >= this.themeTopYs[i]))){
              this.currentIndex = i
              this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      addToCart(){
        //1、获取商品信息(获取购物车需要展示的信息)
        //将商品的图片、描叙、价格、iid收集起来
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        //2、将商品添加到购物车里面
        this.addCart(product).then(res => {
          console.log(res)
          //3、添加到购物车成功
          // console.log(this.$toast)
          this.$toast.show(res)
        })
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    background-color: #fff;
    z-index: 9;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
</style>