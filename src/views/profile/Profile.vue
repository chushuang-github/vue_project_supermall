<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">我的</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'Profile',
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