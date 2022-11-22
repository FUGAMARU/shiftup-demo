// Next.js
import { NextPage } from "next"
import Router from "next/router"

// Custom Components
import Header from "../components/header/Header"

// Libraries
import useSWR from "swr"
import useSWRImmutable from "swr/immutable"
const fetcher = (url: string) => fetch(url).then((res) => res.json())
const statusCodeFetcher = (url: string) => fetch(url).then((res) => res.status)

export const withSession = (Page: NextPage<any>, isManagementPage: boolean) => {
  return (props: any) => {
    const { data: statusCode, error } = useSWR(process.env.NEXT_PUBLIC_SESSION_AVAILABLE_CHECK_URL, statusCodeFetcher)
    const { data: role } = useSWRImmutable(process.env.NEXT_PUBLIC_CHECK_ROLE_URL, fetcher)

    if (error) Router.push("/error/authentication-error")
    if (statusCode === undefined) return <Header />
    if (statusCode !== 200) Router.push("/error/authentication-error")

    if ((!isManagementPage) || (statusCode === 200 && isManagementPage && role && role.includes("Manager"))) {
      return <Page {...props} />
    } else {
      Router.push("/error/not-permitted")
    }
  }
}