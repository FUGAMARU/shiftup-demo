// React
import { memo, Dispatch, SetStateAction } from "react"

// Chakra UI Components
import { Select } from "@chakra-ui/react"

// Custom Hooks
import { useStyledToast } from "hooks/useStyledToast"
import { useApiConnection } from "hooks/useApiConnection"

// Functions
import { resp, formatDateForDisplay } from "ts/functions"

interface Props {
  value: string,
  dispatch: Dispatch<SetStateAction<string>>
}

const ScheduleSelector = (props: Props) => {
  const { showToast } = useStyledToast()
  const { getAllSurveys } = useApiConnection()
  const { data, fetchErrorMessage } = getAllSurveys()
  if (fetchErrorMessage) showToast("エラー", fetchErrorMessage, "error")

  return (
    <Select w={resp("90%", 270, 320)} mx="auto" placeholder="日程を選択…" value={props.value} onChange={(e) => props.dispatch(e.target.value)}>
      {data?.map(survey => {
        return (
          <optgroup key={survey.id} label={survey.name}>
            {survey.openCampusSchedule.map(schedule => <option key={schedule} value={schedule}>{formatDateForDisplay(schedule)}</option>)}
          </optgroup>
        )
      })}
    </Select>
  )
}

export default memo(ScheduleSelector)