// Types
import { Department, StringDepartment } from "types/Department"
import { College } from "types/College"

export type Symbols = { [college in College]: { [department in Department]?: StringDepartment } }
export type OptionalSymbols = { [college in College]?: { [department in Department]: StringDepartment } }