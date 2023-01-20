// Types
import { RequestState } from "types/RequestState"

export interface Request {
  canRespondRequests: {
    openCampusDate: string,
    surveyName: string
  }[],
  respondedRequests: {
    openCampusDate: string,
    surveyName: string,
    state: RequestState
  }[]
}