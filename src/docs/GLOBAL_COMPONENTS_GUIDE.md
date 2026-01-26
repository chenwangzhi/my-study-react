# 全局组件使用指南

## 🎯 概述

本项目已配置了Ant Design全局组件系统，无需在每个文件中重复引入常用组件，大大提升开发效率。

## 📦 已配置的全局组件

### 基础组件
- `Button` - 按钮
- `Input`, `TextArea`, `Search`, `Password` - 输入框
- `Select`, `Option`, `OptGroup` - 选择器
- `Card` - 卡片
- `Space` - 间距
- `Divider` - 分割线
- `Row`, `Col` - 栅格布局

### 数据展示
- `Table` - 表格
- `Tag`, `CheckableTag` - 标签
- `Progress` - 进度条
- `Rate` - 评分
- `Avatar` - 头像
- `Badge` - 徽标
- `List` - 列表
- `Empty` - 空状态

### 反馈组件
- `Alert` - 警告提示
- `Message` - 全局提示
- `Modal` - 对话框
- `Notification` - 通知提醒
- `Popconfirm` - 气泡确认框
- `Popover` - 气泡卡片
- `Tooltip` - 文字提示
- `Drawer` - 抽屉
- `Spin` - 加载中

### 导航组件
- `Breadcrumb`, `BreadcrumbItem` - 面包屑
- `Menu`, `MenuItem`, `SubMenu` - 导航菜单
- `Pagination` - 分页
- `Steps`, `Step` - 步骤条
- `Tabs`, `TabPane` - 标签页

### 数据录入
- `Form`, `FormItem`, `FormList` - 表单
- `Checkbox`, `CheckboxGroup` - 多选框
- `Radio`, `RadioGroup` - 单选框
- `Switch` - 开关
- `Slider` - 滑动输入条
- `DatePicker`, `RangePicker` - 日期选择器
- `TimePicker` - 时间选择器
- `Upload`, `Dragger` - 上传

### 布局组件
- `Layout`, `Header`, `Footer`, `Content`, `Sider` - 布局

### 常用图标
- `SearchOutlined`, `UserOutlined`, `MailOutlined`
- `EditOutlined`, `DeleteOutlined`, `PlusOutlined`
- `SettingOutlined`, `HomeOutlined`, `HeartOutlined`
- 等50+常用图标

## 🚀 使用方法

### 方法1: 使用 useAntd Hook (推荐)

```javascript
import { useAntd } from '../hooks/useAntd';

function MyComponent() {
  const { Button, Input, Card, SearchOutlined } = useAntd();
  
  return (
    <Card title="示例">
      <Input 
        prefix={<SearchOutlined />}
        placeholder="搜索内容" 
      />
      <Button type="primary">搜索</Button>
    </Card>
  );
}
```

### 方法2: 使用分类Hook

```javascript
import { 
  useAntdBasic, 
  useAntdIcons, 
  useAntdForm 
} from '../hooks/useAntd';

function MyComponent() {
  const { Button, Input, Card } = useAntdBasic();
  const { SearchOutlined } = useAntdIcons();
  const { Form, FormItem } = useAntdForm();
  
  return (
    <Card>
      <Form>
        <FormItem>
          <Input prefix={<SearchOutlined />} />
        </FormItem>
        <FormItem>
          <Button type="primary">提交</Button>
        </FormItem>
      </Form>
    </Card>
  );
}
```

### 方法3: 使用高阶组件

```javascript
import { withGlobalComponents } from '../contexts/GlobalComponentsContext';

function MyComponent({ Button, Input, Card }) {
  return (
    <Card title="示例">
      <Input placeholder="输入内容" />
      <Button type="primary">提交</Button>
    </Card>
  );
}

export default withGlobalComponents(MyComponent);
```

## 📋 分类Hook说明

### useAntdBasic()
返回基础常用组件：Button, Input, Select, Card, Space, Row, Col等

### useAntdData()
返回数据展示组件：Table, Tag, Progress, Rate, Avatar等

### useAntdFeedback()
返回反馈组件：Alert, Message, Modal, Notification等

### useAntdNavigation()
返回导航组件：Breadcrumb, Menu, Pagination, Tabs等

### useAntdForm()
返回表单组件：Form, Input, Select, DatePicker, Switch等

### useAntdIcons()
返回常用图标：SearchOutlined, UserOutlined, EditOutlined等

## ⚡ 性能优化

1. **Tree Shaking**: 仍然支持，未使用的组件不会被打包
2. **按需加载**: 只有实际使用的组件才会被加载
3. **代码分割**: 可以配合React.lazy使用

## 🎨 主题适配

所有全局组件都自动适配项目的主题系统：

```javascript
// 组件会自动适配浅色/深色主题
const { Button, Card } = useAntd();

return (
  <Card> {/* 自动适配主题色 */}
    <Button type="primary"> {/* 自动适配主题色 */}
      按钮
    </Button>
  </Card>
);
```

## 🔧 自定义配置

如需添加更多全局组件，编辑 `src/utils/globalComponents.js`：

```javascript
// 添加新组件
import { NewComponent } from 'antd';

const GlobalComponents = {
  // ... 现有组件
  NewComponent,
};
```

## 📝 最佳实践

1. **优先使用全局组件**: 减少import语句，提升开发效率
2. **按需解构**: 只解构需要的组件，保持代码清晰
3. **类型安全**: 配合TypeScript使用时有完整类型提示
4. **组件命名**: 保持与Ant Design官方一致的命名

## 🚨 注意事项

1. 全局组件不会影响Tree Shaking
2. 仍然可以直接从antd导入组件（两种方式可以混用）
3. 开发环境下组件会挂载到window.AntD供调试使用
4. 所有组件都支持完整的TypeScript类型检查

## 📚 示例代码

查看以下文件了解具体使用方法：
- `src/components/GlobalComponentsExample/index.jsx` - 完整使用示例
- `src/components/AntdDemo/index.jsx` - 组件演示
- `src/components/TableDemo/index.jsx` - 表格使用示例