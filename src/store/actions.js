import {ADD_TO_CART,ADD_COUNTER} from './mutations-types'
export default {
  //第一个数据是context，我们直接通过对象解构，取出state和commit
  addCart({state,commit}, payload){
    return new Promise((resolve, reject) => {
      //payload新添加的商品
      let oldProduct = null
      //for of输出的是数组的每一项的属性值
      for(let item of state.cartList){
        if(item.iid === payload.iid){
          //item赋值过去的是一个地址值，改变oldProduct的值，item也会改变
          oldProduct = item
        }
      }
      //判断oldProduct是否有值
      //有值表示原来的addCart里面有新添加的商品
      if(oldProduct){
        commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量+1')
      }else{
        payload.count = 1
        commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}