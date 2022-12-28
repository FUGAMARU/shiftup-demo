// Types
import { Position } from "../types/Position"
import { Department } from "../types/Department"

export interface User {
  id: string,
  studentNumber: string,
  name: string | null,
  department: Department,
  position: Position
}