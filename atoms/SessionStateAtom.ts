import { atom } from "recoil"

export const sessionState = atom<null | boolean>({
  key: "sessionState",
  default: null
})