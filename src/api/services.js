/**
 * API 服务层
 * 提供统一的 HTTP 请求方法和业务接口
 */

import request from './request'
import { API_ENDPOINTS } from './config'
import { mockAPI } from './mockServices'

// 是否使用模拟数据 (开发环境或后端不可用时)
const USE_MOCK =
  process.env.REACT_APP_USE_MOCK === 'true' ||
  process.env.NODE_ENV === 'development'

/**
 * 基础 HTTP 请求方法
 */
export const http = {
  // GET 请求
  get: (url, params = {}, config = {}) => {
    return request({
      method: 'GET',
      url,
      params,
      ...config,
    })
  },

  // POST 请求
  post: (url, data = {}, config = {}) => {
    return request({
      method: 'POST',
      url,
      data,
      ...config,
    })
  },

  // PUT 请求
  put: (url, data = {}, config = {}) => {
    return request({
      method: 'PUT',
      url,
      data,
      ...config,
    })
  },

  // PATCH 请求
  patch: (url, data = {}, config = {}) => {
    return request({
      method: 'PATCH',
      url,
      data,
      ...config,
    })
  },

  // DELETE 请求
  delete: (url, config = {}) => {
    return request({
      method: 'DELETE',
      url,
      ...config,
    })
  },

  // 文件上传
  upload: (url, formData, config = {}) => {
    return request({
      method: 'POST',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    })
  },

  // 文件下载
  download: (url, params = {}, config = {}) => {
    return request({
      method: 'GET',
      url,
      params,
      responseType: 'blob',
      ...config,
    })
  },
}

/**
 * 认证相关 API
 */
export const authAPI = {
  // 登录
  login: (credentials) => {
    if (USE_MOCK) {
      return mockAPI.auth.login(credentials)
    }
    return http.post(API_ENDPOINTS.AUTH.LOGIN, credentials)
  },

  // 登出
  logout: () => {
    if (USE_MOCK) {
      return mockAPI.auth.logout()
    }
    return http.post(API_ENDPOINTS.AUTH.LOGOUT)
  },

  // 刷新token
  refreshToken: (refreshToken) => {
    if (USE_MOCK) {
      return mockAPI.auth.refreshToken(refreshToken)
    }
    return http.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken })
  },

  // 注册
  register: (userData) => {
    return http.post(API_ENDPOINTS.AUTH.REGISTER, userData)
  },

  // 获取用户信息
  getProfile: () => {
    return http.get(API_ENDPOINTS.AUTH.PROFILE)
  },

  // 修改密码
  changePassword: (passwordData) => {
    return http.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, passwordData)
  },
}

/**
 * 用户相关 API
 */
export const userAPI = {
  // 获取用户列表
  getUsers: (params = {}) => {
    if (USE_MOCK) {
      return mockAPI.user.getUsers(params)
    }
    return http.get(API_ENDPOINTS.USER.LIST, params)
  },

  // 获取用户详情
  getUserById: (id) => {
    if (USE_MOCK) {
      return mockAPI.user.getUserById(id)
    }
    const url = API_ENDPOINTS.USER.DETAIL.replace(':id', id)
    return http.get(url)
  },

  // 创建用户
  createUser: (userData) => {
    if (USE_MOCK) {
      return mockAPI.user.createUser(userData)
    }
    return http.post(API_ENDPOINTS.USER.CREATE, userData)
  },

  // 更新用户
  updateUser: (id, userData) => {
    if (USE_MOCK) {
      return mockAPI.user.updateUser(id, userData)
    }
    const url = API_ENDPOINTS.USER.UPDATE.replace(':id', id)
    return http.put(url, userData)
  },

  // 删除用户
  deleteUser: (id) => {
    if (USE_MOCK) {
      return mockAPI.user.deleteUser(id)
    }
    const url = API_ENDPOINTS.USER.DELETE.replace(':id', id)
    return http.delete(url)
  },
}

/**
 * 文件上传相关 API
 */
export const uploadAPI = {
  // 上传图片
  uploadImage: (file, onProgress) => {
    if (USE_MOCK) {
      return mockAPI.upload.uploadImage(file, onProgress)
    }

    const formData = new FormData()
    formData.append('image', file)

    return http.upload(API_ENDPOINTS.UPLOAD.IMAGE, formData, {
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          )
          onProgress(percentCompleted)
        }
      },
    })
  },

  // 上传文件
  uploadFile: (file, onProgress) => {
    if (USE_MOCK) {
      return mockAPI.upload.uploadFile(file, onProgress)
    }

    const formData = new FormData()
    formData.append('file', file)

    return http.upload(API_ENDPOINTS.UPLOAD.FILE, formData, {
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          )
          onProgress(percentCompleted)
        }
      },
    })
  },

  // 上传头像
  uploadAvatar: (file, onProgress) => {
    if (USE_MOCK) {
      return mockAPI.upload.uploadAvatar(file, onProgress)
    }

    const formData = new FormData()
    formData.append('avatar', file)

    return http.upload(API_ENDPOINTS.UPLOAD.AVATAR, formData, {
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          )
          onProgress(percentCompleted)
        }
      },
    })
  },
}

/**
 * 系统相关 API
 */
export const systemAPI = {
  // 获取系统配置
  getConfig: () => {
    if (USE_MOCK) {
      return mockAPI.system.getConfig()
    }
    return http.get(API_ENDPOINTS.SYSTEM.CONFIG)
  },

  // 健康检查
  healthCheck: () => {
    if (USE_MOCK) {
      return mockAPI.system.healthCheck()
    }
    return http.get(API_ENDPOINTS.SYSTEM.HEALTH)
  },

  // 获取版本信息
  getVersion: () => {
    if (USE_MOCK) {
      return mockAPI.system.getVersion()
    }
    return http.get(API_ENDPOINTS.SYSTEM.VERSION)
  },
}

/**
 * 通用分页请求
 */
export const createPaginatedAPI = (baseUrl) => {
  return {
    // 获取分页数据
    getPage: (params = {}) => {
      const { page = 1, pageSize = 10, ...filters } = params
      return http.get(baseUrl, {
        page,
        pageSize,
        ...filters,
      })
    },

    // 获取所有数据
    getAll: (params = {}) => {
      return http.get(baseUrl, params)
    },
  }
}

/**
 * 导出所有 API
 */
export default {
  http,
  authAPI,
  userAPI,
  uploadAPI,
  systemAPI,
  createPaginatedAPI,
}
