import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PUT":
      res.status(204).send("")
      break
    case "DELETE":
      res.status(204).send("")
      break
  }
}
