import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAntd } from '../../hooks/useAntd'
import {
  supportedLanguages,
  changeLanguage,
  getCurrentLanguage,
} from '../../i18n'
import './LanguageSwitch.scss'

export default function LanguageSwitch() {
  const { t } = useTranslation()
  const { Dropdown, Button } = useAntd()
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage())

  const handleLanguageChange = async (langCode) => {
    try {
      await changeLanguage(langCode)
      setCurrentLang(langCode)

      // 可以添加成功提示
      // message.success(t('common.success'));
    } catch (error) {
      console.error('Language change failed:', error)
    }
  }

  const getCurrentLangInfo = () => {
    return (
      supportedLanguages.find((lang) => lang.code === currentLang) ||
      supportedLanguages[0]
    )
  }

  const menuItems = supportedLanguages.map((lang) => ({
    key: lang.code,
    label: (
      <div className="language-item">
        <span className="language-flag">{lang.flag}</span>
        <span className="language-name">{lang.name}</span>
      </div>
    ),
    onClick: () => handleLanguageChange(lang.code),
  }))

  const currentLangInfo = getCurrentLangInfo()

  return (
    <div className="language-switch">
      <Dropdown
        menu={{ items: menuItems }}
        placement="bottomRight"
        trigger={['click']}
      >
        <Button
          type="text"
          className="language-button"
          title={t('common.language')}
        >
          <span className="language-flag">{currentLangInfo.flag}</span>
          <span className="language-name">{currentLangInfo.name}</span>
        </Button>
      </Dropdown>
    </div>
  )
}
