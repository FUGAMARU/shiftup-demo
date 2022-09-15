// Next.js
import type { NextPage } from "next"
import Head from "next/head"

// Chakra UI Components
import { Box, Text, Flex, Heading, SimpleGrid } from "@chakra-ui/react"

// Custom Components
import Header from "../components/header/Header"
import Visualizer from "../components/card/Visualizer"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpRightFromSquare, faCalendarCheck, faThumbsUp, faYenSign } from "@fortawesome/free-solid-svg-icons"

// Functions
import { resp } from "../functions"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ShiftUP!</title>
      </Head>
      <Header />

      <Box py={5} bg="#f5f5f7">
        <Flex className="hover-zoom" w="20rem" mx="auto" mb={resp(10, 0, 0)} p={2} bg="white" borderRadius={15} justifyContent="center" alignItems="center" boxShadow="lg" cursor="pointer">
          <Text className="kb" mr={3}>今日のタイムテーブルを見る</Text>
          <FontAwesomeIcon icon={faUpRightFromSquare} />
        </Flex>

        <Flex minH="65vh" maxW={resp("100%", "100%", "85%")} mx="auto" justifyContent="center" alignItems="center">
          <Box>{/* 消さない！ */}
            <Text className="keb" mb="1rem" fontSize={resp("1.2rem", "2rem", "2rem")} borderBottom="solid 1px gray">こんばんは、七海麻美さん。</Text>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} justifyItems="center" alignItems="center">
              <Visualizer color="#32ccbc" icon={faCalendarCheck} title="未回答の希望日程アンケート" gradientColor1="#90f7ec" gradientColor2="#32ccbc" value={1} unit="件" />
              <Visualizer color="#ea5455" icon={faThumbsUp} title="未確定の出勤" gradientColor1="#feb692" gradientColor2="#ea5455" value={1} unit="件" />
              <Visualizer color="#0396ff" icon={faCalendarCheck} title="今月の出勤回数" gradientColor1="#abdcff" gradientColor2="#0396ff" value={3} unit="回" />
              <Visualizer color="#f8d800" icon={faYenSign} title="今月の見込み給与" gradientColor1="#fdeb71" gradientColor2="#f8d800" value={20400} unit="円" />
            </SimpleGrid>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default Home