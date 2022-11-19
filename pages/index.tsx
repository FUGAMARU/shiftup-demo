// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// Chakra UI Components
import { Box, Button, Flex, Text } from "@chakra-ui/react"

// Custom Components
import Header from "../components/header/Header"
import MyPage from "../components/toppage-view/MyPage"
import Login from "../components/toppage-view/Login"

// Libraries
import { setCookie, destroyCookie } from "nookies"
import { loginState } from "../atoms/LoginStateAtom"
import { useRecoilValue } from "recoil"

const Home: NextPage = () => {
  const isLoggedIn = useRecoilValue(loginState)

  const setDummyCookie = () => {
    //setCookie(null, "user_session", "DUMMY_TOKEN")
    setCookie(null, "logged_in", "true")
    window.location.reload()
  }

  const deleteDummyCookie = () => {
    destroyCookie(null, "logged_in")
    window.location.reload()
  }

  return (
    <>
      <Head>
        <title>ShiftUP!</title>
      </Head>
      <Header />

      {isLoggedIn === null ? null : isLoggedIn === true ? <MyPage /> : <Login />}

      <Box w="7rem" mt={5} py={2} position="fixed" right={0} bottom={10} bg="#dbebff" borderTopLeftRadius={15} borderBottomLeftRadius={15}>
        <Text className="ksb" textAlign="center">Cookie管理</Text>
        <Flex mt={2} justifyContent="space-around" alignItems="center">
          <Button size="xs" colorScheme="whatsapp" onClick={setDummyCookie}>作成</Button>
          <Button size="xs" colorScheme="red" onClick={deleteDummyCookie}>削除</Button>
        </Flex>
      </Box>
    </>
  )
}

export default Home