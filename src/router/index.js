import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home=()=>import('../views/home/Home');
const Category=()=>import('../views/category/Category');
const Cart=()=>import('../views/cart/Cart');
const Mine=()=>import('../views/mine/Mine');
const Detail=()=>import('../views/detail/Detail')

const routes=[
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/mine',
    component:Mine
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]
const router=new VueRouter({
  routes,
  mode:'history'
});
export default router