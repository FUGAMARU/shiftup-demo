import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      res.status(200).json([
        {
          "id": "026223cf-481d-4e1b-924f-5bf1f201d57c",
          "name": "テスト日程",
          "openCampusSchedule": [
            "2023-01-09",
            "2023-01-10",
            "2023-01-11"
          ],
          "creationDate": "2022-12-28"
        },
        {
          "id": "77cabd67-1c6d-4673-b25a-157d199ba2f8",
          "name": "1月シフト募集",
          "openCampusSchedule": [
            "2023-01-22",
            "2023-01-29"
          ],
          "creationDate": "2023-01-10"
        }
      ])
      break
  }
}
