// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { useState, useRef, useEffect } from "react"

// Custom Hooks
import { useGetElementProperty } from "../../hooks/useGetElementProperty"

// Chakra UI Components
import { Box, Input, Flex, Grid, Tooltip, VStack, StackDivider, Text, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, useDisclosure } from "@chakra-ui/react"

// Custom Components
import Body from "../../components/Body"
import SendButton from "../../components/button/SendButton"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faCalendar, faCheck, faCirclePlus, faXmark } from "@fortawesome/free-solid-svg-icons"

// Functions
import { resp, formatDateToSlash, getWeekDay } from "../../functions"

// Filter
import { withSession } from "../../hoc/withSession"

const CreateSurvey: NextPage = () => {
  const dateInputRef = useRef<HTMLInputElement>(null)
  const [scheduleList, setScheduleList] = useState<string[]>([])
  const [isInvalidInputDate, setInvalidInputDate] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")
  const { isOpen: isErrorMessageOpened, onOpen: openError, onClose: closeError } = useDisclosure()

  // 日程リストとドットの高さの動機
  const scheduleListRef = useRef(null)
  const [shceduleListHeight, setScheduleListHeight] = useState(0)
  const { getElementProperty: scheduleListProperty } = useGetElementProperty<HTMLDivElement>(scheduleListRef)
  useEffect(() => setScheduleListHeight(scheduleListProperty("height")), [scheduleListRef, scheduleListProperty, shceduleListHeight])

  const handlePlusButtonClick = () => {
    if (!!!dateInputRef.current) return

    const ref = dateInputRef.current
    const pattern = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

    setInvalidInputDate(true)

    // フォーマットチェック
    if (!!!pattern.test(ref.value)) {
      setErrorMessage("日付が正しく指定されていません")
      openError()
      return
    }

    // 重複チェック
    if (scheduleList.includes(ref.value)) {
      setErrorMessage("既に追加されている日付です")
      openError()
      return
    }

    setInvalidInputDate(false)
    setScheduleList([...scheduleList, ref.value])
    setScheduleListHeight(0)
  }

  const handleRemoveButtonClick = (target: string) => {
    setScheduleList(scheduleList.filter(val => (val !== target)))
    setScheduleListHeight(0)
  }

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
                  <Popover isOpen={isErrorMessageOpened} onClose={closeError}>
                    <PopoverTrigger>
                      <Input ref={dateInputRef} w={resp(210, 310, 310)} mr={5} type="date" size="sm" focusBorderColor="#48c3eb" isInvalid={isInvalidInputDate} errorBorderColor="red.200" />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow bg="red.100" />
                      <PopoverBody className="ksb" color="red.500" bg="red.100">{errorMessage}</PopoverBody>
                    </PopoverContent>
                  </Popover>
                  <Tooltip label="日程をリストに追加"><FontAwesomeIcon className="primary-color" fontSize={30} cursor="pointer" icon={faCirclePlus} onClick={handlePlusButtonClick} /></Tooltip>
                </Flex>
                <VStack mt={3} divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
                  {scheduleList.map((val, idx) => {
                    const dt = new Date(val)
                    return (
                      <Flex alignItems="center" key={idx}>
                        <Tooltip label="リストから削除"><FontAwesomeIcon className="primary-color" cursor="pointer" icon={faXmark} fontSize={25} onClick={() => handleRemoveButtonClick(val)} /></Tooltip>
                        <Text ml={3}>{`${formatDateToSlash(dt)} (${getWeekDay(dt)})`}</Text>
                      </Flex>
                    )
                  })}
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
              <SendButton text="アンケートを作成" state="text"></SendButton>
            </Flex>
          </Grid>
        </Flex>
      </>}></Body>
    </>
  )
}

export default withSession(CreateSurvey)
