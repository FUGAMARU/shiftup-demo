// Next.js
import { NextPage } from "next"
import Head from "next/head"

// Custom Hooks
import useResponsive from "../../hooks/useResponsive"

// Chakra UI Components
import { Box, Flex, Text, VStack, StackDivider, Button, Tooltip, Input } from "@chakra-ui/react"

// Custom Components
import Body from "../../components/Body"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

// Functions
import { resp } from "../../functions"

// Filter
import { withSession } from "../../hoc/withSession"

const ManageUsers: NextPage = () => {
  const responsiveType = useResponsive() // SmartPhone, Tablet, PC

  return (
    <>
      <Head>
        <title>ユーザー管理 | ShiftUP!</title>
      </Head>

      <Body title="ユーザー管理" statusMessage="3名のユーザーが登録されています" content={<>
        <Box w={resp("100%", "80%", "80%")} mx="auto">
          <Box textAlign="center" mb={8}>
            <Input w={resp("80%", "60%", "60%")} variant="flushed" placeholder="名前を入力してユーザーを検索…" textAlign="center" focusBorderColor="#48c3eb" />
          </Box>

          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={3}
            align="stretch"
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center" px={3}>
                <Box className="kb" mr={2} fontSize={resp("1rem", "1.2rem", "1.2rem")}>宮森あおい</Box>
                <Text className="kr" ml={2} mr={1} fontSize={resp("0.65rem", "0.70rem", "0.75rem")} color="#5f5f5f">◯◯学部 3年</Text>
                {responsiveType === "PC" || responsiveType === "Tablet" ? <Text className="kr" ml={1} fontSize="0.75rem" color="#5f5f5f">C0B19000</Text> : null}
              </Flex>
              <Flex alignItems="center">
                <Tooltip label="運営メンバーに役職を切り替える">
                  <Button mr={resp(3, 5, 5)} size="xs" colorScheme="cyan" variant="outline">キャスト</Button>
                </Tooltip>
                <Tooltip label="ユーザーを削除する">
                  <FontAwesomeIcon icon={faXmark} fontSize="1.5rem" color="#00a4c4" cursor="pointer" />
                </Tooltip>
              </Flex>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center" px={3}>
                <Box className="kb" mr={2} fontSize={resp("1rem", "1.2rem", "1.2rem")}>木春由乃</Box>
                <Text className="kr" ml={2} mr={1} fontSize={resp("0.65rem", "0.70rem", "0.75rem")} color="#5f5f5f">◯◯学部 3年</Text>
                {responsiveType === "PC" || responsiveType === "Tablet" ? <Text className="kr" ml={1} fontSize="0.75rem" color="#5f5f5f">C0B19999</Text> : null}
              </Flex>
              <Flex alignItems="center">
                <Tooltip label="キャストに役職を切り替える">
                  <Button mr={resp(3, 5, 5)} size="xs" colorScheme="orange" variant="outline">運営メンバー</Button>
                </Tooltip>
                <Tooltip label="ユーザーを削除する">
                  <FontAwesomeIcon icon={faXmark} fontSize="1.5rem" color="#c15520" cursor="pointer" />
                </Tooltip>
              </Flex>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center" px={3}>
                <Box className="kb" mr={2} fontSize={resp("1rem", "1.2rem", "1.2rem")}>松前緒花</Box>
                <Text className="kr" ml={2} mr={1} fontSize={resp("0.65rem", "0.70rem", "0.75rem")} color="#5f5f5f">◯◯学部 1年</Text>
                {responsiveType === "PC" || responsiveType === "Tablet" ? <Text className="kr" ml={1} fontSize="0.75rem" color="#5f5f5f">C0B21000</Text> : null}
              </Flex>
              <Flex alignItems="center">
                <Tooltip label="運営メンバーに役職を切り替える">
                  <Button mr={resp(3, 5, 5)} size="xs" colorScheme="cyan" variant="outline">キャスト</Button>
                </Tooltip>
                <Tooltip label="ユーザーを削除する">
                  <FontAwesomeIcon icon={faXmark} fontSize="1.5rem" color="#00a4c4" cursor="pointer" />
                </Tooltip>
              </Flex>
            </Flex>
          </VStack>
        </Box>
      </>}></Body>
    </>
  )
}

export default withSession(ManageUsers)