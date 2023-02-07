import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      res.status(200).json({
        id: "2023-03-02",
        openCampusDate: "2023-03-02",
        castSchedules: [
          {
            castName: "Last Name First Name",
            tasks: [
              {
                name: "Task 1",
                startTime: "07:00",
                endTime: "08:00"
              },
              {
                name: "Task 2",
                startTime: "08:00",
                endTime: "19:00"
              }
            ]
          },
          {
            castName: "Last Name First Name 2",
            tasks: [
              {
                name: "Task 1",
                startTime: "07:00",
                endTime: "08:00"
              }
            ]
          }
        ]
        
      })

      
      break
    case "DELETE":
      res.status(204).send("")
      break
  }
}
