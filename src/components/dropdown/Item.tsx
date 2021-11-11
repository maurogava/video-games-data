import { FC, ReactNode } from 'react'

export interface ItemProps {
  children: ReactNode
}

const Item: FC<ItemProps> = ({ children }) => <>{children}</>

export default Item
