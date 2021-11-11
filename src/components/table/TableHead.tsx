import { FC } from 'react'
import cn from 'classnames'

import { Columns } from 'components/table/TableBody'
import Sort from 'components/table/Sort'

import styles from './TableHead.module.scss'

type TableHeadProps = {
  columns: Columns[]
}

const TableHead: FC<TableHeadProps> = ({ columns }) => {
  const thead = columns.map(({ title, accesor, className, hasSort }) => (
    <th key={accesor} className={cn(styles.th, className)}>
      {title}
      {hasSort && <Sort columnName={accesor} />}
    </th>
  ))

  return (
    <thead>
      <tr>{thead}</tr>
    </thead>
  )
}

export default TableHead
