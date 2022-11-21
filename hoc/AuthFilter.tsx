// Next.js
import { NextPage } from "next"
import Router from "next/router"

// Custom Components
import Header from "../components/header/Header"

// Libraries
import useSWR from "swr"
const fetcher = (url: string) => fetch(url).then((res) => res.status)

export const AuthFilter = (Page: NextPage) => {
  return () => {
    const { data: statusCode, error } = useSWR(process.env.NEXT_PUBLIC_SESSION_AVAILABLE_CHECK_URL, fetcher)

    if (error) Router.push("/error/authentication-error")
    if (statusCode === undefined) return <Header />

    if (statusCode === 200) {
      return <Page />
    } else {
      Router.push("/error/authentication-error")
    }
  }
}