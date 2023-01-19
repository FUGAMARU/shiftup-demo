// Next.js
import type { NextPage, InferGetStaticPropsType } from "next"
import Head from "next/head"

// React
import { useState, useMemo, useCallback, useEffect } from "react"

// Custom Hooks
import { useStyledToast } from "hooks/useStyledToast"
import { useApiConnection } from "hooks/useApiConnection"
import { useCheckbox } from "hooks/useCheckbox"

// Chakra UI Components
import { Box, Flex, VStack, StackDivider, Text, Checkbox, Grid, useDisclosure } from "@chakra-ui/react"

// Custom Components
import SendButton from "components/button/SendButton"
import Body from "components/Body"
import PopOver from "components/PopOver"
import ScheduleSelector from "components/select/ScheduleSelector"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserGroup, faCalendar, faCheck } from "@fortawesome/free-solid-svg-icons"
import { up, down } from "slide-element"

// Functions
import { resp, toFlattenObject, standBy } from "ts/functions"

// Interfaces
import { Candidate } from "interfaces/Candidate"

// Types
import { ConstantSymbols } from "types/Symbols"
import { SendButtonState } from "types/SendButtonState"

// Filter
import { withSession } from "hoc/withSession"

// Importing Symbols
import * as fs from "fs"
import * as path from "path"
type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const jsonPath = path.join(process.cwd(), "json", "symbols.json")
  const jsonText = fs.readFileSync(jsonPath, "utf-8")
  const symbols = JSON.parse(jsonText) as ConstantSymbols

  return {
    props: { symbols: symbols }
  }
}

interface DynamicObject {
  [key: string]: boolean
}

const TallySurvey: NextPage<Props> = ({ symbols }) => {
  const { showToast } = useStyledToast()
  const flattenSymbols = useMemo(() => toFlattenObject(symbols), [symbols])
  const [sendButtonState, setSendButtonState] = useState<SendButtonState>("text")
  const { getSurveyResult, sendRequests } = useApiConnection()

  // 日程選択欄
  const [selectedSchedule, setSelectedSchedule] = useState("")
  const selectedSurveyId = useMemo(() => selectedSchedule.split("|")[0], [selectedSchedule])
  const selectedScheduleValue = useMemo(() => selectedSchedule.split("|")[1], [selectedSchedule])

  // ユーザーリスト
  const { isOpen: isCandidatesPopoverOpened, onOpen: openCandidatesPopover, onClose: closeCandidatesPopover } = useDisclosure()
  const { checkboxItems, setCheckbox, checkedItems, toggleItemState } = useCheckbox()
  const [candidates, setCandidates] = useState<Candidate[]>()

  // 日程選択時
  useEffect(() => {
    (async () => {
      if (!!!selectedSchedule) {
        up(document.getElementById("section") as HTMLElement, { duration: 500, easing: "ease-in-out" })
        return
      }

      try {
        const surveyResult = await getSurveyResult(selectedSurveyId)

        const availableCasts = surveyResult.openCampuses.filter(schedule => schedule.date === selectedScheduleValue)[0].availableCasts

        const initObj: DynamicObject = {}
        availableCasts.forEach(val => initObj[val.id] = val.attendanceRequested)
        setCheckbox(initObj)

        setCandidates(availableCasts)
        down(document.getElementById("section") as HTMLElement, { duration: 500, easing: "ease-in-out" })
      } catch (e) {
        if (e instanceof Error) showToast("エラー", e.message, "error")
      }
    })()
  }, [selectedSchedule, getSurveyResult, showToast, selectedScheduleValue, selectedSurveyId, setCheckbox])

  const checkValidation = useCallback(() => {
    if (!!!checkedItems.length) {
      openCandidatesPopover()
      return false
    }

    return true
  }, [openCandidatesPopover, checkedItems])

  const handleSendButtonClick = useCallback(async () => {
    if (!!!checkValidation()) return

    setSendButtonState("spinner")
    await standBy(1000)

    try {
      await sendRequests(selectedScheduleValue, checkedItems)

      setSendButtonState("checkmark")

      setTimeout(() => setSelectedSchedule(""), 1500)
    } catch {
      setSendButtonState("error")
    }
  }, [setSendButtonState, checkValidation, sendRequests, selectedScheduleValue, checkedItems])

  return (
    <Box>
      <Head>
        <title>希望日程アンケート集計 | ShiftUP!</title>
      </Head>

      <Body title="アンケート集計">
        <Flex justifyContent="center">
          <Box>
            <Box>
              <Grid gridTemplateColumns="repeat(2, auto)" gridTemplateRows="repeat(1, auto)">
                <Flex className="flex-center" w="2rem">
                  <FontAwesomeIcon className="secondary-color" icon={faCalendar} fontSize={25}></FontAwesomeIcon>
                </Flex>
                <Flex pl={resp(6, 12, 12)} alignItems="center">
                  <ScheduleSelector value={selectedSchedule} dispatch={setSelectedSchedule} requireCandidates={true} />
                </Flex>
              </Grid>
            </Box>

            <Box id="section" display="none">
              <Grid gridTemplateColumns="repeat(2, auto)" gridTemplateRows="repeat(5, auto)">
                <Flex className="flex-center" w="2rem">
                  <Box className="secondary-color" h={10} borderLeft="dotted 4px"></Box>
                </Flex>
                <Box>{/* 消さない！ */}</Box>
                <Flex className="flex-center" w="2rem">
                  <FontAwesomeIcon className="secondary-color" icon={faUserGroup} fontSize={25}></FontAwesomeIcon>
                </Flex>
                <Flex pl={resp(2, 8, 8)} alignItems="center">
                  <Text className="kb" fontSize={resp("1.45rem", "1.8rem", "1.9rem")}>出勤依頼する学生を選択</Text>
                </Flex>
                <Flex className="flex-center" w="2rem">
                  <Box className="secondary-color" h="100%" borderLeft="dotted 4px"></Box>
                </Flex>
                <Flex pl={resp(5, 12, 12)} alignItems="center">
                  <PopOver isOpen={isCandidatesPopoverOpened} onClose={closeCandidatesPopover} errorMessage="1人もチェックされていません">
                    <VStack py={5} divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
                      {candidates?.map((candidate, idx) => {
                        return (
                          <Checkbox key={idx} isChecked={checkboxItems[candidate.id]} onChange={() => toggleItemState(candidate.id)}>
                            <Flex alignItems="center">
                              <Text className="kr">{candidate.name}</Text>
                              <Text pl={2} fontSize={10} color="#898989">{flattenSymbols[candidate.schoolProfile.department]}</Text>
                            </Flex>
                          </Checkbox>
                        )
                      })}
                    </VStack>
                  </PopOver>
                </Flex>
                <Flex className="flex-center" w="2rem">
                  <FontAwesomeIcon className="secondary-color" icon={faCheck} fontSize={25}></FontAwesomeIcon>
                </Flex>
                <Flex pl={resp(2, 8, 8)} alignItems="center">
                  <Text className="kb" fontSize={resp("1.5rem", "1.8rem", "1.9rem")}>送信</Text>
                </Flex>
                <Flex className="flex-center" w="2rem">
                  <Box className="secondary-color" h="74px" borderLeft="dotted 4px"></Box>
                </Flex>
                <Flex className="flex-center" pt="2rem">
                  <SendButton text="確定依頼を送信" state={sendButtonState} onClick={handleSendButtonClick}></SendButton>
                </Flex>
              </Grid>
              <Box h="1.5rem" /> {/* marginやpaddingで代替しない */}
            </Box>
          </Box>
        </Flex>
      </Body>
    </Box >
  )
}

export default withSession(TallySurvey)