// Types
import { Department } from "../types/Department"
import { Position } from "../types/Position"

export interface Candidate {
  id: string,
  name: string,
  schoolProfile: {
    email: string,
    department: Department,
  },
  position: Position,
  attendanceRequested: boolean
}