import { FC } from 'react'
import cn from 'classnames'
import styles from './Loading.module.scss'

type LoadingProps = {
  className?: string
}

const Loading: FC<LoadingProps> = ({ className = '' }) => {
  return (
    <div className={cn(styles.loading, className)}>
      <span className={cn(styles.dot, styles.dot1)}></span>
      <span className={cn(styles.dot, styles.dot2)}></span>
      <span className={cn(styles.dot, styles.dot3)}></span>
    </div>
  )
}

export default Loading
