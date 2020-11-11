<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
      </ul>
    </ul>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'Category',
    data(){
      return {
        scroll: null
      }
    },
    //这个生命周期不能使用created，因为created时，dom元素还没有创建
    mounted(){
      //.content是标签的类名
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        pullUpLoad: true
      }),
      this.scroll.on('scroll', (position) => {
        // console.log(position)
      }),
      this.scroll.on('pullingUp', () => {
        console.log('上拉加载更多')
        this.scroll.finishPullUp()
      })
    }
  }
</script>
<style scoped>
  .wrapper{
    height: 200px;
    border: 1px solid red;
    overflow: hidden;
  }
</style>