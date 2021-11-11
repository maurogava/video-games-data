import { FC, useCallback, useMemo, useRef } from 'react'
import cn from 'classnames'
import { useTableContext, Direction } from 'components/table/useTable'

import styles from './Sort.module.scss'

type LoadingProps = {
  columnName: string
  className?: string
}

const Sort: FC<LoadingProps> = ({ children, columnName, className = '' }) => {
  // Used a useRef instead a useState to prevent an extra re-render
  const dirIndex = useRef(0)
  // Posible directions of sorting
  const directions = useMemo<Direction[]>(() => ['none', 'asc', 'desc'], [])

  const {
    currentSortField: { columnName: colName, direction },
    actions: { orderBy },
  } = useTableContext()

  // Set the direction if it is available
  const index = direction && directions.indexOf(direction)
  if (index && index > -1) {
    dirIndex.current = index
  }

  // Reset sort direction
  if (columnName !== colName) {
    dirIndex.current = 0
  }

  const handleClick = useCallback(() => {
    // Using an incremental counter with the module operator to calculate the next direction
    dirIndex.current = (dirIndex.current + 1) % 3
    // Calling the orderBy method to excecute the sorting
    orderBy(directions[dirIndex.current], columnName)
  }, [columnName, directions, orderBy])

  // Current direction
  const dir = directions[dirIndex.current]

  return (
    <button
      type="button"
      className={cn(styles.button, className)}
      onClick={handleClick}
    >
      {children}
      <span
        className={cn(styles.arrow, styles.up, {
          [styles.upActive]: dir === 'asc' && columnName === colName,
        })}
      ></span>
      <span
        className={cn(styles.arrow, styles.down, {
          [styles.downActive]: dir === 'desc' && columnName === colName,
        })}
      ></span>
    </button>
  )
}

export default Sort
