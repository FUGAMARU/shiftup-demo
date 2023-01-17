// React
import { memo, Dispatch, SetStateAction, ChangeEvent, useMemo, useCallback, useState } from "react"

// Custom Hooks
import { useStyledToast } from "hooks/useStyledToast"
import { useApiConnection } from "hooks/useApiConnection"

// Chakra UI Components
import { Box, Select, Button, useDisclosure } from "@chakra-ui/react"

// Custom Components
import BlurModal from "components/BlurModal"

// Functions
import { resp, formatDateForDisplay } from "ts/functions"

interface Props {
  value: string,
  dispatch: Dispatch<SetStateAction<string>>,
  requireCandidates: boolean
}

const ScheduleSelector = ({ value, dispatch, requireCandidates }: Props) => {
  const { showToast } = useStyledToast()
  const [selectedSchedule, setSelectedSchedule] = useState("")
  const { isOpen: isModalOpened, onOpen: openModal, onClose: closeModal } = useDisclosure()

  const { getAllSurveys, getSurveyResult } = useApiConnection()
  const { data, fetchErrorMessage } = getAllSurveys()
  if (fetchErrorMessage) showToast("エラー", fetchErrorMessage, "error")

  const items = useMemo(() => requireCandidates ? data?.filter(survey => survey.answerCount !== 0) : data, [data, requireCandidates])

  const checkAvailableCasts = useCallback(async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value // 何故か変数にコピーしておかないと下の方で"e.target.value"で取れなくなる

    if (value === "" || !!!requireCandidates) {
      dispatch(value)
      return
    }

    const selectedSurveyId = value.split("|")[0]
    const selectedScheduleValue = value.split("|")[1]

    const availableCasts = (await getSurveyResult(selectedSurveyId)).openCampuses.filter(schedule => schedule.date === selectedScheduleValue)[0].availableCasts.length
    if (availableCasts === 0) {
      setSelectedSchedule(selectedScheduleValue)
      openModal()
      dispatch("")
      return
    }

    dispatch(value)
  }, [getSurveyResult, setSelectedSchedule, openModal, dispatch, requireCandidates])

  return (
    <Box>
      <Select w={resp("90%", 270, 320)} mx="auto" placeholder="日程を選択…" value={value} onChange={(e) => checkAvailableCasts(e)}>
        {items?.map(survey => {
          return (
            <optgroup key={survey.id} label={survey.name}>
              {survey.openCampusSchedule.map(schedule => <option key={schedule} value={`${survey.id}|${schedule}`}>{formatDateForDisplay(schedule)}</option>)}
            </optgroup>
          )
        })}
      </Select>

      <BlurModal isOpen={isModalOpened} onClose={closeModal} title="エラー" text={`${formatDateForDisplay(selectedSchedule)} に出勤可能と回答しているユーザーは1人もいません`}>
        <Button ml={1} colorScheme="gray" variant="outline" onClick={closeModal}>閉じる</Button>
      </BlurModal>
    </Box>
  )
}

export default memo(ScheduleSelector)