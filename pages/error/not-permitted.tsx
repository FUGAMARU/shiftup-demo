// Next.js
import { NextPage } from "next"

// Custom Components
import Error from "../../components/Error"

const NotPermitted: NextPage = () => {
  return <Error title="権限エラー" message="ページにアクセスする権限がありません" />
}

export default NotPermitted