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
                  "id": "111311839178632200390",
                  "name": "ホゲ山ホゲ太郎1",
                  "studentNumber": "G021C0000",
                  "email": "g021c0000@g.neec.ac.jp",
                  "department": "C2",
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
                  "id": "111311839178632200391",
                  "name": "ホゲ山ホゲ太郎2",
                  "studentNumber": "G021C0001",
                  "email": "g021c0001@g.neec.ac.jp",
                  "department": "C2",
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
                  "id": "111311839178632200392",
                  "name": "ホゲ山ホゲ太郎3",
                  "studentNumber": "G021C0002",
                  "email": "g021c0002@g.neec.ac.jp",
                  "department": "C2",
                  "position": "Manager",
                  "attendanceRequested": false
                },
                {
                  "id": "111311839178632200393",
                  "name": "ホゲ山ホゲ太郎4",
                  "studentNumber": "G021C0003",
                  "email": "g021c0003@g.neec.ac.jp",
                  "department": "C2",
                  "position": "Manager",
                  "attendanceRequested": true
                },
                {
                  "id": "111311839178632200394",
                  "name": "ホゲ山ホゲ太郎5",
                  "studentNumber": "G021C0004",
                  "email": "g021c0004@g.neec.ac.jp",
                  "department": "C2",
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
