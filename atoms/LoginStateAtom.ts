import { atom } from "recoil"

export const loginState = atom<null | boolean>({
  key: "loginState",
  default: null
})