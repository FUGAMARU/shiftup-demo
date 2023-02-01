import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      res.status(200).json({
        name: "可児江西也",
        department: "C2",
        position: "Manager"
      })
      break
  }
}
