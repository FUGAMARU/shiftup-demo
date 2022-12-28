// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { ChangeEvent, useState } from "react"

// Chakra UI Components
import { Box, Flex, Text, VStack, StackDivider, Checkbox, Select, useToast, useCheckboxGroup, useDisclosure } from "@chakra-ui/react"

// Custom Components
import Body from "../components/Body"
import BumpHeading from "../components/heading/BumpHeading"
import SendButton from "../components/button/SendButton"
import PopOver from "../components/PopOver"

// Libraries
import { toggle } from "slide-element"
import axios from "axios"
import useSWR from "swr"

// Functions
import { resp, standBy, formatDateForDisplay, fetcher } from "../functions"

// Filter
import { withSession } from "../hoc/withSession"

// Types
import { SendButtonState } from "../types/SendButtonState"

// Interfaces
import { Survey } from "../interfaces/Survey"

const AnswerSurvey: NextPage = () => {
  const toast = useToast()
  const { value: selectedSchedules, getCheckboxProps } = useCheckboxGroup()
  const [sendButtonState, setSendButtonState] = useState<SendButtonState>("text")
  const { data: surveys, error: fetchError } = useSWR<Survey[], Error>(process.env.NEXT_PUBLIC_SURVEYS_URL, fetcher, { fallback: [] })

  if (fetchError) {
    toast({
      title: "エラー",
      description: "アンケートの一覧の取得に失敗しました",
      status: "error",
      variant: "left-accent",
      position: "top-right"
    })
  }

  // チェックボックス
  const [schedulesErrorMessage, setSchedulesErrorMessage] = useState("")
  const { isOpen: isSchedulesPopoverOpened, onOpen: openSchedulesPopover, onClose: closeSchedulesPopover } = useDisclosure()
  const [selectedSurvey, setSelectedSurvey] = useState<Survey>()

  const handleSurveySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!!!e.target.value) return
    setSelectedSurvey(surveys?.filter(survey => survey.id === e.target.value)[0])
    toggle(document.getElementById("selector") as HTMLElement, { duration: 500, easing: "ease-in-out" })
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
      const res = await axios.put(`${process.env.NEXT_PUBLIC_SURVEYS_URL}/${selectedSurvey?.id}/answers`, selectedSchedules)

      if (res.status === 204) {
        setSendButtonState("checkmark")
        setTimeout(() => {
          toggle(document.getElementById("selector") as HTMLElement, { duration: 500, easing: "ease-in-out" })
          setSelectedSurvey(undefined)
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

      <Body title="アンケート回答" statusMessage={!!!(surveys?.length && selectedSurvey) ? "回答するアンケートを選択" : undefined}>
        <Box display={surveys?.length ? "block" : "none"}>
          <Box id="selector">
            <Select w={resp("90%", 270, 320)} mx="auto" mb={5} placeholder="回答するアンケートを選択…" onChange={(e) => handleSurveySelect(e)}>
              {surveys?.filter(survey => survey.available).map(survey => {
                return <option key={survey.id} value={survey.id} label={survey.name} />
              })}
            </Select>
          </Box>

          <Box className={selectedSurvey ? "animate__animated animate__fadeIn" : ""} display={selectedSurvey ? "block" : "none"} style={{ animationDelay: ".2s" }}>
            <BumpHeading title={selectedSurvey?.name as string} />
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