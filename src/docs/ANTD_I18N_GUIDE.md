# Ant Design 国际化指南

## 概述

项目已集成 Ant Design 国际化功能，所有 Ant Design 组件的文本内容会根据当前语言自动切换。

## 实现方式

### 1. 核心组件

- `LocaleProvider` - Ant Design 国际化提供者组件
- `ConfigProvider` - Ant Design 配置提供者（内置在 LocaleProvider 中）

### 2. 文件结构

```
src/
├── components/
│   └── LocaleProvider/
│       └── index.jsx          # Ant Design 国际化提供者
├── App.js                     # 应用入口，包装 LocaleProvider
└── docs/
    └── ANTD_I18N_GUIDE.md    # 本指南
```

## 配置说明

### 1. LocaleProvider 组件

```jsx
import { ConfigProvider } from 'antd'
import { useTranslation } from 'react-i18next'
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'

export default function LocaleProvider({ children }) {
  const { i18n } = useTranslation()

  const antdLocale = useMemo(() => {
    switch (i18n.language) {
      case 'zh-CN':
        return zhCN
      case 'en-US':
        return enUS
      default:
        return zhCN
    }
  }, [i18n.language])

  return <ConfigProvider locale={antdLocale}>{children}</ConfigProvider>
}
```

### 2. 应用入口配置

```jsx
// App.js
import LocaleProvider from './components/LocaleProvider'

function App() {
  return <LocaleProvider>{/* 应用内容 */}</LocaleProvider>
}
```

## 支持的语言

### 当前支持

- **中文 (zh-CN)**: 使用 `antd/locale/zh_CN`
- **英文 (en-US)**: 使用 `antd/locale/en_US`

### 添加新语言

1. 导入对应的 Ant Design 语言包
2. 在 LocaleProvider 中添加语言映射
3. 更新 i18n 配置

```jsx
// 例：添加日语支持
import jaJP from 'antd/locale/ja_JP'

const antdLocale = useMemo(() => {
  switch (i18n.language) {
    case 'zh-CN':
      return zhCN
    case 'en-US':
      return enUS
    case 'ja-JP':
      return jaJP // 新增
    default:
      return zhCN
  }
}, [i18n.language])
```

## 国际化覆盖的组件

### 1. 日期时间组件

- **DatePicker**: 日期选择器
- **TimePicker**: 时间选择器
- **Calendar**: 日历组件
- **RangePicker**: 日期范围选择器

```jsx
// 自动国际化的日期组件
<DatePicker placeholder="选择日期" />
<TimePicker placeholder="选择时间" />
<Calendar />
```

### 2. 表格组件

- **Table**: 数据表格
- **Pagination**: 分页组件

```jsx
// 表格的排序、筛选、分页等文本会自动国际化
<Table
  columns={columns}
  dataSource={data}
  pagination={{
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  }}
/>
```

### 3. 上传组件

- **Upload**: 文件上传
- **Dragger**: 拖拽上传

```jsx
// 上传组件的提示文本会自动国际化
<Upload.Dragger>
  <p className="ant-upload-drag-icon">
    <InboxOutlined />
  </p>
  <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
</Upload.Dragger>
```

### 4. 选择器组件

- **Select**: 下拉选择
- **Cascader**: 级联选择
- **TreeSelect**: 树选择
- **Transfer**: 穿梭框

```jsx
// 选择器的"请选择"、"搜索"等文本会自动国际化
<Select placeholder="请选择" />
<Cascader placeholder="请选择" />
```

### 5. 反馈组件

- **Modal**: 模态框
- **Popconfirm**: 气泡确认框
- **Empty**: 空状态
- **Result**: 结果页

```jsx
// 确认框的"确定"、"取消"按钮会自动国际化
<Popconfirm
  title="确认删除"
  okText="确定" // 可以自定义，也可以使用默认国际化文本
  cancelText="取消"
>
  <Button>删除</Button>
</Popconfirm>
```

## 自定义主题配置

LocaleProvider 还集成了主题配置功能：

```jsx
<ConfigProvider
  locale={antdLocale}
  theme={{
    token: {
      colorPrimary: '#1890ff',  // 主色调
      borderRadius: 6,          // 圆角大小
    },
    components: {
      Button: {
        borderRadius: 6,
      },
      Input: {
        borderRadius: 6,
      },
      Card: {
        borderRadius: 8,
      },
    },
  }}
>
```

## 最佳实践

### 1. 语言切换响应

当用户切换语言时，所有 Ant Design 组件会自动更新：

- 日期选择器的月份、星期显示
- 表格的排序、筛选文本
- 分页组件的"条/页"、"共 xx 条"等文本
- 上传组件的提示信息

### 2. 自定义文本处理

对于需要自定义的文本，仍然使用 react-i18next：

```jsx
import { useI18n } from '../hooks/useI18n'

function MyComponent() {
  const { t } = useI18n()

  return (
    <Popconfirm
      title={t('common.confirm')} // 自定义文本
      okText={t('common.yes')} // 自定义按钮文本
      cancelText={t('common.no')}
    >
      <Button>{t('common.delete')}</Button>
    </Popconfirm>
  )
}
```

### 3. 日期格式化

不同语言环境下的日期格式会自动适配：

```jsx
// 中文环境：2024年1月28日
// 英文环境：January 28, 2024
<DatePicker format="YYYY-MM-DD" />
```

### 4. 数字格式化

配合 useI18n Hook 的格式化功能：

```jsx
const { formatNumber, formatCurrency } = useI18n()

// 在表格中显示格式化的数字
const columns = [
  {
    title: '金额',
    dataIndex: 'amount',
    render: (value) => formatCurrency(value, 'CNY'),
  },
]
```

## 测试验证

### 1. 组件测试

访问 Dashboard 页面的"🌍 Ant Design 国际化"标签页，可以看到：

- 日期选择器的语言切换
- 表格分页的文本变化
- 上传组件的提示文本
- 模态框、确认框的按钮文本

### 2. 语言切换测试

1. 点击导航栏的语言切换按钮
2. 观察所有 Ant Design 组件的文本变化
3. 特别注意日期选择器、表格、分页等组件

### 3. 日期组件测试

```jsx
// 测试不同语言下的日期显示
<DatePicker
  onChange={(date) => {
    console.log('选择的日期:', date.format('YYYY-MM-DD'))
  }}
/>
```

## 常见问题

### 1. 语言包未生效

**问题**: 切换语言后 Ant Design 组件文本没有变化
**解决**:

- 检查 LocaleProvider 是否正确包装了应用
- 确认语言包导入是否正确
- 检查 i18n.language 值是否正确

### 2. 部分组件未国际化

**问题**: 某些组件的文本仍然是英文
**解决**:

- 确认该组件是否支持国际化
- 检查是否需要手动传入文本属性
- 查看 Ant Design 官方文档确认支持情况

### 3. 自定义文本覆盖

**问题**: 想要自定义某些默认文本
**解决**:

```jsx
// 使用自定义文本覆盖默认国际化文本
<Popconfirm
  okText={t('custom.confirm')}
  cancelText={t('custom.cancel')}
>
```

### 4. 日期格式问题

**问题**: 日期格式不符合预期
**解决**:

```jsx
// 明确指定日期格式
<DatePicker
  format="YYYY-MM-DD"
  locale={locale} // 如果需要特殊处理
/>
```

## 扩展功能

### 1. RTL 支持

为将来支持阿拉伯语等从右到左的语言：

```jsx
<ConfigProvider
  locale={antdLocale}
  direction={i18n.language === 'ar' ? 'rtl' : 'ltr'}
>
```

### 2. 动态主题

根据语言切换主题：

```jsx
const theme = useMemo(() => {
  const baseTheme = {
    token: { colorPrimary: '#1890ff' },
  }

  if (i18n.language === 'zh-CN') {
    return {
      ...baseTheme,
      token: {
        ...baseTheme.token,
        fontFamily: 'PingFang SC, Microsoft YaHei',
      },
    }
  }

  return baseTheme
}, [i18n.language])
```

## 性能优化

### 1. 语言包按需加载

```jsx
// 动态导入语言包
const loadAntdLocale = async (language) => {
  switch (language) {
    case 'zh-CN':
      return (await import('antd/locale/zh_CN')).default
    case 'en-US':
      return (await import('antd/locale/en_US')).default
    default:
      return (await import('antd/locale/zh_CN')).default
  }
}
```

### 2. 缓存优化

LocaleProvider 已使用 useMemo 优化语言包选择，避免不必要的重新渲染。
