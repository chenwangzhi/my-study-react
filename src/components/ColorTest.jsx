import React from 'react';

export default function ColorTest() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">颜色系统测试</h2>
      
      {/* 背景颜色测试 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">背景颜色测试</h3>
        <div className="flex flex-wrap gap-2">
          <div className="bg-primary-100 p-2 rounded">primary-100</div>
          <div className="bg-primary-500 text-white p-2 rounded">primary-500</div>
          <div className="bg-primary-900 text-white p-2 rounded">primary-900</div>
          <div className="bg-success-100 p-2 rounded">success-100</div>
          <div className="bg-success-500 text-white p-2 rounded">success-500</div>
          <div className="bg-warning-100 p-2 rounded">warning-100</div>
          <div className="bg-warning-500 text-white p-2 rounded">warning-500</div>
          <div className="bg-error-100 p-2 rounded">error-100</div>
          <div className="bg-error-500 text-white p-2 rounded">error-500</div>
        </div>
      </div>

      {/* 文字颜色测试 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">文字颜色测试</h3>
        <div className="space-y-1">
          <p className="text-primary-500">这是 primary-500 颜色的文字</p>
          <p className="text-primary-700">这是 primary-700 颜色的文字</p>
          <p className="text-success-500">这是 success-500 颜色的文字</p>
          <p className="text-success-700">这是 success-700 颜色的文字</p>
          <p className="text-warning-500">这是 warning-500 颜色的文字</p>
          <p className="text-warning-700">这是 warning-700 颜色的文字</p>
          <p className="text-error-500">这是 error-500 颜色的文字</p>
          <p className="text-error-700">这是 error-700 颜色的文字</p>
        </div>
      </div>

      {/* 边框颜色测试 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">边框颜色测试</h3>
        <div className="flex flex-wrap gap-2">
          <div className="border-2 border-primary-500 p-2 rounded">primary-500 边框</div>
          <div className="border-2 border-success-500 p-2 rounded">success-500 边框</div>
          <div className="border-2 border-warning-500 p-2 rounded">warning-500 边框</div>
          <div className="border-2 border-error-500 p-2 rounded">error-500 边框</div>
        </div>
      </div>

      {/* 快捷方式测试 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">快捷方式测试</h3>
        <div className="space-y-2">
          <div className="flex-center bg-gray-100 h-16 rounded">flex-center</div>
          <div className="flex-between bg-gray-100 h-16 rounded px-4">
            <span>左侧</span>
            <span>右侧</span>
          </div>
          <div className="flex-col-center bg-gray-100 h-16 rounded">
            <span>垂直</span>
            <span>居中</span>
          </div>
        </div>
      </div>

      {/* 按钮测试 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">按钮测试</h3>
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary">Primary</button>
          <button className="btn-secondary">Secondary</button>
          <button className="btn-success">Success</button>
          <button className="btn-warning">Warning</button>
          <button className="btn-error">Error</button>
        </div>
      </div>
    </div>
  );
}