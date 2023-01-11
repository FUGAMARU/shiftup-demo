// Next.js
import { NextPage } from "next"
import Router from "next/router"
import { useRouter } from "next/router"

// Custom Components
import Header from "components/header/Header"

// Global State Management
import { useRecoilValue } from "recoil"
import { sessionState } from "atoms/SessionStateAtom"
import { isManager } from "atoms/RoleAtom"

export const withSession = (Page: NextPage<any>) => {
  return (props: any) => {
    const router = useRouter()
    const isManagementPage = router.pathname.indexOf("/management/") !== -1

    const isInSession = useRecoilValue(sessionState)
    const amIManager = useRecoilValue(isManager)

    if (isInSession === null || amIManager === null) return <Header />

    if (isInSession === false) Router.push("/error/authentication-error")

    if ((!isManagementPage) || (isManagementPage && amIManager)) {
      return <Page {...props} />
    } else {
      Router.push("/error/not-permitted")
    }
  }
}