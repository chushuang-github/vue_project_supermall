<template>
  <div class="goods-item" @click="itemClick">
    <!-- 在vue里面通过load函数，监听图片是否加载完 -->
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info"> 
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>  
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods: {
      imageLoad(){
        if(this.$route.path.indexOf('/home') != -1){
          this.$bus.$emit('homeItemImageLoad')
        }else if(this.$route.path.indexOf('detail') != -1){
          this.$bus.$emit('detailItemImageLoad')
        }
      },
      itemClick(){
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    },
    computed: {
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: #ff5777;
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>