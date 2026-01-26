# Ant Design 按需引入使用指南

## 📦 已安装的包

```bash
npm install antd @ant-design/icons
```

## 🎯 按需引入方式

### 1. 组件按需引入
```javascript
// ✅ 推荐：按需引入具体组件
import { Button, Card, Input, Select } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

// ❌ 不推荐：全量引入
import * as antd from 'antd';
```

### 2. 样式引入
```scss
// 在 main.scss 中引入
@import '~antd/dist/reset.css';
```

## 🎨 主题定制

### 1. CSS 变量方式
在 `_antd-theme.scss` 中定义主题变量：
```scss
:root {
  --ant-primary-color: #1890ff;
  --ant-success-color: #52c41a;
  // ... 更多变量
}

[data-theme="dark"] {
  --ant-primary-color: #1890ff;
  // ... 深色主题变量
}
```

### 2. 组件样式覆盖
```scss
.ant-btn {
  border-radius: 6px;
  font-weight: 500;
  
  &-primary {
    background-color: var(--ant-primary-color);
    border-color: var(--ant-primary-color);
  }
}
```

## 📋 常用组件示例

### 基础组件
- **Button**: 按钮组件
- **Input**: 输入框组件
- **Select**: 选择器组件
- **Card**: 卡片容器
- **Space**: 间距组件

### 数据展示
- **Table**: 表格组件
- **Tag**: 标签组件
- **Progress**: 进度条
- **Rate**: 评分组件

### 反馈组件
- **Alert**: 警告提示
- **Message**: 全局提示
- **Modal**: 对话框

## 🔧 最佳实践

### 1. 组件导入
```javascript
// 按功能分组导入
import { 
  Button, 
  Card, 
  Input, 
  Select 
} from 'antd';

import { 
  SearchOutlined, 
  UserOutlined,
  EditOutlined 
} from '@ant-design/icons';
```

### 2. 主题适配
```javascript
// 使用 useTheme Hook 获取当前主题
import { useTheme } from '../hooks/useTheme';

function MyComponent() {
  const { isDark } = useTheme();
  
  return (
    <Button type={isDark ? 'default' : 'primary'}>
      主题适配按钮
    </Button>
  );
}
```

### 3. 响应式设计
```javascript
import { Row, Col } from 'antd';

function ResponsiveLayout() {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12} lg={8}>
        <Card>内容1</Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card>内容2</Card>
      </Col>
      <Col xs={24} md={24} lg={8}>
        <Card>内容3</Card>
      </Col>
    </Row>
  );
}
```

## 📱 移动端适配

Ant Design 组件默认支持响应式设计，但可以通过以下方式优化：

```scss
// 移动端样式调整
@media (max-width: 768px) {
  .ant-table {
    font-size: 12px;
  }
  
  .ant-btn {
    height: 36px;
    padding: 0 12px;
  }
}
```

## 🎯 性能优化

1. **按需引入**: 只引入使用的组件
2. **Tree Shaking**: 现代打包工具会自动移除未使用的代码
3. **懒加载**: 对于大型组件可以使用动态导入

```javascript
// 懒加载示例
const TableDemo = lazy(() => import('./components/TableDemo'));
```

## 🔍 调试技巧

1. 使用浏览器开发者工具查看 Ant Design 组件的 CSS 类名
2. 通过 `console.log` 查看组件的 props 和状态
3. 使用 React Developer Tools 调试组件树

## 📚 参考资源

- [Ant Design 官方文档](https://ant.design/docs/react/introduce-cn)
- [Ant Design Icons](https://ant.design/components/icon-cn)
- [主题定制](https://ant.design/docs/react/customize-theme-cn)