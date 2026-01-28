# 外部API接口使用指南

本项目集成了多个开源和免费的API接口，展示如何使用封装的axios系统调用外部数据源。

## 🌐 集成的API接口

### 1. JSONPlaceholder API

- **用途**: 提供测试用的REST API数据
- **网址**: https://jsonplaceholder.typicode.com
- **功能**: 文章、用户、评论、相册、待办事项等测试数据
- **免费**: ✅ 完全免费，无需API Key

### 2. GitHub API

- **用途**: 获取GitHub仓库和用户信息
- **网址**: https://api.github.com
- **功能**: 搜索仓库、获取用户信息、仓库详情等
- **免费**: ✅ 有速率限制，无需认证可访问公开数据

### 3. RandomUser API

- **用途**: 生成随机用户数据
- **网址**: https://randomuser.me
- **功能**: 随机用户信息，支持多种参数配置
- **免费**: ✅ 完全免费

### 4. Cat Facts API

- **用途**: 提供有趣的猫咪知识
- **网址**: https://catfact.ninja
- **功能**: 随机猫咪事实和知识
- **免费**: ✅ 完全免费

### 5. Dog CEO API

- **用途**: 提供狗狗图片
- **网址**: https://dog.ceo/dog-api
- **功能**: 随机狗狗图片，按品种分类
- **免费**: ✅ 完全免费

### 6. 今日诗词API

- **用途**: 提供中国古典诗词
- **网址**: https://www.jinrishici.com
- **功能**: 随机古诗词内容
- **免费**: ✅ 基础功能免费

## 🚀 使用方法

### 1. 基础调用示例

```javascript
import { jsonPlaceholderService } from '../api/externalServices'

// 获取文章列表
const posts = await jsonPlaceholderService.getPosts()

// 获取用户信息
const users = await jsonPlaceholderService.getUsers()
```

### 2. 使用React Hooks

```javascript
import { useAPI } from '../hooks/useAPI'
import { githubService } from '../api/externalServices'

function GitHubDemo() {
  const {
    data: repos,
    loading,
    execute: searchRepos,
  } = useAPI((query) => githubService.searchRepositories(query), {
    showErrorMessage: true,
    errorMessage: 'GitHub搜索失败',
  })

  const handleSearch = () => {
    searchRepos('react')
  }

  return (
    <div>
      <button onClick={handleSearch} disabled={loading}>
        搜索React仓库
      </button>
      {repos && <div>找到 {repos.data.total_count} 个仓库</div>}
    </div>
  )
}
```

### 3. 错误处理

```javascript
try {
  const randomUsers = await randomUserService.getRandomUsers(10)
  console.log('获取到用户:', randomUsers.data.results)
} catch (error) {
  console.error('请求失败:', error.message)
}
```

## 📊 API响应格式

### JSONPlaceholder 响应示例

```json
{
  "data": [
    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat",
      "body": "quia et suscipit..."
    }
  ]
}
```

### GitHub API 响应示例

```json
{
  "data": {
    "total_count": 12345,
    "items": [
      {
        "id": 10270250,
        "name": "react",
        "full_name": "facebook/react",
        "description": "A declarative...",
        "stargazers_count": 180000,
        "language": "JavaScript"
      }
    ]
  }
}
```

### RandomUser API 响应示例

```json
{
  "data": {
    "results": [
      {
        "name": {
          "first": "John",
          "last": "Doe"
        },
        "email": "john.doe@example.com",
        "picture": {
          "large": "https://randomuser.me/api/portraits/men/1.jpg"
        }
      }
    ]
  }
}
```

## 🔧 配置说明

### 添加新的外部API

1. 在 `src/api/config.js` 中添加API基础URL：

```javascript
export const EXTERNAL_APIS = {
  NEW_API: 'https://api.example.com',
}
```

2. 在 `src/api/externalServices.js` 中创建服务：

```javascript
const newAPI = createExternalAPI(EXTERNAL_APIS.NEW_API)

export const newAPIService = {
  getData: () => newAPI.get('/data'),
}
```

3. 在组件中使用：

```javascript
import { newAPIService } from '../api/externalServices'
import { useAPI } from '../hooks/useAPI'

const { data, loading, execute } = useAPI(newAPIService.getData)
```

### 处理需要API Key的服务

对于需要API Key的服务（如天气API、新闻API），可以这样配置：

```javascript
// 在环境变量中配置
REACT_APP_WEATHER_API_KEY = your_api_key_here

// 在服务中使用
export const weatherService = {
  getCurrentWeather: (city) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY
    return weatherAPI.get('/weather', {
      params: { q: city, appid: apiKey },
    })
  },
}
```

## 🎯 最佳实践

### 1. 错误处理

- 始终使用try-catch包装API调用
- 为用户提供友好的错误提示
- 记录详细的错误信息用于调试

### 2. 加载状态

- 使用loading状态提供用户反馈
- 考虑使用骨架屏或加载动画

### 3. 数据缓存

- 对于不经常变化的数据考虑缓存
- 使用React Query或SWR进行数据管理

### 4. 速率限制

- 了解各API的速率限制
- 实现适当的重试机制
- 考虑使用防抖来减少请求频率

### 5. 安全性

- 不要在客户端暴露敏感的API Key
- 使用环境变量管理配置
- 对用户输入进行验证和清理

## 🚨 注意事项

1. **CORS问题**: 某些API可能有CORS限制，需要后端代理
2. **速率限制**: 注意各API的调用频率限制
3. **数据格式**: 不同API返回的数据格式可能不同
4. **错误码**: 了解各API的错误响应格式
5. **版本更新**: 关注API版本更新和废弃通知

## 📚 相关资源

- [Axios 官方文档](https://axios-http.com/)
- [JSONPlaceholder 文档](https://jsonplaceholder.typicode.com/guide/)
- [GitHub API 文档](https://docs.github.com/en/rest)
- [RandomUser API 文档](https://randomuser.me/documentation)
- [公共API列表](https://github.com/public-apis/public-apis)

## 🔗 在线演示

访问项目的 `/external-api` 路径查看完整的外部API演示功能。
