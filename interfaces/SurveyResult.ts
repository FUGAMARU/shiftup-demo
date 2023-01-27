// Interfaces
import { AvailableCast } from "interfaces/User"

export interface SurveyResult {
  tallied: boolean,
  openCampuses: {
    date: string,
    tallied: boolean,
    availableCasts: AvailableCast[]
  }[]
}