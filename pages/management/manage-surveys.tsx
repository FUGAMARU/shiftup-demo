// Next.js
import { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { useState, useEffect } from "react"

// Custom Hooks
import useResponsive from "../../hooks/useResponsive"

// Chakra UI Components
import { Box, Flex, Text, VStack, StackDivider, Button, Tooltip, Input, useToast, Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow } from "@chakra-ui/react"

// Custom Components
import Body from "../../components/Body"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import useSWR from "swr"
const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Functions
import { resp, formatDateForDisplay } from "../../functions"

// Interfaces
import { Survey } from "../../interfaces/Survey"

// Filter
import { withSession } from "../../hoc/withSession"

interface DynamicObject {
  [key: string]: boolean
}

const ManageSurveys: NextPage = () => {
  const responsiveType = useResponsive() // SmartPhone, Tablet, PC
  const toast = useToast()
  const [popoverState, setPopoverState] = useState<DynamicObject>({})
  const { data: surveys, error: fetchError, mutate } = useSWR<Survey[], Error>(process.env.NEXT_PUBLIC_SURVEYS_URL, fetcher, { fallback: [] })

  useEffect(() => {
    if (!!!surveys) return

    let baseObj: DynamicObject = {}
    surveys.map(survey => {
      baseObj[survey.id] = false
    })

    setPopoverState(baseObj)
  }, [surveys])

  if (fetchError) {
    toast({
      title: "エラー",
      description: "アンケートの一覧の取得に失敗しました",
      status: "error",
      variant: "left-accent",
      position: "top-right"
    })
  }

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
        toast({
          title: "切替完了",
          description: "アンケートの受付状態を切り替えました",
          status: "success",
          variant: "left-accent",
          position: "top-right"
        })
      }
    } catch (e) {
      toast({
        title: "切替失敗",
        description: "アンケートの受付状態を切り替えできませんでした",
        status: "error",
        variant: "left-accent",
        position: "top-right"
      })
    }
  }

  const deleteSurvey = async (target: string) => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_SURVEYS_URL}/${target}`)

      if (res.status === 204) {
        mutate()
        toast({
          title: "削除完了",
          description: "アンケートを削除しました",
          status: "success",
          variant: "left-accent",
          position: "top-right"
        })
      }
    } catch (e) {
      toast({
        title: "削除失敗",
        description: "アンケートを削除できませんでした",
        status: "error",
        variant: "left-accent",
        position: "top-right"
      })
    }
  }

  return (
    <>
      <Head>
        <title>希望日程アンケート管理 | ShiftUP!</title>
      </Head>

      <Body title="アンケート管理" statusMessage={surveys ? `${surveys.length}件のアンケートが存在します` : ""}>
        <Box w={resp("100%", "80%", "80%")} mx="auto">
          <Box textAlign="center" mb={8}>
            <Input w={resp("80%", "60%", "60%")} variant="flushed" placeholder="タイトルを入力してアンケートを検索…" textAlign="center" focusBorderColor="#48c3eb" />
          </Box>

          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={3}
            align="stretch"
          >
            {surveys?.map(survey => {
              return (
                <Flex key={survey.id} justifyContent="space-between" alignItems="center">
                  <Popover isOpen={popoverState[survey.id]}>
                    <PopoverTrigger>
                      <Box className="kb" mr={2} px={3} maxW={resp("20rem", "17rem", "25rem")} fontSize={resp("1rem", "1.2rem", "1.2rem")} cursor="default" onMouseEnter={() => changePopover(survey.id, true)} onMouseLeave={() => changePopover(survey.id, false)}>{survey.name}</Box>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverBody px={8} boxShadow="lg">
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
                      <FontAwesomeIcon icon={faXmark} fontSize="1.5rem" color={survey.available ? "#159848" : "#c43030"} cursor="pointer" onClick={() => deleteSurvey(survey.id)} />
                    </Tooltip>
                  </Flex>
                </Flex>
              )
            })}
          </VStack>
        </Box>
      </Body>
    </>
  )
}

export default withSession(ManageSurveys)