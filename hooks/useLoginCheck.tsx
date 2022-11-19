// React Hooks
import { useEffect } from "react"

// Libraries
import { loginState } from "../atoms/LoginStateAtom"
import { useSetRecoilState } from "recoil"
import { parseCookies } from "nookies"

const useLoginCheck = () => {
  const setLoggedIn = useSetRecoilState(loginState)

  useEffect(() => {
    const cookies = parseCookies()

    if (cookies.logged_in && JSON.parse(cookies.logged_in.toLowerCase())) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [])
}

export default useLoginCheck