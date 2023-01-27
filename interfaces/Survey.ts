// Interfaces
import { AvailableCast } from "interfaces/User"

export interface Survey {
  id: string,
  name: string,
  openCampusSchedule: string[],
  creationDate: string,
  available: boolean,
  canDelete: boolean,
  answerCount: number
}

export interface AvailableSurvey {
  id: string,
  name: string,
  openCampusSchedule: string[],
  creationDate: string
}

export interface SurveyResult {
  tallied: boolean,
  openCampuses: {
    date: string,
    tallied: boolean,
    availableCasts: AvailableCast[]
  }[]
}