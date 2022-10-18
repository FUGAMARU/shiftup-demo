// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { useEffect } from "react"

// Chakra UI Components
import { Box, Button, Flex, Text } from "@chakra-ui/react"

// Custom Components
import Header from "../components/header/Header"
import MyPage from "../components/toppage-view/MyPage"
import Login from "../components/toppage-view/Login"

// Libraries
import { useCookies } from "react-cookie"

const Home: NextPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user_session"])

  useEffect(() => {
    console.log(cookies.user_session)
  }, [])

  return (
    <>
      <Head>
        <title>ShiftUP!</title>
      </Head>
      <Header />

      {cookies.user_session ? <MyPage /> : <Login />}

      <Box w="7rem" mt={5} py={2} position="fixed" right={0} bottom={10} bg="#dbebff" borderTopLeftRadius={15} borderBottomLeftRadius={15}>
        <Text className="ksb" textAlign="center">Cookie管理</Text>
        <Flex mt={2} justifyContent="space-around" alignItems="center">
          <Button size="xs" colorScheme="whatsapp" onClick={() => setCookie("user_session", "DUMMY_TOKEN")}>作成</Button>
          <Button size="xs" colorScheme="red" onClick={() => removeCookie("user_session")}>削除</Button>
        </Flex>
      </Box>
    </>
  )
}

export default Home