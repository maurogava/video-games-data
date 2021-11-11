import { FC, ChangeEvent, useCallback, memo } from 'react'
import cn from 'classnames'
import { useTableContext } from 'components/table/useTable'

import styles from './Search.module.scss'

type SearchProps = {
  className?: string
}

const Search: FC<SearchProps> = memo(({ className }) => {
  const {
    actions: { search },
  } = useTableContext()

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => search(e.currentTarget.value),
    [search]
  )

  return (
    <div className={cn(styles.wrapper, className)}>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text" onChange={handleSearch} />
    </div>
  )
})

export default Search
