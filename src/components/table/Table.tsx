import { FC, CSSProperties } from 'react'
import cn from 'classnames'
import { TableContextProvider } from 'components/table/useTable'
import Filters from 'components/table/Filters'
import TableHead from 'components/table/TableHead'
import TableBody, { Columns } from 'components/table/TableBody'

import styles from './Table.module.scss'

export type TableData = Record<string, string | number>[]

type TableProps = {
  columns: Columns[]
  data: TableData
  className?: string
}

const Table: FC<TableProps> = ({ columns, data, className }) => {
  // This CSS custom prop is needed to create the dynamic column table
  const style = { '--columns': columns.length } as CSSProperties

  return (
    <TableContextProvider columns={columns} data={data}>
      <Filters />
      <table className={cn(styles.table, className)} style={style}>
        <TableHead columns={columns} />
        <TableBody columns={columns} />
      </table>
    </TableContextProvider>
  )
}

export default Table
