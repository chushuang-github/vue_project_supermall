<template>
  <div v-show="isShow" class="toast">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    data(){
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message="默认文字", duration=1500){
        this.isShow = true
        this.message = message,
        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    background-color: rgba(0,0,0,.5);
    color: white;
    padding: 8px 12px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;
  }
</style>