<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index"
        class="tab-control-item"
        :class="{active: index === currentIndex}"
        @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      titles: {
        type: Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index){
        this.currentIndex = index 
        this.$emit('tabClick', index)
      }
    }
  }
</script>
<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1; 
  }
  .tab-control-item span{
    padding: 5px;
  }
  /* 这样的话，如果active这个类存在的话，下面.active span也就花生效 */
  .active{
    color: #ff5777;
  }
  .active span{
    border-bottom: 3px solid #ff8198;
  }
</style>