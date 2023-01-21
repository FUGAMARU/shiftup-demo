// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// Chakra UI Components
import { Box, Button, Flex, Text } from "@chakra-ui/react"

// Custom Components
import Header from "components/header/Header"
import MyPage from "components/toppage-view/MyPage"
import Login from "components/toppage-view/Login"

// Global State Management
import { useRecoilState, useSetRecoilState } from "recoil"
import { sessionState } from "atoms/SessionStateAtom"
import { isManager } from "atoms/RoleAtom"

const Home: NextPage = () => {
  const [isInSession, setInSession] = useRecoilState(sessionState)
  const setIamManager = useSetRecoilState(isManager)

  return (
    <Box>
      <Head>
        <title>ShiftUP!</title>
      </Head>
      <Header />

      {isInSession === null ? null : isInSession === true ? <MyPage /> : <Login />}

      {process.env.NODE_ENV !== "production" ?
        <Box w="7rem" mt={5} py={2} position="fixed" right={0} bottom={10} bg="#dbebff" borderTopLeftRadius={15} borderBottomLeftRadius={15}>
          <Text className="ksb" textAlign="center">Recoil管理</Text>
          <Text my={1} textAlign="center" fontSize="0.7rem">セッション</Text>
          <Flex justifyContent="space-around" alignItems="center">
            <Button size="xs" colorScheme="whatsapp" onClick={() => setInSession(true)}>登録</Button>
            <Button size="xs" colorScheme="red" onClick={() => setInSession(false)}>解除</Button>
          </Flex>
          <Text my={1} textAlign="center" fontSize="0.7rem">運営チーム</Text>
          <Flex justifyContent="space-around" alignItems="center">
            <Button size="xs" colorScheme="whatsapp" onClick={() => setIamManager(true)}>登録</Button>
            <Button size="xs" colorScheme="red" onClick={() => setIamManager(false)}>解除</Button>
          </Flex>
        </Box>
        : null}
    </Box>
  )
}

export default Home