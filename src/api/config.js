/**
 * API 配置文件
 * 包含所有 API 相关的配置信息
 */

// API 基础配置
export const API_CONFIG = {
  // 基础 URL
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',

  // 超时时间 (毫秒)
  TIMEOUT: 30000,

  // 重试次数
  RETRY_COUNT: 3,

  // 重试延迟 (毫秒)
  RETRY_DELAY: 1000,
}

// 请求头配置
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

// 状态码配置
export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
}

// 错误消息配置
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接失败，请检查网络设置',
  TIMEOUT_ERROR: '请求超时，请稍后重试',
  SERVER_ERROR: '服务器内部错误，请稍后重试',
  UNAUTHORIZED: '登录已过期，请重新登录',
  FORBIDDEN: '没有权限访问此资源',
  NOT_FOUND: '请求的资源不存在',
  BAD_REQUEST: '请求参数错误',
  UNKNOWN_ERROR: '未知错误，请稍后重试',
}

// API 端点配置
export const API_ENDPOINTS = {
  // 认证相关
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
  },

  // 用户相关
  USER: {
    LIST: '/users',
    DETAIL: '/users/:id',
    CREATE: '/users',
    UPDATE: '/users/:id',
    DELETE: '/users/:id',
  },

  // 文件上传
  UPLOAD: {
    IMAGE: '/upload/image',
    FILE: '/upload/file',
    AVATAR: '/upload/avatar',
  },

  // 系统相关
  SYSTEM: {
    CONFIG: '/system/config',
    HEALTH: '/system/health',
    VERSION: '/system/version',
  },
}

// 缓存配置
export const CACHE_CONFIG = {
  // 缓存键前缀
  PREFIX: 'api_cache_',

  // 默认缓存时间 (毫秒)
  DEFAULT_TTL: 5 * 60 * 1000, // 5分钟

  // 不同类型的缓存时间
  TTL: {
    SHORT: 1 * 60 * 1000, // 1分钟
    MEDIUM: 5 * 60 * 1000, // 5分钟
    LONG: 30 * 60 * 1000, // 30分钟
    VERY_LONG: 24 * 60 * 60 * 1000, // 24小时
  },
}
