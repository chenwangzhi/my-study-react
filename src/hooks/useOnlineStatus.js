import { useState, useEffect } from 'react'
import { useGlobalState, GLOBAL_STATE_KEYS } from './useGlobalState'
import { useNotification } from './useNotification'
import { useI18n } from './useI18n'

/**
 * 网络状态检测 Hook
 * 监听网络连接状态并提供相关功能
 */
export function useOnlineStatus() {
  const { t } = useI18n()
  const { showWarningNotification, showSuccessNotification } = useNotification()
  const [isOnline, setIsOnline] = useGlobalState(
    GLOBAL_STATE_KEYS.ONLINE_STATUS,
    navigator.onLine,
  )
  const [connectionType, setConnectionType] = useState('unknown')
  const [effectiveType, setEffectiveType] = useState('unknown')

  // 更新网络信息
  const updateNetworkInfo = () => {
    if ('connection' in navigator) {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection
      if (connection) {
        setConnectionType(connection.type || 'unknown')
        setEffectiveType(connection.effectiveType || 'unknown')
      }
    }
  }

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      updateNetworkInfo()
      showSuccessNotification(t('common.success'), '网络连接已恢复', {
        duration: 3,
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
      showWarningNotification(
        t('common.warning'),
        '网络连接已断开，请检查您的网络设置',
        { duration: 0 }, // 不自动关闭
      )
    }

    const handleConnectionChange = () => {
      updateNetworkInfo()
    }

    // 添加事件监听器
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // 监听网络连接变化
    if ('connection' in navigator) {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection
      if (connection) {
        connection.addEventListener('change', handleConnectionChange)
      }
    }

    // 初始化网络信息
    updateNetworkInfo()

    // 清理函数
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)

      if ('connection' in navigator) {
        const connection =
          navigator.connection ||
          navigator.mozConnection ||
          navigator.webkitConnection
        if (connection) {
          connection.removeEventListener('change', handleConnectionChange)
        }
      }
    }
  }, [setIsOnline, showWarningNotification, showSuccessNotification, t])

  // 检测网络速度
  const checkNetworkSpeed = async () => {
    if (!isOnline) return null

    try {
      const startTime = Date.now()
      const response = await fetch('/favicon.ico?' + Math.random(), {
        method: 'GET',
        cache: 'no-cache',
      })

      if (response.ok) {
        const endTime = Date.now()
        const duration = endTime - startTime
        const size = parseInt(response.headers.get('content-length') || '1024')
        const speed = (size * 8) / (duration / 1000) // bits per second

        return {
          duration,
          size,
          speed: Math.round(speed),
          speedKbps: Math.round(speed / 1024),
        }
      }
    } catch (error) {
      console.warn('Network speed test failed:', error)
    }

    return null
  }

  // 获取网络质量描述
  const getNetworkQuality = () => {
    if (!isOnline) return 'offline'

    switch (effectiveType) {
      case 'slow-2g':
        return 'poor'
      case '2g':
        return 'slow'
      case '3g':
        return 'good'
      case '4g':
        return 'excellent'
      default:
        return 'unknown'
    }
  }

  // 获取网络质量颜色
  const getNetworkQualityColor = () => {
    const quality = getNetworkQuality()
    switch (quality) {
      case 'offline':
        return '#ff4d4f'
      case 'poor':
        return '#ff7a45'
      case 'slow':
        return '#ffa940'
      case 'good':
        return '#52c41a'
      case 'excellent':
        return '#1890ff'
      default:
        return '#d9d9d9'
    }
  }

  return {
    isOnline,
    connectionType,
    effectiveType,
    networkQuality: getNetworkQuality(),
    networkQualityColor: getNetworkQualityColor(),
    checkNetworkSpeed,
  }
}
