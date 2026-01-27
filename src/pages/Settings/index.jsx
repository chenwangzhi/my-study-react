import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { useAntd } from '../../hooks/useAntd';

export default function Settings() {
  const { user, hasPermission } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { Card, Switch, Divider, Alert, Space } = useAntd();

  // 检查是否有管理员权限
  if (!hasPermission('admin')) {
    return (
      <div style={{ padding: '2rem', minHeight: '100vh' }}>
        <div className="container">
          <Alert
            message="权限不足"
            description="只有管理员才能访问系统设置页面"
            type="error"
            showIcon
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', minHeight: '100vh' }}>
      <div className="container">
        <Card title="系统设置" style={{ maxWidth: 800, margin: '0 auto' }}>
          <div>
            <h3 style={{ color: 'var(--text-primary)' }}>外观设置</h3>
            <Space align="center">
              <span>深色模式:</span>
              <Switch 
                checked={theme === 'dark'} 
                onChange={toggleTheme}
                checkedChildren="🌙"
                unCheckedChildren="☀️"
              />
            </Space>
          </div>

          <Divider />

          <div>
            <h3 style={{ color: 'var(--text-primary)' }}>用户信息</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              当前用户: {user?.name} ({user?.email})
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              用户角色: {user?.role === 'admin' ? '管理员' : '普通用户'}
            </p>
          </div>

          <Divider />

          <div>
            <h3 style={{ color: 'var(--text-primary)' }}>系统信息</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              应用版本: 1.0.0
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              React 版本: {React.version}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}