// 路由配置
import { lazy } from 'react'

// 懒加载组件
const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/Login'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Profile = lazy(() => import('../pages/Profile'))
const Settings = lazy(() => import('../pages/Settings'))
const NotFound = lazy(() => import('../pages/NotFound'))
const APIDemo = lazy(() => import('../components/APIDemo'))
const ExternalAPIDemo = lazy(() => import('../components/ExternalAPIDemo'))
const SimpleAPITest = lazy(() => import('../components/SimpleAPITest'))

// 路由配置
export const routes = [
  {
    path: '/',
    element: Home,
    meta: {
      title: '首页',
      requiresAuth: false,
      keepAlive: true,
    },
  },
  {
    path: '/login',
    element: Login,
    meta: {
      title: '登录',
      requiresAuth: false,
      hideInMenu: true,
    },
  },
  {
    path: '/dashboard',
    element: Dashboard,
    meta: {
      title: '仪表盘',
      requiresAuth: true,
      roles: ['admin', 'user'],
    },
  },
  {
    path: '/profile',
    element: Profile,
    meta: {
      title: '个人中心',
      requiresAuth: true,
      roles: ['admin', 'user'],
    },
  },
  {
    path: '/settings',
    element: Settings,
    meta: {
      title: '系统设置',
      requiresAuth: true,
      roles: ['admin'],
    },
  },
  {
    path: '/api-demo',
    element: APIDemo,
    meta: {
      title: 'API 演示',
      requiresAuth: true,
      roles: ['admin', 'user'],
    },
  },
  {
    path: '/external-api',
    element: ExternalAPIDemo,
    meta: {
      title: '外部API演示',
      requiresAuth: true,
      roles: ['admin', 'user'],
    },
  },
  {
    path: '/api-test',
    element: SimpleAPITest,
    meta: {
      title: 'API测试',
      requiresAuth: true,
      roles: ['admin', 'user'],
    },
  },
  {
    path: '/404',
    element: NotFound,
    meta: {
      title: '页面未找到',
      requiresAuth: false,
      hideInMenu: true,
    },
  },
]

// 路由白名单 - 不需要登录就能访问的路由
export const whiteList = [
  '/',
  '/login',
  '/404',
  '/register', // 如果有注册页面
]

// 根据角色过滤路由
export const filterRoutesByRole = (routes, userRole) => {
  return routes.filter((route) => {
    if (!route.meta?.roles) return true
    return route.meta.roles.includes(userRole)
  })
}

// 获取路由标题
export const getRouteTitle = (pathname) => {
  const route = routes.find((route) => route.path === pathname)
  return route?.meta?.title || '未知页面'
}
