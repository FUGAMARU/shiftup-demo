// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// React
import { ChangeEvent, useState } from "react"

// Custom Hooks
import { useStyledToast } from "hooks/useStyledToast"

// Chakra UI Components
import { Box, Flex, Text, VStack, StackDivider, Checkbox, Select, useCheckboxGroup, useDisclosure } from "@chakra-ui/react"

// Custom Components
import Body from "components/Body"
import GizaHeading from "components/heading/GizaHeading"
import SendButton from "components/button/SendButton"
import PopOver from "components/PopOver"

// Libraries
import { up, down } from "slide-element"
import axios from "axios"
import useSWR from "swr"

// Functions
import { resp, standBy, formatDateForDisplay, fetcher } from "ts/functions"

// Filter
import { withSession } from "hoc/withSession"

// Types
import { SendButtonState } from "types/SendButtonState"

// Interfaces
import { AvailableSurvey } from "interfaces/AvailableSurvey"

const AnswerSurvey: NextPage = () => {
  const { showToast } = useStyledToast()
  const { value: selectedSchedules, getCheckboxProps } = useCheckboxGroup()
  const [selectedSurveyTitle, setSelectedSurveyTitle] = useState("")
  const [sendButtonState, setSendButtonState] = useState<SendButtonState>("text")
  const { data: surveys, error: fetchError } = useSWR<AvailableSurvey[], Error>(process.env.NEXT_PUBLIC_SURVEYS_ME_URL, fetcher, { fallback: [] })

  if (fetchError) showToast("エラー", "アンケートの一覧の取得に失敗しました", "error")

  // チェックボックス
  const [schedulesErrorMessage, setSchedulesErrorMessage] = useState("")
  const { isOpen: isSchedulesPopoverOpened, onOpen: openSchedulesPopover, onClose: closeSchedulesPopover } = useDisclosure()
  const [selectedSurvey, setSelectedSurvey] = useState<AvailableSurvey>()

  const handleSurveySelect = async (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSurveyTitle(e.target.value)

    if (!!!e.target.value) {
      up(document.getElementById("selector") as HTMLElement, { duration: 500, easing: "ease-in-out" })
      return
    }

    setSelectedSurvey(surveys?.filter(survey => survey.id === e.target.value)[0])

    if (selectedSurveyTitle === "") down(document.getElementById("selector") as HTMLElement, { duration: 500, easing: "ease-in-out" })
  }

  const checkValidation = () => {
    if (!!!selectedSchedules.length) {
      setSchedulesErrorMessage("日程が1つも選択されていません")
      openSchedulesPopover()
      return false
    }

    return true
  }

  const handleSendButtonClick = async () => {
    if (!!!checkValidation()) return

    setSendButtonState("spinner")
    await standBy(1000)

    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_SURVEYS_URL}/${selectedSurvey!.id}/answers`, selectedSchedules)

      if (res.status === 204) {
        setSendButtonState("checkmark")
        setTimeout(() => {
          up(document.getElementById("selector") as HTMLElement, { duration: 500, easing: "ease-in-out" })

          setSelectedSurveyTitle("")
        }, 1500)
      }
    } catch (e) {
      setSendButtonState("error")
    }
  }

  return (
    <Box>
      <Head>
        <title>希望日程アンケート回答 | ShiftUP!</title>
      </Head>

      <Body title="アンケート回答">
        <Box>
          <Select w={resp("90%", 270, 320)} mx="auto" placeholder="回答するアンケートを選択…" value={selectedSurveyTitle} onChange={(e) => handleSurveySelect(e)}>
            {surveys?.map(survey => {
              return <option key={survey.id} value={survey.id} label={survey.name} />
            })}
          </Select>

          <Box h="0.5rem" />

          <Box id="selector" display="none">
            <GizaHeading />
            <Text className="kr" textAlign="center" fontSize={13}>出勤可能な日にちにチェックを入れてください</Text>

            <PopOver isOpen={isSchedulesPopoverOpened} onClose={closeSchedulesPopover} errorMessage={schedulesErrorMessage}>
              <VStack maxW={resp(250, 300, 300)} mt={5} mx="auto" divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
                {selectedSurvey?.openCampusSchedule.map(schedule => {
                  return (
                    <Checkbox key={schedule} className="kr" justifyContent="center" {...getCheckboxProps({ value: `${schedule}` })}>{formatDateForDisplay(schedule)}</Checkbox>
                  )
                })}
              </VStack>
            </PopOver>

            <Flex mt={7} justifyContent="center">
              <SendButton text="アンケート送信" state={sendButtonState} onClick={handleSendButtonClick}></SendButton>
            </Flex>
          </Box>
        </Box>
      </Body>
    </Box>
  )
}

export default withSession(AnswerSurvey)