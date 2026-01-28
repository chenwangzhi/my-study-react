# 国际化使用指南

## 概述

项目使用 react-i18next 实现国际化功能，支持中英文切换，具备自动语言检测和本地存储功能。

## 文件结构

```
src/
├── i18n/
│   ├── index.js              # i18n 配置文件
│   └── locales/
│       ├── zh-CN.json        # 中文语言包
│       └── en-US.json        # 英文语言包
├── hooks/
│   └── useI18n.js           # 国际化自定义 Hook
└── components/
    └── LanguageSwitch/      # 语言切换组件
```

## 基础使用

### 1. 在组件中使用翻译

```jsx
import { useI18n } from '../hooks/useI18n'

function MyComponent() {
  const { t } = useI18n()

  return (
    <div>
      <h1>{t('common.title')}</h1>
      <p>{t('common.description')}</p>
    </div>
  )
}
```

### 2. 带参数的翻译

```jsx
// 语言包中定义
{
  "welcome": "欢迎回来，{{name}}！"
}

// 组件中使用
const { t } = useI18n();
return <p>{t('welcome', { name: user.name })}</p>;
```

### 3. 数组翻译

```jsx
// 语言包中定义
{
  "features": ["功能1", "功能2", "功能3"]
}

// 组件中使用
const { t } = useI18n();
const features = t('features', { returnObjects: true });
return (
  <ul>
    {features.map((feature, index) => (
      <li key={index}>{feature}</li>
    ))}
  </ul>
);
```

## 高级功能

### 1. 语言切换

```jsx
import { useI18n } from '../hooks/useI18n'

function LanguageButton() {
  const { switchLanguage, currentLanguage } = useI18n()

  const handleSwitch = () => {
    const newLang = currentLanguage === 'zh-CN' ? 'en-US' : 'zh-CN'
    switchLanguage(newLang)
  }

  return <button onClick={handleSwitch}>切换语言</button>
}
```

### 2. 数字格式化

```jsx
const { formatNumber } = useI18n()

// 格式化数字
const price = formatNumber(1234.56, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
```

### 3. 日期格式化

```jsx
const { formatDate } = useI18n()

// 格式化日期
const date = formatDate(new Date(), {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
```

### 4. 货币格式化

```jsx
const { formatCurrency } = useI18n()

// 格式化货币
const price = formatCurrency(1234.56, 'CNY')
```

## 语言包管理

### 1. 添加新的翻译键

在 `src/i18n/locales/` 目录下的对应语言文件中添加：

```json
// zh-CN.json
{
  "newSection": {
    "title": "新标题",
    "description": "新描述"
  }
}

// en-US.json
{
  "newSection": {
    "title": "New Title",
    "description": "New Description"
  }
}
```

### 2. 嵌套键的使用

```jsx
// 语言包
{
  "user": {
    "profile": {
      "name": "姓名",
      "email": "邮箱"
    }
  }
}

// 组件中使用
const { t } = useI18n();
return (
  <div>
    <label>{t('user.profile.name')}</label>
    <label>{t('user.profile.email')}</label>
  </div>
);
```

## 组件国际化

### 1. 表单组件

```jsx
import { useI18n } from '../hooks/useI18n'

function LoginForm() {
  const { t } = useI18n()

  return (
    <Form>
      <FormItem label={t('auth.login.username')}>
        <Input placeholder={t('auth.login.username')} />
      </FormItem>
      <FormItem label={t('auth.login.password')}>
        <Input.Password placeholder={t('auth.login.password')} />
      </FormItem>
      <Button type="primary">{t('auth.login.submit')}</Button>
    </Form>
  )
}
```

### 2. 消息提示

```jsx
import { useI18n } from '../hooks/useI18n'
import { message } from 'antd'

function MyComponent() {
  const { t } = useI18n()

  const handleSuccess = () => {
    message.success(t('common.success'))
  }

  const handleError = () => {
    message.error(t('common.error'))
  }
}
```

## 最佳实践

### 1. 键名规范

- 使用小驼峰命名法
- 按功能模块分组
- 保持键名简洁明了

```json
{
  "common": {
    "confirm": "确认",
    "cancel": "取消"
  },
  "auth": {
    "login": {
      "title": "登录",
      "submit": "登录"
    }
  }
}
```

### 2. 默认值处理

```jsx
const { translate } = useI18n()

// 使用 translate 方法提供默认值
const text = translate('some.key', '默认文本')
```

### 3. 条件翻译

```jsx
const { t, isCurrentLanguage } = useI18n()

return (
  <div>
    {isCurrentLanguage('zh-CN') ? (
      <span>中文特有内容</span>
    ) : (
      <span>English specific content</span>
    )}
  </div>
)
```

## 添加新语言

### 1. 创建语言包文件

在 `src/i18n/locales/` 目录下创建新的语言文件，如 `ja-JP.json`。

### 2. 更新配置

在 `src/i18n/index.js` 中添加新语言：

```javascript
import jaJP from './locales/ja-JP.json'

const resources = {
  'zh-CN': { translation: zhCN },
  'en-US': { translation: enUS },
  'ja-JP': { translation: jaJP }, // 新增
}

export const supportedLanguages = [
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'ja-JP', name: '日本語', flag: '🇯🇵' }, // 新增
]
```

## 调试和测试

### 1. 开启调试模式

在开发环境中，i18n 调试模式已开启，可以在控制台看到翻译相关的日志。

### 2. 缺失翻译检测

当翻译键不存在时，会返回键名本身，便于发现缺失的翻译。

### 3. 语言切换测试

使用语言切换组件测试所有页面的翻译是否正确。

## 性能优化

### 1. 懒加载语言包

对于大型应用，可以考虑按需加载语言包：

```javascript
// 动态导入语言包
const loadLanguage = async (lng) => {
  const resources = await import(`./locales/${lng}.json`)
  i18n.addResourceBundle(lng, 'translation', resources.default)
}
```

### 2. 缓存策略

项目已配置本地存储缓存用户的语言选择，避免每次访问都重新检测。

## 常见问题

### 1. 翻译不生效

- 检查键名是否正确
- 确认语言包文件是否正确导入
- 检查组件是否正确使用 useI18n Hook

### 2. 参数插值不工作

- 确认语言包中使用了正确的插值语法 `{{variable}}`
- 检查传递的参数对象是否正确

### 3. 数组翻译问题

- 使用 `{ returnObjects: true }` 选项
- 确认语言包中定义的是数组格式
