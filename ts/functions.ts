// Libraries
import { format } from "date-fns"
import { ja } from "date-fns/locale"

export const resp = (base: number | string, md: number | string, lg: number | string) => {
  return { base: base, md: md, lg: lg }
}

export const formatDate = (dt: Date) => {
  const y = dt.getFullYear()
  const m = ("00" + (dt.getMonth() + 1)).slice(-2)
  const d = ("00" + dt.getDate()).slice(-2)
  return `${y}-${m}-${d}`
}

export const formatDateForDisplay = (str: string) => {
  if (str) return format(new Date(str), "yyyy/MM/dd (E)", { locale: ja })
}

export const formatDateForMinimumDisplay = (str: string) => {
  if (str) return format(new Date(str), "MM/dd", { locale: ja })
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

export const isBlank = (str: string) => new RegExp(/^[                　ㅤ\r\n\t]*$/).test(str)

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