// Next.js
import type { NextPage, InferGetStaticPropsType } from "next"
import Head from "next/head"

// React
import { ChangeEvent, useState, useMemo, useCallback } from "react"

// Custom Hooks
import { useStyledToast } from "../../hooks/useStyledToast"

// Chakra UI Components
import { Box, Flex, VStack, StackDivider, Text, Select, Checkbox, Grid, useDisclosure } from "@chakra-ui/react"

// Custom Components
import SendButton from "../../components/button/SendButton"
import Body from "../../components/Body"
import PopOver from "../../components/PopOver"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserGroup, faCalendar, faCheck, faListCheck } from "@fortawesome/free-solid-svg-icons"
import { up, down } from "slide-element"
import axios from "axios"
import useSWR from "swr"

// Functions
import { resp, fetcher, formatDateForDisplay, toFlattenObject, standBy } from "../../functions"

// Interfaces
import { Survey } from "../../interfaces/Survey"
import { Candidate } from "../../interfaces/Candidate"
import { SurveyResult } from "../../interfaces/SurveyResult"

// Types
import { ConstantSymbols } from "../../types/Symbols"
import { SendButtonState } from "../../types/SendButtonState"

// Filter
import { withSession } from "../../hoc/withSession"

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
  const { data: surveys, error: fetchError } = useSWR<Survey[], Error>(process.env.NEXT_PUBLIC_SURVEYS_URL, fetcher, { fallback: [] })

  if (fetchError) showToast("エラー", "アンケートの一覧の取得に失敗しました", "error")

  const [selectedSurvey, setSelectedSurvey] = useState<SurveyResult>()
  const [selectedSurveyTitle, setSelectedSurveyTitle] = useState<string>("")
  const [candidates, setCandidates] = useState<Candidate[]>()
  const [selectedSchedule, setSelectedSchedule] = useState("")

  // ユーザーリスト
  const { isOpen: isCandidatesPopoverOpened, onOpen: openCandidatesPopover, onClose: closeCandidatesPopover } = useDisclosure()
  const [checkedList, setCheckedList] = useState<DynamicObject>({})

  const handleSurveySelect = async (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSurveyTitle(e.target.value)

    if (!!!e.target.value) {
      up(document.getElementById("section1") as HTMLElement, { duration: 500, easing: "ease-in-out" })
      up(document.getElementById("section2") as HTMLElement, { duration: 500, easing: "ease-in-out" })
      return
    }

    setSelectedSurvey((await axios.get<SurveyResult>(`${process.env.NEXT_PUBLIC_SURVEYS_URL}/${e.target.value}/result`)).data)
    down(document.getElementById("section1") as HTMLElement, { duration: 500, easing: "ease-in-out" })
  }

  const handleScheduleSelect = async (e: ChangeEvent<HTMLSelectElement>) => {
    if (!!!e.target.value) {
      up(document.getElementById("section2") as HTMLElement, { duration: 500, easing: "ease-in-out" })
      return
    }

    const availableCasts = selectedSurvey!.openCampuses.filter(schedule => schedule.date === e.target.value)[0].availableCasts
    const checked: DynamicObject = {}
    availableCasts.forEach(val => {
      checked[val.id] = val.attendanceRequested
    })
    setCheckedList(checked)
    setCandidates(availableCasts)
    setSelectedSchedule(e.target.value)
    down(document.getElementById("section2") as HTMLElement, { duration: 500, easing: "ease-in-out" })
  }

  const toggleChecked = useCallback((id: string) => {
    const copied = Object.assign({}, checkedList)
    copied[id] = !!!copied[id]
    setCheckedList(copied)
  }, [checkedList, setCheckedList])

  const getCheckedUsers = useCallback(() => Object.keys(checkedList).filter(key => checkedList[key]), [checkedList])

  const checkValidation = useCallback(() => {
    if (!!!getCheckedUsers().length) {
      openCandidatesPopover()
      return false
    }

    return true
  }, [getCheckedUsers, openCandidatesPopover])

  const handleSendButtonClick = useCallback(async () => {
    if (!!!checkValidation()) return

    setSendButtonState("spinner")
    await standBy(1000)

    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_REQUESTS_URL}/${selectedSchedule}`, getCheckedUsers())

      if (res.status === 204) {
        setSendButtonState("checkmark")
        setTimeout(() => {
          up(document.getElementById("section1") as HTMLElement, { duration: 500, easing: "ease-in-out" })
          up(document.getElementById("section2") as HTMLElement, { duration: 500, easing: "ease-in-out" })

          setSelectedSurvey(undefined)
          setSelectedSurveyTitle("")
        }, 1500)
      }
    } catch (e) {
      setSendButtonState("error")
    }
  }, [setSendButtonState, selectedSchedule, getCheckedUsers, setSelectedSurvey, checkValidation])

  return (
    <Box>
      <Head>
        <title>希望日程アンケート集計 | ShiftUP!</title>
      </Head>

      <Body title="アンケート集計">
        <Flex justifyContent="center">
          <Box>
            <Grid gridTemplateColumns="repeat(2, auto)" gridTemplateRows="repeat(1, auto)">
              <Flex w="2rem" className="flex-center">
                <FontAwesomeIcon className="secondary-color" icon={faListCheck} fontSize={25}></FontAwesomeIcon>
              </Flex>
              <Flex pl={resp(6, 12, 12)} alignItems="center">
                <Select w={resp(250, 300, 350)} placeholder="集計するアンケートを選択" value={selectedSurveyTitle} onChange={(e) => handleSurveySelect(e)}>
                  {surveys?.filter(survey => survey.answerCount !== 0).map(survey => {
                    return <option key={survey.id} value={survey.id}>{survey.name}</option>
                  })}
                </Select>
              </Flex>
            </Grid>

            <Box id="section1" display="none">
              <Grid gridTemplateColumns="repeat(2, auto)" gridTemplateRows="repeat(2, auto)">
                <Flex w="2rem" className="flex-center">
                  <Box className="secondary-color" h={10} borderLeft="dotted 4px"></Box>
                </Flex>
                <Box>{/* 消さない！ */}</Box>
                <Flex className="flex-center" w="2rem">
                  <FontAwesomeIcon className="secondary-color" icon={faCalendar} fontSize={25}></FontAwesomeIcon>
                </Flex>
                <Flex pl={resp(6, 12, 12)} alignItems="center">
                  <Select w={resp(250, 300, 350)} placeholder="集計する日にちを選択" onChange={(e) => handleScheduleSelect(e)}>
                    {selectedSurvey?.openCampuses.filter(schedule => schedule.availableCasts.length !== 0).map(schedule => {
                      return <option key={schedule.date} value={schedule.date}>{formatDateForDisplay(schedule.date)}</option>
                    })}
                  </Select>
                </Flex>
              </Grid>
            </Box>

            <Box id="section2" display="none">
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
                      {candidates?.map(candidate => {
                        return (
                          <Checkbox key={candidate.id} isChecked={checkedList[candidate.id]} onChange={() => toggleChecked(candidate.id)}>
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
            </Box>
          </Box>
        </Flex>
      </Body>
    </Box >
  )
}

export default withSession(TallySurvey)