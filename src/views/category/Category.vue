<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'Category',
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: #ff8198;
    color: white;
  }
</style>