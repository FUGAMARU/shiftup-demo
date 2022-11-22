// Next.js
import { NextPage } from "next"

// Custom Components
import Error from "../../components/Error"

const InvalidUser: NextPage = () => {
  return <Error title="認可エラー" message="サービスの利用が許可されていないアカウントです" />
}

export default InvalidUser