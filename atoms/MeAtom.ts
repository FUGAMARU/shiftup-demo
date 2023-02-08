import { atom } from "recoil"
import { Me } from "interfaces/Me"

export const me = atom<Me>({
  key: "me",
  default: {
    name: "",
    department: "C2",
    position: "Cast"
  }
})

export const isFetchingMyInfo = atom<boolean>({
  key: "isFetchingMyInfo",
  default: true
})