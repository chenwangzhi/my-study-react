import { useTranslation } from 'react-i18next'
import { changeLanguage, getCurrentLanguage, supportedLanguages } from '../i18n'

/**
 * 国际化自定义 Hook
 * 提供便捷的国际化功能
 */
export function useI18n() {
  const { t, i18n } = useTranslation()

  /**
   * 切换语言
   * @param {string} langCode - 语言代码
   */
  const switchLanguage = async (langCode) => {
    try {
      await changeLanguage(langCode)
      return true
    } catch (error) {
      console.error('Language switch failed:', error)
      return false
    }
  }

  /**
   * 获取当前语言信息
   */
  const getCurrentLangInfo = () => {
    const currentLang = getCurrentLanguage()
    return (
      supportedLanguages.find((lang) => lang.code === currentLang) ||
      supportedLanguages[0]
    )
  }

  /**
   * 检查是否为指定语言
   * @param {string} langCode - 语言代码
   */
  const isCurrentLanguage = (langCode) => {
    return getCurrentLanguage() === langCode
  }

  /**
   * 获取翻译文本（带默认值）
   * @param {string} key - 翻译键
   * @param {string} defaultValue - 默认值
   * @param {object} options - 插值选项
   */
  const translate = (key, defaultValue = key, options = {}) => {
    const translation = t(key, options)
    return translation === key ? defaultValue : translation
  }

  /**
   * 格式化数字（根据当前语言环境）
   * @param {number} number - 要格式化的数字
   * @param {object} options - 格式化选项
   */
  const formatNumber = (number, options = {}) => {
    const locale = getCurrentLanguage().replace('-', '_')
    return new Intl.NumberFormat(locale, options).format(number)
  }

  /**
   * 格式化日期（根据当前语言环境）
   * @param {Date|string|number} date - 要格式化的日期
   * @param {object} options - 格式化选项
   */
  const formatDate = (date, options = {}) => {
    const locale = getCurrentLanguage().replace('-', '_')
    const dateObj = new Date(date)
    return new Intl.DateTimeFormat(locale, options).format(dateObj)
  }

  /**
   * 格式化货币（根据当前语言环境）
   * @param {number} amount - 金额
   * @param {string} currency - 货币代码
   * @param {object} options - 格式化选项
   */
  const formatCurrency = (amount, currency = 'CNY', options = {}) => {
    const locale = getCurrentLanguage().replace('-', '_')
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      ...options,
    }).format(amount)
  }

  return {
    // 基础功能
    t,
    i18n,
    translate,

    // 语言切换
    switchLanguage,
    getCurrentLangInfo,
    isCurrentLanguage,
    supportedLanguages,

    // 格式化功能
    formatNumber,
    formatDate,
    formatCurrency,

    // 当前语言
    currentLanguage: getCurrentLanguage(),
    isRTL: i18n.dir() === 'rtl', // 是否为从右到左的语言
  }
}
