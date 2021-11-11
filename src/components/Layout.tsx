import { FC } from 'react'
import cn from 'classnames'

import { ReactComponent as Logo } from 'assets/tromzo-logo.svg'

import styles from './Layout.module.scss'

const Layout: FC = ({ children }) => {
  return (
    <>
      <header className={styles.header}>
        <Logo className={styles.logo} />
      </header>

      <div className={cn(styles.content, styles.container)}>{children}</div>
    </>
  )
}

export default Layout
