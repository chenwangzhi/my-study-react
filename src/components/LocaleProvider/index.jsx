import { useMemo } from 'react'
import { ConfigProvider } from 'antd'
import { useTranslation } from 'react-i18next'

// 导入 Ant Design 语言包
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'

/**
 * Ant Design 国际化提供者组件
 */
export default function LocaleProvider({ children }) {
  const { i18n } = useTranslation()

  const antdLocale = useMemo(() => {
    switch (i18n.language) {
      case 'zh-CN':
        return zhCN
      case 'en-US':
        return enUS
      default:
        return zhCN // 默认中文
    }
  }, [i18n.language])

  const direction = useMemo(() => {
    // 为将来支持RTL语言预留
    return i18n.language === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  return (
    <ConfigProvider
      locale={antdLocale}
      direction={direction}
      theme={{
        token: {
          // 自定义主题配置
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
        components: {
          // 组件级别的主题配置
          Button: {
            borderRadius: 6,
          },
          Input: {
            borderRadius: 6,
          },
          Card: {
            borderRadius: 8,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
