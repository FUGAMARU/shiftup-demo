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

const ManageSurveys: NextPage = () => {
  const responsiveType = useResponsive() // SmartPhone, Tablet, PC

  return (
    <>
      <Head>
        <title>希望日程アンケート管理 | ShiftUP!</title>
      </Head>

      <Body title="アンケート管理" statusMessage="2件のアンケートが存在します" content={<>
        <Box w={resp("100%", "80%", "80%")} mx="auto">
          <Box textAlign="center" mb={8}>
            <Input w={resp("80%", "60%", "60%")} variant="flushed" placeholder="タイトルを入力してアンケートを検索…" textAlign="center" focusBorderColor="#48c3eb" />
          </Box>

          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={3}
            align="stretch"
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Box className="kb" mr={2} px={3} maxW={resp("20rem", "17rem", "25rem")} fontSize={resp("1rem", "1.2rem", "1.2rem")}>12月シフト募集</Box>
              <Flex alignItems="center">
                {responsiveType === "PC" || responsiveType === "Tablet" ? <Text className="kr" mr={resp(3, 5, 5)} fontSize={resp("0.65rem", "0.70rem", "0.75rem")} color="#5f5f5f">/ 20件の回答</Text> : null}
                <Tooltip label="回答を締め切る">
                  <Button mr={resp(3, 5, 5)} size="xs" colorScheme="whatsapp" variant="outline">回答受付中</Button>
                </Tooltip>
                <Tooltip label="アンケートを削除する">
                  <FontAwesomeIcon icon={faXmark} fontSize="1.5rem" color="#159848" cursor="pointer" />
                </Tooltip>
              </Flex>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center">
              <Box className="kb" mr={2} px={3} maxW={resp("20rem", "17rem", "25rem")} fontSize={resp("1rem", "1.2rem", "1.2rem")}>【急募】10月30日 友人募集</Box>
              <Flex alignItems="center">
                {responsiveType === "PC" || responsiveType === "Tablet" ? <Text className="kr" mr={resp(3, 5, 5)} fontSize={resp("0.65rem", "0.70rem", "0.75rem")} color="#5f5f5f">/ 3件の回答</Text> : null}
                <Tooltip label="回答の受け付けを再開する">
                  <Button mr={resp(3, 5, 5)} size="xs" colorScheme="red" variant="outline">締切済み</Button>
                </Tooltip>
                <Tooltip label="アンケートを削除する">
                  <FontAwesomeIcon icon={faXmark} fontSize="1.5rem" color="#c43030" cursor="pointer" />
                </Tooltip>
              </Flex>
            </Flex>
          </VStack>
        </Box>
      </>}></Body>
    </>
  )
}

export default withSession(ManageSurveys)