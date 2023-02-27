// React Hooks
import { useRef, useCallback, useEffect } from "react"

// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// Chakra UI Components
import { Box, Button, Flex, Input, Text, useDisclosure } from "@chakra-ui/react"

// Custom Components
import Header from "components/header/Header"
import MyPage from "components/view/MyPage"
import Login from "components/view/Login"
import ButtonModal from "components/modal/ButtonModal"

// Global State Management
import { useRecoilState } from "recoil"
import { sessionState } from "atoms/SessionStateAtom"
import { me } from "atoms/MeAtom"

// Types
import { Department } from "types/Department"
import { Position } from "types/Position"

const Home: NextPage = () => {
  const { isOpen: isModalOpened, onOpen: openModal, onClose: closeModal } = useDisclosure()
  useEffect(() => {
    if (sessionStorage.getItem("isShownAlert") === null) {
      openModal()
      sessionStorage.setItem("isShownAlert", "")
    }
  }, [openModal])

  const [isInSession, setInSession] = useRecoilState(sessionState)
  const [myInfo, setMyInfo] = useRecoilState(me)

  const nameRef = useRef<HTMLInputElement>(null)
  const deptRef = useRef<HTMLInputElement>(null)
  const positionRef = useRef<HTMLInputElement>(null)

  const handleSetButtonClick = useCallback(() => {
    const c1 = nameRef.current
    const c2 = deptRef.current
    const c3 = positionRef.current
    if (!!!(c1 || c2 || c3)) return

    setMyInfo({
      name: c1!.value,
      department: c2!.value as Department,
      position: c3!.value as Position
    })
  }, [setMyInfo])

  useEffect(() => {
    const c1 = nameRef.current
    const c2 = deptRef.current
    const c3 = positionRef.current
    if (!!!(c1 || c2 || c3) || !!!myInfo) return

    c1!.value = myInfo.name
    c2!.value = myInfo.department
    c3!.value = myInfo.position
  }, [myInfo])

  return (
    <Box>
      <Head>
        <title>ShiftUP!</title>
      </Head>
      <Header />

      {isInSession === null ? null : isInSession === true ? <MyPage /> : <Login />}

      <Box w="7rem" py={3} position="fixed" right={0} bottom={10} bg="#dbebff" borderTopLeftRadius={15} borderBottomLeftRadius={15}>
        <Text className="ksb" textAlign="center">状態管理</Text>
        <Text className="kr" fontSize="0.6rem" textAlign="center">( 開発・デモ用 )</Text>

        <Box mx={3} my={2} borderBottom="solid 0.1px #b5b5b5"></Box>

        <Text my={1} textAlign="center" fontSize="0.7rem">セッション</Text>
        <Flex justifyContent="space-around" alignItems="center">
          <Button size="xs" colorScheme="whatsapp" onClick={() => setInSession(true)}>登録</Button>
          <Button size="xs" colorScheme="red" onClick={() => setInSession(false)}>解除</Button>
        </Flex>

        <Flex p={2} direction="column" justifyContent="space-around" alignItems="center">
          <Text py={1} textAlign="center" fontSize="0.7rem">名前</Text>
          <Input size="xs" bg="white" borderRadius={7} textAlign="center" ref={nameRef}></Input>
          <Text py={1} textAlign="center" fontSize="0.7rem">学科記号</Text>
          <Input size="xs" bg="white" borderRadius={7} textAlign="center" ref={deptRef}></Input>
          <Text py={1} textAlign="center" fontSize="0.7rem">役職</Text>
          <Input size="xs" bg="white" borderRadius={7} textAlign="center" ref={positionRef} placeholder="Manager | Cast"></Input>
        </Flex>

        <Flex px={2} justify="center">
          <Button size="xs" colorScheme="linkedin" onClick={handleSetButtonClick}>SET</Button>
        </Flex>
      </Box>

      <ButtonModal isOpen={isModalOpened} onClose={closeModal} title="このサイトについて" text={"現在ご覧になっているのはデモ版のShiftUP!です。このデモ版はバックエンドとの接続が切り離されているため、データーの保存などは行えません。操作感などをお試しいただく目的でお使いいただけます。"}>
        <Button ml={1} colorScheme="gray" variant="outline" onClick={closeModal}>OK</Button>
      </ButtonModal>
    </Box>
  )
}

export default Home