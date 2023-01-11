import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      res.status(200).json([
        {
          "id": "cbac13f8-2fe0-4495-b13c-dda711fe2105",
          "name": "テスト",
          "openCampusSchedule": [
            "2022-12-04",
            "2022-12-11",
            "2022-12-18",
            "2022-12-25"
          ],
          "creationDate": "2022-11-30",
          "available": true,
          "answerCount": 0
        },
        {
          "id": "37eaaef0-1494-4c34-994c-52d0f0d62d47",
          "name": "テスト2",
          "openCampusSchedule": [
            "2022-12-30",
            "2022-12-31",
            "2023-01-01",
            "2023-01-02",
            "2023-01-03"
          ],
          "creationDate": "2022-12-02",
          "available": false,
          "answerCount": 0
        },
        {
          "id": "f57c089c-b770-401e-977f-0a2c8d412e96",
          "name": "大学OC（プレ入試）スタッフ募集",
          "openCampusSchedule": [
            "2022-12-04"
          ],
          "creationDate": "2022-11-30",
          "available": true,
          "answerCount": 0
        },
        {
          "id": "77cabd67-1c6d-4673-b25a-157d199ba2f8",
          "name": "1月シフト募集",
          "openCampusSchedule": [
            "2023-01-22",
            "2023-01-29"
          ],
          "creationDate": "2023-01-10",
          "available": true,
          "answerCount": 1
        },
        {
          "id": "83e29142-a14d-45bf-9668-bfa62e8a313c",
          "name": "テスト日程2",
          "openCampusSchedule": [
            "2023-01-25",
            "2023-01-26",
            "2023-01-27"
          ],
          "creationDate": "2023-01-11",
          "available": true,
          "answerCount": 1
        }
      ])
      break

    case "POST":
      res.status(201).send("")
      break

    case "DELETE":
      res.status(204).send("")
      break

    case "PUT":
      res.status(204).send("")
  }
}
