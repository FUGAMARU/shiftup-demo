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
          "id": "f57c089c-b770-401e-977f-0a2c8d412e96",
          "name": "大学OC（プレ入試）スタッフ募集",
          "openCampusSchedule": [
            "2022-12-04"
          ],
          "creationDate": "2022-11-30",
          "available": true,
          "answerCount": 0
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
