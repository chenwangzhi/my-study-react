import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useAntd } from '../../hooks/useAntd'
import { useI18n } from '../../hooks/useI18n'
import ThemeToggle from '../ThemeToggle'
import LanguageSwitch from '../LanguageSwitch'
import NetworkStatus from '../NetworkStatus'
import Breadcrumb from '../Breadcrumb'
import './Navigation.scss'

export default function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, user, logout } = useAuth()
  const { t } = useI18n()
  const {
    Header,
    Menu,
    Button,
    Space,
    Avatar,
    Dropdown,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    HomeOutlined,
    DashboardOutlined,
    ProfileOutlined,
  } = useAntd()

  const handleMenuClick = ({ key }) => {
    navigate(key)
  }

  const handleUserMenuClick = ({ key }) => {
    switch (key) {
      case 'profile':
        navigate('/profile')
        break
      case 'settings':
        navigate('/settings')
        break
      case 'logout':
        logout()
        navigate('/')
        break
      default:
        break
    }
  }

  const userMenuItems = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: t('navigation.profile'),
    },
    ...(user?.role === 'admin'
      ? [
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: t('navigation.settings'),
          },
        ]
      : []),
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('navigation.logout'),
      danger: true,
    },
  ]

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: t('navigation.home'),
    },
    ...(isAuthenticated
      ? [
          {
            key: '/dashboard',
            icon: <DashboardOutlined />,
            label: t('navigation.dashboard'),
          },
          {
            key: '/api-demo',
            icon: <SettingOutlined />,
            label: 'API 演示',
          },
        ]
      : []),
  ]

  return (
    <>
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
              <NetworkStatus />
              <LanguageSwitch />
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
                  {t('navigation.login')}
                </Button>
              )}
            </Space>
          </div>
        </div>
      </Header>

      {/* 面包屑导航 */}
      {location.pathname !== '/' && (
        <div className="breadcrumb-container">
          <div className="container">
            <Breadcrumb />
          </div>
        </div>
      )}
    </>
  )
}
