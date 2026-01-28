/**
 * 模拟数据
 * 用于演示 API 功能
 */

// 模拟用户数据
export const mockUsers = [
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: 'admin',
    avatar: 'https://via.placeholder.com/40/1890ff/ffffff?text=张',
    createTime: '2024-01-15 10:30:00',
    status: 'active',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: 'user',
    avatar: 'https://via.placeholder.com/40/52c41a/ffffff?text=李',
    createTime: '2024-01-16 14:20:00',
    status: 'active',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    role: 'user',
    avatar: 'https://via.placeholder.com/40/faad14/ffffff?text=王',
    createTime: '2024-01-17 09:15:00',
    status: 'inactive',
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    role: 'user',
    avatar: 'https://via.placeholder.com/40/f5222d/ffffff?text=赵',
    createTime: '2024-01-18 16:45:00',
    status: 'active',
  },
  {
    id: 5,
    name: '钱七',
    email: 'qianqi@example.com',
    role: 'admin',
    avatar: 'https://via.placeholder.com/40/722ed1/ffffff?text=钱',
    createTime: '2024-01-19 11:30:00',
    status: 'active',
  },
  {
    id: 6,
    name: '孙八',
    email: 'sunba@example.com',
    role: 'user',
    avatar: 'https://via.placeholder.com/40/13c2c2/ffffff?text=孙',
    createTime: '2024-01-20 13:20:00',
    status: 'active',
  },
  {
    id: 7,
    name: '周九',
    email: 'zhoujiu@example.com',
    role: 'user',
    avatar: 'https://via.placeholder.com/40/eb2f96/ffffff?text=周',
    createTime: '2024-01-21 08:10:00',
    status: 'inactive',
  },
  {
    id: 8,
    name: '吴十',
    email: 'wushi@example.com',
    role: 'user',
    avatar: 'https://via.placeholder.com/40/fa8c16/ffffff?text=吴',
    createTime: '2024-01-22 15:40:00',
    status: 'active',
  },
]

// 模拟系统状态数据
export const mockSystemHealth = {
  status: 'healthy',
  timestamp: new Date().toISOString(),
  services: {
    database: { status: 'up', responseTime: '12ms' },
    redis: { status: 'up', responseTime: '3ms' },
    api: { status: 'up', responseTime: '45ms' },
  },
  version: '1.0.0',
  uptime: '7 days, 14 hours, 32 minutes',
}

// 模拟分页数据生成器
export const generatePaginatedData = (data, page = 1, pageSize = 10) => {
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const items = data.slice(startIndex, endIndex)

  return {
    data: items,
    pagination: {
      current: page,
      pageSize,
      total: data.length,
      totalPages: Math.ceil(data.length / pageSize),
    },
  }
}

// 模拟 API 延迟
export const mockDelay = (ms = 500) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// 模拟 API 错误
export const mockError = (errorRate = 0.1) => {
  if (Math.random() < errorRate) {
    throw new Error('模拟 API 错误')
  }
}

// 模拟文件上传响应
export const mockUploadResponse = (file) => {
  return {
    success: true,
    data: {
      id: Date.now(),
      filename: file.name,
      size: file.size,
      type: file.type,
      url: `https://example.com/uploads/${file.name}`,
      uploadTime: new Date().toISOString(),
    },
    message: '文件上传成功',
  }
}
