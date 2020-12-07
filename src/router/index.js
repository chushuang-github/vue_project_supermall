import Vue from 'vue'
import VueRouter from 'vue-router'

//对组件进行懒加载
const Home = () => import('views/home/Home.vue')
const Category = () => import('views/category/Category.vue')
const Profile = () => import('views/profile/Profile.vue')
const Shopcart = () => import('views/shopcart/Shopcart.vue')
const Detail = () => import('views/detail/Detail.vue')

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const routes = [
  {
    path:'',
    redirect: '/home' 
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: Shopcart
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router =  new VueRouter({
  routes,
  mode: 'history'
})

export default router