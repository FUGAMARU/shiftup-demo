import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      res.status(200).json({
        "tallied": false,
        "openCampuses": [
          {
            "date": "2023-01-22",
            "tallied": false,
            "availableCasts": [
            ]
          },
          {
            "date": "2023-01-29",
            "tallied": false,
            "availableCasts": [
              {
                "id": "100272172001688966097",
                "name": "清水風雅",
                "schoolProfile": {
                  "email": "g021c1248@g.neec.ac.jp",
                  "department": "C2"
                },
                "position": "Manager",
                "attendanceRequested": false
              }
            ]
          }
        ]
      })
    case "DELETE":
      res.status(204).send("")
      break
    case "PUT":
      res.status(204).send("")
      break
  }
}
