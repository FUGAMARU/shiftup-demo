export interface Survey {
  id: string,
  name: string,
  openCampusSchedule: string[],
  creationDate: string,
  available: boolean,
  canDelete: boolean,
  answerCount: number
}