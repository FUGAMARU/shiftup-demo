import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      if (req.query["state"] === "Accepted") {
        res.status(200).json([
          {
            "id": "111311839178632200390",
            "name": "真壁政宗",
            "schoolProfile": {
              "email": "g021c0000@g.neec.ac.jp",
              "department": "C2"
            },
            "studentNumber": "G021xxxxx",
            "position": "Manager",
          },
          {
            "id": "111311839178632200391",
            "name": "藤ノ宮寧子",
            "schoolProfile": {
              "email": "g021c0000@g.neec.ac.jp",
              "department": "C2"
            },
            "studentNumber": "G021xxxxx",
            "position": "Cast",
          }
        ])
      }
      else if (req.query["state"] === "Declined") {
        res.status(200).json([
          {
            "id": "111311839178632200392",
            "name": "安達垣愛姫",
            "schoolProfile": {
              "email": "g021c0000@g.neec.ac.jp",
              "department": "C2"
            },
            "studentNumber": "G021xxxxx",
            "position": "Manager",
          }
        ])
      }
      break
    case "PUT":
      res.status(204).send("")
      break
  }
}
