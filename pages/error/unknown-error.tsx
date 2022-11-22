// Next.js
import { NextPage } from "next"

// Custom Components
import Error from "../../components/Error"

const UnknownError: NextPage = () => {
  return <Error title="不明なエラー" message="不明なエラーが発生しました" />
}

export default UnknownError