<template>
  <div ref="wrapper" class="wrapper">
    <div class="content">
      <slot></slot> 
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'Scroll',
    data(){
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted(){
      //1、创建BScroll
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        // disableMouse: false,
        // mouseWheel: true,
        probeType: this.probeType,   //实时监听滚动
        pullUpLoad: this.pullUpLoad
      })
      //2、监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }
      //监听上拉加载更多
      if(this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        }) 
      }
    },
    methods: {
      //这个方法可以控制滚动到什么位置
      scrollTo(x, y, time=300){
        //第一、第二个参数是控制滚动到什么位置
        //可以设置第三个参数，意思是控制滚动的动画时长
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        // console.log('------')
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>
<style scoped> </style>