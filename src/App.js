import "./App.scss";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";
import AntdDemo from "./components/AntdDemo";
import TableDemo from "./components/TableDemo";
import GlobalComponentsExample from "./components/GlobalComponentsExample";
import { useAntd } from "./hooks/useAntd";

function App() {
  const { Tabs, TabPane } = useAntd();

  return (
    <div className="App">
      <div className="container">
        <div className="app-header">
          <h1>React + Sass + Ant Design</h1>
          <ThemeToggle />
        </div>

        <Tabs defaultActiveKey="1" size="large" className="demo-tabs">
          <TabPane tab="🎨 主题演示" key="1">
            <div className="demo-section">
              <div className="card mb-4">
                <h2>🎨 主题切换功能演示</h2>
                <p>点击右上角的主题切换按钮，体验浅色/深色主题切换效果！</p>
                <ul style={{ textAlign: "left" }}>
                  <li>✅ 支持浅色/深色主题切换</li>
                  <li>✅ 主题状态本地存储</li>
                  <li>✅ 平滑过渡动画</li>
                  <li>✅ 响应式设计</li>
                  <li>✅ Sass变量 + CSS自定义属性</li>
                  <li>✅ Ant Design 主题适配</li>
                  <li>✅ 全局组件配置</li>
                </ul>
              </div>
            </div>

            <div className="demo-section">
              <div className="card mb-4">
                <h3>计数器组件</h3>
                <Footer />
              </div>
            </div>

            <div className="demo-section">
              <div className="card mb-4">
                <h3>按钮样式演示</h3>
                <div className="button-demo">
                  <button className="btn">主要按钮</button>
                  <button className="btn btn--secondary">次要按钮</button>
                  <button className="btn btn--theme-toggle">主题按钮</button>
                </div>
              </div>
            </div>
          </TabPane>

          <TabPane tab="🚀 全局组件" key="2">
            <GlobalComponentsExample />
          </TabPane>

          <TabPane tab="🧩 Ant Design 组件" key="3">
            <AntdDemo />
          </TabPane>

          <TabPane tab="📊 数据表格" key="4">
            <TableDemo />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
