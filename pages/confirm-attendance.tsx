// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { useCallback, useState } from "react"

// Custom Hooks
import { useResponsive } from "hooks/useResponsive"
import { useApiConnection } from "hooks/useApiConnection"
import { useStyledToast } from "hooks/useStyledToast"

// Chakra UI Components
import { Box, Flex, Text, SimpleGrid, StackDivider, VStack, Button, useDisclosure } from "@chakra-ui/react"

// Custom Components
import Body from "components/Body"
import StatusText from "components/text/StatusText"
import BlurModal from "components/BlurModal"

// Functions
import { resp, formatDateForDisplay } from "ts/functions"

// Types
import { RequestState } from "types/RequestState"

// Filter
import { withSession } from "hoc/withSession"

interface ClickedScheduleState {
  schedule: string,
  action: Exclude<RequestState, "Blank">
}

const ConfirmAttendance: NextPage = () => {
  const responsiveType = useResponsive() // SmartPhone, Tablet, PC
  const { showToast } = useStyledToast()
  const { isOpen: isModalOpened, onOpen: openModal, onClose: closeModal } = useDisclosure()
  const { getAllRequests, confirmAttendance } = useApiConnection()
  const { data, fetchErrorMessage, mutate } = getAllRequests()
  if (fetchErrorMessage) showToast("エラー", fetchErrorMessage, "error")

  const [clickedSchedule, setClickedSchedule] = useState<ClickedScheduleState>()

  const handleButtonClick = useCallback(async () => {
    try {
      await confirmAttendance(clickedSchedule!.schedule, clickedSchedule!.action)
      mutate()
      showToast("成功", `出勤を${clickedSchedule!.action === "Accepted" ? "確定" : "辞退"}しました`, "success")
    } catch (e) {
      if (e instanceof Error) showToast("エラー", e.message, "error")
    }
  }, [confirmAttendance, showToast, clickedSchedule, mutate])

  return (
    <Box>
      <Head>
        <title>出勤確定処理 | ShiftUP!</title>
      </Head>

      <Body title="出勤確定処理" statusMessage={data ? `出勤確定待ちの日程が${data.canRespondRequests.length}件存在します` : ""}>
        <Box w={resp("100%", "80%", "80%")} mx="auto">
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={3}
            align="stretch"
          >
            {data?.canRespondRequests.map(request => {
              return (
                <SimpleGrid key={request.openCampusDate} columns={{ sm: 1, md: 3, lg: 3 }} gridTemplateColumns={{ sm: "", md: "3.5fr 3.5fr 3fr", lg: "2.5fr 4.5fr 3fr" }} alignItems="center">
                  <Text className="kb" mx={resp("auto", 0, 0)} fontSize={resp("1rem", "1.2rem", "1.2rem")} textAlign="right">{formatDateForDisplay(request.openCampusDate)}</Text>
                  <Text className="kr" mx={resp("auto", 0, 0)} px={resp("auto", 3, 3)} fontSize={resp("0.65rem", "0.70rem", "0.75rem")} textAlign={responsiveType === "SmartPhone" ? "center" : "left"} color="#5f5f5f">{request.surveyName}</Text>
                  <Flex w="100%" mt={resp("0.5rem", 0, 0)} justifyContent={responsiveType === "SmartPhone" ? "center" : "end"} alignItems="center">
                    <Button mr={resp(2, 3, 3)} size="sm" colorScheme="whatsapp" variant="outline" onClick={() => { setClickedSchedule({ schedule: request.openCampusDate, action: "Accepted" }); openModal() }}>確定する</Button>
                    <Button ml={resp(2, 3, 3)} size="sm" colorScheme="red" variant="outline" onClick={() => { setClickedSchedule({ schedule: request.openCampusDate, action: "Declined" }); openModal() }}>辞退する</Button>
                  </Flex>
                </SimpleGrid>
              )
            })}
          </VStack>
        </Box>

        <Box mt={5}><StatusText text={data ? `出勤確定/辞退済みの日程が${data.respondedRequests.length}件存在します` : ""} /></Box>
        <Box w={resp("100%", "80%", "80%")} mx="auto">
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={3}
            align="stretch"
          >
            {data?.respondedRequests.map(request => {
              return (
                <SimpleGrid key={request.openCampusDate} columns={{ sm: 1, md: 3, lg: 3 }} gridTemplateColumns={{ sm: "", md: "3.5fr 3.5fr 3fr", lg: "2.5fr 4.5fr 3fr" }} alignItems="center">
                  <Text className="kb" mx={resp("auto", 0, 0)} fontSize={resp("1rem", "1.2rem", "1.2rem")} textAlign="right">{formatDateForDisplay(request.openCampusDate)}</Text>
                  <Text className="kr" mx={resp("auto", 0, 0)} px={resp("auto", 3, 3)} fontSize={resp("0.65rem", "0.70rem", "0.75rem")} textAlign={responsiveType === "SmartPhone" ? "center" : "left"} color="#5f5f5f">{request.surveyName}</Text>
                  <Text className="kb" textAlign="center" color={request.state === "Accepted" ? "#159848" : "#c43030"}>{request.state === "Accepted" ? "確定済み" : "辞退済み"}</Text>
                </SimpleGrid>
              )
            })}
          </VStack>
        </Box>
      </Body>

      <BlurModal isOpen={isModalOpened} onClose={closeModal} title="確認" text={`本当に出勤を${clickedSchedule?.action === "Accepted" ? "確定" : "辞退"}してもよろしいですか？`}>
        <Button mr={1} colorScheme={clickedSchedule?.action === "Accepted" ? "whatsapp" : "red"} onClick={() => { handleButtonClick(); closeModal() }}>{clickedSchedule?.action === "Accepted" ? "確定" : "辞退"}する</Button>
        <Button ml={1} colorScheme="gray" variant="outline" onClick={closeModal}>{clickedSchedule?.action === "Accepted" ? "確定" : "辞退"}しない</Button>
      </BlurModal>
    </Box>
  )
}

export default withSession(ConfirmAttendance)