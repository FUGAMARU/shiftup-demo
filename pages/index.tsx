// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// Chakra UI Components
import { Box, Button, Flex, Text } from "@chakra-ui/react"

// Custom Components
import Header from "../components/header/Header"
import MyPage from "../components/toppage-view/MyPage"
import Login from "../components/toppage-view/Login"

// Global State Management
import { useRecoilState } from "recoil"
import { sessionState } from "../atoms/SessionStateAtom"

const Home: NextPage = () => {
  const [isInSession, setInSession] = useRecoilState(sessionState)

  return (
    <>
      <Head>
        <title>ShiftUP!</title>
      </Head>
      <Header />

      {isInSession === null ? null : isInSession === true ? <MyPage /> : <Login />}

      <Box w="7rem" mt={5} py={2} position="fixed" right={0} bottom={10} bg="#dbebff" borderTopLeftRadius={15} borderBottomLeftRadius={15}>
        <Text className="ksb" textAlign="center">Recoil管理</Text>
        <Flex mt={2} justifyContent="space-around" alignItems="center">
          <Button size="xs" colorScheme="whatsapp" onClick={() => setInSession(true)}>登録</Button>
          <Button size="xs" colorScheme="red" onClick={() => setInSession(false)}>解除</Button>
        </Flex>
      </Box>
    </>
  )
}

export default Home