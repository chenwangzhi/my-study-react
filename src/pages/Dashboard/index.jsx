import { useAuth } from '../../hooks/useAuth';
import { useAntd } from '../../hooks/useAntd';
import AntdDemo from '../../components/AntdDemo';
import TableDemo from '../../components/TableDemo';
import GlobalComponentsExample from '../../components/GlobalComponentsExample';
import UnocssDemo from '../../components/UnocssDemo';
import './Dashboard.scss';

export default function Dashboard() {
  const { user } = useAuth();
  const { Card, Row, Col, Statistic, Tabs, TabPane } = useAntd();

  const stats = [
    {
      title: '总访问量',
      value: 11280,
      suffix: '次',
    },
    {
      title: '今日访问',
      value: 893,
      suffix: '次',
    },
    {
      title: '活跃用户',
      value: 1234,
      suffix: '人',
    },
    {
      title: '转化率',
      value: 85.6,
      suffix: '%',
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>仪表盘</h1>
          <p>欢迎回来，{user?.name}！这里是您的工作台。</p>
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
                      color: index % 2 === 0 ? '#3f8600' : '#1890ff' 
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
            
            <TabPane tab="🚀 全局组件演示" key="2">
              <GlobalComponentsExample />
            </TabPane>
            
            <TabPane tab="🧩 Ant Design 组件" key="3">
              <AntdDemo />
            </TabPane>
            
            <TabPane tab="📊 数据表格" key="4">
              <TableDemo />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}