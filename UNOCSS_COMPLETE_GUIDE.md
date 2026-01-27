# UnoCSS 完整功能指南

## 🎯 项目配置状态

✅ **已完成配置**
- 核心UnoCSS包和CLI工具
- 完整的颜色系统（4种主题色 × 10个色阶）
- 渐变背景系统（8个方向 + 自定义组合）
- 动画和过渡效果
- 滤镜和变换效果
- 自定义快捷方式
- VSCode智能提示配置

📊 **当前状态**
- **475个** 原子CSS类已生成
- **完整的颜色系统** 支持
- **渐变效果** 全面支持
- **动画效果** 完整集成

## 🎨 颜色系统

### 主题颜色
```jsx
// 背景颜色 - 每种颜色10个色阶 (50-900)
<div className="bg-primary-500">主色</div>
<div className="bg-success-500">成功色</div>
<div className="bg-warning-500">警告色</div>
<div className="bg-error-500">错误色</div>

// 文字颜色
<p className="text-primary-500">主色文字</p>
<p className="text-success-700">深色成功文字</p>

// 边框颜色
<div className="border border-primary-500">主色边框</div>
```

### 颜色色阶
- `50` - 最浅色调
- `100-400` - 浅色调
- `500` - 标准色调
- `600-900` - 深色调

## 🌈 渐变系统

### 渐变方向
```jsx
<div className="bg-gradient-to-r from-primary-500 to-success-500">左到右</div>
<div className="bg-gradient-to-l from-primary-500 to-success-500">右到左</div>
<div className="bg-gradient-to-t from-primary-500 to-success-500">下到上</div>
<div className="bg-gradient-to-b from-primary-500 to-success-500">上到下</div>
<div className="bg-gradient-to-tr from-primary-500 to-success-500">左下到右上</div>
<div className="bg-gradient-to-tl from-primary-500 to-success-500">右下到左上</div>
<div className="bg-gradient-to-br from-primary-500 to-success-500">左上到右下</div>
<div className="bg-gradient-to-bl from-primary-500 to-success-500">右上到左下</div>
```

### 快捷渐变
```jsx
<div className="bg-gradient-primary">主色渐变</div>
<div className="bg-gradient-success">成功色渐变</div>
<div className="bg-gradient-rainbow">彩虹渐变</div>
<div className="bg-gradient-primary-success">双色渐变</div>
```

### 渐变文字
```jsx
<h1 className="text-gradient-primary">主色渐变文字</h1>
<h1 className="text-gradient-rainbow">彩虹渐变文字</h1>
```

## ✨ 动画效果

### 基础动画
```jsx
<div className="animate-spin">旋转动画</div>
<div className="animate-ping">脉冲动画</div>
<div className="animate-pulse">呼吸动画</div>
<div className="animate-bounce">弹跳动画</div>
```

### 悬停效果
```jsx
<div className="hover-lift">悬停上升</div>
<div className="hover-glow">悬停发光</div>
<div className="hover-gradient">悬停渐变</div>
```

### 变换效果
```jsx
<div className="transform scale-105">放大</div>
<div className="transform scale-75">缩小</div>
<div className="transform rotate-45">旋转</div>
<div className="transform translate-x-4">平移</div>
```

### 过渡动画
```jsx
<div className="transition-all duration-300">全属性过渡</div>
<div className="transition-colors duration-200">颜色过渡</div>
<div className="transition-transform duration-500">变换过渡</div>
```

## 🎭 滤镜效果

### 模糊效果
```jsx
<div className="blur-none">无模糊</div>
<div className="blur-sm">轻微模糊</div>
<div className="blur">标准模糊</div>
<div className="blur-md">中等模糊</div>
<div className="blur-lg">强模糊</div>
```

### 透明度
```jsx
<div className="opacity-0">完全透明</div>
<div className="opacity-50">半透明</div>
<div className="opacity-100">完全不透明</div>
```

### 亮度和对比度
```jsx
<div className="brightness-50">降低亮度</div>
<div className="brightness-150">提高亮度</div>
<div className="contrast-125">提高对比度</div>
<div className="grayscale">灰度效果</div>
```

## 🧩 快捷组件

### 布局快捷方式
```jsx
<div className="flex-center">居中布局</div>
<div className="flex-between">两端对齐</div>
<div className="flex-col-center">垂直居中</div>
<div className="container-center">容器居中</div>
```

### 按钮快捷方式
```jsx
<button className="btn-primary">主要按钮</button>
<button className="btn-secondary">次要按钮</button>
<button className="btn-gradient-primary">渐变主按钮</button>
```

### 卡片快捷方式
```jsx
<div className="card">基础卡片</div>
<div className="card-hover">悬停卡片</div>
<div className="card-gradient">渐变卡片</div>
```

### 输入框快捷方式
```jsx
<input className="input-base" />
<input className="input-error" />
<input className="input-success" />
```

### 文字快捷方式
```jsx
<h1 className="text-title">标题</h1>
<h2 className="text-subtitle">副标题</h2>
<p className="text-body">正文</p>
<span className="text-caption">说明文字</span>
```

## 📱 响应式设计

### 断点前缀
- `sm:` - 640px及以上
- `md:` - 768px及以上
- `lg:` - 1024px及以上
- `xl:` - 1280px及以上
- `2xl:` - 1536px及以上

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  响应式网格
</div>
```

## 🛠️ 开发工作流

### 生成样式
```bash
# 一次性生成
npm run unocss

# 监听模式（开发推荐）
npm run unocss:watch

# 启动开发服务器（自动生成）
npm start
```

### VSCode 支持
- 自动补全类名
- 颜色预览
- 悬停显示样式
- 语法高亮

## 📈 性能优化

### 按需生成
- 只生成实际使用的CSS类
- 自动清除未使用的样式
- 生产环境自动压缩

### 文件大小
- 当前生成：**475个工具类**
- 文件大小：约 **30KB**（压缩前）
- 支持 Tree-shaking

## 🔧 自定义扩展

### 添加新颜色
在 `uno.config.js` 中的 `theme.colors` 添加：
```js
theme: {
  colors: {
    brand: {
      500: '#your-color',
      // ...
    }
  }
}
```

### 添加新快捷方式
在 `shortcuts` 数组中添加：
```js
shortcuts: [
  ['my-button', 'px-4 py-2 bg-blue-500 text-white rounded'],
]
```

## 🎯 最佳实践

1. **优先使用快捷方式** - 提高代码可读性
2. **合理使用渐变** - 避免过度使用影响性能
3. **响应式优先** - 移动端优先设计
4. **语义化命名** - 使用有意义的快捷方式名称
5. **性能监控** - 定期检查生成的CSS大小

## 📚 学习资源

- [UnoCSS 官方文档](https://unocss.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/) - 语法兼容
- 项目内演示：访问 `/` 页面查看 ColorTest 组件
- 完整演示：查看 UnocssDemo 组件

---

🎉 **恭喜！** 你的项目现在拥有了完整的原子CSS系统，包括颜色、渐变、动画、滤镜等所有现代Web开发需要的样式工具！