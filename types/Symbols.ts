// Types
import { Department, StringDepartment } from "./Department"
import { College } from "./College"

export type Symbols = { [college in College]?: { [department in Department]: StringDepartment } }
export type ConstantSymbols = { [college in College]: { [department in Department]: StringDepartment } }