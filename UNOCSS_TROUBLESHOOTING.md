# UnoCSS VSCode 插件故障排除指南

## 问题：VSCode 中 UnoCSS 插件不生效

### 解决步骤

#### 1. 确保安装了正确的插件
在 VSCode 中安装以下插件：
- **UnoCSS** (antfu.unocss) - 主要插件
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss) - 辅助支持

#### 2. 检查插件是否启用
1. 打开 VSCode 命令面板 (`Ctrl+Shift+P`)
2. 输入 "Extensions: Show Installed Extensions"
3. 确保 UnoCSS 插件已启用

#### 3. 重启 VSCode 和插件
1. 完全关闭 VSCode
2. 重新打开项目
3. 或者使用命令面板：`Developer: Reload Window`

#### 4. 检查配置文件
确保以下文件存在且配置正确：
- `.vscode/settings.json` - VSCode 工作区设置
- `uno.config.js` - UnoCSS 配置文件
- `src/styles/uno.css` - 生成的样式文件

#### 5. 手动重新生成样式
```bash
npm run unocss
```

#### 6. 检查文件关联
在 VSCode 中：
1. 打开一个 `.jsx` 文件
2. 在 className 属性中输入 UnoCSS 类名
3. 应该看到自动补全提示

#### 7. 验证配置
检查 `.vscode/settings.json` 中的配置：
```json
{
  "unocss.root": ".",
  "unocss.configFile": "uno.config.js"
}
```

#### 8. 清除缓存
1. 关闭 VSCode
2. 删除项目中的 `.vscode` 文件夹（如果可以）
3. 重新打开项目

### 常见问题

#### Q: 自动补全不显示
A: 确保在 `className=""` 引号内输入，并且启用了字符串建议

#### Q: 颜色预览不显示
A: 安装 Tailwind CSS IntelliSense 插件作为辅助

#### Q: 自定义类名不识别
A: 检查 `uno.config.js` 中的 shortcuts 配置

### 测试方法

1. 在任意 JSX 文件中输入：
```jsx
<div className="flex-center bg-primary-500 text-white p-4 rounded-lg">
  测试 UnoCSS
</div>
```

2. 应该看到：
   - 类名自动补全
   - 颜色预览
   - 悬停时的样式预览

### 如果仍然不工作

1. 检查 VSCode 版本（建议使用最新版本）
2. 检查 Node.js 版本（建议 16+）
3. 尝试在其他项目中测试插件
4. 查看 VSCode 开发者控制台的错误信息

### 联系支持
如果问题仍然存在，请提供：
- VSCode 版本
- UnoCSS 插件版本
- 项目配置文件
- 错误日志（如果有）