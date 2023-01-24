// React
import { memo, useMemo, SetStateAction, Dispatch } from "react"

// Chakra UI Components
import { Select } from "@chakra-ui/react"

// Classes
import Symbol from "classes/Symbol"

// Type
import { SchoolType } from "types/SchoolType"
import { College } from "types/College"
import { Symbols, OptionalSymbols } from "types/Symbols"
import { Department } from "types/Department"

interface Props {
  filtering?: SchoolType,
  isInvalid?: boolean,
  isDisabled?: boolean,
  dispatch: Dispatch<SetStateAction<Department | "">>
}

const SymbolSelector = (props: Props) => {
  const allSymbols = useMemo(() => Symbol.allSymbols, [])
  const neecSymbols = useMemo(() => Symbol.neecSymbols, [])
  const tutSymbols = useMemo(() => Symbol.tutSymbols, [])

  return (
    <Select placeholder={!!!props.filtering ? "学科・学部を選択" : props.filtering === "NEEC" ? "学科を選択" : "学部を選択"} focusBorderColor="#48c3eb" isInvalid={props.isInvalid} isDisabled={props.isDisabled} errorBorderColor="red.200" onChange={e => props.dispatch(e.target.value as Department | "")}>
      {
        !!!props.filtering ?
          Object.keys(allSymbols).map(college => {
            return (
              <optgroup key={college} label={college}>
                {Object.keys(allSymbols[college as College]).map((dept, idx) => {
                  return <option key={dept} value={dept}>{String(Object.values(allSymbols[college as College] as Symbols)[idx])}</option>
                })}
              </optgroup>
            )
          })
          : props.filtering === "NEEC" ?
            Object.keys(neecSymbols).map(college => {
              return (
                <optgroup key={college} label={college}>
                  {Object.keys(neecSymbols[college as College] as OptionalSymbols).map((dept, idx) => {
                    return <option key={dept} value={dept}>{String(Object.values(neecSymbols[college as College] as OptionalSymbols)[idx])}</option>
                  })}
                </optgroup>
              )
            })
            : props.filtering === "TUT" ?
              Object.keys(tutSymbols).map(faculty => {
                return <option key={faculty} value={faculty}>{tutSymbols[faculty as Department]}</option>
              })
              : null
      }
    </Select>
  )
}

export default memo(SymbolSelector)