import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// 导入语言资源
import zhCN from './locales/zh-CN.json'
import enUS from './locales/en-US.json'

// 语言资源配置
const resources = {
  'zh-CN': {
    translation: zhCN,
  },
  'en-US': {
    translation: enUS,
  },
}

// 初始化 i18next
i18n
  .use(LanguageDetector) // 自动检测用户语言
  .use(initReactI18next) // 绑定 react-i18next
  .init({
    resources,

    // 默认语言
    fallbackLng: 'zh-CN',

    // 调试模式（开发环境开启）
    debug: process.env.NODE_ENV === 'development',

    // 语言检测配置
    detection: {
      // 检测顺序：localStorage -> navigator -> htmlTag -> path -> subdomain
      order: ['localStorage', 'navigator', 'htmlTag'],

      // 缓存用户语言选择
      caches: ['localStorage'],

      // localStorage 键名
      lookupLocalStorage: 'i18nextLng',
    },

    // 插值配置
    interpolation: {
      escapeValue: false, // React 已经处理了 XSS
    },

    // 命名空间配置
    defaultNS: 'translation',

    // 键分隔符
    keySeparator: '.',

    // 嵌套分隔符
    nsSeparator: ':',
  })

export default i18n

// 导出语言切换函数
export const changeLanguage = (lng) => {
  return i18n.changeLanguage(lng)
}

// 导出当前语言
export const getCurrentLanguage = () => {
  return i18n.language
}

// 导出支持的语言列表
export const supportedLanguages = [
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
]
