/**
 * Axios 请求封装
 * 包含请求/响应拦截器、错误处理、重试机制等
 */

import axios from 'axios'
import { API_CONFIG, STATUS_CODES, ERROR_MESSAGES } from './config'

// 创建 axios 实例
const request = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// 请求队列管理
const requestQueue = new Map()

// 取消重复请求
const cancelDuplicateRequest = (config) => {
  const requestKey = `${config.method}_${config.url}_${JSON.stringify(config.params || {})}`

  if (requestQueue.has(requestKey)) {
    // 取消之前的请求
    requestQueue.get(requestKey).cancel('取消重复请求')
  }

  // 创建新的取消令牌
  const cancelToken = axios.CancelToken.source()
  config.cancelToken = cancelToken.token
  requestQueue.set(requestKey, cancelToken)

  return requestKey
}

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 取消重复请求
    const requestKey = cancelDuplicateRequest(config)
    config.requestKey = requestKey

    // 添加认证token
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 添加请求时间戳
    config.metadata = { startTime: Date.now() }

    // 开发环境下打印请求信息
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        params: config.params,
        data: config.data,
      })
    }

    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { config } = response

    // 清除请求队列
    if (config.requestKey) {
      requestQueue.delete(config.requestKey)
    }

    // 计算请求耗时
    const duration = Date.now() - config.metadata.startTime

    // 开发环境下打印响应信息
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        status: response.status,
        duration: `${duration}ms`,
        data: response.data,
      })
    }

    // 统一处理响应数据格式
    if (response.data && typeof response.data === 'object') {
      // 如果后端返回的数据有统一格式，在这里处理
      // 例如: { code: 200, data: {...}, message: 'success' }
      return response.data
    }

    return response.data
  },
  async (error) => {
    const { config, response } = error

    // 清除请求队列
    if (config?.requestKey) {
      requestQueue.delete(config.requestKey)
    }

    // 如果是取消的请求，直接返回
    if (axios.isCancel(error)) {
      console.log('🚫 Request Cancelled:', error.message)
      return Promise.reject(error)
    }

    // 计算请求耗时
    const duration = config?.metadata
      ? Date.now() - config.metadata.startTime
      : 0

    // 开发环境下打印错误信息
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ API Error:', {
        method: config?.method?.toUpperCase(),
        url: config?.url,
        status: response?.status,
        duration: `${duration}ms`,
        error: error.message,
        response: response?.data,
      })
    }

    // 处理不同类型的错误
    let errorMessage = ERROR_MESSAGES.UNKNOWN_ERROR

    if (!response) {
      // 网络错误
      if (error.code === 'ECONNABORTED') {
        errorMessage = ERROR_MESSAGES.TIMEOUT_ERROR
      } else {
        errorMessage = ERROR_MESSAGES.NETWORK_ERROR
      }
    } else {
      // HTTP 错误
      const { status } = response

      switch (status) {
        case STATUS_CODES.BAD_REQUEST:
          errorMessage = response.data?.message || ERROR_MESSAGES.BAD_REQUEST
          break
        case STATUS_CODES.UNAUTHORIZED:
          errorMessage = ERROR_MESSAGES.UNAUTHORIZED
          // 清除认证信息并跳转到登录页
          localStorage.removeItem('authToken')
          localStorage.removeItem('userData')
          // 触发全局登出事件
          window.dispatchEvent(new CustomEvent('auth:logout'))
          break
        case STATUS_CODES.FORBIDDEN:
          errorMessage = ERROR_MESSAGES.FORBIDDEN
          break
        case STATUS_CODES.NOT_FOUND:
          errorMessage = ERROR_MESSAGES.NOT_FOUND
          break
        case STATUS_CODES.INTERNAL_SERVER_ERROR:
        case STATUS_CODES.BAD_GATEWAY:
        case STATUS_CODES.SERVICE_UNAVAILABLE:
        case STATUS_CODES.GATEWAY_TIMEOUT:
          errorMessage = ERROR_MESSAGES.SERVER_ERROR
          break
        default:
          errorMessage = response.data?.message || ERROR_MESSAGES.UNKNOWN_ERROR
      }
    }

    // 重试机制
    if (shouldRetry(error) && config && !config.__retryCount) {
      config.__retryCount = 0
    }

    if (config && config.__retryCount < API_CONFIG.RETRY_COUNT) {
      config.__retryCount += 1

      console.log(
        `🔄 Retrying request (${config.__retryCount}/${API_CONFIG.RETRY_COUNT}):`,
        config.url,
      )

      // 延迟重试
      await new Promise((resolve) =>
        setTimeout(resolve, API_CONFIG.RETRY_DELAY),
      )

      return request(config)
    }

    // 创建统一的错误对象
    const apiError = {
      message: errorMessage,
      status: response?.status,
      code: error.code,
      config,
      response: response?.data,
      originalError: error,
    }

    return Promise.reject(apiError)
  },
)

// 判断是否应该重试
const shouldRetry = (error) => {
  // 网络错误或超时错误可以重试
  if (!error.response) {
    return true
  }

  // 5xx 服务器错误可以重试
  const status = error.response.status
  return status >= 500 && status < 600
}

export default request
