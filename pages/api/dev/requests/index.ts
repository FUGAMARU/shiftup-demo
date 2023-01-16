import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      res.status(200).json([
        {
          "openCampusDate": "2022-12-03",
          "state": "Declined"
        },
        {
          "openCampusDate": "2022-12-04",
          "state": "Accepted"
        },
        {
          "openCampusDate": "2022-12-11",
          "state": "Blank"
        },
        {
          "openCampusDate": "2022-12-31",
          "state": "Blank"
        }
      ])
      break
    case "POST":
      res.status(200).send("")
      break
  }
}
