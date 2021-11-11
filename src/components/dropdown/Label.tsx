import { FC, ReactNode } from 'react'

export interface LabelProps {
  children: ReactNode
}

const Label: FC<LabelProps> = ({ children }) => <>{children}</>

export default Label
