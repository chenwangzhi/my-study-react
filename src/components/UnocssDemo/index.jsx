import { useState } from 'react';
import { useAntd } from '../../hooks/useAntd';
import './UnocssDemo.scss';

export default function UnocssDemo() {
  const [activeTab, setActiveTab] = useState('layout');
  const { Card, Tabs, TabPane, Divider } = useAntd();

  return (
    <div className="unocss-demo">
      <Card title="🎨 UnoCSS 原子CSS演示" className="demo-card">
        <Tabs activeKey={activeTab} onChange={setActiveTab} size="large">
          
          {/* 布局系统 */}
          <TabPane tab="📐 布局系统" key="layout">
            <div className="demo-section">
              <h3>Flexbox 布局</h3>
              <div className="demo-grid">
                <div className="demo-item">
                  <div className="flex-center bg-primary-100 h-20 rounded-md">
                    <span className="text-primary-700 font-medium">flex-center</span>
                  </div>
                  <code>flex-center</code>
                </div>
                
                <div className="demo-item">
                  <div className="flex-between bg-success-100 h-20 rounded-md px-4">
                    <span className="text-success-700">左侧</span>
                    <span className="text-success-700">右侧</span>
                  </div>
                  <code>flex-between</code>
                </div>
                
                <div className="demo-item">
                  <div className="flex-col-center bg-warning-100 h-20 rounded-md">
                    <span className="text-warning-700 text-sm">垂直</span>
                    <span className="text-warning-700 text-sm">居中</span>
                  </div>
                  <code>flex-col-center</code>
                </div>
              </div>

              <Divider />

              <h3>Grid 布局</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="card bg-primary-500 text-white">
                  <h4 className="text-lg font-semibold mb-2 text-white">响应式网格</h4>
                  <p className="text-sm opacity-90">自动适配不同屏幕尺寸</p>
                </div>
                <div className="card bg-warning-500 text-white">
                  <h4 className="text-lg font-semibold mb-2">渐变背景</h4>
                  <p className="text-sm opacity-90">使用自定义渐变规则</p>
                </div>
                <div className="card bg-gray-800 text-white">
                  <h4 className="text-lg font-semibold mb-2">深色卡片</h4>
                  <p className="text-sm opacity-90">经典的深色主题</p>
                </div>
              </div>
            </div>
          </TabPane>

          {/* 颜色系统 */}
          <TabPane tab="🎨 颜色系统" key="colors">
            <div className="demo-section">
              <h3>主题色彩</h3>
              <div className="demo-grid">
                {['primary', 'success', 'warning', 'error'].map(color => (
                  <div key={color} className="demo-item">
                    <div className="space-y-2">
                      {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                        <div 
                          key={shade}
                          className={`h-8 rounded flex-center text-xs font-medium ${
                            shade <= 300 ? `bg-${color}-${shade} text-${color}-900` : 
                            `bg-${color}-${shade} text-white`
                          }`}
                        >
                          {shade}
                        </div>
                      ))}
                    </div>
                    <code className="text-center mt-2 block">{color}</code>
                  </div>
                ))}
              </div>

              <Divider />

              <h3>颜色应用示例</h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary-500 text-white rounded-full text-sm">Primary</span>
                  <span className="px-3 py-1 bg-success-500 text-white rounded-full text-sm">Success</span>
                  <span className="px-3 py-1 bg-warning-500 text-white rounded-full text-sm">Warning</span>
                  <span className="px-3 py-1 bg-error-500 text-white rounded-full text-sm">Error</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 border border-primary-500 text-primary-500 rounded-full text-sm">Primary Outline</span>
                  <span className="px-3 py-1 border border-success-500 text-success-500 rounded-full text-sm">Success Outline</span>
                  <span className="px-3 py-1 border border-warning-500 text-warning-500 rounded-full text-sm">Warning Outline</span>
                  <span className="px-3 py-1 border border-error-500 text-error-500 rounded-full text-sm">Error Outline</span>
                </div>
              </div>
            </div>
          </TabPane>

          {/* 文字排版 */}
          <TabPane tab="📝 文字排版" key="typography">
            <div className="demo-section">
              <h3>字体大小</h3>
              <div className="space-y-4">
                <div className="text-xs">Extra Small Text (text-xs)</div>
                <div className="text-sm">Small Text (text-sm)</div>
                <div className="text-base">Base Text (text-base)</div>
                <div className="text-lg">Large Text (text-lg)</div>
                <div className="text-xl">Extra Large Text (text-xl)</div>
                <div className="text-2xl">2X Large Text (text-2xl)</div>
                <div className="text-3xl">3X Large Text (text-3xl)</div>
              </div>

              <Divider />

              <h3>字体样式</h3>
              <div className="space-y-4">
                <div className="text-title">标题样式 (text-title)</div>
                <div className="text-subtitle">副标题样式 (text-subtitle)</div>
                <div className="text-body">正文样式 (text-body)</div>
                <div className="text-caption">说明文字样式 (text-caption)</div>
              </div>

              <Divider />

              <h3>文字效果</h3>
              <div className="space-y-4">
                <div className="text-2xl font-bold drop-shadow-md">文字阴影效果</div>
                <div className="text-2xl font-bold text-gradient-primary">
                  主色渐变文字效果
                </div>
                <div className="text-2xl font-bold text-gradient-rainbow">
                  彩虹渐变文字效果
                </div>
                <div className="text-lg font-mono bg-gray-100 p-2 rounded">
                  等宽字体 (font-mono)
                </div>
              </div>
            </div>
          </TabPane>

          {/* 渐变效果 */}
          <TabPane tab="🌈 渐变效果" key="gradients">
            <div className="demo-section">
              <h3>背景渐变</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-primary text-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">主色渐变</h4>
                  <p className="text-sm opacity-90">bg-gradient-primary</p>
                </div>
                <div className="bg-gradient-success text-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">成功色渐变</h4>
                  <p className="text-sm opacity-90">bg-gradient-success</p>
                </div>
                <div className="bg-gradient-warning text-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">警告色渐变</h4>
                  <p className="text-sm opacity-90">bg-gradient-warning</p>
                </div>
                <div className="bg-gradient-error text-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">错误色渐变</h4>
                  <p className="text-sm opacity-90">bg-gradient-error</p>
                </div>
                <div className="bg-gradient-primary-success text-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">双色渐变</h4>
                  <p className="text-sm opacity-90">bg-gradient-primary-success</p>
                </div>
                <div className="bg-gradient-rainbow text-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">彩虹渐变</h4>
                  <p className="text-sm opacity-90">bg-gradient-rainbow</p>
                </div>
              </div>

              <Divider />

              <h3>渐变方向</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-r from-primary-500 to-success-500 text-white p-4 rounded text-center">
                  <span className="text-sm">to-r (右)</span>
                </div>
                <div className="bg-gradient-to-l from-primary-500 to-success-500 text-white p-4 rounded text-center">
                  <span className="text-sm">to-l (左)</span>
                </div>
                <div className="bg-gradient-to-t from-primary-500 to-success-500 text-white p-4 rounded text-center">
                  <span className="text-sm">to-t (上)</span>
                </div>
                <div className="bg-gradient-to-b from-primary-500 to-success-500 text-white p-4 rounded text-center">
                  <span className="text-sm">to-b (下)</span>
                </div>
                <div className="bg-gradient-to-tr from-primary-500 to-success-500 text-white p-4 rounded text-center">
                  <span className="text-sm">to-tr (右上)</span>
                </div>
                <div className="bg-gradient-to-tl from-primary-500 to-success-500 text-white p-4 rounded text-center">
                  <span className="text-sm">to-tl (左上)</span>
                </div>
                <div className="bg-gradient-to-br from-primary-500 to-success-500 text-white p-4 rounded text-center">
                  <span className="text-sm">to-br (右下)</span>
                </div>
                <div className="bg-gradient-to-bl from-primary-500 to-success-500 text-white p-4 rounded text-center">
                  <span className="text-sm">to-bl (左下)</span>
                </div>
              </div>

              <Divider />

              <h3>渐变按钮</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn-gradient-primary">渐变主按钮</button>
                <button className="btn-gradient-success">渐变成功按钮</button>
                <button className="btn-gradient-warning">渐变警告按钮</button>
                <button className="btn-gradient-error">渐变错误按钮</button>
              </div>
            </div>
          </TabPane>

          {/* 动画效果 */}
          <TabPane tab="✨ 动画效果" key="animations">
            <div className="demo-section">
              <h3>基础动画</h3>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="animate-spin w-8 h-8 bg-primary-500 rounded"></div>
                <div className="animate-ping w-8 h-8 bg-success-500 rounded-full"></div>
                <div className="animate-pulse w-8 h-8 bg-warning-500 rounded"></div>
                <div className="animate-bounce w-8 h-8 bg-error-500 rounded"></div>
              </div>

              <Divider />

              <h3>悬停效果</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="card hover-lift">
                  <h4 className="font-semibold mb-2">悬停上升</h4>
                  <p className="text-sm text-gray-600">hover-lift</p>
                </div>
                <div className="card hover-glow">
                  <h4 className="font-semibold mb-2">悬停发光</h4>
                  <p className="text-sm text-gray-600">hover-glow</p>
                </div>
                <div className="card hover-gradient text-white">
                  <h4 className="font-semibold mb-2">悬停渐变</h4>
                  <p className="text-sm opacity-90">hover-gradient</p>
                </div>
              </div>

              <Divider />

              <h3>变换效果</h3>
              <div className="flex flex-wrap gap-4">
                <div className="w-16 h-16 bg-primary-200 rounded flex-center text-xs transform scale-75">scale-75</div>
                <div className="w-16 h-16 bg-primary-200 rounded flex-center text-xs transform scale-100">scale-100</div>
                <div className="w-16 h-16 bg-primary-200 rounded flex-center text-xs transform scale-125">scale-125</div>
                <div className="w-16 h-16 bg-primary-200 rounded flex-center text-xs transform rotate-12">rotate-12</div>
                <div className="w-16 h-16 bg-primary-200 rounded flex-center text-xs transform rotate-45">rotate-45</div>
              </div>
            </div>
          </TabPane>

          {/* 滤镜效果 */}
          <TabPane tab="🎭 滤镜效果" key="filters">
            <div className="demo-section">
              <h3>模糊效果</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-primary-200 p-4 rounded text-center">
                  <div className="text-sm">正常</div>
                </div>
                <div className="bg-primary-200 p-4 rounded text-center blur-sm">
                  <div className="text-sm">blur-sm</div>
                </div>
                <div className="bg-primary-200 p-4 rounded text-center blur">
                  <div className="text-sm">blur</div>
                </div>
                <div className="bg-primary-200 p-4 rounded text-center blur-md">
                  <div className="text-sm">blur-md</div>
                </div>
              </div>

              <Divider />

              <h3>透明度</h3>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-primary-500 text-white p-4 rounded opacity-100">opacity-100</div>
                <div className="bg-primary-500 text-white p-4 rounded opacity-75">opacity-75</div>
                <div className="bg-primary-500 text-white p-4 rounded opacity-50">opacity-50</div>
                <div className="bg-primary-500 text-white p-4 rounded opacity-25">opacity-25</div>
              </div>

              <Divider />

              <h3>亮度和对比度</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-primary-200 p-4 rounded text-center brightness-50">
                  <div className="text-sm">brightness-50</div>
                </div>
                <div className="bg-primary-200 p-4 rounded text-center brightness-100">
                  <div className="text-sm">brightness-100</div>
                </div>
                <div className="bg-primary-200 p-4 rounded text-center brightness-150">
                  <div className="text-sm">brightness-150</div>
                </div>
                <div className="bg-primary-200 p-4 rounded text-center contrast-150">
                  <div className="text-sm">contrast-150</div>
                </div>
              </div>
            </div>
          </TabPane>

          {/* 组件样式 */}
          <TabPane tab="🧩 组件样式" key="components">
            <div className="demo-section">
              <h3>按钮组件</h3>
              <div className="flex flex-wrap gap-4 mb-6">
                <button className="btn-primary">Primary Button</button>
                <button className="btn-secondary">Secondary Button</button>
                <button className="btn-success">Success Button</button>
                <button className="btn-warning">Warning Button</button>
                <button className="btn-error">Error Button</button>
              </div>

              <Divider />

              <h3>卡片组件</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="card">
                  <h4 className="text-lg font-semibold mb-2">基础卡片</h4>
                  <p className="text-gray-600">这是一个基础的卡片组件样式</p>
                </div>
                <div className="card-hover">
                  <h4 className="text-lg font-semibold mb-2">悬停卡片</h4>
                  <p className="text-gray-600">鼠标悬停时会有阴影效果</p>
                </div>
              </div>

              <Divider />

              <h3>输入框组件</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="基础输入框" 
                  className="input-base w-full max-w-md"
                />
                <input 
                  type="email" 
                  placeholder="邮箱输入框" 
                  className="input-base w-full max-w-md"
                />
                <textarea 
                  placeholder="文本域" 
                  className="input-base w-full max-w-md h-20 resize-none"
                />
              </div>
            </div>
          </TabPane>

          {/* 工具类 */}
          <TabPane tab="🛠️ 工具类" key="utilities">
            <div className="demo-section">
              <h3>间距工具</h3>
              <div className="space-y-4">
                <div className="px-2 py-1 bg-gray-100 rounded">padding-xs (px-2 py-1)</div>
                <div className="px-3 py-2 bg-gray-100 rounded">padding-sm (px-3 py-2)</div>
                <div className="px-4 py-2 bg-gray-100 rounded">padding-md (px-4 py-2)</div>
                <div className="px-6 py-3 bg-gray-100 rounded">padding-lg (px-6 py-3)</div>
                <div className="px-8 py-4 bg-gray-100 rounded">padding-xl (px-8 py-4)</div>
              </div>

              <Divider />

              <h3>边框圆角</h3>
              <div className="flex flex-wrap gap-4">
                <div className="w-16 h-16 bg-primary-200 rounded-none flex-center text-xs">none</div>
                <div className="w-16 h-16 bg-primary-200 rounded-sm flex-center text-xs">sm</div>
                <div className="w-16 h-16 bg-primary-200 rounded-md flex-center text-xs">md</div>
                <div className="w-16 h-16 bg-primary-200 rounded-lg flex-center text-xs">lg</div>
                <div className="w-16 h-16 bg-primary-200 rounded-xl flex-center text-xs">xl</div>
                <div className="w-16 h-16 bg-primary-200 rounded-full flex-center text-xs">full</div>
              </div>

              <Divider />

              <h3>阴影效果</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card shadow-sm">
                  <h4 className="font-semibold">Small Shadow</h4>
                  <p className="text-sm text-gray-600">shadow-sm</p>
                </div>
                <div className="card shadow-md">
                  <h4 className="font-semibold">Medium Shadow</h4>
                  <p className="text-sm text-gray-600">shadow-md</p>
                </div>
                <div className="card shadow-lg">
                  <h4 className="font-semibold">Large Shadow</h4>
                  <p className="text-sm text-gray-600">shadow-lg</p>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}