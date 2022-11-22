import { atom } from "recoil"

export const isManager = atom<null | boolean>({
  key: "isManager",
  default: null
})