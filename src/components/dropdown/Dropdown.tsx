import {
  FC,
  Children,
  useState,
  useEffect,
  ReactElement,
  useCallback,
} from 'react'
import cn from 'classnames'
import Label, { LabelProps } from 'components/dropdown/Label'
import Item, { ItemProps } from 'components/dropdown/Item'

import style from './Dropdown.module.scss'

interface DropdowProps {
  className?: string
}

interface DropdownCompositionProps {
  Label: FC<LabelProps>
  Item: FC<ItemProps>
}

// Dropdown component using react compound components pattern
const Dropdown: FC<DropdowProps> & DropdownCompositionProps = ({
  children,
  className = '',
}) => {
  const [isOpened, setIsOpened] = useState(false)

  useEffect(() => {
    // We just want to execute this effect if `isOpened = true`.
    if (!isOpened) {
      return
    }

    const closeMenu = () => setIsOpened(false)

    document.addEventListener('click', closeMenu)
    // eslint-disable-next-line consistent-return
    return () => document.removeEventListener('click', closeMenu)
  }, [isOpened])

  const showMenu = useCallback(() => setIsOpened(true), [])

  const childrenArray = Children.toArray(children) as ReactElement[]
  const label = childrenArray.find((child) => child?.type === Label)
  const items = childrenArray.filter((child) => child?.type === Item)

  return (
    <div className={cn(style.container, className)}>
      <button
        type="button"
        className={cn(style.button, label?.props?.className)}
        onClick={showMenu}
      >
        {label}
      </button>
      <div className={cn(style.listWrapper, isOpened && style.isOpened)}>
        {items}
      </div>
    </div>
  )
}

Dropdown.Label = Label
Dropdown.Item = Item

export default Dropdown
