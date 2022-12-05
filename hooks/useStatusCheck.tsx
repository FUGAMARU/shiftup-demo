// Next.js
import Router from "next/router"

// React Hooks
import { useEffect } from "react"

// Libraries
import useSWR from "swr"
import useSWRImmutable from "swr/immutable"
const fetcher = (url: string) => fetch(url).then((res) => res.json())
const statusCodeFetcher = (url: string) => fetch(url).then((res) => res.status)

// Global State Management
import { useSetRecoilState } from "recoil"
import { sessionState } from "../atoms/SessionStateAtom"
import { isManager } from "../atoms/RoleAtom"

export const useStatusCheck = () => {
  const { data: statusCode, error: sessionCheckError } = useSWR(process.env.NEXT_PUBLIC_CHECK_SESSION_AVAILABLE_URL, statusCodeFetcher)
  const { data: role, error: roleCheckError } = useSWRImmutable(process.env.NEXT_PUBLIC_CHECK_ROLE_URL, fetcher)

  const setSessionState = useSetRecoilState(sessionState)
  const setManager = useSetRecoilState(isManager)

  // ログイン状態チェック
  useEffect(() => {
    if (statusCode === undefined) return

    if (statusCode !== 200) {
      setSessionState(false)
      return
    }

    if (sessionCheckError) {
      Router.push("/error/authentication-error")
      return
    }

    setSessionState(true)
  }, [statusCode, sessionCheckError])

  // 役職チェック
  useEffect(() => {
    if (role === undefined) return

    if (role && !!!role.includes("Manager")) {
      setManager(false)
      return
    }

    if (roleCheckError) {
      Router.push("/error/unknown-error")
      return
    }

    setManager(true)
  }, [role, roleCheckError])
}