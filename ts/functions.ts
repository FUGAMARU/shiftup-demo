// Libraries
import { format } from "date-fns"
import { ja } from "date-fns/locale"

export const resp = (base: number | string, md: number | string, lg: number | string) => {
  return { base: base, md: md, lg: lg }
}

export const formatDateForDisplay = (str: string) => {
  if (str) return format(new Date(str), "yyyy/MM/dd (E)", { locale: ja })
}

export const toHankaku = (str: string) => {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, s => {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
  })
}

export const standBy = (milliseconds: number) => {
  return new Promise<boolean>(resolve => {
    setTimeout(() => {
      resolve(true)
    }, milliseconds)
  })
}

export const getSchoolType = (input: string) => {
  const patternNEEC = /^G\d{3}[A-Z]\d{4}$/
  const patternTUT = /^[\dA-Z]{3}\d{5}$/

  if (patternNEEC.test(input)) return "NEEC"
  if (patternTUT.test(input)) return "TUT"

  return undefined
}

export const toFlattenObject = (obj: { [x: string]: { [y: string]: string } }) => {
  const result: { [key: string]: string } = {}

  Object.keys(obj).forEach(outside => {
    Object.keys(obj[outside]).forEach(inside => {
      result[inside] = obj[outside][inside]
    })
  })

  return result
}

export const isDateOrderCorrect = (current: Date, target: Date) => new Date(current.toDateString()) <= new Date(target.toDateString())