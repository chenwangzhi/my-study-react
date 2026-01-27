import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { whiteList } from './routes';
import { useAuth } from '../hooks/useAuth';
import { useAntd } from '../hooks/useAntd';

// 路由守卫组件
export default function RouteGuard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, loading } = useAuth();
  const { Modal } = useAntd();

  useEffect(() => {
    // 如果还在加载用户信息，不进行路由检查
    if (loading) return;

    const currentPath = location.pathname;
    
    // 检查是否在白名单中
    const isInWhiteList = whiteList.includes(currentPath);
    
    // 如果不在白名单且未登录，跳转到登录页
    if (!isInWhiteList && !isAuthenticated) {
      // 保存当前路径，登录后可以跳转回来
      sessionStorage.setItem('redirectPath', currentPath);
      
      Modal.warning({
        title: '访问提示',
        content: '请先登录后再访问该页面',
        onOk: () => {
          navigate('/login', { replace: true });
        },
      });
      return;
    }

    // 如果已登录但访问登录页，跳转到首页或重定向页面
    if (isAuthenticated && currentPath === '/login') {
      const redirectPath = sessionStorage.getItem('redirectPath') || '/dashboard';
      sessionStorage.removeItem('redirectPath');
      navigate(redirectPath, { replace: true });
      return;
    }

    // 权限检查 - 检查用户角色是否有权限访问当前路由
    if (isAuthenticated && user) {
      const hasPermission = checkRoutePermission(currentPath, user.role);
      if (!hasPermission) {
        Modal.error({
          title: '权限不足',
          content: '您没有权限访问该页面',
          onOk: () => {
            navigate('/dashboard', { replace: true });
          },
        });
        return;
      }
    }

    // 更新页面标题
    updatePageTitle(currentPath);
    
  }, [location.pathname, isAuthenticated, user, loading, navigate, Modal]);

  return children;
}

// 检查路由权限
function checkRoutePermission(pathname, userRole) {
  // 导入路由配置来检查权限
  const { routes } = require('./routes');
  const route = routes.find(route => route.path === pathname);
  
  // 如果路由不存在或没有角色限制，允许访问
  if (!route || !route.meta?.roles) {
    return true;
  }
  
  // 检查用户角色是否在允许的角色列表中
  return route.meta.roles.includes(userRole);
}

// 更新页面标题
function updatePageTitle(pathname) {
  const { getRouteTitle } = require('./routes');
  const title = getRouteTitle(pathname);
  document.title = `${title} - React App`;
}