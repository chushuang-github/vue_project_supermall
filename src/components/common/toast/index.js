import Toast from './Toast.vue'
const obj = {}
obj.install = function(Vue){
  //1、创建组件构造器
  //Vue.extend()里面需要传入一个组件对象
  const toastContrustor = Vue.extend(Toast)

  //2、new的方式，根据组件构造器，可以创建出来一个组件对象
  //new组件构造器的方式，去创建一个组件对象
  const toast = new toastContrustor()

  //3、将组件对象，手动的挂载到某一个元素上
  //手动的创建一个div，将toast挂载到创建的div上
  toast.$mount(document.createElement('div'))

  //4、toast.$el对应的就是上面创建的div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}
//使用export default导出，引入的时候可以改名字
export default obj