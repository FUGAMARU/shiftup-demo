// Types
import { RequestState } from "types/RequestState"

export interface AttendanceRequest {
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