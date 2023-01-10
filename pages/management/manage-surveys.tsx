// Next.js
import { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { useState, useEffect, useCallback, useMemo } from "react"

// Custom Hooks
import { useResponsive } from "../../hooks/useResponsive"
import { useStyledToast } from "../../hooks/useStyledToast"

// Chakra UI Components
import { Box, Flex, Text, VStack, StackDivider, Button, Tooltip, Input, Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, useDisclosure } from "@chakra-ui/react"

// Custom Components
import Body from "../../components/Body"
import BlurModal from "../../components/BlurModal"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import useSWR from "swr"

// Functions
import { resp, formatDateForDisplay, fetcher } from "../../functions"

// Interfaces
import { Survey } from "../../interfaces/Survey"

// Filter
import { withSession } from "../../hoc/withSession"

interface DynamicObject {
  [key: string]: boolean
}

const ManageSurveys: NextPage = () => {
  const responsiveType = useResponsive() // SmartPhone, Tablet, PC
  const { showToast } = useStyledToast()
  const [surveyNameInput, setSurveyNameInput] = useState("")
  const [clickedSurveyId, setClickedSurveyId] = useState("")
  const [popoverState, setPopoverState] = useState<DynamicObject>({})
  const { isOpen: isModalOpened, onOpen: openModal, onClose: closeModal } = useDisclosure()
  const { data: surveys, error: fetchError, mutate } = useSWR<Survey[], Error>(process.env.NEXT_PUBLIC_SURVEYS_URL, fetcher, { fallback: [] })

  const filteredSurveys = useMemo(() => surveys?.filter(survey => survey.name.match(new RegExp(surveyNameInput))), [surveys, surveyNameInput])
  const statusMessage = useMemo(() => {
    if (!!!surveys) return ""
    if (!!!surveyNameInput) return `${surveys.length}件のアンケートが存在します`

    const matches = filteredSurveys?.length
    if (!!!matches) return `'${surveyNameInput}'にマッチするアンケートは存在しません`
    return `'${surveyNameInput}'にマッチするアンケートが${matches}件存在します`
  }, [surveys, surveyNameInput, filteredSurveys])

  useEffect(() => {
    if (!!!surveys) return

    let baseObj: DynamicObject = {}
    surveys.map(survey => {
      baseObj[survey.id] = false
    })

    setPopoverState(baseObj)
  }, [surveys])

  if (fetchError) showToast("エラー", "アンケートの一覧の取得に失敗しました", "error")

  const changePopover = (id: string, to: boolean) => {
    const currentObj: DynamicObject = Object.assign({}, popoverState)
    currentObj[id] = to
    setPopoverState(currentObj)
  }

  const toggleAvailable = async (target: string, to: boolean) => {
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_SURVEYS_URL}/${target}/available`, to.toString())

      if (res.status === 204) {
        mutate()
        showToast("成功", "アンケートの受付状態を切り替えました", "success")
      }
    } catch (e) {
      showToast("エラー", "アンケートの受付状態を切り替えできませんでした", "error")
    }
  }

  const deleteSurvey = useCallback(async (surveyId: string) => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_SURVEYS_URL}/${surveyId}`)

      if (res.status === 204) {
        mutate()
        showToast("成功", "アンケートを削除しました", "success")
      }
    } catch (e) {
      showToast("エラー", "アンケートを削除できませんでした", "error")
    }
  }, [mutate, showToast])

  return (
    <Box>
      <Head>
        <title>希望日程アンケート管理 | ShiftUP!</title>
      </Head>

      <Body title="アンケート管理" statusMessage={statusMessage}>
        <Box w={resp("100%", "80%", "80%")} mx="auto">
          <Box textAlign="center" mb={8}>
            <Input w={resp("80%", "60%", "60%")} variant="flushed" placeholder="タイトルを入力してアンケートを検索…" textAlign="center" focusBorderColor="#48c3eb" onChange={e => setSurveyNameInput(e.target.value)} />
          </Box>

          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={3}
            align="stretch"
          >
            {filteredSurveys?.map(survey => {
              return (
                <Flex key={survey.id} justifyContent="space-between" alignItems="center">
                  <Popover isOpen={popoverState[survey.id]}>
                    <PopoverTrigger>
                      <Box className="kb" mr={2} px={3} maxW={resp("20rem", "17rem", "25rem")} fontSize={resp("1rem", "1.2rem", "1.2rem")} cursor="default" onMouseEnter={() => changePopover(survey.id, true)} onMouseLeave={() => changePopover(survey.id, false)}>{survey.name}</Box>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow bg="#2d3748" />
                      <PopoverBody className="kr" px={8} boxShadow="lg" bg="#2d3748" color="#efeff1">
                        <ul>
                          {survey.openCampusSchedule.map(schedule => {
                            return <li key={schedule}>{formatDateForDisplay(schedule)}</li>
                          })}
                        </ul>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                  <Flex alignItems="center">
                    {responsiveType === "PC" || responsiveType === "Tablet" ? <Text className="kr" mr={resp(3, 5, 5)} fontSize={resp("0.65rem", "0.70rem", "0.75rem")} color="#5f5f5f">/ {survey.answerCount}件の回答</Text> : null}
                    <Tooltip label={survey.available ? "回答を締め切る" : "回答の受付を再開する"}>
                      <Button mr={resp(3, 5, 5)} size="xs" colorScheme={survey.available ? "whatsapp" : "red"} variant="outline" onClick={() => toggleAvailable(survey.id, !!!survey.available)}>{survey.available ? "回答受付中" : "締切済み"}</Button>
                    </Tooltip>
                    <Tooltip label="アンケートを削除する">
                      <FontAwesomeIcon icon={faXmark} fontSize="1.5rem" color={survey.available ? "#159848" : "#c43030"} cursor="pointer" onClick={() => { openModal(); setClickedSurveyId(survey.id) }} />
                    </Tooltip>
                  </Flex>
                </Flex>
              )
            })}
          </VStack>
        </Box>
      </Body>

      <BlurModal isOpen={isModalOpened} onClose={closeModal} title="確認" text="本当にアンケートを削除してもよろしいですか？">
        <Button mr={1} colorScheme="red" onClick={() => { deleteSurvey(clickedSurveyId); closeModal() }}>削除する</Button>
        <Button ml={1} colorScheme="gray" variant="outline" onClick={closeModal}>削除しない</Button>
      </BlurModal>
    </Box>
  )
}

export default withSession(ManageSurveys)