export interface PersonalizedData {
  // 未回答の希望日程アンケート数
  unansweredAttendanceSurveyCount: number,
  // 未確定の出勤数
  canRespondAttendanceRequestCount: number,
  // 次の出勤日
  // 未確定の場合はnull
  nextWorkDay: string | null,
  // 今月の出勤済み日数
  currentMonthWorkedDayCount: number,
  // 今月の残りの出勤予定日数
  currentMonthWorkScheduleDayCount: number
}