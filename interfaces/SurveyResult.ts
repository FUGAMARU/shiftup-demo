// Interfaces
import { Candidate } from "interfaces/Candidate"

export interface SurveyResult {
  tallied: boolean,
  openCampuses: {
    date: string,
    tallied: boolean,
    availableCasts: Candidate[]
  }[]
}