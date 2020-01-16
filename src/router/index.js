import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import knowledge from '../views/knowledge'
import  news from '../views/news'
import test from '../views/test'
import forum from '../views/forum'
import appointment from '../views/appointment'
import specialist from '../views/specialist'
import register from '../views/register'
Vue.use(VueRouter)
const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/index/news',
    name:'news',
    component:news,
    meta: {
      requireAuth: true
    },
  },
  {
    path:'/index/knowledge',
    name:'knowledge',
    component:knowledge,
    meta: {
      requireAuth: true
    },
  },
  {
    path:'/index/test',
    name:'test',
    component:test,
    meta: {
      requireAuth: true
    },
  },
  {
    path:'/index/forum',
    name:'forum',
    component:forum,
    meta: {
      requireAuth: true
    },
  },
  {
    path:'/index/appointment',
    name:'appointment',
    component:appointment,
    meta: {
      requireAuth: true
    },
  },
  {
    path:'/index/specialist',
    name:'specialist',
    component:specialist
  },
  {
    path:'/index',
    name:'index',
    component:Index,
    meta: {
      requireAuth: true
    },
    // children: [
    //   {
    //     path:'/index/news',
    //     name:'news',
    //     component: news,
    //   },
    //   {
    //     path:'/index/knowledge',
    //     name:'knowledge',
    //     component:knowledge
    //   },
    //   {
    //     path:'/index/test',
    //     name:'test',
    //     component:test
    //   },
    //   {
    //     path:'/index/forum',
    //     name:'forum',
    //     component:forum
    //   },
    //   {
    //     path:'/index/appointment',
    //     name:'appointment',
    //     component:appointment
    //   },
    //   {
    //     path:'/index/specialist',
    //     name:'specialist',
    //     component:specialist
    //   },
    //   {
    //     path:'/index/register',
    //     name:'register',
    //     component:register
    //   },
    // ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/register',
    name:'register',
    component:register
  },
  {
    path:'/',
    name:'login',
    component:Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (sessionStorage.getItem("token") == 'true') { // 判断本地是否存在token
      next()
    } else {
      // 未登录,跳转到登陆页面
      next({
        path: '/login'
      })
    }
  } else {
    if(sessionStorage.getItem("token") == 'true'){
      next('/index');
    }else{
      next();
    }
  }
})

