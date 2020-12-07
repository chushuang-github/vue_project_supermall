<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :isChecked="isSelectAll" class="check-button" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计: {{totalPrice}}
    </div>
    <div class="calculate">
      去结算 ({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      //使用了mapGetters辅助函数
      ...mapGetters(['cartList']),
      //使用filter过滤点没有选中的商品，使用reduce计算商品价格
      totalPrice(){
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      //计算选中的商品个数
      checkLength(){
        return this.cartList.filter(item => {
          return item.checked
        }).length
      },
      //如果商品全部选中，全选按钮就选中
      isSelectAll(){
        //使用find方法查找不选中的，如果找到了，就表示商品为全部选中
        //如果没有找到，find方法返回undefined，取返一下，返回true，表示商品全部选中
        //如果没有商品，全选按钮不选中
        if(this.cartList.length === 0){
          return false
        }else{
          return !this.cartList.find(item => !item.checked)
        }
      }
    },
    methods: {
      checkClick(){
        //使用上面的计算属性，如果全部选中的话，就变成全部不选中中
        if(this.isSelectAll){
          this.cartList.forEach( item => item.checked = false )
        }else{
          //如果不是全部选中的话，就变成全部选中
          this.cartList.map( item => item.checked = true )
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    background-color: #eee;
    height: 36px;
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 49px;
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .check-content{
    display: flex;
    height: 36px;
    width: 85px;
    align-items: center;
  }
  .check-button{
    width: 20px;
    height: 20px;
    margin: 0px 5px 0px 10px;
  }
  .price{
    flex: 1;
  }
  .calculate{
    width: 90px;
    text-align: center;
    line-height: 36px;
    background-color: red;
    color: white;
  }
</style>