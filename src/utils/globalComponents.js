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
  
  // 反馈组件
  Alert,
  Modal,
  
  // 导航组件
  Tabs,
  
  // 数据录入
  Form,
  DatePicker,
  Switch,
  Slider,
} from 'antd';

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
} from '@ant-design/icons';

// 解构常用的子组件
const { TextArea, Search, Password } = Input;
const { Option } = Select;
const { Item: FormItem } = Form;
const { TabPane } = Tabs;

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
  
  // 反馈组件
  Alert,
  Modal,
  
  // 导航组件
  Tabs,
  TabPane,
  
  // 数据录入
  Form,
  FormItem,
  DatePicker,
  Switch,
  Slider,
  
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
};

// 将组件挂载到全局
const setupGlobalComponents = () => {
  // 挂载到 window 对象（仅在开发环境）
  if (process.env.NODE_ENV === 'development') {
    window.AntD = GlobalComponents;
  }
};

export { GlobalComponents, setupGlobalComponents };
export default GlobalComponents;