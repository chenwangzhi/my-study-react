# UnoCSS 依赖说明

## 当前项目使用的 UnoCSS 依赖

### 必需依赖 ✅
```json
{
  "unocss": "^66.6.0",                    // 核心包
  "@unocss/cli": "^66.6.0",               // CLI 工具（用于生成样式）
  "@unocss/preset-uno": "^66.6.0",        // 默认预设（类似 Tailwind）
  "@unocss/preset-attributify": "^66.6.0" // 属性化模式支持
}
```

### 已移除的不必要依赖 ❌
```json
{
  "@unocss/postcss": "^66.6.0",     // PostCSS 插件（我们用 CLI 方式）
  "@unocss/webpack": "^66.6.0",     // Webpack 插件（CRA 不支持）
  "@unocss/preset-icons": "^66.6.0" // 图标预设（项目中未使用）
}
```

## 不同集成方式的依赖对比

### 1. CLI 方式（当前使用）
**优点：**
- 兼容 Create React App
- 配置简单
- 依赖最少

**依赖：**
- `unocss` - 核心
- `@unocss/cli` - 命令行工具
- 相关预设包

### 2. PostCSS 方式
**适用于：** 支持 PostCSS 配置的项目

**依赖：**
- `unocss`
- `@unocss/postcss`
- 相关预设包

### 3. Webpack 方式
**适用于：** 自定义 Webpack 配置的项目

**依赖：**
- `unocss`
- `@unocss/webpack`
- 相关预设包

### 4. Vite 方式
**适用于：** Vite 项目

**依赖：**
- `unocss`
- `unocss/vite`
- 相关预设包

## 预设包说明

### 核心预设
- `@unocss/preset-uno` - 默认预设，包含类似 Tailwind 的工具类
- `@unocss/preset-attributify` - 属性化模式，允许 `<div text-red bg-blue>`

### 可选预设
- `@unocss/preset-icons` - 图标支持，需要时再安装
- `@unocss/preset-typography` - 排版预设
- `@unocss/preset-web-fonts` - Web 字体支持
- `@unocss/preset-wind` - Tailwind CSS 兼容预设

## 当前项目配置

### package.json scripts
```json
{
  "unocss": "unocss \"src/**/*.{js,jsx,ts,tsx}\" --out-file src/styles/uno.css",
  "unocss:watch": "unocss \"src/**/*.{js,jsx,ts,tsx}\" --out-file src/styles/uno.css --watch"
}
```

### 工作流程
1. 开发时：`npm run unocss:watch` 监听文件变化
2. 构建时：`npm run unocss` 生成最终样式
3. 样式文件：自动生成到 `src/styles/uno.css`

## 总结

当前配置已经是最精简的，只包含必要的依赖：
- **4个包** 而不是原来的 7个包
- **减少了约 43% 的依赖**
- **保持了完整功能**

如果将来需要图标支持，可以单独安装 `@unocss/preset-icons`。