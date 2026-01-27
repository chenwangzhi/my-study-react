import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAntd } from '../../hooks/useAntd';
import './Login.scss';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { 
    Card, 
    Form, 
    FormItem, 
    Input, 
    Button, 
    Alert, 
    Divider,
    UserOutlined,
    MailOutlined
  } = useAntd();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const result = await login(values.email, values.password);
      
      if (result.success) {
        // 登录成功，跳转到目标页面或首页
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        // 登录失败，显示错误信息
        console.error('登录失败:', result.error);
      }
    } catch (error) {
      console.error('登录过程出错:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Card className="login-card">
          <div className="login-header">
            <h1>欢迎登录</h1>
            <p>请输入您的账号信息</p>
          </div>

          <Alert
            message="演示账号"
            description={
              <div>
                <p><strong>管理员:</strong> admin@example.com / 123456</p>
                <p><strong>普通用户:</strong> user@example.com / 123456</p>
              </div>
            }
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />

          <Form
            name="login"
            layout="vertical"
            onFinish={handleLogin}
            autoComplete="off"
            size="large"
          >
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
              label="密码"
              name="password"
              rules={[
                { required: true, message: '请输入密码!' },
                { min: 6, message: '密码至少6位字符!' }
              ]}
            >
              <Input.Password 
                prefix={<UserOutlined />}
                placeholder="请输入密码"
              />
            </FormItem>

            <FormItem>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                block
              >
                {loading ? '登录中...' : '登录'}
              </Button>
            </FormItem>
          </Form>

          <Divider>其他操作</Divider>

          <div className="login-footer">
            <Button type="link" onClick={() => navigate('/')}>
              返回首页
            </Button>
            <Button type="link">
              忘记密码？
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}