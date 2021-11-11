import { FC } from 'react'
import { FaBars } from 'react-icons/fa'
import { useTableContext } from 'components/table/useTable'
import Sort from 'components/table/Sort'
import Search from 'components/table/Search'
import Dropdown from 'components/dropdown/Dropdown'

import styles from './Filters.module.scss'

const { Label, Item } = Dropdown

const Filters: FC = () => {
  const { sortFields } = useTableContext()

  if (!sortFields.length) {
    return null
  }

  const items = sortFields.map(({ title, accesor }) => {
    return (
      <Item key={accesor}>
        <Sort columnName={accesor}>{title}</Sort>
      </Item>
    )
  })

  return (
    <div className={styles.wrapper}>
      <Dropdown className={styles.dropdown}>
        <Label>
          <FaBars className={styles.icon} />
        </Label>
        <Item>
          <div className={styles.groupTitle}>Order By:</div>
        </Item>
        {items}
      </Dropdown>
      <Search />
    </div>
  )
}

export default Filters
