// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { useState, useRef, useEffect } from "react"

// Custom Hooks
import { useGetElementProperty } from "../../hooks/useGetElementProperty"

// Chakra UI Components
import { Box, Input, Flex, Grid, Tooltip, VStack, StackDivider, Text, useDisclosure } from "@chakra-ui/react"

// Custom Components
import Body from "../../components/Body"
import SendButton from "../../components/button/SendButton"
import PopOver from "../../components/PopOver"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faCalendar, faCheck, faCirclePlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { subMonths } from "date-fns"
import axios from "axios"
import useSWRImmutable from "swr/immutable"
const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Functions
import { resp, formatDateForDisplay, standBy } from "../../functions"

// Filter
import { withSession } from "../../hoc/withSession"

// Types
import { SendButtonState } from "../../types/SendButtonState"

const CreateSurvey: NextPage = () => {
  const [sendButtonState, setSendButtonState] = useState<SendButtonState>("text")
  const { data } = useSWRImmutable(process.env.NEXT_PUBLIC_WORLD_TIME_API_URL, fetcher)

  // 日程リストとドットの高さの同期
  const scheduleListRef = useRef(null)
  const [shceduleListHeight, setScheduleListHeight] = useState(0)
  const { getElementProperty: scheduleListProperty } = useGetElementProperty<HTMLDivElement>(scheduleListRef)
  useEffect(() => setScheduleListHeight(scheduleListProperty("height")), [scheduleListRef, scheduleListProperty, shceduleListHeight])

  // アンケートタイトル入力欄
  const surveyTitleRef = useRef<HTMLInputElement>(null)
  const [surveyTitleErrorMessage, setSurveyTitleErrorMessage] = useState("")
  const { isOpen: isSurveyTitlePopoverOpened, onOpen: openSurveyTitlePopover, onClose: closeSurveyTitlePopover } = useDisclosure()

  // 日付選択
  const dateInputRef = useRef<HTMLInputElement>(null)
  const [scheduleList, setScheduleList] = useState<string[]>([])
  const [scheduleListErrorMessage, setScheduleListErrorMessage] = useState("")
  const { isOpen: isScheduleListPopoverOpened, onOpen: openScheduleListPopover, onClose: closeScheduleListPopover } = useDisclosure()

  const isDateOrderCorrect = (current: Date, target: Date) => new Date(current.toDateString()) <= new Date(target.toDateString())

  const handlePlusButtonClick = () => {
    if (!!!dateInputRef.current) return

    const datePattern = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
    if (!!!datePattern.test(dateInputRef.current.value)) {
      setScheduleListErrorMessage("日付が正しく指定されていません")
      openScheduleListPopover()
      return
    }

    if (scheduleList.includes(dateInputRef.current.value)) {
      setScheduleListErrorMessage("既に追加されている日付です")
      openScheduleListPopover()
      return
    }

    if (!!!isDateOrderCorrect(new Date(data.datetime), new Date(dateInputRef.current.value))) {
      setScheduleListErrorMessage("現在より過去の日付が指定されています")
      openScheduleListPopover()
      return
    }

    setScheduleList([...scheduleList, dateInputRef.current.value])
    setScheduleListHeight(0)
  }

  const handleRemoveButtonClick = (target: string) => {
    setScheduleList(scheduleList.filter(val => (val !== target)))
    setScheduleListHeight(0)
  }

  const checkValidation = () => {
    if (!!!surveyTitleRef.current) return false

    let valid = true

    if (!!!scheduleList.some((schedule) => {
      if (!!!isDateOrderCorrect(new Date(data.datetime), new Date(schedule))) {
        setScheduleListErrorMessage("現在より過去の日付が指定されています")
        openScheduleListPopover()
        return true
      }
    })) valid = false

    const surveyTitlePattern = /^[ 　\r\n\t]*$/
    if (surveyTitlePattern.test(surveyTitleRef.current.value)) {
      setSurveyTitleErrorMessage("タイトルが入力されていません")
      openSurveyTitlePopover()
      valid = false
    }

    if (!!!scheduleList.length) {
      setScheduleListErrorMessage("日程が追加されていません")
      openScheduleListPopover()
      valid = false
    }

    const academicYears: number[] = []
    scheduleList.forEach(date => {
      academicYears.push(subMonths(new Date(date), 3).getFullYear())
    })
    if (!!!academicYears.every(val => val === academicYears[0])) {
      setScheduleListErrorMessage("年度を跨いだ日程を設定することはできません")
      openScheduleListPopover()
      valid = false
    }

    return valid
  }

  const handleSendButtonClick = async () => {
    if (!!!checkValidation() || !!!surveyTitleRef.current) return

    setSendButtonState("spinner")
    await standBy(1000)

    const requestBody = {
      name: surveyTitleRef.current.value,
      openCampusSchedule: scheduleList
    }

    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_SURVEYS_URL as string, requestBody)

      if (res.status === 201) {
        setSendButtonState("checkmark")
        setTimeout(() => {
          if (!!!surveyTitleRef.current || !!!dateInputRef.current) return
          surveyTitleRef.current.value = ""
          dateInputRef.current.value = ""
          setScheduleList([])
          setScheduleListHeight(0)
        }, 1000)
      }
    } catch (e) {
      setSendButtonState("error")
    }
  }

  return (
    <>
      <Head>
        <title>希望日程アンケート作成 | ShiftUP!</title>
      </Head>

      <Body title="アンケート作成">
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
              <PopOver isOpen={isSurveyTitlePopoverOpened} onClose={closeSurveyTitlePopover} errorMessage={surveyTitleErrorMessage}>
                <Input className="ksb" placeholder="(入力例) 12月シフト募集" bg="white" w={resp(250, 350, 350)} focusBorderColor="#48c3eb" ref={surveyTitleRef}></Input>
              </PopOver>
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
                  <PopOver isOpen={isScheduleListPopoverOpened} onClose={closeScheduleListPopover} errorMessage={scheduleListErrorMessage}>
                    <Input ref={dateInputRef} w={resp(210, 310, 310)} mr={5} type="date" size="sm" focusBorderColor="#48c3eb" isInvalid={isScheduleListPopoverOpened} errorBorderColor="red.200" />
                  </PopOver>
                  <Tooltip label="日程をリストに追加"><FontAwesomeIcon className="primary-color" fontSize={30} cursor="pointer" icon={faCirclePlus} onClick={handlePlusButtonClick} /></Tooltip>
                </Flex>
                <VStack mt={3} divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
                  {scheduleList.map((val, idx) => {
                    return (
                      <Flex alignItems="center" key={idx}>
                        <Tooltip label="リストから削除"><FontAwesomeIcon className="primary-color" cursor="pointer" icon={faXmark} fontSize={25} onClick={() => handleRemoveButtonClick(val)} /></Tooltip>
                        <Text ml={3}>{formatDateForDisplay(val)}</Text>
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
              <SendButton text="アンケートを作成" state={sendButtonState} onClick={handleSendButtonClick}></SendButton>
            </Flex>
          </Grid>
        </Flex>
      </Body>
    </>
  )
}

export default withSession(CreateSurvey)
