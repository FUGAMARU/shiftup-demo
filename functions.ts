export const resp = (base: number | string, md: number | string, lg: number | string) => {
  return { base: base, md: md, lg: lg }
}

export const formatDateToSlash = (dt: Date): string => {
  const y = dt.getFullYear()
  const m = ("00" + (dt.getMonth() + 1)).slice(-2)
  const d = ("00" + dt.getDate()).slice(-2)
  return (y + "/" + m + "/" + d)
}

export const getWeekDay = (dt: Date): string => {
  return ["日", "月", "火", "水", "木", "金", "土"][dt.getDay()]
}