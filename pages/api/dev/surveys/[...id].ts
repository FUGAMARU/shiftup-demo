import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      if (req.url?.match(/77cabd67-1c6d-4673-b25a-157d199ba2f8/)) {
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
                  "name": "山田一郎1",
                  "schoolProfile": {
                    "email": "g021c0000@g.neec.ac.jp",
                    "department": "C2"
                  },
                  "position": "Manager",
                  "attendanceRequested": false
                }
              ]
            }
          ]
        })
      }

      if (req.url?.match(/83e29142-a14d-45bf-9668-bfa62e8a313c/)) {
        res.status(200).json({
          "tallied": false,
          "openCampuses": [
            {
              "date": "2023-01-25",
              "tallied": false,
              "availableCasts": [
                {
                  "id": "100272172001688966097",
                  "name": "山田一郎2",
                  "schoolProfile": {
                    "email": "g021c0000@g.neec.ac.jp",
                    "department": "C2"
                  },
                  "position": "Manager",
                  "attendanceRequested": false
                }
              ]
            },
            {
              "date": "2023-01-26",
              "tallied": false,
              "availableCasts": [
                {
                  "id": "100272172001688966097",
                  "name": "山田一郎3",
                  "schoolProfile": {
                    "email": "g021c0000@g.neec.ac.jp",
                    "department": "C2"
                  },
                  "position": "Manager",
                  "attendanceRequested": false
                },
                {
                  "id": "100272172001688966097",
                  "name": "山田一郎4",
                  "schoolProfile": {
                    "email": "g021c0000@g.neec.ac.jp",
                    "department": "C2"
                  },
                  "position": "Manager",
                  "attendanceRequested": false
                },
                {
                  "id": "100272172001688966097",
                  "name": "山田一郎5",
                  "schoolProfile": {
                    "email": "g021c0000@g.neec.ac.jp",
                    "department": "C2"
                  },
                  "position": "Manager",
                  "attendanceRequested": false
                }
              ]
            },
            {
              "date": "2023-01-27",
              "tallied": false,
              "availableCasts": [
              ]
            }
          ]
        })
      }
    case "DELETE":
      res.status(204).send("")
      break
    case "PUT":
      res.status(204).send("")
      break
  }
}
