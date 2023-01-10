// Interfaces
import { Candidate } from "./Candidate"

export interface SurveyResult {
  tallied: boolean,
  openCampuses: {
    date: string,
    tallied: boolean,
    availableCasts: Candidate[]
  }[]
}