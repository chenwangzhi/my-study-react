// 全局Ant Design组件配置
import {
  // 基础组件
  Button,
  Input,
  Select,
  Card,
  Space,
  Divider,
  Row,
  Col,

  // 数据展示
  Table,
  Tag,
  Progress,
  Rate,
  Statistic,
  Descriptions,
  Badge,
  Pagination,

  // 反馈组件
  Alert,
  Modal,
  message,
  notification,

  // 导航组件
  Tabs,
  Menu,
  Dropdown,
  Breadcrumb,

  // 数据录入
  Form,
  DatePicker,
  TimePicker,
  Switch,
  Slider,
  Cascader,
  Upload,

  // 反馈组件
  Tooltip,
  Popconfirm,

  // 其他组件
  Empty,
  Result,
  Calendar,

  // 布局组件
  Layout,

  // 其他
  Avatar,
  Spin,
} from 'antd'

import {
  // 常用图标
  SearchOutlined,
  UserOutlined,
  MailOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SettingOutlined,
  HeartOutlined,
  StarOutlined,
  LogoutOutlined,
  HomeOutlined,
  DashboardOutlined,
  ProfileOutlined,
  SaveOutlined,
  InboxOutlined,
} from '@ant-design/icons'

// 解构常用的子组件
const { TextArea, Search, Password } = Input
const { Option } = Select
const { Item: FormItem } = Form
const { TabPane } = Tabs
const { Header, Footer, Content, Sider } = Layout
const { Item: MenuItem } = Menu
const { Item: DescriptionsItem } = Descriptions
const { Dragger } = Upload
const { RangePicker } = DatePicker

// 全局组件对象
const GlobalComponents = {
  // 基础组件
  Button,
  Input,
  TextArea,
  Search,
  Password,
  Select,
  Option,
  Card,
  Space,
  Divider,
  Row,
  Col,

  // 数据展示
  Table,
  Tag,
  Progress,
  Rate,
  Statistic,
  Descriptions,
  DescriptionsItem,
  Badge,
  Pagination,

  // 反馈组件
  Alert,
  Modal,
  message,
  notification,

  // 导航组件
  Tabs,
  TabPane,
  Menu,
  MenuItem,
  Dropdown,
  Breadcrumb,

  // 数据录入
  Form,
  FormItem,
  DatePicker,
  RangePicker,
  TimePicker,
  Switch,
  Slider,
  Cascader,
  Upload,
  Dragger,

  // 反馈组件
  Tooltip,
  Popconfirm,

  // 其他组件
  Empty,
  Result,
  Calendar,

  // 布局组件
  Layout,
  Header,
  Footer,
  Content,
  Sider,

  // 其他
  Avatar,
  Spin,

  // 图标
  SearchOutlined,
  UserOutlined,
  MailOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SettingOutlined,
  HeartOutlined,
  StarOutlined,
  LogoutOutlined,
  HomeOutlined,
  DashboardOutlined,
  ProfileOutlined,
  SaveOutlined,
  InboxOutlined,
}

// 将组件挂载到全局
const setupGlobalComponents = () => {
  // 挂载到 window 对象（仅在开发环境）
  if (process.env.NODE_ENV === 'development') {
    window.AntD = GlobalComponents
  }
}

export { GlobalComponents, setupGlobalComponents }
export default GlobalComponents
