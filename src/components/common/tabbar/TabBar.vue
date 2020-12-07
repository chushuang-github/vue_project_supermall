<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TabBar'
  }
</script>

<style scoped>
  .tab-bar{
    display: flex;
    background-color: #f2f2f2;
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    box-shadow: 0px -1px 1px rgba(100,100,100,0.2);
  }
</style>