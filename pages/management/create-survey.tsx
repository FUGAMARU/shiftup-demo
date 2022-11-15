// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { useState, useRef, useEffect } from "react"

// Custom Hooks
import { useGetElementProperty } from "../../hooks/useGetElementProperty"

// Chakra UI Components
import { Box, Input, Flex, Grid, Tooltip, VStack, StackDivider, Text } from "@chakra-ui/react"

// Custom Components
import Body from "../../components/Body"
import SendButton from "../../components/button/SendButton"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faCalendar, faCheck, faCirclePlus, faXmark } from "@fortawesome/free-solid-svg-icons"

// Functions
import { resp } from "../../functions"

const CreateSurvey: NextPage = () => {
  // 日程リストとドットの高さの動機
  const scheduleListRef = useRef(null)
  const [shceduleListHeight, setScheduleListHeight] = useState(0)
  const { getElementProperty: scheduleListProperty } = useGetElementProperty<HTMLDivElement>(scheduleListRef)
  useEffect(() => setScheduleListHeight(scheduleListProperty("height")), [scheduleListRef, scheduleListProperty])

  return (
    <>
      <Head>
        <title>希望日程アンケート作成 | ShiftUP!</title>
      </Head>

      <Body title="アンケート作成" content={<>
        <Flex justifyContent="center">
          <Grid gridTemplateColumns="repeat(2, auto)" gridTemplateRows="repeat(6, auto)">
            <Flex className="flex-center">
              <FontAwesomeIcon className="secondary-color" icon={faPen} fontSize={25}></FontAwesomeIcon>
            </Flex>
            <Flex pl={resp(6, 12, 12)} alignItems="center">
              <Text className="kb" fontSize={resp("1.5rem", "1.8rem", "1.9rem")}>タイトルを入力</Text>
            </Flex>
            <Flex className="flex-center">
              <Box className="secondary-color" h="80px" borderLeft="dotted 4px"></Box>
            </Flex>
            <Flex pl={resp(8, 16, 16)} py={5} alignItems="center">
              <Input className="ksb" placeholder="(入力例) 8月 シフトアンケート" bg="white" w={resp(250, 350, 350)} focusBorderColor="#48c3eb"></Input>
            </Flex>
            <Flex className="flex-center">
              <FontAwesomeIcon className="secondary-color" icon={faCalendar} fontSize={25}></FontAwesomeIcon>
            </Flex>
            <Flex pl={resp(6, 12, 12)} alignItems="center">
              <Text className="kb" fontSize={resp("1.5rem", "1.8rem", "1.9rem")}>日程を追加</Text>
            </Flex>
            <Flex className="flex-center">
              <Box className="secondary-color" h={shceduleListHeight} borderLeft="dotted 4px"></Box>
            </Flex>
            <Flex pl={resp(9, 16, 16)} py={5} alignItems="center" ref={scheduleListRef}>
              <Box>
                <Flex>
                  <Input type="date" w={resp(210, 310, 310)} focusBorderColor="#48c3eb" size="sm" mr={5}></Input>
                  <Tooltip label="日程をリストに追加"><FontAwesomeIcon className="primary-color" fontSize={30} cursor="pointer" icon={faCirclePlus} /></Tooltip>
                </Flex>
                <VStack mt={3} divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
                  <Flex alignItems="center">
                    <Tooltip label="リストから削除"><FontAwesomeIcon className="primary-color" cursor="pointer" icon={faXmark} fontSize={25} /></Tooltip>
                    <Text ml={3}>2022/08/14 (日)</Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Tooltip label="リストから削除"><FontAwesomeIcon className="primary-color" cursor="pointer" icon={faXmark} fontSize={25} /></Tooltip>
                    <Text ml={3}>2022/08/21 (日)</Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Tooltip label="リストから削除"><FontAwesomeIcon className="primary-color" cursor="pointer" icon={faXmark} fontSize={25} /></Tooltip>
                    <Text ml={3}>2022/08/28 (日)</Text>
                  </Flex>
                </VStack>
              </Box>
            </Flex>
            <Flex className="flex-center">
              <FontAwesomeIcon className="secondary-color" icon={faCheck} fontSize={25}></FontAwesomeIcon>
            </Flex>
            <Flex pl={resp(6, 12, 12)} alignItems="center">
              <Text className="kb" fontSize={resp("1.5rem", "1.8rem", "1.9rem")}>作成</Text>
            </Flex>
            <Flex className="flex-center">
              <Box className="secondary-color" h="74px" borderLeft="dotted 4px"></Box>
            </Flex>
            <Flex className="flex-center" pt="2rem">
              <SendButton text="アンケートを作成"></SendButton>
            </Flex>
          </Grid>
        </Flex>
      </>}></Body>
    </>
  )
}

export default CreateSurvey
