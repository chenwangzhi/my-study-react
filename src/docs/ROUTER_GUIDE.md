# React Router 路由系统使用指南

## 🎯 概述

本项目集成了完整的React Router路由系统，包含路由守卫、权限控制、路由白名单等功能。

## 📁 文件结构

```
src/
├── router/
│   ├── routes.js          # 路由配置
│   └── RouteGuard.jsx     # 路由守卫组件
├── hooks/
│   └── useAuth.js         # 认证Hook
├── pages/                 # 页面组件
│   ├── Home/
│   ├── Login/
│   ├── Dashboard/
│   ├── Profile/
│   ├── Settings/
│   └── NotFound/
└── components/
    └── Navigation/        # 导航组件
```

## 🔐 路由守卫功能

### 1. 路由白名单
不需要登录就能访问的路由：
- `/` - 首页
- `/login` - 登录页
- `/404` - 404页面
- `/register` - 注册页（如果有）

### 2. 认证检查
- 未登录用户访问受保护路由时，自动跳转到登录页
- 登录成功后自动跳转回原来要访问的页面
- 已登录用户访问登录页时，自动跳转到仪表盘

### 3. 权限控制
- 基于用户角色的权限验证
- 管理员可以访问所有页面
- 普通用户只能访问有权限的页面

## 📋 路由配置

### 路由定义格式
```javascript
{
  path: '/dashboard',
  element: Dashboard,
  meta: {
    title: '仪表盘',
    requiresAuth: true,
    roles: ['admin', 'user'],
    keepAlive: true,
    hideInMenu: false,
  },
}
```

### Meta字段说明
- `title`: 页面标题
- `requiresAuth`: 是否需要登录
- `roles`: 允许访问的角色数组
- `keepAlive`: 是否保持组件状态
- `hideInMenu`: 是否在菜单中隐藏

## 🚀 使用方法

### 1. 页面导航
```javascript
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/dashboard');
  };
  
  return <button onClick={handleClick}>跳转</button>;
}
```

### 2. 获取当前路由
```javascript
import { useLocation } from 'react-router-dom';

function MyComponent() {
  const location = useLocation();
  
  console.log('当前路径:', location.pathname);
  console.log('查询参数:', location.search);
  
  return <div>当前页面: {location.pathname}</div>;
}
```

### 3. 路由参数
```javascript
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  
  return <div>用户ID: {userId}</div>;
}
```

## 🔑 认证系统

### 1. 使用认证Hook
```javascript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { 
    user, 
    isAuthenticated, 
    login, 
    logout, 
    hasPermission 
  } = useAuth();
  
  if (!isAuthenticated) {
    return <div>请先登录</div>;
  }
  
  return <div>欢迎, {user.name}!</div>;
}
```

### 2. 权限检查
```javascript
const { hasPermission } = useAuth();

// 检查是否有管理员权限
if (hasPermission('admin')) {
  // 显示管理员功能
}
```

### 3. 登录流程
```javascript
const handleLogin = async (email, password) => {
  const result = await login(email, password);
  
  if (result.success) {
    navigate('/dashboard');
  } else {
    console.error('登录失败:', result.error);
  }
};
```

## 🛡️ 路由守卫工作流程

1. **路由变化检测**: 监听路由变化
2. **白名单检查**: 检查是否在白名单中
3. **认证状态检查**: 验证用户登录状态
4. **权限验证**: 检查用户角色权限
5. **页面跳转**: 根据检查结果进行跳转
6. **标题更新**: 更新页面标题

## 📱 导航组件

### 1. 自动菜单生成
根据路由配置和用户权限自动生成导航菜单

### 2. 用户信息显示
- 显示用户头像和姓名
- 提供用户操作下拉菜单
- 登录/登出状态切换

### 3. 主题切换
集成主题切换按钮

## 🔧 自定义配置

### 1. 添加新路由
在 `src/router/routes.js` 中添加：
```javascript
{
  path: '/new-page',
  element: NewPage,
  meta: {
    title: '新页面',
    requiresAuth: true,
    roles: ['admin'],
  },
}
```

### 2. 修改白名单
在 `src/router/routes.js` 中修改：
```javascript
export const whiteList = [
  '/',
  '/login',
  '/404',
  '/new-public-page', // 添加新的公开页面
];
```

### 3. 自定义权限检查
在 `RouteGuard.jsx` 中修改权限检查逻辑

## 🎨 页面组件规范

### 1. 页面组件结构
```
src/pages/PageName/
├── index.jsx          # 页面组件
├── PageName.scss      # 页面样式
└── components/        # 页面专用组件
```

### 2. 页面组件模板
```javascript
import { useAuth } from '../../hooks/useAuth';
import { useAntd } from '../../hooks/useAntd';
import './PageName.scss';

export default function PageName() {
  const { user } = useAuth();
  const { Card, Button } = useAntd();
  
  return (
    <div className="page-name">
      <div className="container">
        <Card title="页面标题">
          <p>页面内容</p>
        </Card>
      </div>
    </div>
  );
}
```

## 🚨 注意事项

1. **懒加载**: 所有页面组件都使用懒加载，提升性能
2. **错误边界**: 建议为页面组件添加错误边界
3. **SEO优化**: 重要页面需要设置合适的页面标题
4. **权限控制**: 敏感操作需要二次权限验证
5. **路由缓存**: 合理使用keepAlive避免不必要的重渲染

## 📚 相关资源

- [React Router 官方文档](https://reactrouter.com/)
- [Ant Design 导航组件](https://ant.design/components/menu-cn)
- [React Suspense](https://react.dev/reference/react/Suspense)