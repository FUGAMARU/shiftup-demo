import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      res.status(200).json([
        {
          "id": "G021C1248",
          "studentNumber": "G021C1248",
          "department": "C2",
          "position": "Manager"
        },
        {
          "id": "G021C1298",
          "studentNumber": "G021C1298",
          "department": "C2",
          "position": "Manager"
        },
        {
          "id": "G021C1246",
          "studentNumber": "G021C1246",
          "department": "C2",
          "position": "Cast"
        }
      ])
      break

    case "POST":
      res.status(201).send("")
      break
  }
}
