// Next.js
import { NextPage } from "next"

// Custom Components
import Error from "../../components/Error"

const AuthenticationError: NextPage = () => {
  return <Error title="認証エラー" message="認証エラーが発生しました" />
}

export default AuthenticationError