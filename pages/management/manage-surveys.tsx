// Next.js
import { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { useState, useEffect, useCallback, useMemo } from "react"

// Custom Hooks
import { useResponsive } from "hooks/useResponsive"
import { useStyledToast } from "hooks/useStyledToast"
import { useApiConnection } from "hooks/useApiConnection"

// Chakra UI Components
import { Box, Flex, Text, VStack, StackDivider, Button, Tooltip, Input, Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, useDisclosure } from "@chakra-ui/react"

// Custom Components
import Body from "components/view/Body"
import ButtonModal from "components/modal/ButtonModal"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

// Functions
import { resp, formatDateForDisplay } from "ts/functions"

// Filter
import { withSession } from "hoc/withSession"

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
  const { getAllSurveys, switchSurveyAvailability, deleteSurvey } = useApiConnection()

  const { data: surveys, fetchErrorMessage, mutate } = getAllSurveys()
  if (fetchErrorMessage) showToast("エラー", fetchErrorMessage, "error")

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

  const changePopover = (id: string, to: boolean) => {
    const currentObj: DynamicObject = Object.assign({}, popoverState)
    currentObj[id] = to
    setPopoverState(currentObj)
  }

  const toggleAvailable = useCallback(async (target: string, to: boolean) => {
    try {
      await switchSurveyAvailability(target, to)
      mutate()
      showToast("成功", "アンケートの受付状態を切り替えました", "success")
    } catch (e) {
      if (e instanceof Error) showToast("エラー", e.message, "error")
    }
  }, [showToast, switchSurveyAvailability, mutate])

  const handleDeleteSurvey = useCallback(async (surveyId: string) => {
    try {
      await deleteSurvey(surveyId)
      mutate()
      showToast("成功", "アンケートを削除しました", "success")
    } catch (e) {
      if (e instanceof Error) showToast("エラー", e.message, "error")
    }
  }, [mutate, showToast, deleteSurvey])

  return (
    <Box>
      <Head>
        <title>希望日程アンケート管理 | ShiftUP!</title>
      </Head>

      <Body title="アンケート管理" statusMessage={statusMessage}>
        <Box w={resp("100%", "80%", "80%")} mx="auto">
          {surveys?.length ?
            <Box textAlign="center" mb={8}>
              <Input w={resp("80%", "60%", "60%")} variant="flushed" placeholder="タイトルを入力してアンケートを検索…" textAlign="center" focusBorderColor="#48c3eb" onChange={e => setSurveyNameInput(e.target.value)} />
            </Box>
            : null}

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
                    {survey.canDelete ?
                      <Tooltip label="アンケートを削除する">
                        <FontAwesomeIcon icon={faXmark} fontSize="1.5rem" color={survey.available ? "#159848" : "#c43030"} cursor="pointer" onClick={() => { openModal(); setClickedSurveyId(survey.id) }} />
                      </Tooltip>
                      :
                      <Tooltip label="このアンケートは過去に集計されたことがあるため削除できません">
                        <FontAwesomeIcon icon={faXmark} fontSize="1.5rem" color="#8b8b8b" />
                      </Tooltip>
                    }
                  </Flex>
                </Flex>
              )
            })}
          </VStack>
        </Box>
      </Body >

      <ButtonModal isOpen={isModalOpened} onClose={closeModal} title="確認" text="本当にアンケートを削除してもよろしいですか？">
        <Button mr={1} colorScheme="red" onClick={() => { handleDeleteSurvey(clickedSurveyId); closeModal() }}>削除する</Button>
        <Button ml={1} colorScheme="gray" variant="outline" onClick={closeModal}>削除しない</Button>
      </ButtonModal>
    </Box >
  )
}

export default withSession(ManageSurveys)