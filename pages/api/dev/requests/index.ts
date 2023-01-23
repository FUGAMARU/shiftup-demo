import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      res.status(200).json({
        "canRespondRequests": [
          {
            "openCampusDate": "2022-12-11",
            "surveyName": "12月シフト募集"
          },
          {
            "openCampusDate": "2022-12-31",
            "surveyName": "12月シフト募集"
          }
        ],
        "respondedRequests": [
          {
            "openCampusDate": "2022-12-03",
            "state": "Accepted",
            "surveyName": "大学オープンキャンパス"
          },
          {
            "openCampusDate": "2022-12-05",
            "state": "Declined",
            "surveyName": "大学オープンキャンパス"
          }
        ]
      })
      break
    case "POST":
      res.status(200).send("")
      break
  }
}
