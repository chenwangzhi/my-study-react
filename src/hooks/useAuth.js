import { useState, useEffect, createContext, useContext } from 'react';

// 认证上下文
const AuthContext = createContext();

// 模拟用户数据
const mockUsers = {
  'admin@example.com': {
    id: 1,
    email: 'admin@example.com',
    name: '管理员',
    role: 'admin',
    avatar: 'https://via.placeholder.com/40',
  },
  'user@example.com': {
    id: 2,
    email: 'user@example.com',
    name: '普通用户',
    role: 'user',
    avatar: 'https://via.placeholder.com/40',
  },
};

// 认证Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 初始化时检查本地存储的登录状态
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          // 模拟验证token的过程
          await new Promise(resolve => setTimeout(resolve, 500));
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('初始化认证失败:', error);
        // 清除无效的认证信息
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // 登录
  const login = async (email, password) => {
    try {
      // 模拟登录API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 简单的用户验证
      const userData = mockUsers[email];
      if (!userData || password !== '123456') {
        throw new Error('邮箱或密码错误');
      }

      // 模拟生成token
      const token = `mock_token_${Date.now()}`;
      
      // 保存认证信息
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // 登出
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  // 更新用户信息
  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
  };

  // 检查是否有特定权限
  const hasPermission = (requiredRole) => {
    if (!user) return false;
    
    // 管理员拥有所有权限
    if (user.role === 'admin') return true;
    
    // 检查角色匹配
    return user.role === requiredRole;
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 使用认证Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}