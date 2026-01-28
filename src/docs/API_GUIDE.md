# API 系统使用指南

本项目集成了完整的 Axios API 请求系统，包含请求拦截器、响应拦截器、错误处理、重试机制等功能。

## 📁 文件结构

```
src/api/
├── config.js          # API 配置文件
├── request.js          # Axios 实例和拦截器
├── services.js         # API 服务层
└── index.js           # 统一导出

src/hooks/
└── useAPI.js          # API 请求 Hooks
```

## 🔧 配置说明

### API 配置 (config.js)

```javascript
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
  TIMEOUT: 30000,
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000,
}
```

### 环境变量

在 `.env` 文件中配置：

```bash
# 开发环境
REACT_APP_API_BASE_URL=http://localhost:8080/api

# 生产环境
REACT_APP_API_BASE_URL=https://api.yourapp.com
```

## 🚀 基础使用

### 1. 直接调用 API

```javascript
import { userAPI } from '../api/services'

// 获取用户列表
const users = await userAPI.getUsers({ page: 1, pageSize: 10 })

// 获取用户详情
const user = await userAPI.getUserById(1)

// 创建用户
const newUser = await userAPI.createUser({
  name: '张三',
  email: 'zhangsan@example.com',
})
```

### 2. 使用 HTTP 方法

```javascript
import { http } from '../api/services'

// GET 请求
const data = await http.get('/users', { page: 1 })

// POST 请求
const result = await http.post('/users', { name: '李四' })

// PUT 请求
const updated = await http.put('/users/1', { name: '王五' })

// DELETE 请求
await http.delete('/users/1')
```

## 🎣 使用 Hooks

### 1. useAPI - 基础 API Hook

```javascript
import { useAPI } from '../hooks/useAPI'
import { userAPI } from '../api/services'

function UserComponent() {
  const {
    data: users,
    loading,
    error,
    execute: getUsers,
  } = useAPI(userAPI.getUsers, {
    immediate: true, // 立即执行
    showSuccessMessage: true, // 显示成功消息
    showErrorMessage: true, // 显示错误消息
    onSuccess: (data) => {
      // 成功回调
      console.log('获取成功:', data)
    },
  })

  return (
    <div>
      {loading && <div>加载中...</div>}
      {error && <div>错误: {error.message}</div>}
      {users && <div>用户数量: {users.length}</div>}
      <button onClick={() => getUsers({ page: 1 })}>刷新</button>
    </div>
  )
}
```

### 2. usePaginatedAPI - 分页 API Hook

```javascript
import { usePaginatedAPI } from '../hooks/useAPI'
import { userAPI } from '../api/services'

function UserListComponent() {
  const {
    data: users,
    loading,
    pagination,
    changePage,
    changeFilters,
    refresh,
  } = usePaginatedAPI(userAPI.getUsers, {
    initialPageSize: 10,
    immediate: true,
  })

  return (
    <div>
      <Table
        dataSource={users}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: changePage,
        }}
      />
      <button onClick={refresh}>刷新</button>
    </div>
  )
}
```

### 3. useUpload - 文件上传 Hook

```javascript
import { useUpload } from '../hooks/useAPI'
import { uploadAPI } from '../api/services'

function UploadComponent() {
  const { upload, uploading, progress } = useUpload(uploadAPI.uploadFile, {
    onSuccess: (result) => {
      console.log('上传成功:', result)
    },
  })

  const handleUpload = (file) => {
    upload(file)
  }

  return (
    <div>
      <input
        type="file"
        onChange={(e) => handleUpload(e.target.files[0])}
        disabled={uploading}
      />
      {uploading && <Progress percent={progress} />}
    </div>
  )
}
```

## 🔒 认证和权限

### 自动添加 Token

请求拦截器会自动添加认证 token：

```javascript
// 请求拦截器会自动添加
const token = localStorage.getItem('authToken')
if (token) {
  config.headers.Authorization = `Bearer ${token}`
}
```

### 处理认证失败

响应拦截器会自动处理 401 错误：

```javascript
case STATUS_CODES.UNAUTHORIZED:
  // 清除认证信息
  localStorage.removeItem('authToken')
  localStorage.removeItem('userData')
  // 触发全局登出事件
  window.dispatchEvent(new CustomEvent('auth:logout'))
  break
```

## 🔄 错误处理和重试

### 自动重试

系统会自动重试失败的请求：

- 网络错误
- 超时错误
- 5xx 服务器错误

```javascript
// 配置重试参数
export const API_CONFIG = {
  RETRY_COUNT: 3, // 重试次数
  RETRY_DELAY: 1000, // 重试延迟 (毫秒)
}
```

### 错误处理

```javascript
try {
  const data = await userAPI.getUsers()
} catch (error) {
  console.error('请求失败:', {
    message: error.message, // 错误消息
    status: error.status, // HTTP 状态码
    code: error.code, // 错误代码
    response: error.response, // 响应数据
  })
}
```

## 📊 请求监控

### 开发环境日志

开发环境下会自动打印请求和响应信息：

```javascript
// 请求日志
🚀 API Request: {
  method: 'GET',
  url: '/users',
  params: { page: 1 }
}

// 响应日志
✅ API Response: {
  method: 'GET',
  url: '/users',
  status: 200,
  duration: '245ms'
}
```

### 取消重复请求

系统会自动取消重复的请求，避免资源浪费。

## 🎯 最佳实践

### 1. 使用 TypeScript (推荐)

```typescript
interface User {
  id: number
  name: string
  email: string
}

const { data: users } = useAPI<User[]>(userAPI.getUsers)
```

### 2. 错误边界处理

```javascript
function UserComponent() {
  const { data, error } = useAPI(userAPI.getUsers, {
    showErrorMessage: false, // 关闭自动错误提示
  })

  if (error) {
    return <ErrorBoundary error={error} />
  }

  return <UserList data={data} />
}
```

### 3. 缓存策略

```javascript
// 使用 React Query 或 SWR 进行数据缓存
import { useQuery } from 'react-query'

function useUsers() {
  return useQuery('users', userAPI.getUsers, {
    staleTime: 5 * 60 * 1000, // 5分钟缓存
    cacheTime: 10 * 60 * 1000, // 10分钟内保持缓存
  })
}
```

### 4. 请求取消

```javascript
function UserComponent() {
  const abortController = useRef(new AbortController())

  const getUsers = async () => {
    try {
      const users = await http.get(
        '/users',
        {},
        {
          signal: abortController.current.signal,
        },
      )
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('请求已取消')
      }
    }
  }

  useEffect(() => {
    return () => {
      abortController.current.abort()
    }
  }, [])
}
```

## 🔧 自定义配置

### 创建自定义 API 实例

```javascript
import axios from 'axios'
import { API_CONFIG } from './config'

const customAPI = axios.create({
  baseURL: 'https://api.custom.com',
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Custom-Header': 'value',
  },
})

// 添加拦截器
customAPI.interceptors.request.use(/* ... */)
customAPI.interceptors.response.use(/* ... */)
```

### 扩展 API 服务

```javascript
// 创建新的 API 服务
export const productAPI = {
  getProducts: (params) => http.get('/products', params),
  getProductById: (id) => http.get(`/products/${id}`),
  createProduct: (data) => http.post('/products', data),
  updateProduct: (id, data) => http.put(`/products/${id}`, data),
  deleteProduct: (id) => http.delete(`/products/${id}`),
}
```

## 🚨 注意事项

1. **环境变量**: 确保在不同环境中正确配置 API 基础 URL
2. **错误处理**: 根据业务需求自定义错误处理逻辑
3. **性能优化**: 合理使用缓存和请求取消机制
4. **安全性**: 不要在客户端存储敏感信息
5. **监控**: 在生产环境中添加 API 监控和日志记录

## 📚 相关文档

- [Axios 官方文档](https://axios-http.com/)
- [React Query 文档](https://react-query.tanstack.com/)
- [SWR 文档](https://swr.vercel.app/)
