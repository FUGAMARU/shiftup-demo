// Next.js
import Router from "next/router"

// React Hooks
import { useEffect } from "react"

// Custom Hooks
import { useApiConnection } from "hooks/useApiConnection"

// Global State Management
import { useSetRecoilState } from "recoil"
import { sessionState } from "atoms/SessionStateAtom"
import { me, isFetchingMyInfo } from "atoms/MeAtom"

export const useStatusCheck = () => {
  const { getSession, getMyInfo } = useApiConnection()

  const { statusCode, error: sessionCheckError } = getSession()
  const { data: myInfo, error: fetchMyInfoError } = getMyInfo()

  const setSessionState = useSetRecoilState(sessionState)
  const setMyInfo = useSetRecoilState(me)
  const setFetchingMyInfoState = useSetRecoilState(isFetchingMyInfo)

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

  // ユーザー情報取得
  useEffect(() => {
    if (!!!myInfo) return

    setFetchingMyInfoState(false)

    if (fetchMyInfoError) {
      Router.push("/error/unknown-error")
      return
    }

    setMyInfo(myInfo)
  }, [myInfo, setMyInfo])
}