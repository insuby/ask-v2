import { ColumnType } from '@constants'
import { useI18n } from '@i18n'
import { FC, ReactNode } from 'react'

interface TableProps {
  columnNames: ColumnType[]
  children: ReactNode
  className: string
}

const Table: FC<TableProps> = ({ columnNames, children, className }) => {
  const i18n = useI18n()

  return (
    <table className={`${className}`}>
      <thead>
        <tr>
          {columnNames.map(({ name, style, id }, index) => (
            <th key={`${name}-${index}`} id={id} style={style}>
              {i18n.t(name)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody id="scrollable">{children}</tbody>
    </table>
  )
}

export default Table
