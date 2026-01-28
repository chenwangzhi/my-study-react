import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useAntd } from '../../hooks/useAntd'
import { useI18n } from '../../hooks/useI18n'
import ColorTest from '../../components/ColorTest'
import './Home.scss'

export default function Home() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const { t } = useI18n()
  const { Card, Button, Space, Row, Col } = useAntd()

  const handleNavigation = (path) => {
    navigate(path)
  }

  return (
    <div className="home-page">
      <div className="container">
        <div className="hero-section">
          <h1>{t('home.title')}</h1>
          <p>{t('home.subtitle')}</p>

          {isAuthenticated ? (
            <div className="user-welcome">
              <p>{t('home.welcome', { name: user?.name })}</p>
              <Space>
                <Button
                  type="primary"
                  onClick={() => handleNavigation('/dashboard')}
                >
                  {t('home.userActions.dashboard')}
                </Button>
                <Button onClick={() => handleNavigation('/profile')}>
                  {t('home.userActions.profile')}
                </Button>
              </Space>
            </div>
          ) : (
            <div className="guest-actions">
              <Space>
                <Button
                  type="primary"
                  onClick={() => handleNavigation('/login')}
                >
                  {t('home.guestActions.login')}
                </Button>
                <Button onClick={() => handleNavigation('/dashboard')}>
                  {t('home.guestActions.experience')}
                </Button>
              </Space>
            </div>
          )}
        </div>

        <div className="features-section">
          <h2>{t('home.features.title')}</h2>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={6}>
              <Card title={t('home.features.auth.title')} hoverable>
                <p>{t('home.features.auth.description')}</p>
                <ul>
                  {t('home.features.auth.items', { returnObjects: true }).map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    ),
                  )}
                </ul>
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <Card title={t('home.features.theme.title')} hoverable>
                <p>{t('home.features.theme.description')}</p>
                <ul>
                  {t('home.features.theme.items', { returnObjects: true }).map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    ),
                  )}
                </ul>
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <Card title={t('home.features.components.title')} hoverable>
                <p>{t('home.features.components.description')}</p>
                <ul>
                  {t('home.features.components.items', {
                    returnObjects: true,
                  }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <Card title={t('home.features.i18n.title')} hoverable>
                <p>{t('home.features.i18n.description')}</p>
                <ul>
                  {t('home.features.i18n.items', { returnObjects: true }).map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    ),
                  )}
                </ul>
              </Card>
            </Col>
          </Row>
        </div>

        {/* UnoCSS 颜色系统测试 */}
        <div className="color-test-section">
          <ColorTest />
        </div>
      </div>
    </div>
  )
}
