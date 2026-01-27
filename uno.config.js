import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
  // 扫描文件路径
  content: {
    filesystem: [
      'src/**/*.{js,jsx,ts,tsx}',
      'public/index.html'
    ]
  },
  
  // 预设配置
  presets: [
    presetUno(), // 默认预设，包含常用的原子类
    presetAttributify(), // 属性化模式
  ],
  
  // 主题配置
  theme: {
    colors: {
      // 自定义颜色
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
      warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
      },
      error: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      }
    }
  },
  
  // 快捷方式
  shortcuts: [
    // 布局相关
    ['flex-center', 'flex items-center justify-center'],
    ['flex-between', 'flex items-center justify-between'],
    ['flex-col-center', 'flex flex-col items-center justify-center'],
    ['flex-around', 'flex items-center justify-around'],
    ['flex-evenly', 'flex items-center justify-evenly'],
    
    // 按钮样式
    ['btn-base', 'px-4 py-2 rounded-md font-medium transition-all duration-200 cursor-pointer'],
    ['btn-primary', 'btn-base bg-primary-500 text-white hover:bg-primary-600'],
    ['btn-secondary', 'btn-base bg-gray-200 text-gray-800 hover:bg-gray-300'],
    ['btn-success', 'btn-base bg-success-500 text-white hover:bg-success-600'],
    ['btn-warning', 'btn-base bg-warning-500 text-white hover:bg-warning-600'],
    ['btn-error', 'btn-base bg-error-500 text-white hover:bg-error-600'],
    
    // 渐变按钮
    ['btn-gradient-primary', 'btn-base bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700'],
    ['btn-gradient-success', 'btn-base bg-gradient-to-r from-success-500 to-success-600 text-white hover:from-success-600 hover:to-success-700'],
    ['btn-gradient-warning', 'btn-base bg-gradient-to-r from-warning-500 to-warning-600 text-white hover:from-warning-600 hover:to-warning-700'],
    ['btn-gradient-error', 'btn-base bg-gradient-to-r from-error-500 to-error-600 text-white hover:from-error-600 hover:to-error-700'],
    
    // 卡片样式
    ['card', 'bg-white rounded-lg shadow-sm border border-gray-200 p-4'],
    ['card-hover', 'card hover:shadow-md transition-shadow duration-200'],
    ['card-gradient', 'bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-sm border border-gray-200 p-4'],
    
    // 渐变背景
    ['bg-gradient-primary', 'bg-gradient-to-r from-primary-500 to-primary-600'],
    ['bg-gradient-success', 'bg-gradient-to-r from-success-500 to-success-600'],
    ['bg-gradient-warning', 'bg-gradient-to-r from-warning-500 to-warning-600'],
    ['bg-gradient-error', 'bg-gradient-to-r from-error-500 to-error-600'],
    ['bg-gradient-primary-success', 'bg-gradient-to-r from-primary-500 to-success-500'],
    ['bg-gradient-warning-error', 'bg-gradient-to-r from-warning-500 to-error-500'],
    ['bg-gradient-rainbow', 'bg-gradient-to-r from-primary-500 via-success-500 to-warning-500'],
    
    // 输入框样式
    ['input-base', 'px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500'],
    ['input-error', 'input-base border-error-500 focus:ring-error-500'],
    ['input-success', 'input-base border-success-500 focus:ring-success-500'],
    
    // 文本样式
    ['text-title', 'text-2xl font-bold text-gray-900'],
    ['text-subtitle', 'text-lg font-semibold text-gray-700'],
    ['text-body', 'text-base text-gray-600'],
    ['text-caption', 'text-sm text-gray-500'],
    ['text-gradient-primary', 'bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent'],
    ['text-gradient-success', 'bg-gradient-to-r from-success-500 to-success-700 bg-clip-text text-transparent'],
    ['text-gradient-rainbow', 'bg-gradient-to-r from-primary-500 via-success-500 to-warning-500 bg-clip-text text-transparent'],
    
    // 动画效果
    ['animate-fade-in', 'animate-duration-300 animate-ease-in-out opacity-0 animate-fill-forwards'],
    ['animate-slide-up', 'transform translate-y-4 opacity-0 transition-all duration-300'],
    ['animate-scale-in', 'transform scale-95 opacity-0 transition-all duration-200'],
    
    // 悬停效果
    ['hover-lift', 'transition-transform duration-200 hover:transform hover:scale-105'],
    ['hover-glow', 'transition-shadow duration-200 hover:shadow-lg'],
    ['hover-gradient', 'transition-all duration-200 hover:bg-gradient-to-r hover:from-primary-500 hover:to-primary-600'],
    
    // 响应式工具
    ['container-center', 'container mx-auto px-4'],
    ['full-screen', 'w-screen h-screen'],
    ['full-viewport', 'w-full min-h-screen'],
    
    // 间距工具
    ['p-xs', 'p-2'],
    ['p-sm', 'p-3'],
    ['p-md', 'p-4'],
    ['p-lg', 'p-6'],
    ['p-xl', 'p-8'],
    ['m-xs', 'm-2'],
    ['m-sm', 'm-3'],
    ['m-md', 'm-4'],
    ['m-lg', 'm-6'],
    ['m-xl', 'm-8'],
  ],
  
  // 安全列表 - 确保这些类不会被清除
  safelist: [
    // 背景颜色 - 所有色阶
    'bg-primary-50', 'bg-primary-100', 'bg-primary-200', 'bg-primary-300', 'bg-primary-400', 
    'bg-primary-500', 'bg-primary-600', 'bg-primary-700', 'bg-primary-800', 'bg-primary-900',
    'bg-success-50', 'bg-success-100', 'bg-success-200', 'bg-success-300', 'bg-success-400',
    'bg-success-500', 'bg-success-600', 'bg-success-700', 'bg-success-800', 'bg-success-900',
    'bg-warning-50', 'bg-warning-100', 'bg-warning-200', 'bg-warning-300', 'bg-warning-400',
    'bg-warning-500', 'bg-warning-600', 'bg-warning-700', 'bg-warning-800', 'bg-warning-900',
    'bg-error-50', 'bg-error-100', 'bg-error-200', 'bg-error-300', 'bg-error-400',
    'bg-error-500', 'bg-error-600', 'bg-error-700', 'bg-error-800', 'bg-error-900',
    
    // 文字颜色 - 所有色阶
    'text-primary-50', 'text-primary-100', 'text-primary-200', 'text-primary-300', 'text-primary-400',
    'text-primary-500', 'text-primary-600', 'text-primary-700', 'text-primary-800', 'text-primary-900',
    'text-success-50', 'text-success-100', 'text-success-200', 'text-success-300', 'text-success-400',
    'text-success-500', 'text-success-600', 'text-success-700', 'text-success-800', 'text-success-900',
    'text-warning-50', 'text-warning-100', 'text-warning-200', 'text-warning-300', 'text-warning-400',
    'text-warning-500', 'text-warning-600', 'text-warning-700', 'text-warning-800', 'text-warning-900',
    'text-error-50', 'text-error-100', 'text-error-200', 'text-error-300', 'text-error-400',
    'text-error-500', 'text-error-600', 'text-error-700', 'text-error-800', 'text-error-900',
    
    // 边框颜色 - 所有色阶
    'border-primary-50', 'border-primary-100', 'border-primary-200', 'border-primary-300', 'border-primary-400',
    'border-primary-500', 'border-primary-600', 'border-primary-700', 'border-primary-800', 'border-primary-900',
    'border-success-50', 'border-success-100', 'border-success-200', 'border-success-300', 'border-success-400',
    'border-success-500', 'border-success-600', 'border-success-700', 'border-success-800', 'border-success-900',
    'border-warning-50', 'border-warning-100', 'border-warning-200', 'border-warning-300', 'border-warning-400',
    'border-warning-500', 'border-warning-600', 'border-warning-700', 'border-warning-800', 'border-warning-900',
    'border-error-50', 'border-error-100', 'border-error-200', 'border-error-300', 'border-error-400',
    'border-error-500', 'border-error-600', 'border-error-700', 'border-error-800', 'border-error-900',
    
    // 渐变背景 - 方向
    'bg-gradient-to-r', 'bg-gradient-to-l', 'bg-gradient-to-t', 'bg-gradient-to-b',
    'bg-gradient-to-tr', 'bg-gradient-to-tl', 'bg-gradient-to-br', 'bg-gradient-to-bl',
    
    // 渐变起始颜色
    'from-primary-50', 'from-primary-100', 'from-primary-200', 'from-primary-300', 'from-primary-400',
    'from-primary-500', 'from-primary-600', 'from-primary-700', 'from-primary-800', 'from-primary-900',
    'from-success-50', 'from-success-100', 'from-success-200', 'from-success-300', 'from-success-400',
    'from-success-500', 'from-success-600', 'from-success-700', 'from-success-800', 'from-success-900',
    'from-warning-50', 'from-warning-100', 'from-warning-200', 'from-warning-300', 'from-warning-400',
    'from-warning-500', 'from-warning-600', 'from-warning-700', 'from-warning-800', 'from-warning-900',
    'from-error-50', 'from-error-100', 'from-error-200', 'from-error-300', 'from-error-400',
    'from-error-500', 'from-error-600', 'from-error-700', 'from-error-800', 'from-error-900',
    
    // 渐变中间颜色
    'via-primary-50', 'via-primary-100', 'via-primary-200', 'via-primary-300', 'via-primary-400',
    'via-primary-500', 'via-primary-600', 'via-primary-700', 'via-primary-800', 'via-primary-900',
    'via-success-50', 'via-success-100', 'via-success-200', 'via-success-300', 'via-success-400',
    'via-success-500', 'via-success-600', 'via-success-700', 'via-success-800', 'via-success-900',
    'via-warning-50', 'via-warning-100', 'via-warning-200', 'via-warning-300', 'via-warning-400',
    'via-warning-500', 'via-warning-600', 'via-warning-700', 'via-warning-800', 'via-warning-900',
    'via-error-50', 'via-error-100', 'via-error-200', 'via-error-300', 'via-error-400',
    'via-error-500', 'via-error-600', 'via-error-700', 'via-error-800', 'via-error-900',
    
    // 渐变结束颜色
    'to-primary-50', 'to-primary-100', 'to-primary-200', 'to-primary-300', 'to-primary-400',
    'to-primary-500', 'to-primary-600', 'to-primary-700', 'to-primary-800', 'to-primary-900',
    'to-success-50', 'to-success-100', 'to-success-200', 'to-success-300', 'to-success-400',
    'to-success-500', 'to-success-600', 'to-success-700', 'to-success-800', 'to-success-900',
    'to-warning-50', 'to-warning-100', 'to-warning-200', 'to-warning-300', 'to-warning-400',
    'to-warning-500', 'to-warning-600', 'to-warning-700', 'to-warning-800', 'to-warning-900',
    'to-error-50', 'to-error-100', 'to-error-200', 'to-error-300', 'to-error-400',
    'to-error-500', 'to-error-600', 'to-error-700', 'to-error-800', 'to-error-900',
    
    // 阴影效果
    'shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl',
    'shadow-inner', 'drop-shadow-sm', 'drop-shadow', 'drop-shadow-md', 'drop-shadow-lg', 'drop-shadow-xl',
    
    // 模糊效果
    'blur-none', 'blur-sm', 'blur', 'blur-md', 'blur-lg', 'blur-xl', 'blur-2xl', 'blur-3xl',
    'backdrop-blur-none', 'backdrop-blur-sm', 'backdrop-blur', 'backdrop-blur-md', 'backdrop-blur-lg',
    
    // 透明度
    'opacity-0', 'opacity-5', 'opacity-10', 'opacity-20', 'opacity-25', 'opacity-30', 'opacity-40',
    'opacity-50', 'opacity-60', 'opacity-70', 'opacity-75', 'opacity-80', 'opacity-90', 'opacity-95', 'opacity-100',
    
    // 变换效果
    'transform', 'transform-none', 'scale-0', 'scale-50', 'scale-75', 'scale-90', 'scale-95',
    'scale-100', 'scale-105', 'scale-110', 'scale-125', 'scale-150',
    'rotate-0', 'rotate-1', 'rotate-2', 'rotate-3', 'rotate-6', 'rotate-12', 'rotate-45', 'rotate-90', 'rotate-180',
    'translate-x-0', 'translate-x-1', 'translate-x-2', 'translate-x-4', 'translate-x-8',
    'translate-y-0', 'translate-y-1', 'translate-y-2', 'translate-y-4', 'translate-y-8',
    
    // 过渡动画
    'transition-none', 'transition-all', 'transition', 'transition-colors', 'transition-opacity', 'transition-shadow', 'transition-transform',
    'duration-75', 'duration-100', 'duration-150', 'duration-200', 'duration-300', 'duration-500', 'duration-700', 'duration-1000',
    'ease-linear', 'ease-in', 'ease-out', 'ease-in-out',
    
    // 动画
    'animate-none', 'animate-spin', 'animate-ping', 'animate-pulse', 'animate-bounce',
    
    // 滤镜效果
    'brightness-0', 'brightness-50', 'brightness-75', 'brightness-90', 'brightness-95',
    'brightness-100', 'brightness-105', 'brightness-110', 'brightness-125', 'brightness-150', 'brightness-200',
    'contrast-0', 'contrast-50', 'contrast-75', 'contrast-100', 'contrast-125', 'contrast-150', 'contrast-200',
    'grayscale-0', 'grayscale', 'invert-0', 'invert', 'sepia-0', 'sepia',
    'hue-rotate-0', 'hue-rotate-15', 'hue-rotate-30', 'hue-rotate-60', 'hue-rotate-90', 'hue-rotate-180',
    
    // 快捷方式
    'flex-center', 'flex-between', 'flex-col-center',
    'btn-primary', 'btn-secondary', 'btn-success', 'btn-warning', 'btn-error',
    'card', 'card-hover', 'input-base',
    'text-title', 'text-subtitle', 'text-body', 'text-caption',
  ],
})