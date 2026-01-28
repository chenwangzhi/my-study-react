import { useNavigate } from 'react-router-dom'
import { useAntd } from '../../hooks/useAntd'
import { useBreadcrumb } from '../../hooks/useBreadcrumb'
import './Breadcrumb.scss'

export default function Breadcrumb({ className = '', style = {} }) {
  const navigate = useNavigate()
  const { Breadcrumb: AntBreadcrumb } = useAntd()
  const { breadcrumbs } = useBreadcrumb()

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null
  }

  const handleClick = (path) => {
    if (path) {
      navigate(path)
    }
  }

  const items = breadcrumbs.map((item, index) => ({
    key: item.path || index,
    title: (
      <span
        className={`breadcrumb-item ${item.isLast ? 'last' : 'clickable'}`}
        onClick={() => !item.isLast && handleClick(item.path)}
      >
        {item.icon && <span className="breadcrumb-icon">{item.icon}</span>}
        <span className="breadcrumb-title">{item.title}</span>
      </span>
    ),
  }))

  return (
    <div className={`app-breadcrumb ${className}`} style={style}>
      <AntBreadcrumb items={items} />
    </div>
  )
}
