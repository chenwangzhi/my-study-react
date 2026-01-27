import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAntd } from '../../hooks/useAntd';
import './Home.scss';

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { Card, Button, Space, Row, Col } = useAntd();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="hero-section">
          <h1>欢迎来到 React 应用</h1>
          <p>这是一个集成了路由、认证、主题切换和全局组件的完整应用</p>
          
          {isAuthenticated ? (
            <div className="user-welcome">
              <p>欢迎回来，{user?.name}！</p>
              <Space>
                <Button type="primary" onClick={() => handleNavigation('/dashboard')}>
                  进入仪表盘
                </Button>
                <Button onClick={() => handleNavigation('/profile')}>
                  个人中心
                </Button>
              </Space>
            </div>
          ) : (
            <div className="guest-actions">
              <Space>
                <Button type="primary" onClick={() => handleNavigation('/login')}>
                  立即登录
                </Button>
                <Button onClick={() => handleNavigation('/dashboard')}>
                  体验功能
                </Button>
              </Space>
            </div>
          )}
        </div>

        <div className="features-section">
          <h2>功能特性</h2>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card title="🔐 路由守卫" hoverable>
                <p>完整的路由拦截器和权限控制系统</p>
                <ul>
                  <li>路由白名单</li>
                  <li>登录状态检查</li>
                  <li>角色权限验证</li>
                </ul>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card title="🎨 主题系统" hoverable>
                <p>支持浅色/深色主题切换</p>
                <ul>
                  <li>动态主题切换</li>
                  <li>本地存储偏好</li>
                  <li>组件自动适配</li>
                </ul>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card title="🧩 全局组件" hoverable>
                <p>Ant Design 组件全局化配置</p>
                <ul>
                  <li>无需重复引入</li>
                  <li>按需加载优化</li>
                  <li>类型安全支持</li>
                </ul>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}