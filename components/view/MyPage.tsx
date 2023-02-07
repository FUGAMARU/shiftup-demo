// React
import { useState, useMemo, memo, useCallback } from "react"

// Next.js
import Router from "next/router"

// Custom Hooks
import { useStyledToast } from "hooks/useStyledToast"
import { useApiConnection } from "hooks/useApiConnection"

// Chakra UI Components
import { Box, Flex, SimpleGrid } from "@chakra-ui/react"

// Custom Components
import Visualizer from "components/card/Visualizer"
import GreetingMessage from "components/text/GreetingMessage"
import SimpleButton from "components/button/SimpleButton"

// Libraries
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { faUpRightFromSquare, faCalendarCheck, faThumbsUp, faForward, faPersonWalking, faBell } from "@fortawesome/free-solid-svg-icons"
import { faDiscord } from "@fortawesome/free-brands-svg-icons"

// Global State Management
import { useRecoilValue } from "recoil"
import { me } from "atoms/MeAtom"

// Functions
import { resp, formatDateForMinimumDisplay, formatDate } from "ts/functions"

const MyPage = () => {
  const [cardAnimationTrigger, setCardAnimationTrigger] = useState(false)
  const myInfo = useRecoilValue(me)
  const { showToast } = useStyledToast()
  const { getPersonalizedData, getAllRequests, getCurrentTime } = useApiConnection()
  const { data: personalizedData, fetchErrorMessage: errMsg1 } = getPersonalizedData()
  const { data: allRequests, fetchErrorMessage: errMsg2 } = getAllRequests()
  const { time } = getCurrentTime()
  const today = useMemo(() => formatDate(time), [time])

  if (errMsg1) showToast("エラー", errMsg1, "error")
  if (errMsg2) showToast("エラー", errMsg2, "error")

  const isWorkDay = useMemo(() => allRequests?.respondedRequests.filter(res => res.state === "Accepted").map(res => res.openCampusDate).includes(today), [allRequests, today])

  const viewTodaySchedule = useCallback(() => Router.push(`/manage-schedule?date=${today}`), [today])

  return (
    <Box py={5} bg="#f5f5f7">
      {isWorkDay ? <SimpleButton title="今日のタイムテーブルを見る" icon={faUpRightFromSquare} onClick={viewTodaySchedule} /> : null}

      <Flex minH="65vh" maxW={resp("100%", "100%", "85%")} mx="auto" justifyContent="center" alignItems="center">
        <Box>{/* 消さない！ */}
          <GreetingMessage name={myInfo.name} fireCardAnimationTrigger={() => { setCardAnimationTrigger(true) }} />

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} justifyItems="center" alignItems="center">
            <Box className={cardAnimationTrigger ? "animate__animated card-in card1" : "hidden"}>
              <Visualizer color="#32ccbc" icon={faCalendarCheck} title="未回答の希望日程アンケート" gradientColor1="#90f7ec" gradientColor2="#32ccbc" value={personalizedData?.unansweredAttendanceSurveyCount} unit="件" isShowButton={true} linkURL="/answer-survey" />
            </Box>
            <Box className={cardAnimationTrigger ? "animate__animated card-in card2" : "hidden"}>
              <Visualizer color="#ea5455" icon={faThumbsUp} title="未確定の出勤" gradientColor1="#feb692" gradientColor2="#ea5455" value={personalizedData?.canRespondAttendanceRequestCount} unit="件" isShowButton={true} linkURL="/confirm-attendance" />
            </Box>
            <Box className={cardAnimationTrigger ? "animate__animated card-in card3" : "hidden"}>
              <Visualizer color="#28c76f" icon={faForward} title="次の出勤日" gradientColor1="#81fbb8" gradientColor2="#28c76f" value={!!!personalizedData?.nextWorkDay ? "未定" : formatDateForMinimumDisplay(personalizedData?.nextWorkDay)} unit="" isShowButton={false} />
            </Box>
            <Box className={cardAnimationTrigger ? "animate__animated card-in card4" : "hidden"}>
              <Visualizer color="#0396ff" icon={faPersonWalking} title="今月の出勤実績" gradientColor1="#abdcff" gradientColor2="#0396ff" value={personalizedData?.currentMonthWorkedDayCount} unit="回" isShowButton={false} />
            </Box>
            <Box className={cardAnimationTrigger ? "animate__animated card-in card5" : "hidden"}>
              <Visualizer color="#f8d800" icon={faBell} title="今月の残り出勤予定回数" gradientColor1="#fdeb71" gradientColor2="#f8d800" value={personalizedData?.currentMonthWorkScheduleDayCount} unit="回" isShowButton={false} />
            </Box>
            <Box className={cardAnimationTrigger ? "animate__animated card-in card6" : "hidden"}>
              <Visualizer color="#9f44d3" icon={faDiscord as IconDefinition} title="Discord" gradientColor1="#e2b0ff" gradientColor2="#9f44d3" value="専門OC" unit="" isShowButton={true} linkURL={process.env.NEXT_PUBLIC_DISCORD_LINK} />
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  )
}

export default memo(MyPage)