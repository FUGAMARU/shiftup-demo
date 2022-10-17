// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// React Hooks
import { useState } from "react"

// Chakra UI Components
import { Box, Text, Flex, SimpleGrid } from "@chakra-ui/react"

// Custom Components
import Header from "../components/header/Header"
import Visualizer from "../components/card/Visualizer"
import GreetingMessage from "../components/text/GreetingMessage"
import SimpleButton from "../components/button/SimpleButton"

// Libraries
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { faUpRightFromSquare, faCalendarCheck, faThumbsUp, faYenSign, faForward } from "@fortawesome/free-solid-svg-icons"
import { faDiscord } from "@fortawesome/free-brands-svg-icons"

// Functions
import { resp } from "../functions"

const Home: NextPage = () => {
  const [cardAnimationTrigger, setCardAnimationTrigger] = useState(false)

  const viewTodaySchedule = () => {
    // 「今日のタイムテーブルを見る」 ボタンをクリックした時の処理をそのうち書く
  }

  return (
    <>
      <Head>
        <title>ShiftUP!</title>
      </Head>
      <Header />

      <Box py={5} bg="#f5f5f7">
        <SimpleButton title="今日のタイムテーブルを見る" icon={faUpRightFromSquare} onClick={viewTodaySchedule} />

        <Flex minH="65vh" maxW={resp("100%", "100%", "85%")} mx="auto" justifyContent="center" alignItems="center">
          <Box>{/* 消さない！ */}
            <GreetingMessage name="七海麻美" fireCardAnimationTrigger={() => { setCardAnimationTrigger(true) }} />

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} justifyItems="center" alignItems="center">
              <Box className={cardAnimationTrigger ? "animate__animated card-in card1" : "hidden"}>
                <Visualizer color="#32ccbc" icon={faCalendarCheck} title="未回答の希望日程アンケート" gradientColor1="#90f7ec" gradientColor2="#32ccbc" value={1} unit="件" isShowButton={true} linkURL="/answer-survey" />
              </Box>
              <Box className={cardAnimationTrigger ? "animate__animated card-in card2" : "hidden"}>
                <Visualizer color="#ea5455" icon={faThumbsUp} title="未確定の出勤" gradientColor1="#feb692" gradientColor2="#ea5455" value={1} unit="件" isShowButton={true} linkURL="/confirm-attendance" />
              </Box>
              <Box className={cardAnimationTrigger ? "animate__animated card-in card3" : "hidden"}>
                <Visualizer color="#28c76f" icon={faForward} title="次の出勤日" gradientColor1="#81fbb8" gradientColor2="#28c76f" value="9/16" unit="" isShowButton={false} />
              </Box>
              <Box className={cardAnimationTrigger ? "animate__animated card-in card4" : "hidden"}>
                <Visualizer color="#0396ff" icon={faCalendarCheck} title="今月の出勤回数" gradientColor1="#abdcff" gradientColor2="#0396ff" value={3} unit="回" isShowButton={false} />
              </Box>
              <Box className={cardAnimationTrigger ? "animate__animated card-in card5" : "hidden"}>
                <Visualizer color="#f8d800" icon={faYenSign} title="今月の見込み給与" gradientColor1="#fdeb71" gradientColor2="#f8d800" value={20400} unit="円" isShowButton={false} />
              </Box>
              <Box className={cardAnimationTrigger ? "animate__animated card-in card6" : "hidden"}>
                <Visualizer color="#9f44d3" icon={faDiscord as IconDefinition} title="Discord" gradientColor1="#e2b0ff" gradientColor2="#9f44d3" value="専門OC" unit="" isShowButton={true} linkURL="https://discord.com/channels/947388983179091969/947390083445715035" />
              </Box>
            </SimpleGrid>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default Home