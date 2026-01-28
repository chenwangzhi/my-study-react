import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useAntd } from '../../hooks/useAntd'
import { useI18n } from '../../hooks/useI18n'
import './Login.scss'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const { t } = useI18n()
  const {
    Card,
    Form,
    FormItem,
    Input,
    Button,
    Alert,
    Divider,
    UserOutlined,
    MailOutlined,
  } = useAntd()

  const handleLogin = async (values) => {
    setLoading(true)
    try {
      const result = await login(values.email, values.password)

      if (result.success) {
        // 登录成功，跳转到目标页面或首页
        const from = location.state?.from?.pathname || '/dashboard'
        navigate(from, { replace: true })
      } else {
        // 登录失败，显示错误信息
        console.error(t('auth.login.error'))
      }
    } catch (error) {
      console.error('登录过程出错:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <Card className="login-card">
          <div className="login-header">
            <h1>{t('auth.login.title')}</h1>
            <p>{t('auth.login.subtitle')}</p>
          </div>

          <Alert
            message={t('common.info')}
            description={
              <div>
                <p>
                  <strong>{t('navigation.settings')}:</strong> admin@example.com
                  / 123456
                </p>
                <p>
                  <strong>{t('common.user')}:</strong> user@example.com / 123456
                </p>
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
              label={t('auth.login.username')}
              name="email"
              rules={[
                { required: true, message: t('auth.login.username') + '!' },
                { type: 'email', message: t('auth.login.username') + '!' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder={t('auth.login.username')}
              />
            </FormItem>

            <FormItem
              label={t('auth.login.password')}
              name="password"
              rules={[
                { required: true, message: t('auth.login.password') + '!' },
                { min: 6, message: t('auth.login.password') + '!' },
              ]}
            >
              <Input.Password
                prefix={<UserOutlined />}
                placeholder={t('auth.login.password')}
              />
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit" loading={loading} block>
                {loading ? t('common.loading') : t('auth.login.submit')}
              </Button>
            </FormItem>
          </Form>

          <Divider>{t('common.info')}</Divider>

          <div className="login-footer">
            <Button type="link" onClick={() => navigate('/')}>
              {t('common.back')}
            </Button>
            <Button type="link">{t('auth.login.forgot')}</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
