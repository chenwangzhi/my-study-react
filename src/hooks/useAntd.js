import { useGlobalComponents } from '../contexts/GlobalComponentsContext';

// 简化的Hook名称，更容易使用
export const useAntd = () => {
  return useGlobalComponents();
};

// 按类别分组的Hook
export const useAntdBasic = () => {
  const components = useGlobalComponents();
  return {
    Button: components.Button,
    Input: components.Input,
    TextArea: components.TextArea,
    Search: components.Search,
    Password: components.Password,
    Select: components.Select,
    Option: components.Option,
    Card: components.Card,
    Space: components.Space,
    Divider: components.Divider,
    Row: components.Row,
    Col: components.Col,
    Table: components.Table,
  };
};

export const useAntdData = () => {
  const components = useGlobalComponents();
  return {
    Table: components.Table,
    Tag: components.Tag,
    Progress: components.Progress,
    Rate: components.Rate,
  };
};

export const useAntdFeedback = () => {
  const components = useGlobalComponents();
  return {
    Alert: components.Alert,
    Modal: components.Modal,
  };
};

export const useAntdNavigation = () => {
  const components = useGlobalComponents();
  return {
    Tabs: components.Tabs,
    TabPane: components.TabPane,
  };
};

export const useAntdForm = () => {
  const components = useGlobalComponents();
  return {
    Form: components.Form,
    FormItem: components.FormItem,
    DatePicker: components.DatePicker,
    Switch: components.Switch,
    Slider: components.Slider,
  };
};

export const useAntdIcons = () => {
  const components = useGlobalComponents();
  return {
    SearchOutlined: components.SearchOutlined,
    UserOutlined: components.UserOutlined,
    MailOutlined: components.MailOutlined,
    EditOutlined: components.EditOutlined,
    DeleteOutlined: components.DeleteOutlined,
    PlusOutlined: components.PlusOutlined,
    SettingOutlined: components.SettingOutlined,
    HeartOutlined: components.HeartOutlined,
    StarOutlined: components.StarOutlined,
    LogoutOutlined: components.LogoutOutlined,
    HomeOutlined: components.HomeOutlined,
    DashboardOutlined: components.DashboardOutlined,
    ProfileOutlined: components.ProfileOutlined,
    SaveOutlined: components.SaveOutlined,
  };
};

export default useAntd;