// Next.js
import { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { useState, useCallback, useMemo } from "react"

// Custom Hooks
import { useResponsive } from "hooks/useResponsive"
import { useStyledToast } from "hooks/useStyledToast"
import { useApiConnection } from "hooks/useApiConnection"

// Chakra UI Components
import { Box, Flex, Text, VStack, StackDivider, Button, Tooltip, Input, useDisclosure } from "@chakra-ui/react"

// Custom Components
import Body from "components/view/Body"
import ButtonModal from "components/modal/ButtonModal"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

// Functions
import { resp } from "ts/functions"

// Types
import { Position } from "types/Position"

// Classes
import Symbol from "classes/Symbol"

// Global State Management
import { useRecoilValue } from "recoil"
import { name } from "atoms/NameAtom"

// Filter
import { withSession } from "hoc/withSession"

const ManageUsers: NextPage = () => {
  const responsiveType = useResponsive() // SmartPhone, Tablet, PC
  const { showToast } = useStyledToast()
  const [usernameInput, setUsernameInput] = useState("")
  const [clickedUserId, setClickedUserId] = useState("")
  const { isOpen: isModalOpened, onOpen: openModal, onClose: closeModal } = useDisclosure()
  const { getAllUsers, switchUserPosition, deleteUser } = useApiConnection()
  const myName = useRecoilValue(name)

  const { data: users, fetchErrorMessage, mutate } = getAllUsers()
  if (fetchErrorMessage) showToast("エラー", fetchErrorMessage, "error")

  const filteredUsers = useMemo(() => usernameInput ? users?.filter(user => user.name?.match(new RegExp(usernameInput))) : users, [users, usernameInput])

  const statusMessage = useMemo(() => {
    if (!!!users) return ""
    if (!!!usernameInput) return `${users.length}名のユーザーが存在します`

    const matches = filteredUsers?.length
    if (!!!matches) return `'${usernameInput}'にマッチするユーザーは存在しません`
    return `'${usernameInput}'にマッチするユーザーが${matches}名存在します`
  }, [users, usernameInput, filteredUsers])

  const handleSwitchUserPosition = useCallback(async (userId: string, to: Position) => {
    try {
      await switchUserPosition(userId, to)
      mutate()
      showToast("成功", `ユーザーの役職を${to === "Manager" ? "運営チーム" : "キャスト"}に切り替えました`, "success")
    } catch (e) {
      if (e instanceof Error) showToast("エラー", e.message, "error")
    }
  }, [mutate, showToast, switchUserPosition])

  const handleDeleteUser = useCallback(async (userId: string) => {
    try {
      await deleteUser(userId)
      mutate()
      showToast("成功", "ユーザーを削除しました", "success")
    } catch (e) {
      if (e instanceof Error) showToast("エラー", e.message, "error")
    }
  }, [mutate, showToast, deleteUser])

  return (
    <Box>
      <Head>
        <title>ユーザー管理 | ShiftUP!</title>
      </Head>

      <Body title="ユーザー管理" statusMessage={statusMessage}>
        <Box w={resp("100%", "80%", "80%")} mx="auto">
          {users?.length ?
            <Box textAlign="center" mb={8}>
              <Input w={resp("80%", "60%", "60%")} variant="flushed" placeholder="名前を入力してユーザーを検索…" textAlign="center" focusBorderColor="#48c3eb" onChange={e => setUsernameInput(e.target.value)} />
            </Box>
            : null}

          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={3}
            align="stretch"
          >
            {filteredUsers?.map(user => {
              return (
                <Flex key={user.id} justifyContent="space-between" alignItems="center">
                  <Flex alignItems="center" px={3}>
                    {user.name ?
                      <Text className="kb" mr={2} fontSize={resp("1rem", "1.2rem", "1.2rem")}>{user.name}</Text> :
                      <Tooltip label="このユーザーは未ログインのため名前を取得できませんでした">
                        <Text className="kb" mr={2} fontSize={resp("1rem", "1.2rem", "1.2rem")} cursor="default">{"認可済みユーザー"}</Text>
                      </Tooltip>
                    }
                    <Text className="kr" ml={2} mr={1} fontSize={resp("0.65rem", "0.70rem", "0.75rem")} color="#5f5f5f">{Symbol.toStringSymbol(user.department)}</Text>
                    {responsiveType === "PC" || responsiveType === "Tablet" ? <Text className="kr" ml={1} fontSize="0.75rem" color="#5f5f5f">{user.studentNumber}</Text> : null}
                  </Flex>
                  {user.name !== myName ?
                    <Flex alignItems="center">
                      <Tooltip label={user.position === "Manager" ? "キャストに役職を切り替える" : "運営チームに役職を切り替える"}>
                        <Button mr={resp(3, 5, 5)} size="xs" colorScheme={user.position === "Manager" ? "orange" : "cyan"} variant="outline" onClick={() => handleSwitchUserPosition(user.id, user.position === "Manager" ? "Cast" : "Manager")}>{user.position === "Manager" ? "運営チーム" : "キャスト"}</Button>
                      </Tooltip>
                      <Tooltip label="ユーザーを削除する">
                        <FontAwesomeIcon icon={faXmark} fontSize="1.5rem" color={user.position === "Manager" ? "#c15520" : "#00a4c4"} cursor="pointer" onClick={() => { openModal(); setClickedUserId(user.id) }} />
                      </Tooltip>
                    </Flex>
                    : null}
                </Flex>
              )
            })}
          </VStack>
        </Box>
      </Body>

      <ButtonModal isOpen={isModalOpened} onClose={closeModal} title="確認" text="本当にユーザーを削除してもよろしいですか？">
        <Button mr={1} colorScheme="red" onClick={() => { handleDeleteUser(clickedUserId); closeModal() }}>削除する</Button>
        <Button ml={1} colorScheme="gray" variant="outline" onClick={closeModal}>削除しない</Button>
      </ButtonModal>
    </Box>
  )
}

export default withSession(ManageUsers)