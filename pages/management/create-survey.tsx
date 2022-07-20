// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// Chakra UI Components
import { Box, Heading, Input, Flex, Button, Tooltip, VStack, StackDivider, Text } from "@chakra-ui/react"

// Custom Components
import Header from "../../components/Header"
import RibbonHeading from "../../components/RibbonHeading"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faCalendar, faCheck, faCirclePlus, faXmark } from "@fortawesome/free-solid-svg-icons"

// Functions
import { resp } from "../../functions"

const CreateSurvey: NextPage = () => {
  return (
    <>
      <Head>
        <title>アンケート作成 | ShiftUP!</title>
      </Head>

      <Box h="100vh" bg="#e9ebee">
        <Header />
        <Box w={resp("95%", "90%", "70%")} m="0 auto" bg="white" px={resp(6, 10, 14)} pt={8} pb={10} boxShadow="2xl" borderBottomRadius={15}>
          <RibbonHeading text="アンケート作成" />

          <Flex alignItems="center" mt={3}>
            <FontAwesomeIcon className="secondary-color" icon={faPen} fontSize={25}></FontAwesomeIcon>
            <Heading className="kb" size="lg" ml={3}>タイトルを入力</Heading>
          </Flex>

          <Flex>
            <Box className="secondary-color" borderLeft="dotted 4px" ml={2}></Box>
            <Input className="ksb" placeholder="(入力例) 8月 シフトアンケート" bg="white" w={resp(250, 350, 350)} m={5} focusBorderColor="#48c3eb"></Input>
          </Flex>

          <Flex alignItems="center" mt={0}>
            <FontAwesomeIcon className="secondary-color" icon={faCalendar} fontSize={25}></FontAwesomeIcon>
            <Heading className="kb" size="lg" ml={3}>日程を追加</Heading>
          </Flex>

          <Flex>
            <Box className="secondary-color" borderLeft="dotted 4px" ml={2}></Box>
            <Box m={5}>
              <Flex alignItems="center">
                <Input type="date" w={resp(210, 310, 310)} focusBorderColor="#48c3eb" size="sm" mr={3}></Input>
                <Tooltip label="日程をリストに追加"><FontAwesomeIcon className="primary-color" fontSize={30} cursor="pointer" icon={faCirclePlus} /></Tooltip>
              </Flex>
              <VStack divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch" mt={3} ml={1}>
                <Flex alignItems="center">
                  <Tooltip label="リストから削除"><FontAwesomeIcon className="primary-color" cursor="pointer" icon={faXmark} fontSize={25} /></Tooltip>
                  <Text ml={3}>2022/08/14</Text>
                </Flex>
                <Flex alignItems="center">
                  <Tooltip label="リストから削除"><FontAwesomeIcon className="primary-color" cursor="pointer" icon={faXmark} fontSize={25} /></Tooltip>
                  <Text ml={3}>2022/08/21</Text>
                </Flex>
                <Flex alignItems="center">
                  <Tooltip label="リストから削除"><FontAwesomeIcon className="primary-color" cursor="pointer" icon={faXmark} fontSize={25} /></Tooltip>
                  <Text ml={3}>2022/08/28</Text>
                </Flex>
              </VStack>
            </Box>
          </Flex>

          <Flex alignItems="center" mt={0}>
            <FontAwesomeIcon className="secondary-color" icon={faCheck} fontSize={25}></FontAwesomeIcon>
            <Heading className="kb" size="lg" ml={3}>作成</Heading>
          </Flex>

          <Flex>
            <Box className="secondary-color" borderLeft="dotted 4px" ml={2}></Box>
            <Box className="secondary-color" w={10} borderTop="dotted 4px" ml={1} mt={10}></Box>
            <Button ml={5} mt={5} mb="-2rem" colorScheme="whatsapp">アンケートを作成</Button>
          </Flex>

        </Box>
      </Box>
    </>
  )
}

export default CreateSurvey
