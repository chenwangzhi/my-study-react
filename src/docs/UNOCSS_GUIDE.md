# UnoCSS 使用指南

## 概述
UnoCSS 是一个即时的原子化 CSS 引擎，为项目提供高性能的原子类样式系统。

## 配置文件
- `uno.config.js` - UnoCSS 主配置文件
- `src/styles/uno.css` - 生成的样式文件（自动生成，请勿手动编辑）

## 使用方法

### 1. 开发流程
```bash
# 生成 UnoCSS 样式
npm run unocss

# 监听模式（开发时推荐）
npm run unocss:watch

# 启动开发服务器（会自动生成样式）
npm start
```

### 2. VSCode 智能提示
项目已配置 VSCode 设置，安装 UnoCSS 插件后即可获得：
- 类名自动补全
- 颜色预览
- 样式预览

### 3. 常用类名示例

#### 布局
```jsx
<div className="flex-center">居中布局</div>
<div className="flex-between">两端对齐</div>
<div className="flex-col-center">垂直居中</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">响应式网格</div>
```

#### 按钮
```jsx
<button className="btn-primary">主要按钮</button>
<button className="btn-secondary">次要按钮</button>
<button className="btn-success">成功按钮</button>
<button className="btn-warning">警告按钮</button>
<button className="btn-error">错误按钮</button>
```

#### 卡片
```jsx
<div className="card">基础卡片</div>
<div className="card-hover">悬停效果卡片</div>
```

#### 输入框
```jsx
<input className="input-base" placeholder="输入内容" />
```

#### 文字样式
```jsx
<h1 className="text-title">标题</h1>
<h2 className="text-subtitle">副标题</h2>
<p className="text-body">正文</p>
<span className="text-caption">说明文字</span>
```

### 4. 颜色系统
项目定义了完整的颜色系统：
- `primary` - 主色调（蓝色系）
- `success` - 成功色（绿色系）
- `warning` - 警告色（橙色系）
- `error` - 错误色（红色系）

每种颜色都有 50-900 的色阶，例如：
```jsx
<div className="bg-primary-500 text-white">主色背景</div>
<div className="text-success-600">成功色文字</div>
<div className="border border-warning-400">警告色边框</div>
```

### 5. 响应式设计
使用标准的响应式前缀：
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  响应式网格布局
</div>
```

### 6. 自定义快捷方式
项目预定义了常用的快捷方式，可在 `uno.config.js` 中查看和修改。

## 注意事项
1. 每次修改代码后，UnoCSS 会自动扫描并生成新的样式
2. 开发时建议使用 `npm run unocss:watch` 监听模式
3. 生产构建时会自动优化和压缩样式
4. 不要手动编辑 `src/styles/uno.css` 文件