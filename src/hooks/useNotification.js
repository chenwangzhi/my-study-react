import { useCallback } from 'react'
import { useAntd } from './useAntd'
import { useI18n } from './useI18n'
import { useGlobalState, GLOBAL_STATE_KEYS } from './useGlobalState'

/**
 * 通知系统 Hook
 * 提供统一的消息通知功能
 */
export function useNotification() {
  const { message, notification } = useAntd()
  const { t } = useI18n()
  const [notifications, setNotifications] = useGlobalState(
    GLOBAL_STATE_KEYS.NOTIFICATIONS,
    [],
  )

  // 显示成功消息
  const showSuccess = useCallback(
    (content, duration = 3) => {
      message.success(content || t('common.success'), duration)
    },
    [message, t],
  )

  // 显示错误消息
  const showError = useCallback(
    (content, duration = 5) => {
      message.error(content || t('common.error'), duration)
    },
    [message, t],
  )

  // 显示警告消息
  const showWarning = useCallback(
    (content, duration = 4) => {
      message.warning(content || t('common.warning'), duration)
    },
    [message, t],
  )

  // 显示信息消息
  const showInfo = useCallback(
    (content, duration = 3) => {
      message.info(content || t('common.info'), duration)
    },
    [message, t],
  )

  // 显示加载消息
  const showLoading = useCallback(
    (content, duration = 0) => {
      return message.loading(content || t('common.loading'), duration)
    },
    [message, t],
  )

  // 显示通知
  const showNotification = useCallback(
    (config) => {
      const defaultConfig = {
        placement: 'topRight',
        duration: 4.5,
      }

      notification.open({
        ...defaultConfig,
        ...config,
      })

      // 添加到全局通知列表
      const newNotification = {
        id: Date.now(),
        timestamp: new Date(),
        ...config,
      }

      setNotifications((prev) => [newNotification, ...prev.slice(0, 49)]) // 最多保留50条
    },
    [notification, setNotifications],
  )

  // 显示成功通知
  const showSuccessNotification = useCallback(
    (title, description, config = {}) => {
      showNotification({
        message: title || t('common.success'),
        description,
        type: 'success',
        ...config,
      })
    },
    [showNotification, t],
  )

  // 显示错误通知
  const showErrorNotification = useCallback(
    (title, description, config = {}) => {
      showNotification({
        message: title || t('common.error'),
        description,
        type: 'error',
        duration: 0, // 错误通知不自动关闭
        ...config,
      })
    },
    [showNotification, t],
  )

  // 显示警告通知
  const showWarningNotification = useCallback(
    (title, description, config = {}) => {
      showNotification({
        message: title || t('common.warning'),
        description,
        type: 'warning',
        ...config,
      })
    },
    [showNotification, t],
  )

  // 显示信息通知
  const showInfoNotification = useCallback(
    (title, description, config = {}) => {
      showNotification({
        message: title || t('common.info'),
        description,
        type: 'info',
        ...config,
      })
    },
    [showNotification, t],
  )

  // 清除所有通知
  const clearNotifications = useCallback(() => {
    setNotifications([])
    notification.destroy()
  }, [setNotifications, notification])

  // 移除指定通知
  const removeNotification = useCallback(
    (id) => {
      setNotifications((prev) => prev.filter((item) => item.id !== id))
    },
    [setNotifications],
  )

  return {
    // 消息方法
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,

    // 通知方法
    showNotification,
    showSuccessNotification,
    showErrorNotification,
    showWarningNotification,
    showInfoNotification,

    // 管理方法
    clearNotifications,
    removeNotification,

    // 状态
    notifications,
  }
}
