/**
 * 模拟 API 服务
 * 用于演示和开发阶段
 */

import {
  mockUsers,
  mockSystemHealth,
  generatePaginatedData,
  mockDelay,
  mockError,
  mockUploadResponse,
} from './mockData'

/**
 * 模拟用户 API
 */
export const mockUserAPI = {
  // 获取用户列表
  getUsers: async (params = {}) => {
    await mockDelay(800)
    mockError(0.05) // 5% 错误率

    const { page = 1, pageSize = 10, ...filters } = params
    let filteredUsers = [...mockUsers]

    // 简单的筛选逻辑
    if (filters.name) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.includes(filters.name),
      )
    }
    if (filters.role) {
      filteredUsers = filteredUsers.filter((user) => user.role === filters.role)
    }
    if (filters.status) {
      filteredUsers = filteredUsers.filter(
        (user) => user.status === filters.status,
      )
    }

    return generatePaginatedData(filteredUsers, page, pageSize)
  },

  // 获取用户详情
  getUserById: async (id) => {
    await mockDelay(300)
    mockError(0.03) // 3% 错误率

    const user = mockUsers.find((u) => u.id === parseInt(id))
    if (!user) {
      throw new Error('用户不存在')
    }

    return {
      ...user,
      // 添加更多详细信息
      lastLoginTime: '2024-01-28 10:30:00',
      loginCount: Math.floor(Math.random() * 100) + 1,
      permissions:
        user.role === 'admin' ? ['read', 'write', 'delete'] : ['read'],
    }
  },

  // 创建用户
  createUser: async (userData) => {
    await mockDelay(1000)
    mockError(0.1) // 10% 错误率

    const newUser = {
      id: Math.max(...mockUsers.map((u) => u.id)) + 1,
      ...userData,
      avatar: `https://via.placeholder.com/40/1890ff/ffffff?text=${userData.name.charAt(0)}`,
      createTime: new Date().toISOString(),
      status: 'active',
    }

    mockUsers.push(newUser)
    return newUser
  },

  // 更新用户
  updateUser: async (id, userData) => {
    await mockDelay(800)
    mockError(0.08) // 8% 错误率

    const userIndex = mockUsers.findIndex((u) => u.id === parseInt(id))
    if (userIndex === -1) {
      throw new Error('用户不存在')
    }

    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...userData,
      updateTime: new Date().toISOString(),
    }

    return mockUsers[userIndex]
  },

  // 删除用户
  deleteUser: async (id) => {
    await mockDelay(500)
    mockError(0.05) // 5% 错误率

    const userIndex = mockUsers.findIndex((u) => u.id === parseInt(id))
    if (userIndex === -1) {
      throw new Error('用户不存在')
    }

    const deletedUser = mockUsers.splice(userIndex, 1)[0]
    return { success: true, data: deletedUser }
  },
}

/**
 * 模拟系统 API
 */
export const mockSystemAPI = {
  // 健康检查
  healthCheck: async () => {
    await mockDelay(200)
    mockError(0.02) // 2% 错误率

    return {
      ...mockSystemHealth,
      timestamp: new Date().toISOString(),
    }
  },

  // 获取系统配置
  getConfig: async () => {
    await mockDelay(400)
    mockError(0.03) // 3% 错误率

    return {
      siteName: 'React App',
      version: '1.0.0',
      environment: process.env.NODE_ENV,
      features: {
        darkMode: true,
        i18n: true,
        notifications: true,
      },
      limits: {
        maxFileSize: '10MB',
        maxUsers: 1000,
        sessionTimeout: '30min',
      },
    }
  },

  // 获取版本信息
  getVersion: async () => {
    await mockDelay(100)

    return {
      version: '1.0.0',
      buildTime: '2024-01-28 10:00:00',
      gitCommit: 'abc123def456',
      environment: process.env.NODE_ENV,
    }
  },
}

/**
 * 模拟上传 API
 */
export const mockUploadAPI = {
  // 上传文件
  uploadFile: async (file, onProgress) => {
    // 模拟上传进度
    for (let progress = 0; progress <= 100; progress += 10) {
      await mockDelay(100)
      if (onProgress) {
        onProgress(progress)
      }
    }

    mockError(0.05) // 5% 错误率

    return mockUploadResponse(file)
  },

  // 上传图片
  uploadImage: async (file, onProgress) => {
    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      throw new Error('只能上传图片文件')
    }

    // 检查文件大小 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('图片大小不能超过 5MB')
    }

    return mockUploadAPI.uploadFile(file, onProgress)
  },

  // 上传头像
  uploadAvatar: async (file, onProgress) => {
    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      throw new Error('头像只能是图片文件')
    }

    // 检查文件大小 (2MB)
    if (file.size > 2 * 1024 * 1024) {
      throw new Error('头像大小不能超过 2MB')
    }

    const result = await mockUploadAPI.uploadFile(file, onProgress)

    return {
      ...result,
      data: {
        ...result.data,
        thumbnails: {
          small: `${result.data.url}?size=small`,
          medium: `${result.data.url}?size=medium`,
          large: `${result.data.url}?size=large`,
        },
      },
    }
  },
}

/**
 * 模拟认证 API
 */
export const mockAuthAPI = {
  // 登录
  login: async (credentials) => {
    await mockDelay(1000)

    const { email, password } = credentials

    // 简单验证
    if (email === 'admin@example.com' && password === '123456') {
      return {
        success: true,
        data: {
          token: `mock_token_${Date.now()}`,
          user: {
            id: 1,
            name: '管理员',
            email: 'admin@example.com',
            role: 'admin',
            avatar: 'https://via.placeholder.com/40',
          },
        },
        message: '登录成功',
      }
    } else if (email === 'user@example.com' && password === '123456') {
      return {
        success: true,
        data: {
          token: `mock_token_${Date.now()}`,
          user: {
            id: 2,
            name: '普通用户',
            email: 'user@example.com',
            role: 'user',
            avatar: 'https://via.placeholder.com/40',
          },
        },
        message: '登录成功',
      }
    } else {
      throw new Error('邮箱或密码错误')
    }
  },

  // 登出
  logout: async () => {
    await mockDelay(300)
    return { success: true, message: '登出成功' }
  },

  // 刷新token
  refreshToken: async (refreshToken) => {
    await mockDelay(500)
    mockError(0.05) // 5% 错误率

    return {
      success: true,
      data: {
        token: `mock_token_${Date.now()}`,
        refreshToken: `mock_refresh_token_${Date.now()}`,
      },
    }
  },
}

// 导出所有模拟 API
export const mockAPI = {
  user: mockUserAPI,
  system: mockSystemAPI,
  upload: mockUploadAPI,
  auth: mockAuthAPI,
}
