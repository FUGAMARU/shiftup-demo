import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({
    "unansweredAttendanceSurveyCount": 1,
    "canRespondAttendanceRequestCount": 1,
    "nextWorkDay": "2023-05-04",
    "currentMonthWorkedDayCount": 3,
    "currentMonthWorkScheduleDayCount": 2
  })
}
