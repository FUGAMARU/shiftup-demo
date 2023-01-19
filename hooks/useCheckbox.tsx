// React Hooks
import { useState, useCallback, useMemo } from "react"

interface DynamicObject {
  [key: string]: boolean
}

export const useCheckbox = () => {
  const [checkboxItems, setCheckbox] = useState<DynamicObject>({})

  const checkedItems = useMemo(() => Object.keys(checkboxItems).filter(key => checkboxItems[key]), [checkboxItems])

  const toggleItemState = useCallback((key: string) => {
    const assigned = Object.assign({}, checkboxItems)
    assigned[key] = !!!assigned[key]
    setCheckbox(assigned)
  }, [checkboxItems])

  return { checkboxItems, setCheckbox, checkedItems, toggleItemState }
}