// Next.js
import { NextPage } from "next"
import { useRouter } from "next/router"

// Custom Components
import Header from "components/header/Header"

// Global State Management
import { useRecoilValue } from "recoil"
import { sessionState } from "atoms/SessionStateAtom"
import { me } from "atoms/MeAtom"

export const withSession = (Page: NextPage<any>) => {
  return (props: any) => {
    const router = useRouter()
    const isManagementPage = router.pathname.indexOf("/management/") !== -1

    const isInSession = useRecoilValue(sessionState)
    const myInfo = useRecoilValue(me)

    if (isInSession === null || myInfo.name === "") return <Header />

    if (isInSession === false) {
      router.push("/error/authentication-error")
      return null
    }

    if (isManagementPage && myInfo.position !== "Manager") {
      router.push("/error/not-permitted")
      return null
    }

    return <Page {...props} />
  }
}