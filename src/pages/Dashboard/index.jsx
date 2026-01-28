import { useAuth } from '../../hooks/useAuth'
import { useAntd } from '../../hooks/useAntd'
import { useI18n } from '../../hooks/useI18n'
import AntdDemo from '../../components/AntdDemo'
import TableDemo from '../../components/TableDemo'
import GlobalComponentsExample from '../../components/GlobalComponentsExample'
import UnocssDemo from '../../components/UnocssDemo'
import AntdI18nDemo from '../../components/AntdI18nDemo'
import './Dashboard.scss'

export default function Dashboard() {
  const { user } = useAuth()
  const { t } = useI18n()
  const { Card, Row, Col, Statistic, Tabs, TabPane } = useAntd()

  const stats = [
    {
      title: t('dashboard.stats.users'),
      value: 11280,
      suffix: '',
    },
    {
      title: t('dashboard.stats.orders'),
      value: 893,
      suffix: '',
    },
    {
      title: t('dashboard.stats.revenue'),
      value: 1234,
      suffix: '',
    },
    {
      title: t('dashboard.stats.growth'),
      value: 85.6,
      suffix: '%',
    },
  ]

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>{t('dashboard.title')}</h1>
          <p>
            {t('dashboard.welcome')}, {user?.name}！
          </p>
        </div>

        {/* 统计卡片 */}
        <div className="stats-section">
          <Row gutter={[24, 24]}>
            {stats.map((stat, index) => (
              <Col xs={12} sm={12} md={6} key={index}>
                <Card>
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    suffix={stat.suffix}
                    valueStyle={{
                      color: index % 2 === 0 ? '#3f8600' : '#1890ff',
                    }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* 功能演示区域 */}
        <div className="demo-section">
          <Tabs defaultActiveKey="1" size="large" className="dashboard-tabs">
            <TabPane tab="🎨 UnoCSS 原子CSS" key="1">
              <UnocssDemo />
            </TabPane>

            <TabPane tab="🌍 Ant Design 国际化" key="2">
              <AntdI18nDemo />
            </TabPane>

            <TabPane tab="🚀 全局组件演示" key="3">
              <GlobalComponentsExample />
            </TabPane>

            <TabPane tab="🧩 Ant Design 组件" key="4">
              <AntdDemo />
            </TabPane>

            <TabPane tab="📊 数据表格" key="5">
              <TableDemo />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
