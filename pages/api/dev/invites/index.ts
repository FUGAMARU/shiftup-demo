import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      res.status(200).json([
        {
          "id": "G020C0000",
          "userId": "111311839178632200381",
          "name": "可児江西也",
          "studentNumber": "G020C0000",
          "email": "g021c0000@g.neec.ac.jp",
          "department": "C2",
          "position": "Manager"
        },
        {
          "id": "G020C0001",
          "userId": "111311839178632200382",
          "name": "乙坂有宇",
          "studentNumber": "G020C0001",
          "email": "g021c0001@g.neec.ac.jp",
          "department": "X4",
          "position": "Manager"
        },
        {
          "id": "G020C0002",
          "userId": "111311839178632200383",
          "name": "佐藤光留",
          "studentNumber": "G020C0002",
          "email": "g021c0002@g.neec.ac.jp",
          "department": "G2",
          "position": "Cast"
        },
        {
          "id": "G020C0003",
          "userId": null,
          "name": null,
          "studentNumber": "G020C0003",
          "email": null,
          "department": "DC",
          "position": "Manager"
        },
        {
          "id": "G020C0004",
          "userId": null,
          "name": null,
          "studentNumber": "G020C0004",
          "email": null,
          "department": "MS",
          "position": "Cast"
        },
        {
          "id": "G020C0005",
          "userId": null,
          "name": null,
          "studentNumber": "G020C0005",
          "email": null,
          "department": "LA",
          "position": "Cast"
        },
      ])
      break
    case "POST":
      res.status(201).send("")
      break
  }
}
