import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAntd } from '../../hooks/useAntd';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const { 
    Card, 
    Form, 
    FormItem, 
    Input, 
    Button, 
    Avatar, 
    Space, 
    Divider,
    UserOutlined,
    MailOutlined,
    EditOutlined,
    SaveOutlined
  } = useAntd();

  const handleSave = (values) => {
    updateUser(values);
    setEditing(false);
  };

  return (
    <div className="profile-page" style={{ padding: '2rem', minHeight: '100vh' }}>
      <div className="container">
        <Card title="个人中心" style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Avatar size={80} src={user?.avatar} icon={<UserOutlined />} />
            <h2 style={{ margin: '1rem 0 0.5rem', color: 'var(--text-primary)' }}>
              {user?.name}
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              角色: {user?.role === 'admin' ? '管理员' : '普通用户'}
            </p>
          </div>

          <Divider />

          <Form
            layout="vertical"
            initialValues={user}
            onFinish={handleSave}
            disabled={!editing}
          >
            <FormItem
              label="姓名"
              name="name"
              rules={[{ required: true, message: '请输入姓名!' }]}
            >
              <Input prefix={<UserOutlined />} />
            </FormItem>

            <FormItem
              label="邮箱"
              name="email"
              rules={[
                { required: true, message: '请输入邮箱!' },
                { type: 'email', message: '请输入有效的邮箱!' }
              ]}
            >
              <Input prefix={<MailOutlined />} />
            </FormItem>

            <FormItem>
              <Space>
                {editing ? (
                  <>
                    <Button 
                      type="primary" 
                      htmlType="submit"
                      icon={<SaveOutlined />}
                    >
                      保存
                    </Button>
                    <Button onClick={() => setEditing(false)}>
                      取消
                    </Button>
                  </>
                ) : (
                  <Button 
                    type="primary" 
                    onClick={() => setEditing(true)}
                    icon={<EditOutlined />}
                  >
                    编辑资料
                  </Button>
                )}
              </Space>
            </FormItem>
          </Form>
        </Card>
      </div>
    </div>
  );
}