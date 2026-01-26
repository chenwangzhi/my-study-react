import { useTheme } from '../../hooks/useTheme';
import './ThemeToggle.scss';

export default function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`切换到${isDark ? '浅色' : '深色'}主题`}
    >
      <div className="theme-toggle__icon">
        {isDark ? (
          // 太阳图标 (浅色主题)
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        ) : (
          // 月亮图标 (深色主题)
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </div>
      <span className="theme-toggle__text">
        {isDark ? '浅色' : '深色'}主题
      </span>
    </button>
  );
}