import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import { GlobalComponentsProvider } from './contexts/GlobalComponentsContext'
import LocaleProvider from './components/LocaleProvider'
import RouteGuard from './router/RouteGuard'
import Navigation from './components/Navigation'
import { routes } from './router/routes'
import { useAntd } from './hooks/useAntd'
import './i18n' // 初始化国际化
import './App.scss'

// 加载组件
function LoadingComponent() {
  const { Spin } = useAntd()
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
      }}
    >
      <Spin size="large" />
    </div>
  )
}

function App() {
  const { Layout, Content } = useAntd()

  return (
    <LocaleProvider>
      <GlobalComponentsProvider>
        <AuthProvider>
          <Router>
            <Layout style={{ minHeight: '100vh' }}>
              <Navigation />
              <Content>
                <RouteGuard>
                  <Suspense fallback={<LoadingComponent />}>
                    <Routes>
                      {routes.map((route) => (
                        <Route
                          key={route.path}
                          path={route.path}
                          element={<route.element />}
                        />
                      ))}
                      {/* 重定向未匹配的路由到404页面 */}
                      <Route
                        path="*"
                        element={<Navigate to="/404" replace />}
                      />
                    </Routes>
                  </Suspense>
                </RouteGuard>
              </Content>
            </Layout>
          </Router>
        </AuthProvider>
      </GlobalComponentsProvider>
    </LocaleProvider>
  )
}

export default App
