import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import getPageTitle from '@/utils/get-page-title'

Vue.use(VueRouter)

const routes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: {title: '首页'}
      },
      {
        path: '/home/:mode/:query',
        name: 'search',
        component: () => import('@/views/home/search'),
        meta: {title: '搜索页'}
      },
      {
        path: '/map',
        name: 'map',
        component: () => import('@/views/map/index'),
        meta: {title: '访客地图'}
      }, 
      {
        path: '/repository',
        name: 'repository',
        component: () => import('@/views/repository/index'),
        meta: {title: '归档'}
      },
      {
        path: '/blog/:id',
        name: 'blog',
        component: () => import('@/views/blog/index'),
        meta: {title: '博客详情'}
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

router.beforeEach((to,from,next)=>{
  document.title = getPageTitle(to.meta.title)
  next()
})

export default router