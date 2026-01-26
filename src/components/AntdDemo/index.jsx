import { useState } from 'react';
import { useAntdBasic, useAntdData, useAntdFeedback, useAntdForm, useAntdIcons } from '../../hooks/useAntd';
import './AntdDemo.scss';

export default function AntdDemo() {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('option1');
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(30);
  const [rateValue, setRateValue] = useState(3);

  // 使用全局组件
  const { 
    Button, 
    Card, 
    Input, 
    TextArea,
    Select, 
    Option,
    Space, 
    Divider, 
    Row, 
    Col 
  } = useAntdBasic();
  
  const { 
    Tag, 
    Progress, 
    Rate 
  } = useAntdData();
  
  const { 
    Alert 
  } = useAntdFeedback();
  
  const { 
    DatePicker, 
    Switch, 
    Slider 
  } = useAntdForm();
  
  const { 
    UserOutlined, 
    MailOutlined, 
    SearchOutlined,
    HeartOutlined,
    StarOutlined
  } = useAntdIcons();

  return (
    <div className="antd-demo">
      <Card title="🎨 Ant Design 组件演示 (全局组件)" className="demo-card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          
          {/* 按钮组 */}
          <div>
            <h4>按钮组件</h4>
            <Space wrap>
              <Button type="primary">主要按钮</Button>
              <Button>默认按钮</Button>
              <Button type="dashed">虚线按钮</Button>
              <Button type="text">文本按钮</Button>
              <Button type="link">链接按钮</Button>
              <Button type="primary" danger>危险按钮</Button>
              <Button type="primary" loading>加载中</Button>
              <Button type="primary" icon={<SearchOutlined />}>
                搜索
              </Button>
            </Space>
          </div>

          <Divider />

          {/* 输入组件 */}
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <h4>输入组件</h4>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Input 
                  placeholder="请输入用户名" 
                  prefix={<UserOutlined />}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Input 
                  placeholder="请输入邮箱" 
                  prefix={<MailOutlined />}
                  type="email"
                />
                <Input.Password placeholder="请输入密码" />
                <TextArea 
                  rows={3} 
                  placeholder="请输入备注信息"
                  showCount
                  maxLength={100}
                />
              </Space>
            </Col>
            
            <Col xs={24} md={12}>
              <h4>选择组件</h4>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select 
                  value={selectValue} 
                  onChange={setSelectValue}
                  style={{ width: '100%' }}
                  placeholder="请选择选项"
                >
                  <Option value="option1">选项一</Option>
                  <Option value="option2">选项二</Option>
                  <Option value="option3">选项三</Option>
                </Select>
                
                <DatePicker 
                  placeholder="选择日期" 
                  style={{ width: '100%' }}
                />
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>开关:</span>
                  <Switch 
                    checked={switchValue} 
                    onChange={setSwitchValue}
                    checkedChildren="开"
                    unCheckedChildren="关"
                  />
                </div>
              </Space>
            </Col>
          </Row>

          <Divider />

          {/* 反馈组件 */}
          <div>
            <h4>反馈组件</h4>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Alert message="成功提示 - 使用全局组件" type="success" showIcon />
              <Alert message="信息提示 - 无需重复引入" type="info" showIcon />
              <Alert message="警告提示 - 开发更高效" type="warning" showIcon />
              <Alert message="错误提示 - 代码更简洁" type="error" showIcon />
            </Space>
          </div>

          <Divider />

          {/* 数据展示组件 */}
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <h4>评分和滑块</h4>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <span>评分: </span>
                  <Rate 
                    value={rateValue} 
                    onChange={setRateValue}
                    character={<StarOutlined />}
                  />
                  <span style={{ marginLeft: 8 }}>({rateValue} 星)</span>
                </div>
                
                <div>
                  <span>滑块: </span>
                  <Slider 
                    value={sliderValue} 
                    onChange={setSliderValue}
                    style={{ width: 200 }}
                  />
                  <span style={{ marginLeft: 8 }}>{sliderValue}%</span>
                </div>
              </Space>
            </Col>
            
            <Col xs={24} md={12}>
              <h4>进度条</h4>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Progress percent={30} />
                <Progress percent={50} status="active" />
                <Progress percent={70} status="exception" />
                <Progress percent={100} />
                <Progress type="circle" percent={75} />
              </Space>
            </Col>
          </Row>

          <Divider />

          {/* 标签组件 */}
          <div>
            <h4>标签组件</h4>
            <Space wrap>
              <Tag>默认标签</Tag>
              <Tag color="blue">蓝色标签</Tag>
              <Tag color="green">绿色标签</Tag>
              <Tag color="orange">橙色标签</Tag>
              <Tag color="red">红色标签</Tag>
              <Tag color="purple">紫色标签</Tag>
              <Tag icon={<HeartOutlined />} color="magenta">
                喜欢
              </Tag>
            </Space>
          </div>

        </Space>
      </Card>
    </div>
  );
}