import { useState } from 'react';
import { useAntd } from '../../hooks/useAntd';
import './GlobalComponentsExample.scss';

export default function GlobalComponentsExample() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: ''
  });

  // 一次性获取所有需要的组件
  const {
    Card,
    Form,
    FormItem,
    Input,
    TextArea,
    Button,
    Space,
    Alert,
    Divider,
    UserOutlined,
    MailOutlined,
  } = useAntd();

  const handleSubmit = (values) => {
    console.log('表单数据:', values);
    setFormData(values);
  };

  return (
    <div className="global-components-example">
      <Card title="🚀 全局组件使用示例" className="example-card">
        <Alert
          message="全局组件配置成功！"
          description="现在可以通过 useAntd Hook 直接使用所有 Ant Design 组件，无需在每个文件中重复引入。"
          type="success"
          showIcon
          style={{ marginBottom: 24 }}
        />

        <Divider>表单示例</Divider>

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={formData}
        >
          <FormItem
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="请输入用户名"
            />
          </FormItem>

          <FormItem
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱!' },
              { type: 'email', message: '请输入有效的邮箱地址!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="请输入邮箱"
            />
          </FormItem>

          <FormItem
            label="留言"
            name="message"
            rules={[{ required: true, message: '请输入留言!' }]}
          >
            <TextArea 
              rows={4}
              placeholder="请输入您的留言"
              showCount
              maxLength={200}
            />
          </FormItem>

          <FormItem>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button htmlType="reset">
                重置
              </Button>
            </Space>
          </FormItem>
        </Form>

        <Divider>使用说明</Divider>

        <div className="usage-info">
          <h4>✨ 全局组件的优势：</h4>
          <ul>
            <li>🎯 <strong>无需重复引入</strong>：一次配置，全局使用</li>
            <li>🚀 <strong>开发效率提升</strong>：减少import语句，代码更简洁</li>
            <li>📦 <strong>按需加载</strong>：仍然支持Tree Shaking优化</li>
            <li>🎨 <strong>主题一致</strong>：所有组件自动适配主题</li>
          </ul>

          <h4>📝 使用方法：</h4>
          <pre className="code-example">
{`// 使用 useAntd Hook
import { useAntd } from '../hooks/useAntd';

function MyComponent() {
  const { Button, Input, Card } = useAntd();
  
  return (
    <Card title="示例">
      <Input placeholder="输入内容" />
      <Button type="primary">提交</Button>
    </Card>
  );
}`}
          </pre>
        </div>
      </Card>
    </div>
  );
}