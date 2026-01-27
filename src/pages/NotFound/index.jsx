import { useNavigate } from 'react-router-dom';
import { useAntd } from '../../hooks/useAntd';

export default function NotFound() {
  const navigate = useNavigate();
  const { Button, Space } = useAntd();

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div>
        <h1 style={{ 
          fontSize: '6rem', 
          fontWeight: 'bold', 
          color: 'var(--text-secondary)',
          margin: 0
        }}>
          404
        </h1>
        <h2 style={{ 
          fontSize: '2rem', 
          color: 'var(--text-primary)',
          margin: '1rem 0'
        }}>
          页面未找到
        </h2>
        <p style={{ 
          fontSize: '1.1rem', 
          color: 'var(--text-secondary)',
          marginBottom: '2rem'
        }}>
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <Space>
          <Button type="primary" onClick={() => navigate('/')}>
            返回首页
          </Button>
          <Button onClick={() => navigate(-1)}>
            返回上页
          </Button>
        </Space>
      </div>
    </div>
  );
}