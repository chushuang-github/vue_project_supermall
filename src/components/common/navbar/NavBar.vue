<template>
  <div class="nav-bar">
    <!-- 因为slot最终是会被替换掉的，在插槽上面设置样式会不生效-->
    <!-- 我们在插槽外面包裹一层div标签，对插槽的样式进行设置 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar'
  }
</script>
<style scoped>
  .nav-bar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,0.1);
  }
  .left, .right{
    width: 60px;
  }
  .center{
    flex: 1;
  }
</style>