import { ReactNode, useState } from 'react'
import styles from './sidebar.module.css'
import { classNames } from '../../lib/class-names'

interface SidebarProps {
  children: ReactNode
}

export const Sidebar = ({ children }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        className={classNames(styles.burger, { [styles.open]: isOpen })}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={classNames(styles.overlay, { [styles.open]: isOpen })}
        onClick={toggleSidebar}
      />

      <aside className={classNames(styles.sidebar, { [styles.open]: isOpen })}>
        <div className={styles.content}>{children}</div>
      </aside>
    </>
  )
} 