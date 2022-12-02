export interface Survey {
  id: string,
  name: string,
  openCampusSchedule: string[],
  creationDate: string,
  available: boolean,
  answerCount: number
}