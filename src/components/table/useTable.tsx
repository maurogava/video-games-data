import {
  createContext,
  useContext,
  useState,
  FC,
  useMemo,
  useCallback,
  useRef,
} from 'react'
import { compareByNumbers, compareByString } from 'utils/utils'
import { TableData } from 'components/table/Table'
import { Columns } from 'components/table/TableBody'

export type Direction = 'none' | 'asc' | 'desc'

type CurrentSortField = {
  columnName?: string
  direction?: Direction
}

type SortField = {
  title: string
  accesor: string
}

type Context = {
  data: TableData
  currentSortField: CurrentSortField
  sortFields: SortField[]
  actions: {
    search: (value: string) => void
    orderBy: (direction: Direction, columnName: string) => void
  }
}

// Context with defaults
const TableContext = createContext<Context>({
  data: [],
  currentSortField: {},
  sortFields: [],
  actions: {
    search: () => {},
    orderBy: () => {},
  },
})

export const useTableContext = () => useContext(TableContext)

type ProviderProps = {
  data: TableData
  columns: Columns[]
}

// Context Provider
export const TableContextProvider: FC<ProviderProps> = ({
  children,
  data: rawData,
  columns,
}) => {
  // Data used to build the table
  const tableData = useMemo(
    () => rawData.filter(({ title }) => title),
    [rawData]
  )

  // Getting all fields that have the sort activated
  const sortFields = useMemo(
    () =>
      columns
        .filter(({ hasSort }) => hasSort)
        .map(({ title, accesor }) => ({ title, accesor })),
    [columns]
  )

  // Data shown in the table
  const [data, setTableData] = useState(tableData)
  // Info about the current sort field
  const currentSortField = useRef<CurrentSortField>({})
  // refData stores filtered data so is more perfomant to make the sorting
  const refData = useRef<TableData | undefined>()

  // Method to Sorting a column
  const orderBy = useCallback(
    (direction, columnName) => {
      let tempData
      const compareBy =
        // Checking if we are sorting a number or a string and returning the corresponding method according to that
        typeof tableData[0][columnName] === 'number'
          ? compareByNumbers(columnName, direction)
          : compareByString(columnName, direction)

      // Using refData for better performance if available
      const data = refData.current ? [...refData.current] : [...tableData]
      // Store the current sorted field
      currentSortField.current = { columnName, direction }

      if (direction === 'asc' || direction === 'desc') {
        // Sorting the data
        // @ts-ignore: Unreachable code error
        tempData = data.sort(compareBy)
      } else {
        // Reset the sorting using the default data
        tempData = data
        currentSortField.current = {}
      }

      setTableData(tempData)
    },
    [tableData]
  )

  // Method to Filter the data based in the search input
  const search = useCallback(
    (value) => {
      let tempData

      if (!value.length) {
        // If the input is empty reset the data
        tempData = [...tableData]
        refData.current = undefined
      } else {
        // Filtering based the input value. This method is case insensitive
        tempData = tableData.filter(
          ({ title }) =>
            typeof title === 'string' && new RegExp(value, 'i').test(title)
        )
        // refData is set for improved performance when sorting
        refData.current = tempData
      }

      // Get the current sort data if available
      const { direction, columnName } = currentSortField.current
      if (direction && columnName && direction !== 'none') {
        // Sorting the data if there is a sort already applied
        orderBy(direction, columnName)
      } else {
        setTableData(tempData)
      }
    },
    [orderBy, tableData]
  )

  const providerData = useMemo(
    () => ({
      data,
      currentSortField: currentSortField.current,
      sortFields,
      actions: {
        search,
        orderBy,
      },
    }),
    [data, orderBy, search, sortFields]
  )

  return (
    <TableContext.Provider value={providerData}>
      {children}
    </TableContext.Provider>
  )
}
