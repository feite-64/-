import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'loginView',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/home',
    name: 'homeView',
    // 設置重定向 默認goods頁面
    redirect:'/home/goods',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
    children: [
      {
        path: 'goods',
        name: 'goods',
        meta: {
          isShow: true,
          title: '商品列表',
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/GoodsView.vue'),
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          isShow: true,
          title: '用户列表',
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue'),
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          isShow: true,
          title: '角色列表',
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/RoleView.vue'),
      },
      {
        path: 'authority',
        name: 'authority',
        meta: {
          isShow: false,
          title: '角色列表',
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/AuthorityView.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 路由守卫
router.beforeEach((to, frome, next) => {
  const token: string | null = localStorage.getItem('token')
  if (!token && to.path !== '/') {
    next('/')
  } else {
    next()
  }
})
export default router
