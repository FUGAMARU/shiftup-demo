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