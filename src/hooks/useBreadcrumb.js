import { useEffect, useMemo, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useI18n } from './useI18n'
import { useGlobalState, GLOBAL_STATE_KEYS } from './useGlobalState'

/**
 * 面包屑导航 Hook
 * 自动生成和管理面包屑导航
 */
export function useBreadcrumb() {
  const location = useLocation()
  const { t } = useI18n()
  const [breadcrumbs, setBreadcrumbs] = useGlobalState(
    GLOBAL_STATE_KEYS.BREADCRUMBS,
    [],
  )

  // 路由映射配置
  const routeMap = useMemo(
    () => ({
      '/': {
        title: t('navigation.home'),
        icon: '🏠',
      },
      '/dashboard': {
        title: t('navigation.dashboard'),
        icon: '📊',
      },
      '/profile': {
        title: t('navigation.profile'),
        icon: '👤',
      },
      '/settings': {
        title: t('navigation.settings'),
        icon: '⚙️',
      },
      '/login': {
        title: t('navigation.login'),
        icon: '🔐',
      },
      '/404': {
        title: t('errors.404.title'),
        icon: '❓',
      },
    }),
    [t],
  )

  // 生成面包屑
  const generateBreadcrumbs = useCallback(
    (pathname) => {
      const pathSegments = pathname.split('/').filter(Boolean)
      const breadcrumbItems = []

      // 添加首页
      if (pathname !== '/') {
        breadcrumbItems.push({
          path: '/',
          title: routeMap['/']?.title || t('navigation.home'),
          icon: routeMap['/']?.icon,
        })
      }

      // 构建路径面包屑
      let currentPath = ''
      pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`
        const routeConfig = routeMap[currentPath]

        if (routeConfig) {
          breadcrumbItems.push({
            path: currentPath,
            title: routeConfig.title,
            icon: routeConfig.icon,
            isLast: index === pathSegments.length - 1,
          })
        } else {
          // 如果没有配置，使用路径段作为标题
          breadcrumbItems.push({
            path: currentPath,
            title: segment.charAt(0).toUpperCase() + segment.slice(1),
            icon: '📄',
            isLast: index === pathSegments.length - 1,
          })
        }
      })

      return breadcrumbItems
    },
    [routeMap, t],
  )

  // 监听路由变化
  useEffect(() => {
    const newBreadcrumbs = generateBreadcrumbs(location.pathname)
    setBreadcrumbs(newBreadcrumbs)
  }, [location.pathname, setBreadcrumbs, routeMap, generateBreadcrumbs])

  // 添加自定义面包屑项
  const addBreadcrumb = (item) => {
    setBreadcrumbs((prev) => [...prev, { ...item, isLast: true }])
  }

  // 移除最后一个面包屑项
  const removeBreadcrumb = () => {
    setBreadcrumbs((prev) => prev.slice(0, -1))
  }

  // 清空面包屑
  const clearBreadcrumbs = () => {
    setBreadcrumbs([])
  }

  // 设置自定义面包屑
  const setBreadcrumbItems = (items) => {
    setBreadcrumbs(
      items.map((item, index) => ({
        ...item,
        isLast: index === items.length - 1,
      })),
    )
  }

  return {
    breadcrumbs,
    addBreadcrumb,
    removeBreadcrumb,
    clearBreadcrumbs,
    setBreadcrumbItems,
  }
}
