// Next.js
import { NextPage } from "next"
import Router from "next/router"

// Custom Components
import Header from "../components/header/Header"

// Global State Management
import { useRecoilValue } from "recoil"
import { sessionState } from "../atoms/SessionStateAtom"
import { isManager } from "../atoms/RoleAtom"

export const withSession = (Page: NextPage<any>, isManagementPage: boolean) => {
  return (props: any) => {
    const isInSession = useRecoilValue(sessionState)
    const isIamManager = useRecoilValue(isManager)

    if (isInSession === null || isIamManager === null) return <Header />

    if (isInSession === false) Router.push("/error/authentication-error")

    if ((!isManagementPage) || (isManagementPage && isIamManager)) {
      return <Page {...props} />
    } else {
      Router.push("/error/not-permitted")
    }
  }
}