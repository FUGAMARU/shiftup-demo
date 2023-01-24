// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { useState, useRef, useCallback } from "react"

// Custom Hooks
import { useApiConnection } from "hooks/useApiConnection"
import { useStyledToast } from "hooks/useStyledToast"

// Chakra UI Components
import { Box, Input, Flex, Grid, Tooltip, VStack, StackDivider, Text, useDisclosure } from "@chakra-ui/react"

// Custom Components
import Body from "components/Body"
import SendButton from "components/button/SendButton"
import PopOver from "components/PopOver"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faCalendar, faCheck, faCirclePlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { subMonths } from "date-fns"

// Functions
import { resp, formatDateForDisplay, standBy, isDateOrderCorrect, isBlank } from "ts/functions"

// Filter
import { withSession } from "hoc/withSession"

// Types
import { SendButtonState } from "types/SendButtonState"

const CreateSurvey: NextPage = () => {
  const { showToast } = useStyledToast()
  const [sendButtonState, setSendButtonState] = useState<SendButtonState>("text")
  const { getCurrentTime, createSurvey, getAllSchedules } = useApiConnection()
  const { time } = getCurrentTime()
  const { allSchedules, fetchErrorMessage } = getAllSchedules()
  if (fetchErrorMessage) showToast("エラー", fetchErrorMessage, "error")

  // アンケートタイトル入力欄
  const surveyTitleRef = useRef<HTMLInputElement>(null)
  const [surveyTitleErrorMessage, setSurveyTitleErrorMessage] = useState("")
  const { isOpen: isSurveyTitlePopoverOpened, onOpen: openSurveyTitlePopover, onClose: closeSurveyTitlePopover } = useDisclosure()

  // 日付選択
  const dateInputRef = useRef<HTMLInputElement>(null)
  const [scheduleList, setScheduleList] = useState<string[]>([])
  const [scheduleListErrorMessage, setScheduleListErrorMessage] = useState("")
  const { isOpen: isScheduleListPopoverOpened, onOpen: openScheduleListPopover, onClose: closeScheduleListPopover } = useDisclosure()

  const handlePlusButtonClick = () => {
    if (!!!dateInputRef.current) return

    let errorMessage = ""
    const datePattern = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

    if (!!!datePattern.test(dateInputRef.current.value)) errorMessage = "日付が正しく指定されていません"
    if (scheduleList.includes(dateInputRef.current.value)) errorMessage = "既に追加されている日付です"
    if (allSchedules?.includes(dateInputRef.current.value)) errorMessage = "既に他のアンケートで使用されている日付です"
    if (!!!isDateOrderCorrect(time, new Date(dateInputRef.current.value))) errorMessage = "現在より過去の日付が指定されています"

    if (errorMessage) {
      setScheduleListErrorMessage(errorMessage)
      openScheduleListPopover()
      return
    }

    setScheduleList([...scheduleList, dateInputRef.current.value])
  }

  const handleRemoveButtonClick = (target: string) => setScheduleList(scheduleList.filter(val => (val !== target)))

  const checkValidation = useCallback(() => {
    if (!!!surveyTitleRef.current) return false

    let tmpSurveyTitleErrorMessage = ""
    let tmpScheduleListErrorMessage = ""

    if (isBlank(surveyTitleRef.current.value)) tmpSurveyTitleErrorMessage = "タイトルが入力されていません"

    const isValidSchedules = scheduleList.every((schedule) => isDateOrderCorrect(time, new Date(schedule)))
    if (!isValidSchedules) tmpScheduleListErrorMessage = "現在より過去の日付が指定されています"

    if (!!!scheduleList.length) tmpScheduleListErrorMessage = "日程が追加されていません"

    const academicYears: number[] = []
    scheduleList.forEach(date => {
      academicYears.push(subMonths(new Date(date), 3).getFullYear())
    })
    if (!!!academicYears.every(val => val === academicYears[0])) tmpScheduleListErrorMessage = "年度を跨いだ日程を設定することはできません"

    if (tmpSurveyTitleErrorMessage) {
      setSurveyTitleErrorMessage(tmpSurveyTitleErrorMessage)
      openSurveyTitlePopover()
    }

    if (tmpScheduleListErrorMessage) {
      setScheduleListErrorMessage(tmpScheduleListErrorMessage)
      openScheduleListPopover()
    }

    return !!!(tmpSurveyTitleErrorMessage || tmpScheduleListErrorMessage)
  }, [openScheduleListPopover, openSurveyTitlePopover, scheduleList, time])

  const handleSendButtonClick = useCallback(async () => {
    if (!!!checkValidation()) return

    setSendButtonState("spinner")
    await standBy(1000)

    try {
      await createSurvey({
        name: surveyTitleRef.current!.value,
        openCampusSchedule: scheduleList
      })

      setSendButtonState("checkmark")

      setTimeout(() => {
        if (!!!surveyTitleRef.current || !!!dateInputRef.current) return
        surveyTitleRef.current.value = ""
        dateInputRef.current.value = ""
        setScheduleList([])
      }, 1000)

    } catch {
      setSendButtonState("error")
    }
  }, [checkValidation, scheduleList, createSurvey])

  return (
    <Box>
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
              <Box className="secondary-color" h="100%" borderLeft="dotted 4px"></Box>
            </Flex>
            <Flex pl={resp(9, 16, 16)} py={5} alignItems="center">
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
    </Box>
  )
}

export default withSession(CreateSurvey)
