import './App.scss';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center mb-4">React + Sass + Tailwind CSS</h1>
        
        <div className="card mb-4">
          <h2>Sass功能演示</h2>
          <p>这个项目现在支持：</p>
          <ul style={{textAlign: 'left'}}>
            <li>✅ Sass变量和嵌套</li>
            <li>✅ Mixins和函数</li>
            <li>✅ 模块化样式组织</li>
            <li>✅ 与Tailwind CSS共存</li>
          </ul>
        </div>
        
        <div className="card">
          <Footer />
        </div>
        
        <div className="card mb-4">
          <h3>按钮样式演示</h3>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <button className="btn">主要按钮</button>
            <button className="btn btn--secondary">次要按钮</button>
            <button className="btn btn--success">成功按钮</button>
            <button className="btn btn--warning">警告按钮</button>
            <button className="btn btn--error">错误按钮</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
