import { atom } from "recoil"

export const name = atom<string>({
  key: "name",
  default: ""
})