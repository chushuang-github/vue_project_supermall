import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from 'components/common/toast'
//安装toast插件
//使用Vue.use()的本质上：会去调用toast的install方法
//调用install方法的时候，还会将Vue作为参数传递过去
Vue.use(toast)

//解决移动端的300ms延迟
FastClick.attach(document.body)

//使用图片懒加载插件，loading是加载的时候显示的图片
//引入图片使用require，因为我们在使用import()引入图片时，没有生效
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

//给$bus赋值的是一个Vue实例，Vue实例是可以作为我们的事件总线的
//这样一来，$bus就是一个Vue实例了，就可以使用Vue实例身上的方法了
//在其它组件上使用的this.$bus是一个Vue实例，可以使用实例身上的$emit方法
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
