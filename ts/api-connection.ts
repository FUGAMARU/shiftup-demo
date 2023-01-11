// Libraries
import axios from "axios"

export const sendRequests = async (date: string, users: string[]) => {
  try {
    await axios.put(`${process.env.NEXT_PUBLIC_REQUESTS_URL}/${date}`, users)
  } catch (e) {
    throw e
  }
}