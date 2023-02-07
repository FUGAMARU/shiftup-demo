// Types
import { Position } from "types/Position"
import { Department } from "types/Department"

interface Base {
  id: string, //UUIDが入る場合もあるし学籍番号が入る場合もある
  name: string | null,
  studentNumber: string,
  email: string | null,
  department: Department,
  position: Position,
}

export interface User extends Base {
  name: string,
  email: string,
}

export interface AvailableCast extends User {
  attendanceRequested: boolean
}

export interface Invite extends Base {
  userId: string | null
}