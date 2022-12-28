// Next.js
import { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { useState, useCallback } from "react"

// Custom Hooks
import { useResponsive } from "../../hooks/useResponsive"
import { useStyledToast } from "../../hooks/useStyledToast"

// Chakra UI Components
import { Box, Flex, Text, VStack, StackDivider, Button, Tooltip, Input, useDisclosure } from "@chakra-ui/react"

// Custom Components
import Body from "../../components/Body"
import ConfirmationModal from "../../components/ConfirmationModal"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import useSWR from "swr"
const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Functions
import { resp } from "../../functions"

// Interfaces
import { User } from "../../interfaces/User"

// Filter
import { withSession } from "../../hoc/withSession"

const ManageUsers: NextPage = () => {
  const responsiveType = useResponsive() // SmartPhone, Tablet, PC
  const { showToast } = useStyledToast()
  const [clickedUserId, setClickedUserId] = useState("")
  const { isOpen: isModalOpened, onOpen: openModal, onClose: closeModal } = useDisclosure()
  const { data: users, error: fetchError, mutate } = useSWR<User[], Error>(process.env.NEXT_PUBLIC_INVITES_URL, fetcher, { fallback: [] })

  if (fetchError) showToast("エラー", "ユーザーの一覧の取得に失敗しました", "error")

  const deleteUser = useCallback(async (userId: string) => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_SURVEYS_URL}/${userId}`)

      if (res.status === 204) {
        mutate()
        showToast("成功", "ユーザーを削除しました", "success")
      }
    } catch (e) {
      showToast("エラー", "ユーザーを削除できませんでした", "error")
    }
  }, [])

  return (
    <Box>
      <Head>
        <title>ユーザー管理 | ShiftUP!</title>
      </Head>

      <Body title="ユーザー管理" statusMessage={users ? `${users.length}名のユーザーが登録されています` : ""}>
        <Box w={resp("100%", "80%", "80%")} mx="auto">
          <Box textAlign="center" mb={8}>
            <Input w={resp("80%", "60%", "60%")} variant="flushed" placeholder="名前を入力してユーザーを検索…" textAlign="center" focusBorderColor="#48c3eb" />
          </Box>

          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={3}
            align="stretch"
          >
            {users?.map(user => {
              return (
                <Flex key={user.id} justifyContent="space-between" alignItems="center">
                  <Flex alignItems="center" px={3}>
                    {user.name ?
                      <Text className="kb" mr={2} fontSize={resp("1rem", "1.2rem", "1.2rem")}>{user.name}</Text> :
                      <Tooltip label="このユーザーは未ログインのため名前を取得できませんでした">
                        <Text className="kb" mr={2} fontSize={resp("1rem", "1.2rem", "1.2rem")}>{"認可済みユーザー"}</Text>
                      </Tooltip>
                    }
                    <Text className="kr" ml={2} mr={1} fontSize={resp("0.65rem", "0.70rem", "0.75rem")} color="#5f5f5f">{user.department}</Text>
                    {responsiveType === "PC" || responsiveType === "Tablet" ? <Text className="kr" ml={1} fontSize="0.75rem" color="#5f5f5f">{user.studentNumber}</Text> : null}
                  </Flex>
                  <Flex alignItems="center">
                    <Tooltip label={user.position === "Manager" ? "キャストに役職を切り替える" : "運営メンバーに役職を切り替える"}>
                      <Button mr={resp(3, 5, 5)} size="xs" colorScheme={user.position === "Manager" ? "orange" : "cyan"} variant="outline">{user.position === "Manager" ? "運営メンバー" : "キャスト"}</Button>
                    </Tooltip>
                    <Tooltip label="ユーザーを削除する">
                      <FontAwesomeIcon icon={faXmark} fontSize="1.5rem" color={user.position === "Manager" ? "#c15520" : "#00a4c4"} cursor="pointer" onClick={() => { openModal(); setClickedUserId(user.id) }} />
                    </Tooltip>
                  </Flex>
                </Flex>
              )
            })}
          </VStack>
        </Box>
      </Body>

      <ConfirmationModal isOpen={isModalOpened} onClose={closeModal} text="本当にユーザーを削除してもよろしいですか？">
        <Button mr={1} colorScheme="red" onClick={() => { deleteUser(clickedUserId); closeModal() }}>削除する</Button>
        <Button ml={1} colorScheme="gray" variant="outline" onClick={closeModal}>削除しない</Button>
      </ConfirmationModal>
    </Box>
  )
}

export default withSession(ManageUsers)