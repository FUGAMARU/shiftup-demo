// Next.js
import Router from "next/router"

// React Hooks
import { useEffect } from "react"

// Custom Hooks
import { useApiConnection } from "hooks/useApiConnection"

// Global State Management
import { useSetRecoilState } from "recoil"
import { sessionState } from "atoms/SessionStateAtom"
import { isManager } from "atoms/RoleAtom"

export const useStatusCheck = () => {
  const { getSession, getRole } = useApiConnection()

  const { statusCode, error: sessionCheckError } = getSession()
  const { data: role, error: roleCheckError } = getRole()

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