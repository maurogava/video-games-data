import { FC, ReactElement } from 'react'
import cn from 'classnames'
import { useTableContext } from 'components/table/useTable'

import styles from './TableBody.module.scss'

export type Columns = {
  title: string
  accesor: string
  className?: string
  hasSort?: boolean
}

export type TableData = Record<string, string | number>[]

type TableBodyProps = {
  columns: Columns[]
}

const TableBody: FC<TableBodyProps> = ({ columns }) => {
  let content: ReactElement | ReactElement[] = <p>There is no data</p>
  const { data } = useTableContext()

  if (data?.length) {
    // Used reduce to prevent two iterations using "filter" and then "map"
    content = data.reduce((acc, row) => {
      if (row.api_rate_limit === undefined) {
        const tr = (
          <tr key={`${row.title}${row.platform}`} className={styles.row}>
            {columns.map(({ title, accesor, className }) => (
              <td key={accesor} className={cn(styles.cell, className)}>
                <strong className={styles.title}>{title}:</strong>
                {row[accesor]}
              </td>
            ))}
          </tr>
        )
        acc.push(tr)
      }

      return acc
    }, [] as ReactElement[])
  }

  return <tbody>{content}</tbody>
}

export default TableBody
