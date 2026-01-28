import { useState, useCallback, useEffect } from 'react'

/**
 * 全局状态管理 Hook
 * 提供简单的全局状态管理功能
 */

// 全局状态存储
const globalState = new Map()
const listeners = new Map()

/**
 * 创建全局状态
 * @param {string} key - 状态键名
 * @param {any} initialValue - 初始值
 */
export function useGlobalState(key, initialValue) {
  // 如果状态不存在，初始化
  if (!globalState.has(key)) {
    globalState.set(key, initialValue)
    listeners.set(key, new Set())
  }

  const [state, setState] = useState(() => globalState.get(key))

  // 更新状态的函数
  const updateState = useCallback(
    (newValue) => {
      const value =
        typeof newValue === 'function'
          ? newValue(globalState.get(key))
          : newValue

      globalState.set(key, value)

      // 通知所有监听器
      const keyListeners = listeners.get(key)
      if (keyListeners) {
        keyListeners.forEach((listener) => listener(value))
      }
    },
    [key],
  )

  // 注册监听器
  useEffect(() => {
    const keyListeners = listeners.get(key)
    if (keyListeners) {
      keyListeners.add(setState)

      // 清理函数
      return () => {
        keyListeners.delete(setState)
      }
    }
  }, [key])

  return [state, updateState]
}

/**
 * 获取全局状态（只读）
 * @param {string} key - 状态键名
 */
export function getGlobalState(key) {
  return globalState.get(key)
}

/**
 * 设置全局状态
 * @param {string} key - 状态键名
 * @param {any} value - 状态值
 */
export function setGlobalState(key, value) {
  globalState.set(key, value)

  const keyListeners = listeners.get(key)
  if (keyListeners) {
    keyListeners.forEach((listener) => listener(value))
  }
}

/**
 * 清除全局状态
 * @param {string} key - 状态键名
 */
export function clearGlobalState(key) {
  globalState.delete(key)
  listeners.delete(key)
}

/**
 * 获取所有全局状态键名
 */
export function getGlobalStateKeys() {
  return Array.from(globalState.keys())
}

// 预定义的全局状态键名
export const GLOBAL_STATE_KEYS = {
  LOADING: 'global_loading',
  USER_PREFERENCES: 'user_preferences',
  NOTIFICATIONS: 'notifications',
  BREADCRUMBS: 'breadcrumbs',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  ONLINE_STATUS: 'online_status',
}
