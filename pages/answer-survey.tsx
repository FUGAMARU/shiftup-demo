// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// React
import { ChangeEvent, useState, useCallback } from "react"

// Custom Hooks
import { useStyledToast } from "hooks/useStyledToast"
import { useApiConnection } from "hooks/useApiConnection"

// Chakra UI Components
import { Box, Flex, Text, VStack, StackDivider, Checkbox, Select, useCheckboxGroup, Button, useDisclosure } from "@chakra-ui/react"

// Custom Components
import Body from "components/view/Body"
import GizaHeading from "components/heading/GizaHeading"
import SendButton from "components/button/SendButton"
import ButtonModal from "components/modal/ButtonModal"

// Libraries
import { up, down } from "slide-element"

// Functions
import { resp, standBy, formatDateForDisplay } from "ts/functions"

// Filter
import { withSession } from "hoc/withSession"

// Types
import { SendButtonState } from "types/SendButtonState"

// Interfaces
import { AvailableSurvey } from "interfaces/Survey"

const AnswerSurvey: NextPage = () => {
  const { showToast } = useStyledToast()
  const { value: selectedSchedules, getCheckboxProps } = useCheckboxGroup()
  const [selectedSurveyTitle, setSelectedSurveyTitle] = useState("")
  const [sendButtonState, setSendButtonState] = useState<SendButtonState>("text")
  const { isOpen: isModalOpened, onOpen: openModal, onClose: closeModal } = useDisclosure()
  const { getAnswerableSurveys, answerSurvey } = useApiConnection()

  const { data: surveys, fetchErrorMessage, mutate } = getAnswerableSurveys()
  if (fetchErrorMessage) showToast("エラー", fetchErrorMessage, "error")

  // チェックボックス
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

  const checkValidation = useCallback(() => {
    if (!!!selectedSchedules.length) {
      openModal()
      return false
    }

    return true
  }, [selectedSchedules, openModal])

  const handleSendButtonClick = useCallback(async (fromModal: boolean) => {
    if (!!!checkValidation() && !!!fromModal) return

    setSendButtonState("spinner")
    await standBy(1000)

    try {
      await answerSurvey(selectedSurvey!.id, selectedSchedules)

      setSendButtonState("checkmark")
      setTimeout(() => {
        up(document.getElementById("selector") as HTMLElement, { duration: 500, easing: "ease-in-out" })
        setSelectedSurveyTitle("")
        mutate()
      }, 1500)
    } catch {
      setSendButtonState("error")
    }
  }, [answerSurvey, setSendButtonState, mutate, setSelectedSurveyTitle, checkValidation, selectedSchedules, selectedSurvey])

  return (
    <Box>
      <Head>
        <title>希望日程アンケート回答 | ShiftUP!</title>
      </Head>

      <Body title="アンケート回答">
        <Box>
          <Select w={resp("90%", 270, 320)} mx="auto" placeholder="回答するアンケートを選択…" value={selectedSurveyTitle} onChange={(e) => handleSurveySelect(e)}>
            {surveys?.map(survey => <option key={survey.id} value={survey.id} label={survey.name} />)}
          </Select>

          <Box h="0.5rem" />

          <Box id="selector" display="none">
            <GizaHeading />
            <Text className="kr" textAlign="center" fontSize={13}>出勤可能な日にちにチェックを入れてください</Text>

            <VStack maxW={resp(250, 300, 300)} mt={5} mx="auto" divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
              {selectedSurvey?.openCampusSchedule.map(schedule => <Checkbox key={schedule} className="kr" justifyContent="center" {...getCheckboxProps({ value: `${schedule}` })}>{formatDateForDisplay(schedule)}</Checkbox>)}
            </VStack>

            <Flex mt={7} justifyContent="center">
              <SendButton text="アンケート送信" state={sendButtonState} onClick={() => handleSendButtonClick(false)}></SendButton>
            </Flex>
          </Box>
        </Box>
      </Body>

      <ButtonModal isOpen={isModalOpened} onClose={closeModal} title="確認" text="日程が1つも選択されていませんが送信してもよろしいですか？">
        <Button mr={1} colorScheme="orange" onClick={() => { handleSendButtonClick(true); closeModal() }}>送信する</Button>
        <Button ml={1} colorScheme="gray" variant="outline" onClick={closeModal}>送信しない</Button>
      </ButtonModal>
    </Box>
  )
}

export default withSession(AnswerSurvey)