import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAntd } from '../../hooks/useAntd';
import ThemeToggle from '../ThemeToggle';
import './Navigation.scss';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { 
    Layout, 
    Header, 
    Menu, 
    MenuItem, 
    Button, 
    Space, 
    Avatar, 
    Dropdown,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    HomeOutlined,
    DashboardOutlined,
    ProfileOutlined
  } = useAntd();

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const handleUserMenuClick = ({ key }) => {
    switch (key) {
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        logout();
        navigate('/');
        break;
      default:
        break;
    }
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: '个人中心',
    },
    ...(user?.role === 'admin' ? [{
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    }] : []),
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      danger: true,
    },
  ];

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
    },
    ...(isAuthenticated ? [
      {
        key: '/dashboard',
        icon: <DashboardOutlined />,
        label: '仪表盘',
      },
    ] : []),
  ];

  return (
    <Header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo" onClick={() => navigate('/')}>
            <span>React App</span>
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            className="header-menu"
          />
        </div>
        
        <div className="header-right">
          <Space>
            <ThemeToggle />
            {isAuthenticated ? (
              <Dropdown
                menu={{
                  items: userMenuItems,
                  onClick: handleUserMenuClick,
                }}
                placement="bottomRight"
              >
                <div className="user-info">
                  <Avatar 
                    size="small" 
                    src={user?.avatar} 
                    icon={<UserOutlined />} 
                  />
                  <span className="username">{user?.name}</span>
                </div>
              </Dropdown>
            ) : (
              <Button type="primary" onClick={() => navigate('/login')}>
                登录
              </Button>
            )}
          </Space>
        </div>
      </div>
    </Header>
  );
}