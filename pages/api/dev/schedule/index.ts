import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      res.status(200).json([
        "2023-03-01",
        "2023-03-02",
      ]);
      break;
    case "PUT":
      res.status(204).send("");
      break;
  }
}

