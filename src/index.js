import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './styles/uno.css'; // 导入 UnoCSS 样式
import App from './App';
import reportWebVitals from './reportWebVitals';
import { setupGlobalComponents } from './utils/globalComponents';

// 设置全局组件
setupGlobalComponents();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
