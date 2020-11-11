<template>
  <div class="tab-bar-item" @click="btnClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- 插槽最终是会被替换掉的，所以class不能绑定在slot里面的 -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    methods: {
      btnClick(){
        this.$router.replace(this.path)
      }
    },
    computed: {
      isActive(){
        //哪一个路由处于活跃，$route就是哪一个路由对象
        // return this.$route.path === this.path   这也是ok的
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        return this.isActive ? {color: this.activeColor} : {}
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex-grow: 1;
    text-align: center;
    height: 50px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 23px;
    height: 23px;
    margin-top: 4px;
    margin-bottom: 2px;
    vertical-align: middle;
  }
</style>